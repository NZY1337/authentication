import { REIMAGINE_HOME_API_KEY_ID, REIMAGINE_HOME_API_KEY_NAME } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import axios, { AxiosError } from 'axios';

// !! MOVE TO /services folder 

interface ApiResponseError {
    status: string;
    data: Record<string, unknown>;
    error_message: string;
  }

const reimagine = {
    createMask: async (imgUrl: string) => {
        const config = {
            headers: { 
                'api-key': REIMAGINE_HOME_API_KEY_ID, 
                'Content-Type': 'application/json'
            },
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.reimaginehome.ai/v1/create_mask',
            data: JSON.stringify({
                "image_url": imgUrl,
                "webhook_url": "https://a0c6-178-138-194-11.ngrok-free.app/webhook/mask"
            }),
        };

        try {
            const response = await axios(config);
            return response.data; 
        } catch (error) {
            const err = error as AxiosError<ApiResponseError>;
            const errorMessage = err.response?.data?.error_message ?? "Something went wrong";
            throw new BadRequestException(errorMessage, 400, null);
        }
    },
    // this is now obsolete since we have the webhook
    getMask: async(maskId: string) => {
        const config = {
            headers: { 
                'api-key': REIMAGINE_HOME_API_KEY_ID, 
            },
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.reimaginehome.ai/v1/create_mask/${maskId}`,
        };

        try {
            const response = await axios(config);
            return response.data; 
        } catch (error) {
            const err = error as AxiosError<ApiResponseError>;
            const errorMessage = err.response?.data?.error_message ?? "Something went wrong";
            throw new BadRequestException(errorMessage, 400, null);
        }
    },
    getSpaceType: async () => {
        const config = {
            headers: { 
                'api-key': REIMAGINE_HOME_API_KEY_ID, 
            },
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api.reimaginehome.ai/v1/get-space-type-list',
        };

        try {
            const response = await axios(config);
            return response.data; 
        } catch (error) {
            const err = error as AxiosError<ApiResponseError>;
            const errorMessage = err.response?.data?.error_message ?? "Something went wrong";
            throw new BadRequestException(errorMessage, 400, null);
        }
    },
    getDesignTheme: async () => {
        const config = {
            headers: { 
                'api-key': REIMAGINE_HOME_API_KEY_ID, 
            },
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api.reimaginehome.ai/v1/get-design-theme-list',
        };

        try {
            const response = await axios(config);
            return response.data; 
        } catch (error) {
            const err = error as AxiosError<ApiResponseError>;
            const errorMessage = err.response?.data?.error_message ?? "Something went wrong";
            throw new BadRequestException(errorMessage, 400, null);
        }
    }
}

export default reimagine;
