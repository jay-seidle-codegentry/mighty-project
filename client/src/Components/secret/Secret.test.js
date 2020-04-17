import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom";

import Secret from './Secret';

it('Secret Component is loading', () => {
    const { getByText, getByTestId, container } = render(<Secret />);
    expect(container).toBeTruthy();
});

it('Secret has message', () => {
    const { getByText, getByTestId, container } = render(<Secret />);
    expect(getByText('This is REALLY SECRET stuff.')).toBeTruthy();
});
