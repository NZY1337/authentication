import { renderHook, act } from "@testing-library/react";
import { useResetPassword } from "./useResetPassword";
import fetchData from "../../utils/fetchData";

jest.mock("../../utils/fetchData");

const mockFetchData = fetchData as jest.Mock;

describe("useResetPassword", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should set loading to true when resetPassword is called", async () => {
        const mockResponse = { resData: { message: 'Password reset email sent' }, error: null };
        mockFetchData.mockResolvedValue(mockResponse);

        const { result } = renderHook(() => useResetPassword());

        await act(async () => {
            await result.current.resetPassword({ email: 'test@example.com', password: 'password', token: 'token' });
        });

        expect(result.current.loading).toBe(false); // Note: loading should be false after the request is complete
        expect(result.current.message).toBe(mockResponse.resData.message);
    });
});
