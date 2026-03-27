import { render, screen } from '@/test/test-utils';
import { Stack } from './stack';

describe('Stack Section', () => {
  it('should render the main section title with the Cpu icon', async () => {
    const ResolvedComponent = await Stack();
    render(ResolvedComponent);

    const table = screen.getByRole('heading', { name: 'Engineering Stack' });
    expect(table).toBeInTheDocument();

    const icon = table.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('should render exactly 8 technology cards', async () => {
    const ResolvedComponent = await Stack();
    const { container } = render(ResolvedComponent);

    const cards = container.querySelectorAll('.rounded-xl.bg-background');
    expect(cards).toHaveLength(8);
  });

  it('should render the correct titles and descriptions for each tech', async () => {
    const ResolvedComponent = await Stack();
    render(ResolvedComponent);

    expect(screen.getByText('Next.js 15')).toBeInTheDocument();
    expect(screen.getByText('Prisma Postgres')).toBeInTheDocument();
    expect(screen.getByText('Storybook')).toBeInTheDocument();

    expect(
      screen.getByText(/React 19, Turbopack, App Router/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Type-safe Database Management/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Component Isolation & Docs/i)).toBeInTheDocument();
  });
});
