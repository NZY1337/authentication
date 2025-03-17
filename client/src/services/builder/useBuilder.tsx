/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import fetchData from "../../utils/fetchData";

// utils
import { solutions } from "../../helpers/constants";

// types
import { type Router } from '@toolpad/core';
import { SpaceTypeInterface, DesignThemeInterface } from "../../utils/utilities";

// hooks
import { useNotifications } from '@toolpad/core/useNotifications';


type MaskData = {
    masks: object[];
    maskCategory: string;
    maskUrl: string;
}

const useBuilder = (router: Router) => {
    const [maskData, setMaskData] = useState<{ data: MaskData } | null>(null);
    const [loading, setLoading] = useState(false);
    const jobMaskId = router.searchParams.get("maskId");
    
    const [spaceTypes, setSpaceTypes] = useState<SpaceTypeInterface | null>(null);
    const [designThemes, setDesignThemes] = useState<DesignThemeInterface| null>(null);
    const notifications = useNotifications();

    const fetchMasks = useCallback(async (jobMaskId: string) => {
        setLoading(true);

        const { resData, error } = await fetchData<null, { data: MaskData }>({
            url: "/builder/create-mask",  
            method: "GET",
            params: { maskId: jobMaskId },  
        });

        if (error) {
            notifications.show(error, {
                severity: 'error',
                autoHideDuration: 3000,
            })
        } else if (resData) {
            setMaskData({ data: resData.data });
            const solution = solutions.find((sol) => sol.label === resData?.data?.maskCategory);
            router.navigate(`/dashboard/${solution?.segment}?maskId=${jobMaskId}`);
        }

        setLoading(false);
    },[notifications, router]);

      useEffect(() => {
        if (jobMaskId) {
            fetchMasks(jobMaskId);
        }
    }, [fetchMasks, jobMaskId]);

    useEffect(() => {
        const fetchDataParallel = async () => {
            try {
                const [
                    { resData: spaceData, error: spaceError }, 
                    { resData: themeData, error: themeError },
                ] = await Promise.all([
                        fetchData<null, { spaceType: SpaceTypeInterface }>({ url: '/builder/get-space-type', method: 'GET' }),
                        fetchData<null, { designThemes: DesignThemeInterface }>({ url: '/builder/get-design-theme', method: 'GET' })
                    ]);
    
                if (spaceError) {
                    notifications.show(spaceError, {
                        severity: 'error',
                        autoHideDuration: 3000,
                    });
                };
                if (themeError) {
                    console.error(themeError);
                    notifications.show(spaceError, {
                        severity: 'error',
                        autoHideDuration: 3000,
                    });
                };
    
                if (spaceData) setSpaceTypes(spaceData.spaceType);
                if (themeData) setDesignThemes(themeData.designThemes);
            } catch (err) {
                console.error("Error fetching data:", err);
                notifications.show('Data could not be fetched', {
                    severity: 'error',
                    autoHideDuration: 3000,
                });
            }
        };
    
        fetchDataParallel();
    }, []);

    return { maskData, loading, spaceTypes, designThemes, fetchMasks, };
};

export default useBuilder;
