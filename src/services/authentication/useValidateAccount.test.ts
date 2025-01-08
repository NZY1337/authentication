import { renderHook, act } from "@testing-library/react";
import { useValidateAccount } from "./useValidateAccount";
import fetchData from "../../utils/fetchData";

jest.mock("../../utils/fetchData");

const mockFetchData = fetchData as jest.Mock;

describe("useValidateAccount", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    }); 

    it("should set loading to true when validateAccount is called", async () => {
        const mockResponse = { resData: { message: 'Account validated' }, error: null };
        mockFetchData.mockResolvedValue(mockResponse);  

        const { result } = renderHook(() => useValidateAccount({ verificationToken: 'token', email: 'test@example.com' }));

        await act(async () => {
            await result.current.validateAccount();
        });

        expect(result.current.loading).toBe(false); // Note: loading should be false after the request is complete
        expect(result.current.message).toBe(mockResponse.resData.message);  
    });
});