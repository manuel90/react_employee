import { render, screen } from "@testing-library/react";

//Components
import InlineLoader from "@/components/atoms/InlineLoader";

describe('Greeting Component', () => {
  it('renders an InlineLoader component', () => {
    render(<InlineLoader />);
    
		const p = screen.queryByTestId('p-loading');
    
		expect(p).toBeInTheDocument();
  });
});
