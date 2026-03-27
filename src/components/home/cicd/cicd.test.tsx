import { render, screen } from '@/test/test-utils';
import { CICD } from './cicd';

describe('CICD Section', () => {
  it('should render the main title and description', async () => {
    const ResolvedComponent = await CICD();
    render(ResolvedComponent);

    expect(screen.getByText('CI/CD Pipeline')).toBeInTheDocument();
    expect(
      screen.getByText(/A robust automation workflow using GitHub Actions/i),
    ).toBeInTheDocument();
  });

  it('should render all 5 pipeline steps with correct titles and descriptions', async () => {
    const ResolvedComponent = await CICD();
    render(ResolvedComponent);

    const steps = ['setup', 'qa', 'testing', 'build', 'deploy'];

    expect(screen.getByText('Setup & Cache')).toBeInTheDocument();
    expect(screen.getByText('Quality Assurance')).toBeInTheDocument();
    expect(screen.getByText('Automated Testing')).toBeInTheDocument();
    expect(screen.getByText('Production Build')).toBeInTheDocument();
    expect(screen.getByText('Vercel Deployment')).toBeInTheDocument();

    expect(
      screen.getByText(/Pre-built strategy: what passes in the CI/i),
    ).toBeInTheDocument();
  });

  it('should render the correct icons for each step', async () => {
    const ResolvedComponent = await CICD();
    const { container } = render(ResolvedComponent);

    const icons = container.querySelectorAll('svg');
    expect(icons).toHaveLength(5);
  });
});
