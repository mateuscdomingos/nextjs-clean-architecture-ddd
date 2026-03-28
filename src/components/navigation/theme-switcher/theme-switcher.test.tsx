import { render, screen } from '@/test/test-utils';
import { ThemeSwitcher } from '../theme-switcher';
import userEvent from '@testing-library/user-event';
import { useTheme } from 'next-themes';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeSwitcher Component', () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    });
  });

  it('should render the theme toggle button with correct accessible label', () => {
    render(<ThemeSwitcher />);

    const button = screen.getByRole('button', {
      name: /toggle theme/i,
    });
    expect(button).toBeInTheDocument();
  });

  it('should highlight the currently active theme (light)', async () => {
    const user = userEvent.setup();
    render(<ThemeSwitcher />);

    const button = screen.getByRole('button');
    await user.click(button);

    const lightOption = screen.getByText('Claro');
    expect(lightOption.closest('div')).toHaveClass('bg-accent', 'font-bold');
  });

  it('should highlight the currently active theme (dark)', async () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    });

    const user = userEvent.setup();
    render(<ThemeSwitcher />);

    const button = screen.getByRole('button');
    await user.click(button);

    const darkOption = screen.getByText('Escuro');
    expect(darkOption.closest('div')).toHaveClass('bg-accent', 'font-bold');
  });

  it('should call setTheme with "dark" when the dark option is selected', async () => {
    const user = userEvent.setup();
    render(<ThemeSwitcher />);

    const button = screen.getByRole('button');
    await user.click(button);

    const darkOption = screen.getByText('Escuro');
    await user.click(darkOption);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
  });

  it('should call setTheme with "system" when the system option is selected', async () => {
    const user = userEvent.setup();
    render(<ThemeSwitcher />);

    const button = screen.getByRole('button');
    await user.click(button);

    const systemOption = screen.getByText('Sistema');
    await user.click(systemOption);

    expect(mockSetTheme).toHaveBeenCalledWith('system');
  });
});
