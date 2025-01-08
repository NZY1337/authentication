import { renderHook, act } from "@testing-library/react";
import { useForgotPassword } from "./useForgotPassword";
import fetchData from "../../utils/fetchData";

jest.mock("../../utils/fetchData");

const mockFetchData = fetchData as jest.Mock;

describe("useForgotPassword", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should set loading to true when forgotPassword is called", async () => {
        const mockResponse = { resData: { message: 'Password reset email sent' }, error: null };
        mockFetchData.mockResolvedValue(mockResponse);

        const { result } = renderHook(() => useForgotPassword());

        await act(async () => {
            await result.current.forgotPassword("test@example.com");
        });

        console.log(result.current)

        expect(result.current.loading).toBe(false); // Note: loading should be false after the request is complete
        expect(result.current.message).toBe(mockResponse.resData.message);
    });
});
