import { useEffect, useState, useRef } from "react";
import fetchData from "../../utils/fetchData";
import { AppContextType } from "../../context/AppContext";

interface SessionResponse {
    remainingTime: number;
    isExpiringSoon: boolean;
}

type useSessionType = Pick<AppContextType, 'handleOpen' | 'logoutUser' | 'user'>;

const useSession = ({ handleOpen, logoutUser, user }: useSessionType) => {
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
    const [polling, setPolling] = useState(60 * 1000); // start from 1 minute | token: 15 minute
    const getSessionTime = async () => {
        if (document.hidden) return; // probably not needed because we check document visibility in the useEffect hook

        const { resData, error } = await fetchData<null, SessionResponse>({
            url: "/auth/session-time",
            method: "GET",
        });

        if (resData && resData?.remainingTime <= 60) {
            setPolling(5000); //5 seconds
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
        if (intervalIdRef.current) return; // Prevent multiple intervals
        getSessionTime();

        intervalIdRef.current = setInterval(() => {
            getSessionTime();
        }, polling);
    };

    const stopSessionTimer = () => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
    };

    // Handle tab visibility changes
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopSessionTimer(); // Pause polling
            } else if (user) {
                startSessionTimer(); // Resume polling when visible
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [user]);

    useEffect(() => {
        if (user && !document.hidden) startSessionTimer();
        if (!user && document.hidden) stopSessionTimer();

        return () => stopSessionTimer();
        
    }, [user, polling]);

    return { getSessionTime };
};

export default useSession;


