import { render, screen } from '@/test/test-utils';
import { Architecture } from './architecture';

describe('Architecture', () => {
  it('should render the architecture section with correct translations', async () => {
    const ResolvedComponent = await Architecture();
    render(ResolvedComponent);

    expect(screen.getByText('Clean Architecture Folders')).toBeInTheDocument();

    expect(
      screen.getByText('// Next.js App Router (UI/Framework)'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('// THE BRAIN (Zero Dependencies)'),
    ).toBeInTheDocument();
    expect(screen.getByText('// Pure Business Logic')).toBeInTheDocument();

    expect(
      screen.getByText(/The heart. Agnostic to any database/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Implementation details. Prisma, External Services/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Cross-cutting concerns like Shadcn UI config/i),
    ).toBeInTheDocument();
  });

  it('should render the numbered indicators for highlights', async () => {
    const ResolvedComponent = await Architecture();
    render(ResolvedComponent);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
