import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfigPage from '../ConfigPage';
import { createPromotionRule } from '../../services/promotionApi';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../services/promotionApi', () => ({
    createPromotionRule: jest.fn()
}));

jest.mock('../../components/config/SingleRuleForm', () => ({
    __esModule: true,
    default: ({ onSave, onBack }) => (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSave({ name: 'Test Rule', conditions: { key: 'value' }, actions: {}, priority: 1, status: 'active' });
            }}>
                <button type="submit" data-testid="save-rule-button">Save Rule</button>
            </form>
            <button onClick={onBack} data-testid="single-rule-back-button">Back</button>
        </div>
    ),
}));



jest.mock('../../components/config/NotificationBanner', () => ({
    __esModule: true,
    default: ({ notification, onDismiss }) => (
        notification ? (
            <div>
                <div role="alert">
                    <span>{notification.message}</span>
                    <button onClick={onDismiss} data-testid="dismiss-notification">Dismiss</button>
                </div>
            </div>
        ) : null
    ),
}));

// Mock the useNavigate hook
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('ConfigPage', () => {
    beforeEach(() => {
        // Reset the mocks before each test
        jest.clearAllMocks();
    });

    test('should handle single rule save and show success notification', async () => {
        createPromotionRule.mockResolvedValue({});

        render(
            <MemoryRouter>
                <ConfigPage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByTestId('save-rule-button'));

        await waitFor(() => {
            expect(createPromotionRule).toHaveBeenCalledWith({
                name: 'Test Rule',
                conditions: { key: 'value' },
                actions: {},
                priority: 1,
                status: 'active'
            });
        });

        expect(screen.getByText('Single rule saved successfully!')).toBeInTheDocument();
    });

    test('should handle single rule save failure and show error notification', async () => {
        createPromotionRule.mockRejectedValue(new Error('Failed to save the rule'));

        render(
            <MemoryRouter>
                <ConfigPage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByTestId('save-rule-button'));

        await waitFor(() => {
            expect(createPromotionRule).toHaveBeenCalledWith({
                name: 'Test Rule',
                conditions: { key: 'value' },
                actions: {},
                priority: 1,
                status: 'active'
            });
        });

        expect(screen.getByText('Failed to save the single rule')).toBeInTheDocument();
    });

  
    test('should navigate to home page when Single Rule Back button is clicked', () => {
        render(
            <MemoryRouter>
                <ConfigPage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByTestId('single-rule-back-button'));

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    
});
