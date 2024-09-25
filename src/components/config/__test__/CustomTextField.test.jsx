import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import CustomTextField from '../CustomTextField'; 

describe('CustomTextField Component', () => {
  test('renders with the correct label', () => {
    render(<CustomTextField label="Username" name="username" value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  test('renders with the correct value', () => {
    render(<CustomTextField label="Username" name="username" value="JohnDoe" onChange={() => {}} />);
    expect(screen.getByDisplayValue(/johndoe/i)).toBeInTheDocument();
  });

  test('calls onChange handler when value is changed', () => {
    const handleChange = jest.fn();
    render(<CustomTextField label="Username" name="username" value="" onChange={handleChange} />);
    const input = screen.getByLabelText(/username/i);
    fireEvent.change(input, { target: { value: 'NewValue' } });
    expect(handleChange).toHaveBeenCalled();
  });

  test('renders with the correct input type', () => {
    render(<CustomTextField label="Password" name="password" value="" onChange={() => {}} type="password" />);
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password');
  });

  test('renders additional props correctly', () => {
    render(<CustomTextField label="Email" name="email" value="" onChange={() => {}} placeholder="Enter your email" />);
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
  });
});
