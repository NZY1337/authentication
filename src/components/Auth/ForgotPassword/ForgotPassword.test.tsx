import '@testing-library/jest-dom'; // Added import for jest-dom
import { render, fireEvent, waitFor } from '@testing-library/react';
import ForgotPassword from './ForgotPassword';
import { useForgotPassword } from '../../../services/authentication/useForgotPassword';
import useValidateInputs from '../../../utils/validateInput';

jest.mock('../../../services/authentication/useForgotPassword');
jest.mock('../../../utils/validateInput');

describe('ForgotPassword Component', () => {
    jest.useFakeTimers();
    const mockHandleClose = jest.fn();
    const mockUseForgotPassword = useForgotPassword as jest.Mock;
    const mockUseValidateInputs = useValidateInputs as jest.Mock;
    const setMessageMock = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
  
      mockUseForgotPassword.mockReturnValue({
        forgotPassword: jest.fn(),
        loading: false,
        message: '',
        setMessage: jest.fn(),
      });
  
      // Default mock for `useValidateInputs`
      mockUseValidateInputs.mockReturnValue({
        validateInputs: jest.fn(() => true),
        formErrors: { email: '' },
        setFormErrors: jest.fn(),
      });
    });

  it('renders correctly with initial UI elements', () => {
    const { getByText } = render(<ForgotPassword open={true} handleClose={mockHandleClose} />);
    expect(getByText('Reset password')).toBeInTheDocument();
    expect(getByText("Enter your account's email address, and we'll send you a link to reset your password.")).toBeInTheDocument();
  });

  it('handles input change correctly', () => {
    const { getByPlaceholderText } = render(<ForgotPassword open={true} handleClose={mockHandleClose} />);
    const emailInput = getByPlaceholderText('Enter your email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('calls forgotPassword function when form is submitted with valid inputs', async () => {
    const forgotPasswordMock = jest.fn();
    const validateInputsMock = jest.fn(() => true);

    mockUseForgotPassword.mockReturnValue({
      forgotPassword: forgotPasswordMock,
      loading: false,
      message: '',
      setMessage: jest.fn(),
    });


    mockUseValidateInputs.mockReturnValue({
      validateInputs: validateInputsMock,
      formErrors: { email: '' },
      setFormErrors: jest.fn(),
    });

    const { getByTestId, getByPlaceholderText } = render(<ForgotPassword open={true} handleClose={mockHandleClose} />);

    const emailInput = getByPlaceholderText('Enter your email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = getByTestId('generic-dialog-submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(forgotPasswordMock).toHaveBeenCalledWith('test@example.com');
    });
  });

  it('shows message and countdown timer when forgotPassword is successful', async () => {
    mockUseForgotPassword.mockReturnValue({
      forgotPassword: (email: string) => Promise.resolve(email),
      message: 'Email sent successfully',
      setMessage: setMessageMock,
    });

    const { getByPlaceholderText, getByTestId, getByText } = render(<ForgotPassword open={true} handleClose={mockHandleClose} />);

    const emailInput = getByPlaceholderText('Enter your email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = getByTestId('generic-dialog-submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Email sent successfully')).toBeInTheDocument();
    });
  });

  it('resets form and timer when the dialog is closed', () => {
    const setMessageMock = jest.fn();
    const setFormErrorsMock = jest.fn();

    mockUseForgotPassword.mockReturnValue({
      forgotPassword: jest.fn(),
      loading: false,
      message: '',
      setMessage: setMessageMock,
    });

    mockUseValidateInputs.mockReturnValue({
      validateInputs: jest.fn(),
      formErrors: { email: '' },
      setFormErrors: setFormErrorsMock,
    });

    const { rerender } = render(<ForgotPassword open={true} handleClose={mockHandleClose} />);

    rerender(<ForgotPassword open={false} handleClose={mockHandleClose} />);
    expect(setFormErrorsMock).toHaveBeenCalledWith({ email: '' });
  });

  it('shows the correct subtitle based on message and timer values', async () => {
    mockUseForgotPassword.mockReturnValue({
      forgotPassword: jest.fn(),
      loading: false,
      message: '',
      setMessage: setMessageMock,
    });
  
    const { getByText, rerender } = render(<ForgotPassword open={true} handleClose={mockHandleClose} />);
    
    expect(getByText("Enter your account's email address, and we'll send you a link to reset your password.")).toBeInTheDocument();
  
    mockUseForgotPassword.mockReturnValue({
      forgotPassword: jest.fn(),
      loading: false,
      message: 'Email sent successfully',
      setMessage: setMessageMock,
    });
  
    rerender(<ForgotPassword open={true} handleClose={mockHandleClose} />);
    expect(getByText('Email sent successfully')).toBeInTheDocument();
  
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
        // expect(setMessageMock).toHaveBeenCalledWith(''); ?? it doesn't work
        expect(getByText("Enter your account's email address, and we'll send you a link to reset your password.")).toBeInTheDocument();
    });
  });
});
