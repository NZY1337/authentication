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
    area_percent: number;
    jobMaskId: string;
    center: {
        x: number;
        y: number;
    }
}