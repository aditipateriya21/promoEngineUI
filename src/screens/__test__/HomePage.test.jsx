// import React from 'react';
// import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import HomePage from '../HomePage';
// import * as promotionApi from '../../services/promotionApi'; // Adjust the import path as necessary
// import NotificationBanner from '../../components/config/NotificationBanner';
// import CustomizedTables from '../../components/homePage/CustomizedTables';
// import '@testing-library/jest-dom';


// // Mock the imported components and API calls
// jest.mock('../../components/config/NotificationBanner', () => {
//     return jest.fn(() => <div data-testid="notification-banner" />);
// });

// jest.mock('../../components/homePage/CustomizedTables', () => {
//     return jest.fn(() => <div data-testid="customized-tables" />);
// });

// describe('HomePage', () => {
//     beforeEach(() => {
//         jest.clearAllMocks(); // Clear mocks before each test
//     });

//     test('renders without crashing', () => {
//         render(<HomePage />);
//         expect(screen.getByTestId('notification-banner')).toBeInTheDocument();
//         expect(screen.getByTestId('customized-tables')).toBeInTheDocument();
//     });

//     test('fetches and displays promotion rules on mount', async () => {
//         const mockRules = [
//             { id: '1', name: 'Test Rule 1', conditions: {}, priority: 1, status: 'active' },
//             { id: '2', name: 'Test Rule 2', conditions: {}, priority: 2, status: 'inactive' },
//         ];

//         // Mock the fetchPromotionRules API call
//         jest.spyOn(promotionApi, 'fetchPromotionRules').mockResolvedValue({ data: mockRules });

//         render(<HomePage />);

//         await waitFor(() => {
//             expect(promotionApi.fetchPromotionRules).toHaveBeenCalled();
//             expect(screen.getByTestId('customized-tables')).toBeInTheDocument(); // Check if the table renders with data
//         });
//     });

//     test('handles deletion of a promotion rule', async () => {
//         const mockRules = [{ id: '1', name: 'Test Rule 1', conditions: {}, priority: 1, status: 'active' }];

//         jest.spyOn(promotionApi, 'fetchPromotionRules').mockResolvedValueOnce({ data: mockRules });
//         jest.spyOn(promotionApi, 'deletePromotionRule').mockResolvedValue();

//         render(<HomePage />);

//         await waitFor(() => expect(promotionApi.fetchPromotionRules).toHaveBeenCalled());

//         // Simulate a delete action
//         const handleDelete = jest.fn();
//         CustomizedTables.mockImplementation(({ handleDelete: _handleDelete }) => {
//             handleDelete = _handleDelete;
//             return (
//                 <div>
//                     <button onClick={() => handleDelete('1')}>Delete</button>
//                 </div>
//             );
//         });

//         fireEvent.click(screen.getByText(/Delete/i));

//         await waitFor(() => {
//             expect(promotionApi.deletePromotionRule).toHaveBeenCalledWith('1');
//         });

//         // Verify notification after deletion
//         await waitFor(() => {
//             expect(NotificationBanner).toHaveBeenCalledWith(
//                 expect.objectContaining({
//                     notification: expect.objectContaining({
//                         type: 'success',
//                         message: 'Rule deleted successfully!',
//                     }),
//                 }),
//                 {}
//             );
//         });
//     });

//     test('displays error notification on delete failure', async () => {
//         const mockRules = [{ id: '1', name: 'Test Rule 1', conditions: {}, priority: 1, status: 'active' }];

//         jest.spyOn(promotionApi, 'fetchPromotionRules').mockResolvedValueOnce({ data: mockRules });
//         jest.spyOn(promotionApi, 'deletePromotionRule').mockRejectedValue(new Error('Delete failed'));

//         render(<HomePage />);

//         await waitFor(() => expect(promotionApi.fetchPromotionRules).toHaveBeenCalled());

//         // Simulate a delete action
//         const handleDelete = jest.fn();
//         CustomizedTables.mockImplementation(({ handleDelete: _handleDelete }) => {
//             handleDelete = _handleDelete;
//             return (
//                 <div>
//                     <button onClick={() => handleDelete('1')}>Delete Rule</button>
//                 </div>
//             );
//         });

//         fireEvent.click(screen.getByText(/Delete Rule/i));

//         await waitFor(() => {
//             expect(NotificationBanner).toHaveBeenCalledWith(
//                 expect.objectContaining({
//                     notification: expect.objectContaining({
//                         type: 'error',
//                         message: 'Error deleting rule!',
//                     }),
//                 }),
//                 {}
//             );
//         });
//     });
// });

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../HomePage';
import * as promotionApi from '../../services/promotionApi';
import NotificationBanner from '../../components/config/NotificationBanner';
import '@testing-library/jest-dom';


jest.mock('../../components/homePage/CustomizedTables', () => {
    return jest.fn(({ rules, handleDelete }) => (
        <div data-testid="customized-tables">
            {rules.map(rule => (
                <div key={rule.id}>
                    <span>{rule.name}</span>
                    <button onClick={() => handleDelete(rule.id)}>Delete</button>
                </div>
            ))}
        </div>
    ));
});

jest.mock('../../components/config/NotificationBanner', () => {
    return jest.fn(({ notification }) => (
        <div data-testid="notification-banner">
            {notification && <span>{notification.message}</span>}
        </div>
    ));
});

describe('HomePage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('handles deletion of a promotion rule', async () => {
        const mockRules = [
            { id: '1', name: 'Test Rule 1', conditions: {}, priority: 1, status: 'active' },
        ];

        jest.spyOn(promotionApi, 'fetchPromotionRules').mockResolvedValueOnce({ data: mockRules });
        jest.spyOn(promotionApi, 'deletePromotionRule').mockResolvedValue();

        render(<HomePage />);

        // Wait for the rules to be displayed
        await waitFor(() => {
            expect(screen.getByText('Test Rule 1')).toBeInTheDocument();
        });

        // Simulate a delete action
        fireEvent.click(screen.getByText(/Delete/i));

        // Check if delete function was called
        await waitFor(() => {
            expect(promotionApi.deletePromotionRule).toHaveBeenCalledWith('1');
        });

        // Check notification
        await waitFor(() => {
            expect(NotificationBanner).toHaveBeenCalledWith(
                expect.objectContaining({
                    notification: expect.objectContaining({
                        type: 'success',
                        message: 'Rule deleted successfully!',
                    }),
                }),
                {}
            );
        });
    });
});
