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
import { useAppContext } from "../../context/AppContext";

type MaskData = {
    masks: object[];
    maskCategory: string;
    maskUrl: string;
}

const useBuilder = (router: Router) => {
    const jobMaskId = router.searchParams.get("maskId");
    const notifications = useNotifications();

    const { setUser } = useAppContext();
    const [maskData, setMaskData] = useState<{ data: MaskData } | null>(null);
    const [spaceTypes, setSpaceTypes] = useState<SpaceTypeInterface | null>(null);
    const [designThemes, setDesignThemes] = useState<DesignThemeInterface| null>(null);
    const [open, setOpen] = useState(false);
    const [loadingMasks, setLoadingMasks] = useState(false);
    const [loadingCreateMask, setLoadingCreateMask] = useState(false);

    const createMask = async (file: File, maskCategory: string): Promise<void> => {
        setLoadingCreateMask(true);
        setOpen(true);

        if (file) {
            const formData = new FormData();
            formData.append("preview", file);  // Now it's a valid file upload
            formData.append("maskCategory", maskCategory);

            const { error, resData } = await fetchData<FormData, {credits: number}>({
                data: formData,
                url: "/builder/create-mask",
                method: "POST",
            });
        
            if (error) {
                setLoadingCreateMask(false);
                setOpen(false)
                notifications.show(error, {
                    severity: 'error',
                    autoHideDuration: 4000,
                });
            }

            if (resData) {
                console.log(resData);
                notifications.show(`${resData.credits} credits used`, {
                    severity: 'warning',
                    autoHideDuration: 4000,
                });
                setUser(prevUser => prevUser ? { ...prevUser, credits: Number(prevUser.credits - resData.credits) } : null);
            }
        }
    };

    const fetchMasks = useCallback(async (jobMaskId: string) => {
        setLoadingMasks(true);

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

        setLoadingMasks(false);
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

    return { maskData, loadingMasks, spaceTypes, designThemes, open, loadingCreateMask, fetchMasks, createMask, setOpen, setLoadingCreateMask };
};

export default useBuilder;
