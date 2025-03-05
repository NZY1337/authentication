import { useEffect, useState, useRef } from "react";
import fetchData from "../../utils/fetchData";
import { AppContextType } from "../../context/AppContext";

interface SessionResponse {
    remainingTime: number;
    isExpiringSoon: boolean;
}

type useSessionType = Pick<AppContextType, 'handleOpen' | 'logoutUser' | 'user'>;

//!! TODO - check for useCallback and what it does - fns are recreated everytime when components rerenders
const useSession = ({ handleOpen, logoutUser, user }: useSessionType) => {
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
    const [polling, setPolling] = useState(60 * 1000); // start from 1 minute | token: 15 minute

    const stopSessionTimer = () => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
    };

    const getSessionTime = async () => {
        if (document.hidden) return; // probably not needed because we check document visibility in the useEffect hook

        const { resData, error } = await fetchData<null, SessionResponse>({
            url: "/auth/session-time",
            method: "GET",
        });

        if (resData && resData?.remainingTime <= 60) {
            setPolling(5000); // 5 seconds
        } else {
            setPolling(60 * 1000); //1 minute
        }

        console.log('from server: --', resData?.remainingTime);

        if (error === "Unauthorized") {
            logoutUser();
            handleOpen();
            stopSessionTimer();
        }
    };

    const startSessionTimer = () => {
        if (intervalIdRef.current || !user) return; // Prevent multiple intervals
        getSessionTime();

        intervalIdRef.current = setInterval(() => {
            getSessionTime();
        }, polling);
    };

    // Handle tab visibility changes
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && user) {
                console.log('pause polling')
                stopSessionTimer(); // Pause polling
            } else if (user) {
                console.log('start polling')
                startSessionTimer(); // Resume polling when visible
            }
        };

        handleVisibilityChange();

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            stopSessionTimer(); // Cleanup on unmount
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [user, polling]);

    return { getSessionTime };
};

export default useSession;


