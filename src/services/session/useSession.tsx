/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";

const useSession = () => {
    const[remainingTime, setRemainingTime] = useState<number>(0);
    const[isExpiringSoon, setIsExpiringSoon] = useState<boolean>(false);
    

    const getSessionTime = async () => {
        const { resData, error } = await fetchData<null, null>({
            url: "/auth/session-time",
            method: "GET",
        });
        if (resData) {
            console.log(resData)
        }
        if (error) console.log(error);
    }

    return { remainingTime, isExpiringSoon, getSessionTime };
}

export default useSession