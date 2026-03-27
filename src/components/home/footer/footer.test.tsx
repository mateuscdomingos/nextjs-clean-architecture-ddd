import { render, screen } from '@/test/test-utils';
import { Footer } from './footer';

describe('Footer Component', () => {
  it('should render the "about" text from translations', async () => {
    const ResolvedComponent = await Footer();
    render(ResolvedComponent);

    expect(
      screen.getByText(/I am a Software Engineer focused on high-performance/i),
    ).toBeInTheDocument();
  });

  it('should render the correct social media links', async () => {
    const ResolvedComponent = await Footer();
    render(ResolvedComponent);

    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const githubLink = screen.getByRole('link', { name: /github/i });

    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/mateus-cd',
    );

    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/mateuscdomingos',
    );
  });

  it('should display the copyright notice with the correct year', async () => {
    const ResolvedComponent = await Footer();
    render(ResolvedComponent);

    expect(
      screen.getByText(/© 2026 NEXTJS-CLEAN-ARCHITECTURE-DDD/i),
    ).toBeInTheDocument();
  });
});
