// import React from 'react';
// import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'; // Import 'within'
// import '@testing-library/jest-dom';
// import EvaluateOrder from '../EvaluateOrder';
// import * as api from '../../services/promotionApi';
// import { MemoryRouter } from 'react-router-dom';

// jest.mock('../../services/promotionApi', () => ({
//   evaluateOrder: jest.fn()
// }));

// const mockNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockNavigate,
// }));

// describe('EvaluateOrder Component', () => {
//   test('renders correctly and handles input and submit', async () => {
//     const mockOrderData = {
//       items: [
//         { id: 'item1', name: 'Item 1', quantity: 2, price: 50 }
//       ],
//       orderTotalBeforeDiscount: 100,
//       discountApplied: 10,
//       finalOrderTotal: 90,
//       actionDetails: 'Discount applied'
//     };

//     api.evaluateOrder.mockResolvedValueOnce({ data: mockOrderData });

//     render(
//       <MemoryRouter>
//         <EvaluateOrder />
//       </MemoryRouter>
//     );

//     fireEvent.change(screen.getByLabelText(/order details \(json\)/i), {
//       target: { value: '{"items":[{"id":"item1","name":"Item 1","quantity":2,"price":50}],"orderTotalBeforeDiscount":100,"discountApplied":10,"finalOrderTotal":90,"actionDetails":"Discount applied"}' }
//     });
//     fireEvent.click(screen.getByRole('button', { name: /evaluate order/i }));

//     await waitFor(() => {
//       expect(screen.getByText(/Order Total Before Discount: \$100/i)).toBeInTheDocument();
//       expect(screen.getByText(/Discount Applied: \$10/i)).toBeInTheDocument();
//       expect(screen.getByText(/Final Order Total: \$90/i)).toBeInTheDocument();
//       expect(screen.getByText(/Actions Taken: Discount Applied/i)).toBeInTheDocument();
//     });

//     const itemRow = screen.getByRole('row', { name: /item 1/i });
//     expect(itemRow).toBeInTheDocument();
//     expect(within(itemRow).getByText(/item1/i)).toBeInTheDocument();
//     expect(within(itemRow).getByText(/Item 1/i)).toBeInTheDocument();
//     expect(within(itemRow).getByText(/2/i)).toBeInTheDocument();
//     expect(within(itemRow).getByText(/50/i)).toBeInTheDocument();
//   });

//   test('displays error message for invalid JSON input', async () => {
//     render(
//       <MemoryRouter>
//         <EvaluateOrder />
//       </MemoryRouter>
//     );

//     fireEvent.change(screen.getByLabelText(/order details \(json\)/i), {
//       target: { value: 'invalid json' }
//     });
//     fireEvent.click(screen.getByRole('button', { name: /evaluate order/i }));

//     await waitFor(() => {
//       expect(screen.getByText(/invalid json or evaluation error/i)).toBeInTheDocument();
//     });
//   });

//   test('navigates to home page when back button is clicked', () => {
//     render(
//       <MemoryRouter>
//         <EvaluateOrder />
//       </MemoryRouter>
//     );

//     fireEvent.click(screen.getByRole('button', { name: /back to home/i }));
//     expect(mockNavigate).toHaveBeenCalledWith('/');
//   });
// });

import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import EvaluateOrder from '../EvaluateOrder';
import * as api from '../../services/promotionApi';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../services/promotionApi', () => ({
    evaluateOrder: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('EvaluateOrder Component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mock history before each test
    });

    test('renders correctly and handles input and submit', async () => {
        const mockOrderData = {
            items: [
                { id: 'item1', name: 'Item 1', quantity: 2, price: 50 },
            ],
            orderTotalBeforeDiscount: 100,
            discountApplied: 10,
            finalOrderTotal: 90,
            actionDetails: 'Discount applied',
        };

        api.evaluateOrder.mockResolvedValueOnce({ data: mockOrderData });

        render(
            <MemoryRouter>
                <EvaluateOrder />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Order Details \(JSON\)/i), {
            target: { value: '{"id":"12345","items":[{"id":"item1","name":"Item 1","quantity":2,"price":50}],"orderTotalBeforeDiscount":100,"discountApplied":10,"finalOrderTotal":90,"actionDetails":"Discount applied"}' }
        });

        fireEvent.click(screen.getByRole('button', { name: /evaluate order/i }));

        await waitFor(() => {
            expect(screen.getByText(/Order Total Before Discount: \$100/i)).toBeInTheDocument();
            expect(screen.getByText(/Discount Applied: \$10/i)).toBeInTheDocument();
            expect(screen.getByText(/Final Order Total: \$90/i)).toBeInTheDocument();
            expect(screen.getByText(/Actions Taken: Discount applied/i)).toBeInTheDocument();
        });

        const itemRow = screen.getByRole('row', { name: /Item 1/i });
        expect(itemRow).toBeInTheDocument();
        expect(within(itemRow).getByText(/item1/i)).toBeInTheDocument();
        expect(within(itemRow).getByText(/Item 1/i)).toBeInTheDocument();
        expect(within(itemRow).getByText(/2/i)).toBeInTheDocument();
        expect(within(itemRow).getByText(/50/i)).toBeInTheDocument();
    });

    test('displays error message for invalid JSON input', async () => {
        render(
            <MemoryRouter>
                <EvaluateOrder />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Order Details \(JSON\)/i), {
            target: { value: 'invalid json' }
        });
        fireEvent.click(screen.getByRole('button', { name: /evaluate order/i }));

        await waitFor(() => {
            expect(screen.getByText(/Invalid JSON format/i)).toBeInTheDocument();
        });
    });

    test('displays error message for validation errors', async () => {
        render(
            <MemoryRouter>
                <EvaluateOrder />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Order Details \(JSON\)/i), {
            target: { value: '{"id":"12345","items":[{"id":"item1","name":"Item 1","quantity":0,"price":50}]}' }
        });
        fireEvent.click(screen.getByRole('button', { name: /evaluate order/i }));

        await waitFor(() => {
            expect(screen.getByText(/Quantity must be greater than zero for item ID: item1/i)).toBeInTheDocument();
        });
    });

    test('navigates to home page when back button is clicked', () => {
        render(
            <MemoryRouter>
                <EvaluateOrder />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /back to home/i }));
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
