import { REIMAGINE_HOME_API_KEY_ID, REIMAGINE_HOME_API_KEY_NAME } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import axios from 'axios';

// !! MOVE TO /services folder 

const REIMAGINE_API_CFG = {
    headers: { 
      'api-key': REIMAGINE_HOME_API_KEY_ID, 
      'Content-Type': 'application/json'
    },
};

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
            }),
        };

        try {
            const response = await axios(config);
            return response.data; // 67d044054c439f58e7301e9d - MASK_JOB_ID
        } catch (error) {
            console.error(error);
            throw new BadRequestException("Error creating mask", 400, null);
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
            return response.data; // 67d044054c439f58e7301e9d - MASK_JOB_ID
        } catch (error) {
            console.error(error);
            throw new BadRequestException("Error getting space types", 400, null);
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
            console.error(error);
            throw new BadRequestException("Error getting design theme types", 400, null);
        }
    }
}

export default reimagine;
