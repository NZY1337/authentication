import '@testing-library/jest-dom'; 
import { render, fireEvent } from '@testing-library/react';
import AccountValidation from './AccountValidation';
import { useValidateAccount } from '../../../services/authentication/useValidateAccount';
import useQueryParams from '../../../helpers/hooks/useLocation';
import { MemoryRouter } from 'react-router-dom';  // Used for testing RouterLink

jest.mock('../../../services/authentication/useValidateAccount');
jest.mock('../../../helpers/hooks/useLocation');

describe('AccountValidation Component', () => {
  const mockUseValidateAccount = useValidateAccount as jest.Mock;
  const mockUseQueryParams = useQueryParams as jest.Mock;
  mockUseQueryParams.mockReturnValue({ getParam: jest.fn().mockReturnValue('') });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial UI elements', () => {
    mockUseValidateAccount.mockReturnValue({
      message: '',
      error: '',
      loading: false,
    });

    const { getByText, getByRole } = render(
      <MemoryRouter>
        <AccountValidation />
      </MemoryRouter>
    );

    expect(getByText('Return to Homepage')).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute('href', '/');
  });

  it('shows loading spinner when loading is true', () => {
    mockUseValidateAccount.mockReturnValue({
      message: '',
      error: '',
      loading: true,
    });

    const { getByRole } = render(
      <MemoryRouter>
        <AccountValidation />
      </MemoryRouter>
    );

    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error message when error is present', () => {
    const errorMessage = 'Invalid verification token';

    mockUseValidateAccount.mockReturnValue({
      message: '',
      error: errorMessage,
      loading: false,
    });

    const { getByText } = render(
      <MemoryRouter>
        <AccountValidation />
      </MemoryRouter>
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  it('shows success message when message is present', () => {
    const successMessage = 'Account validated successfully';

    mockUseValidateAccount.mockReturnValue({
      message: successMessage,
      error: '',
      loading: false,
    });

    const { getByText } = render(
      <MemoryRouter>
        <AccountValidation />
      </MemoryRouter>
    );

    expect(getByText(successMessage)).toBeInTheDocument();
  });

  it('navigates to the homepage when "Return to Homepage" button is clicked', () => {
    mockUseValidateAccount.mockReturnValue({
      message: '',
      error: '',
      loading: false,
    });

    const { getByText } = render(
      <MemoryRouter>
        <AccountValidation />
      </MemoryRouter>
    );

    const button = getByText('Return to Homepage');
    fireEvent.click(button);

    expect(window.location.pathname).toBe('/');
  });
});
