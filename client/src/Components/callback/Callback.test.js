import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom";

import CallBack from './Callback';

it('Callback Component is loading', () => {
    const { getByText, getByTestId, container } = render(<CallBack />);
    expect(container).toBeTruthy();
});

it('Callback has message', () => {
    const { getByText, getByTestId, container } = render(<CallBack />);
    expect(getByText('Loading...')).toBeTruthy();
});
