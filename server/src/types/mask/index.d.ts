export interface JobMask {
    status: string;
    data: {
      job_id: string;
      credits_consumed: number;
    };
    errorData: {
        status: number;
        error_message: string;
    }
};

export interface Mask {
    name: string;
    url: string;
    category: string;
    areaPercent: number;
    jobMaskId: string;
}