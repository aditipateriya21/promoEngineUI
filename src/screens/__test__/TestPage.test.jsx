import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestPage from '../TestPage';
import { analyzeOrder } from '../../services/orderApi';
import { useNavigate } from 'react-router-dom';

jest.mock('../../services/orderApi', () => ({
    analyzeOrder: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('TestPage', () => {
    const mockNavigate = jest.fn();
    const mockAnalyzeOrder = analyzeOrder;

    beforeEach(() => {
        jest.clearAllMocks();
        useNavigate.mockReturnValue(mockNavigate);
    });

    test('renders TestForm and handles order analysis', async () => {
        const mockOrderId = '12345';
        const mockAnalysisData = {
            appliedRules: [
                {
                    rule: {
                        id: 'rule-1',
                        name: 'Rule One',
                        priority: 2, 
                        status: 'Active'
                    }
                }
            ]
        };

        mockAnalyzeOrder.mockResolvedValue({ data: mockAnalysisData });

        render(<TestPage />);

        await waitFor(() => {
            expect(screen.getByText(/Order Explainer/i)).toBeInTheDocument();
        });

        fireEvent.change(screen.getByLabelText(/Order ID/i), { target: { value: mockOrderId } });
        fireEvent.click(screen.getByRole('button', { name: /Analyze Order/i }));

        await waitFor(() => {
            expect(mockAnalyzeOrder).toHaveBeenCalledWith(mockOrderId);
        });

        await waitFor(() => {
            expect(screen.getByText(/Rule One/i)).toBeInTheDocument();
            expect(screen.getByText(/2/i)).toBeInTheDocument(); // Updated priority
            expect(screen.getByText(/Active/i)).toBeInTheDocument();
        });
    });

    test('handles error during analysis', async () => {
        const mockOrderId = '12345';

        mockAnalyzeOrder.mockRejectedValue(new Error('Failed to fetch order analysis'));

        render(<TestPage />);

        fireEvent.change(screen.getByLabelText(/Order ID/i), { target: { value: mockOrderId } });
        fireEvent.click(screen.getByRole('button', { name: /Analyze Order/i }));

        await waitFor(() => {
            expect(screen.getByText(/Order Id does not exist/i)).toBeInTheDocument();
        });
    });

    test('navigates to home page when clicking "Back to Home"', () => {
        render(<TestPage />);

        fireEvent.click(screen.getByRole('button', { name: /Back to Home/i }));

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
