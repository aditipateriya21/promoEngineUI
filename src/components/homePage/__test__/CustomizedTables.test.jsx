import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomizedTables from './../CustomizedTables';
import { MemoryRouter } from 'react-router-dom';

const mockRules = [
  {
    id: 1,
    name: 'Rule 1',
    conditions: { minOrderValue: 50 },
    priority: 1,
    status: 'active',
  },
  {
    id: 2,
    name: 'Rule 2',
    conditions: { season: 'Winter' },
    priority: 2,
    status: 'inactive',
  },
];

const handleDelete = jest.fn();

describe('CustomizedTables', () => {
  test('renders table with data', () => {
    render(
      <MemoryRouter>
        <CustomizedTables rules={mockRules} handleDelete={handleDelete} />
      </MemoryRouter>
    );

    expect(screen.getByText(/id/i)).toBeInTheDocument();
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/conditions/i)).toBeInTheDocument();
    expect(screen.getByText(/priority/i)).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toBeInTheDocument();
    expect(screen.getByText(/actions/i)).toBeInTheDocument();

    expect(screen.getByText(/Rule 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Rule 2/i)).toBeInTheDocument();
  });

  test('selects and deselects rows correctly', () => {
    render(
      <MemoryRouter>
        <CustomizedTables rules={mockRules} handleDelete={handleDelete} />
      </MemoryRouter>
    );

    const checkboxes = screen.getAllByRole('checkbox');
    const selectAllCheckbox = checkboxes[0]; // Assuming the first checkbox is for select all

    fireEvent.click(selectAllCheckbox);
    expect(checkboxes[1]).toBeChecked(); // First row checkbox
    expect(checkboxes[2]).toBeChecked(); // Second row checkbox

    fireEvent.click(selectAllCheckbox);
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  test('handles delete selected items', () => {
    render(
      <MemoryRouter>
        <CustomizedTables rules={mockRules} handleDelete={handleDelete} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByRole('checkbox')[1]); // First row checkbox

    fireEvent.click(screen.getByRole('button', { name: /Delete Selected/i }));
    expect(handleDelete).toHaveBeenCalledWith(1); // Only one row selected
  });

  test('handles individual row delete', () => {
    render(
      <MemoryRouter>
        <CustomizedTables rules={mockRules} handleDelete={handleDelete} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByRole('button', { name: /Delete/i })[0]);
    expect(handleDelete).toHaveBeenCalledWith(1); // First row id
  });
});
