import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom";

import NotFound from './NotFound';

it('NotFound Component is loading', () => {
    const { getByText, getByTestId, container } = render(<NotFound />);
    expect(container).toBeTruthy();
});

it('NotFound has message', () => {
    const { getByText, getByTestId, container } = render(<NotFound />);
    expect(getByText('Hold on there buddy, what you looking for?')).toBeTruthy();
});
