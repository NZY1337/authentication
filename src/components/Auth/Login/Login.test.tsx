import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Login from './Login';
import { useAppContext } from '../../../context/AppContext';
// import { useNavigate } from 'react-router-dom';
import useValidateInputs from '../../../utils/validateInput';

// Mock dependencies
jest.mock('../../../context/AppContext');
jest.mock('../../../utils/validateInput');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  Link: jest.fn().mockImplementation(({ children }) => children),
}));
jest.mock('../ForgotPassword/ForgotPassword', () => jest.fn(() => <div>Forgot Password Modal</div>));

describe('Login Component', () => {
  const mockLoginUser = jest.fn();
//   const mockNavigate = useNavigate as jest.Mock;
  const mockValidateInputs = useValidateInputs as jest.Mock;
  const mockUseAppContext = useAppContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAppContext.mockReturnValue({
      loginUser: mockLoginUser,
      error: '',
      loading: false,
      setError: jest.fn(),
    });

    mockValidateInputs.mockReturnValue({
      validateInputs: jest.fn().mockReturnValue(true),
      formErrors: { email: '', password: '' },
    });
  });

  it('renders the form and elements correctly', () => {
    const { getByText, getByPlaceholderText, getByRole } = render(<Login />);
    expect(getByText('Log In')).toBeInTheDocument();
    expect(getByPlaceholderText('your@email.com')).toBeInTheDocument();
    expect(getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(getByText("Forgot your password?")).toBeInTheDocument();
    expect(getByRole('button', { name: 'Log In' })).toBeInTheDocument();
  });

//   it('opens ForgotPassword component when "Forgot your password?" is clicked', () => {
//     render(<Login />);
//     fireEvent.click(screen.getByText('Forgot your password?'));
//     expect(screen.getByText('Forgot Password Modal')).toBeInTheDocument();
//   });

//   it('submits the form when valid inputs are provided', async () => {
//     const mockData = { email: 'test@example.com', password: 'password123' };
//     render(<Login />);
    
//     fireEvent.change(screen.getByPlaceholderText('your@email.com'), { target: { value: mockData.email } });
//     fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: mockData.password } });
    
//     fireEvent.click(screen.getByRole('button', { name: 'Log In' }));
    
//     await waitFor(() => {
//       expect(mockLoginUser).toHaveBeenCalledWith(
//         { email: mockData.email, password: mockData.password },
//         mockNavigate
//       );
//     });
//   });

//   it('displays the loading spinner when loading is true', () => {
//     useAppContext.mockReturnValue({
//       loginUser: mockLoginUser,
//       error: '',
//       loading: true,
//       setError: jest.fn(),
//     });
//     render(<Login />);
//     expect(screen.getByRole('progressbar')).toBeInTheDocument();
//   });

//   it('displays error message when error exists', () => {
//     useAppContext.mockReturnValue({
//       loginUser: mockLoginUser,
//       error: 'Invalid credentials',
//       loading: false,
//       setError: jest.fn(),
//     });
//     render(<Login />);
//     expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
//   });

//   it('navigates to the registration page when "Don\'t have an account? Register" is clicked', () => {
//     render(<Login />);
    
//     fireEvent.click(screen.getByText('Don\'t have an account? Register'));
    
//     expect(mockNavigate).toHaveBeenCalledWith('/user/register');
//   });
});
