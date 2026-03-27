import { render, screen } from '@/test/test-utils';
import { Main } from './main';

describe('Main (Hero Section)', () => {
  it('should render the main title "Coffee Stock"', async () => {
    const ResolvedComponent = await Main();
    render(ResolvedComponent);

    expect(screen.getByText('Coffee Stock')).toBeInTheDocument();
  });

  it('should render the rich text subtitle correctly', async () => {
    const ResolvedComponent = await Main();
    const { container } = render(ResolvedComponent);

    expect(screen.getByText(/Clean Architecture/i)).toBeInTheDocument();

    const strongTags = container.querySelectorAll('strong');
    expect(strongTags.length).toBeGreaterThan(0);

    expect(screen.getByText('Clean Architecture').tagName).toBe('STRONG');
  });

  it('should render the "Get Started" link pointing to /login', async () => {
    const ResolvedComponent = await Main();
    render(ResolvedComponent);

    const loginLink = screen.getByRole('link', { name: /get started/i });

    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('should render the GitHub link with correct external URL', async () => {
    const ResolvedComponent = await Main();
    render(ResolvedComponent);

    const githubLink = screen.getByRole('link', { name: /github/i });

    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/mateuscdomingos/nextjs-clean-architecture-ddd',
    );
  });
});
