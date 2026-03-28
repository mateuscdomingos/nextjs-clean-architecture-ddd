import { render, screen } from '@/test/test-utils';
import { Header } from '../header';
import { auth } from '@/auth';

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

jest.mock('../user-menu', () => ({
  UserMenu: ({ user }: { user: { name: string } }) => (
    <div data-testid="user-menu">{user.name}</div>
  ),
}));

jest.mock('../mobile-nav', () => ({
  MobileNav: ({ isAuthenticated }: { isAuthenticated: boolean }) => (
    <div data-testid="mobile-nav">MobileNav - {isAuthenticated.toString()}</div>
  ),
}));

jest.mock('../language-switcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher" />,
}));

jest.mock('../theme-switcher', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher" />,
}));

describe('Header Component', () => {
  describe('When user is unauthenticated', () => {
    beforeEach(() => {
      (auth as jest.Mock).mockResolvedValue(null);
    });

    it('should render the logo and landing links', async () => {
      const ResolvedHeader = await Header();
      render(ResolvedHeader);

      expect(screen.getByText('CoffeeStock')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute(
        'href',
        '/login',
      );
      expect(
        screen.getByRole('link', {
          name: 'Create Account',
        }),
      ).toHaveAttribute('href', '/register');
    });

    it('should pass isAuthenticated as false to MobileNav', async () => {
      const ResolvedHeader = await Header();
      render(ResolvedHeader);

      expect(screen.getByTestId('mobile-nav')).toHaveTextContent('false');
    });

    it('should not render UserMenu or myStores link', async () => {
      const ResolvedHeader = await Header();
      render(ResolvedHeader);

      expect(screen.queryByTestId('user-menu')).not.toBeInTheDocument();
      expect(screen.queryByText('My Stores')).not.toBeInTheDocument();
    });
  });

  describe('When user is authenticated', () => {
    const mockUser = {
      id: 'user-123',
      name: 'Mateus Domingos',
      email: 'mateus@test.com',
    };

    beforeEach(() => {
      (auth as jest.Mock).mockResolvedValue({ user: mockUser });
    });

    it('should render myStores link and UserMenu', async () => {
      const ResolvedHeader = await Header();
      render(ResolvedHeader);

      expect(screen.getByRole('link', { name: 'My Stores' })).toHaveAttribute(
        'href',
        '/stores',
      );
      expect(screen.getByTestId('user-menu')).toHaveTextContent(
        'Mateus Domingos',
      );
    });

    it('should pass isAuthenticated as true to MobileNav', async () => {
      const ResolvedHeader = await Header();
      render(ResolvedHeader);

      expect(screen.getByTestId('mobile-nav')).toHaveTextContent('true');
    });

    it('should not render login or register links', async () => {
      const ResolvedHeader = await Header();
      render(ResolvedHeader);

      expect(
        screen.queryByText('components.navigation.login'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('components.navigation.createAccount'),
      ).not.toBeInTheDocument();
    });
  });

  it('should always render the LanguageSwitcher on desktop', async () => {
    (auth as jest.Mock).mockResolvedValue(null);
    const ResolvedHeader = await Header();
    render(ResolvedHeader);

    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });

  it('should always render the ThemeSwitcher on desktop', async () => {
    (auth as jest.Mock).mockResolvedValue(null);
    const ResolvedHeader = await Header();
    render(ResolvedHeader);

    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
  });
});
