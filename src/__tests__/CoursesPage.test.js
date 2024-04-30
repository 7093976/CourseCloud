import {render,screen} from '@testing-library/react'
import CoursesPage from '../pages/CoursesPage';

test("Render Home Page component",() => {
    render(<CoursesPage />);
})
