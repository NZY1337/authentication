import '@testing-library/jest-dom'; // Added import for jest-dom
import { render, fireEvent, waitFor } from "@testing-library/react";
import Register from "./Register";
import { useAppContext } from "../../../context/AppContext";
import useValidateInputs from '../../../utils/validateInput';

import { BrowserRouter } from "react-router-dom";

// Mock the AppContext
jest.mock("../../../context/AppContext", () => ({
  useAppContext: jest.fn()
}));

jest.mock('../../../utils/validateInput');


describe("Register Component", () => {
    const mockUseAppContext = useAppContext as jest.Mock;
    const mockUseValidateInputs = useValidateInputs as jest.Mock;
    const mockRegisterUser = jest.fn(); 
    const mockSetError = jest.fn();

    beforeEach(() => {
        mockUseAppContext.mockReturnValue({
            registerUser: mockRegisterUser,
            error: '',
            loading: false,
            setError: mockSetError,
        });

        mockUseValidateInputs.mockReturnValue({
            validateInputs: jest.fn(() => true),
            formErrors: { 
                email: 'please enter a valid email address',
                name: 'name is required',
                password: 'The password must include at least one of the following symbols'
            },
            setFormErrors: jest.fn(),
        });
    });

    const renderComponent = () => {
        return render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
        );
    };

  test("renders form fields correctly", () => {
    const { getByLabelText } = renderComponent();
    expect(getByLabelText(/full name/i)).toBeInTheDocument();
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/^password$/i, { exact: true })).toBeInTheDocument();
    expect(getByLabelText(/^repeat password$/i, { exact: true })).toBeInTheDocument();
  });
  
  test("displays validation errors on empty submit", async () => {
    const { getByText, getByRole } = renderComponent();
    fireEvent.submit(getByRole("button", { name: /register/i }));
    
    expect(getByText(/name is required/i)).toBeInTheDocument();
    expect(getByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(getByText(/The password must include at least one of the following symbols/i)).toBeInTheDocument();
  });

  test("do not call registerUser if form is invalid", async () => {
    const { getByLabelText, getByRole, getByText } = renderComponent();

    mockUseValidateInputs.mockReturnValue({
        validateInputs: jest.fn(() => false),
        formErrors: { 
            email: 'please enter a valid email address',
            name: 'name is required',
            password: 'Passwords do not match.'
        },
        setFormErrors: jest.fn(),
    });

    fireEvent.change(getByLabelText(/full name/i), { target: { value: "John Doe" } });
    fireEvent.change(getByLabelText(/email/i), { target: { value: "john@example.com" } });
    fireEvent.change(getByLabelText(/^password$/i, { exact: true }), { target: { value: "password123" } });
    fireEvent.change(getByLabelText(/^repeat password$/i, { exact: true }), { target: { value: "password1231" } });
    
    fireEvent.submit(getByRole("button", { name: /register/i }));

    expect(getByText(/passwords do not match/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockRegisterUser).not.toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        password: "password123"
      });
    });
  });

  test("call registerUser if form is valid", async () => {
    const { getByLabelText, getByRole } = renderComponent();

    mockUseValidateInputs.mockReturnValue({
        validateInputs: jest.fn(() => true),
        formErrors: { 
            email: 'please enter a valid email address',
            name: 'name is required',
            password: 'Passwords do not match.'
        },
        setFormErrors: jest.fn(),
    });

    fireEvent.change(getByLabelText(/full name/i), { target: { value: "John Doe" } });
    fireEvent.change(getByLabelText(/email/i), { target: { value: "john@example.com" } });
    fireEvent.change(getByLabelText(/^password$/i, { exact: true }), { target: { value: "Password123&" } });
    fireEvent.change(getByLabelText(/^repeat password$/i, { exact: true }), { target: { value: "Password123&" } });
    
    fireEvent.submit(getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        password: "Password123&"
      });
    });
  });

  test("shows loading indicator when loading is true", () => {
    mockUseAppContext.mockReturnValue({ loading: true });
    const { getByRole } = renderComponent();
    expect(getByRole("progressbar")).toBeInTheDocument();
  });

  test("displays error message when error occurs", () => {
    const { getByText } = renderComponent();
    mockUseAppContext.mockReturnValue({ error: "User already exist", loading: false, setError: mockSetError, registerUser: mockRegisterUser });
    renderComponent();
    expect(getByText(/User already exist/i)).toBeInTheDocument();
  });

  test("clears error message when navigating to login", () => {
    const { getByText } = renderComponent();
    fireEvent.click(getByText(/log in/i));
    expect(mockSetError).toHaveBeenCalledWith("");
  });
});

