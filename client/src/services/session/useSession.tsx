import { useEffect, useState, useRef } from "react";
import fetchData from "../../utils/fetchData";
import { AppContextType } from "../../context/AppContext";

interface SessionResponse {
    remainingTime: number;
    isExpiringSoon: boolean
}

type useSessionType = Pick<AppContextType, 'handleOpen' | 'logoutUser' | 'handleClose'>;

const useSession = ({ handleOpen, handleClose, logoutUser }: useSessionType) => {
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

    console.log(remainingTime)

    const getSessionTime = async () => {
        const { resData, error } = await fetchData<null, SessionResponse>({
            url: "/auth/session-time",
            method: "GET",
        });

        // console.log('from server: --', resData?.remainingTime)

        if (error) {
            console.error("Session fetch error:", error);
            return;
        }

        if (resData?.remainingTime) {
            const remainingSeconds = Number(resData.remainingTime);
            const expirationTimestamp = Date.now() + remainingSeconds * 1000;
            localStorage.setItem("sessionExpiresAt", expirationTimestamp.toString());
        }
    };

    const updateRemainingTime = () => {
        const storedExpiration = localStorage.getItem("sessionExpiresAt");
        if (!storedExpiration) return;

        const expirationTimestamp = Number(storedExpiration);
        const timeleft = Math.max(0, Math.floor((expirationTimestamp - Date.now()) / 1000));
        
        console.log(timeleft, remainingTime);
        
        if (timeleft !== remainingTime) {
            setRemainingTime(timeleft);
        }

        if (timeleft > 0 && timeleft <= 40) {
            console.log("Session is about to expire!");
            handleOpen();
        }

        if (timeleft === 0) {
            clearSessionTimer();
            logoutUser();
            handleClose();
        }
    };

    const clearSessionTimer = () => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
            console.log("Session expired, timer stopped.");
        }
        localStorage.removeItem("sessionExpiresAt");
        setRemainingTime(0); 
    };

    useEffect(() => {
        if (intervalIdRef.current) return; // Prevent multiple intervals

        updateRemainingTime(); // Ensure initial sync

        intervalIdRef.current = setInterval(() => {
            updateRemainingTime();
        }, 5000); // Check every 5 seconds

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        };
    }, []);

    return { remainingTime, getSessionTime, clearSessionTimer };
};

export default useSession;
