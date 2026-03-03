import { render, screen } from '@/test/test-utils';
import { UserMenu } from '../user-menu';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import userEvent from '@testing-library/user-event';
import React from 'react';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

jest.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="avatar">{children}</div>
  ),
  AvatarImage: ({ src, alt }: { src?: string; alt?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="fallback">{children}</div>
  ),
}));

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('UserMenu Component', () => {
  const mockUser = {
    id: 'user-1',
    name: 'Mateus Domingos',
    email: 'mateus@test.com',
    image: 'https://avatars.githubusercontent.com/u/29188043',
  };

  const mockT = (key: string) => `translated_${key}`;

  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslations as jest.Mock).mockReturnValue(mockT);
  });

  it('should render the user avatar with the correct alt text', async () => {
    render(<UserMenu user={mockUser} />);

    const avatarImage = await screen.findByAltText(mockUser.name);
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', mockUser.image);
  });

  it('should render the fallback when no image is provided', () => {
    const userWithoutImage = { ...mockUser, image: null };
    render(<UserMenu user={userWithoutImage} />);

    expect(screen.getByText('M')).toBeInTheDocument();
  });

  it('should open the menu and display user information', async () => {
    const user = userEvent.setup();
    render(<UserMenu user={mockUser} />);

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it('should call signOut when the exit item is clicked', async () => {
    const user = userEvent.setup();
    render(<UserMenu user={mockUser} />);

    await user.click(screen.getByRole('button'));

    const logoutItem = screen.getByText('translated_exit');
    await user.click(logoutItem);

    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
