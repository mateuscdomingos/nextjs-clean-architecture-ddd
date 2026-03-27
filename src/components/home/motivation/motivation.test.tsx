import { render, screen } from '@/test/test-utils';
import { Motivation } from './motivation';

describe('Motivation Section', () => {
  it('should render the motivation title from translations', async () => {
    const ResolvedComponent = await Motivation();
    render(ResolvedComponent);

    expect(screen.getByText('Motivation & Study Goals')).toBeInTheDocument();

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Motivation & Study Goals');
  });

  it('should render the full description text', async () => {
    const ResolvedComponent = await Motivation();
    render(ResolvedComponent);

    expect(
      screen.getByText(
        /This project started as a deep dive into decoupled software design/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/logic \(Core\) remains agnostic of the framework/i),
    ).toBeInTheDocument();
  });
});
