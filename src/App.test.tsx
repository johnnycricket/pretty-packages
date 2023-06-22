/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react Header', () => {
  render(<App />);
  const hTwoElement = screen.getByText(/Pretty Package/gi);
  expect(hTwoElement).toBeTruthy();
});
