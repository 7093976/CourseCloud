import {render,screen} from '@testing-library/react'
import Footer from '../components/Footer';

test("Render Home Page component",() => {
    render(<Footer />);
    const foot1 = screen.getByText(/© 2024 lms company\. all rights reserved\./i)
    expect(foot1).toBeInTheDocument();
})