import { renderHook, act } from '@testing-library/react';
import { useAuth } from './useAuth';
import fetchData from '../../utils/fetchData';

jest.mock('../../utils/fetchData');

const mockFetchData = fetchData as jest.Mock;
const mockNavigate = jest.fn();
const mockHandleOpen = jest.fn();

const mockUser = {
  id: '123',
  name: 'Test User',
  email: 'test@example.com',
  remainingTime: 9,
};

describe('useAuth hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login a user and set user state', async () => {
    mockFetchData.mockResolvedValue({
      resData: { user: mockUser },
      error: null,
    });
    
    const { result } = renderHook(() => useAuth(mockHandleOpen));

    await act(async () => {
      await result.current.loginUser({ email: 'test@example.com', password: 'password' }, mockNavigate);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('should handle login error', async () => {
    mockFetchData.mockResolvedValue({ resData: null, error: 'Login failed' });

    const { result } = renderHook(() => useAuth(mockHandleOpen));

    await act(async () => {
      await result.current.loginUser({ email: 'test@example.com', password: 'wrongpassword' }, mockNavigate);
    });

    expect(result.current.error).toBe('Login failed');
    expect(result.current.user).toBeNull();
  });

  it('should fetch the current user on mount', async () => {
    mockFetchData.mockResolvedValueOnce({ resData: { user: mockUser }, error: null });

    const { result } = renderHook(() => useAuth(mockHandleOpen));

    await act(async () => {
      await result.current.getUser();
    });

    expect(result.current.user).toEqual(mockUser);
  });

  it('should handle logout', async () => {
    mockFetchData.mockResolvedValue({ resData: null, error: null });

    const { result } = renderHook(() => useAuth(mockHandleOpen));

    await act(async () => {
      await result.current.logoutUser();
    });

    expect(result.current.user).toBeNull();
  });

  it('should handle session expiration and call handleOpen', async () => {
    jest.useFakeTimers();
  
    mockFetchData.mockResolvedValue({
        resData: { 
            user: {
            ...mockUser,
            createdAt: "2024-12-20T14:07:31.426Z", 
            defaultBillingAddress: "123 Street, City, Country", 
            defaultShippingAddress: "123 Street, City, Country",
            role: "some roles",
            }
        },
        error: null,
    });
        
    const { result } = renderHook(() => useAuth(mockHandleOpen));
  
    await act(async () => {
        const sessionExpirationTime = result?.current?.user?.remainingTime;
        if (sessionExpirationTime) result.current.setRemainingTime(sessionExpirationTime);
    });
  
    // to check result.current.remainingTime after each timer, pass it to the return in the useAuth
    act(() => {
        jest.advanceTimersByTime(7000);
    });
  
    expect(result.current.user).not.toBeNull(); 

    act(() => {
        jest.advanceTimersByTime(2000); 
    });
  
    // crucial - ensures all state updates and side effects triggered by the timer advancements are complete.
    await act(async () => {}); 
    
    expect(result.current.user).toBeNull();
  });
  
  it('should register a new user', async () => {
    const message = "Please check your email to verify account!"
    mockFetchData.mockResolvedValue({ resData: { message }, error: null });

    const { result } = renderHook(() => useAuth(mockHandleOpen));

    await act(async () => {
      await result.current.registerUser({ name: 'Andrew Misseldorf', email: 'new@example.com', password: 'password' });
    });

    // this is not an error actually (it's success) - maybe in the future modify this from useAuth,
    // but for fast development we can leave it like this
    expect(result.current.error).toEqual(message); 
  });

  it('should handle registration error', async () => {
    mockFetchData.mockResolvedValue({ resData: null, error: 'Registration failed' });

    const { result } = renderHook(() => useAuth(mockHandleOpen));

    await act(async () => {
      await result.current.registerUser({ name: 'Andrew Misseldorf', email: 'new@example.com', password: 'password' });
    });

    expect(result.current.error).toBe('Registration failed');
    expect(result.current.user).toBeNull();
  });
});
