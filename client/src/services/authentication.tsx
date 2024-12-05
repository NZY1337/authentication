import axiosInstance from "../utils/axiosInstance";

const authentication = {
    loginUser: async (userData: unknown) => {
        try {
            const response = await axiosInstance.post('/auth/signIn', userData);
            return { user: response.data.user, error: null }
        } catch (error: unknown) {
            console.log(error);

            return { user: null, error: error?.response?.data?.message}
        }
    },
    logoutUser: async() => {
        try {
            await axiosInstance.delete('/auth/logout');
            return {success: true, error: null}
          } catch (error) {
            return {success: false, error: error?.response?.data?.message}
          }
    },
    registerUser: async(userData: unknown) => {
        try {
            const response = await axiosInstance.post('/auth/signUp', userData);
            console.log(response.data.message)
            return { message: response.data.message, error: null }
        } catch (error: unknown) {
            return { message: null, error: error?.response?.data?.message}
        }
    }
}

export default authentication
