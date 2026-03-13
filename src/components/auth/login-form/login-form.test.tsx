import { LoginForm } from './login-form';
import { render, screen, waitFor } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import React from 'react';

jest.mock('@/app/actions/auth-actions', () => ({
  handleLogin: jest.fn(),
}));

import { handleLogin } from '@/app/actions/auth-actions';

describe('LoginForm', () => {
  it('should render all input fields with translated labels', () => {
    render(<LoginForm />);

    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('should render rich text link correctly', () => {
    render(<LoginForm />);

    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'Sign up' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/register');
  });

  describe('when fields are empty', () => {
    it('should render validation errors', async () => {
      render(<LoginForm />);

      const loginButton = screen.getByRole('button', {
        name: 'Login',
      });
      await userEvent.click(loginButton);

      await waitFor(() => {
        const emailInput = screen.getByRole('textbox', { name: 'Email' });
        expect(emailInput).toBeInvalid();
        expect(screen.getByText('Invalid email')).toBeInTheDocument();

        const passwordInput = screen.getByLabelText('Password');
        expect(passwordInput).toBeInvalid();
        expect(
          screen.getByText('Must be at least 8 characters long'),
        ).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(handleLogin).not.toHaveBeenCalled();
      });
    });
  });

  it('should display a generic error message returned by the action', () => {
    jest
      .spyOn(React, 'useActionState')
      .mockReturnValue([
        { error: { generic: 'invalidCredentials' } },
        jest.fn(),
        false,
      ]);

    render(<LoginForm />);

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials');
  });

  it('should disable the button while the action is pending', () => {
    jest
      .spyOn(React, 'useActionState')
      .mockReturnValue([undefined, jest.fn(), true]);

    render(<LoginForm />);

    const loginButton = screen.getByRole('button', {
      name: 'Loading Login',
    });
    expect(loginButton).toBeDisabled();
  });

  describe('behavior', () => {
    it('should call handleRegister with form data when submitted', async () => {
      render(<LoginForm />);

      await userEvent.type(
        screen.getByRole('textbox', { name: 'Email' }),
        'mateus@example.com',
      );
      await userEvent.type(screen.getByLabelText('Password'), 'password123');

      const loginButton = screen.getByRole('button', {
        name: 'Login',
      });

      await userEvent.click(loginButton);

      await waitFor(() => {
        expect(handleLogin).toHaveBeenCalled();
      });

      const [prevState, formData] = (handleLogin as jest.Mock).mock.calls[0];

      expect(prevState).toBeUndefined();
      expect(formData.get('email')).toBe('mateus@example.com');
      expect(formData.get('password')).toBe('password123');
    });
  });
});
