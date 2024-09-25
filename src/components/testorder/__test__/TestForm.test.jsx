// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import TestForm from './../TestForm';  
// import { analyzeOrder } from '../../../services/orderApi'

// jest.mock('../../../services/orderApi', () => ({
//   analyzeOrder: jest.fn(),
// }));

// jest.mock('./../AnalysisTable', () => () => <div>Analysis Table</div>);

// describe('TestForm', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('renders component', () => {
//     render(<TestForm orderId="" setOrderId={jest.fn()} goToHomePage={jest.fn()} />);

//     expect(screen.getByLabelText(/order id/i)).toBeInTheDocument();
//     expect(screen.getByText(/Analyze Order/i)).toBeInTheDocument();
//     expect(screen.getByText(/Back to Home/i)).toBeInTheDocument();
//   });

//   test('handles input change', () => {
//     const setOrderId = jest.fn();
//     render(<TestForm orderId="" setOrderId={setOrderId} goToHomePage={jest.fn()} />);

//     fireEvent.change(screen.getByLabelText(/order id/i), { target: { value: '123' } });
//     expect(setOrderId).toHaveBeenCalledWith('123');
//   });

//   test('handles API call and displays results', async () => {
//     analyzeOrder.mockResolvedValue({ data: { result: 'test data' } });

//     render(<TestForm orderId="1" setOrderId={jest.fn()} goToHomePage={jest.fn()} />);

//     fireEvent.click(screen.getByText(/Analyze Order/i));

//     expect(screen.getByRole('progressbar')).toBeInTheDocument();

//     await waitFor(() => {
//       expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
//       expect(screen.getByText(/Analysis Table/i)).toBeInTheDocument();
//     });
//   });

//   test('handles API call error', async () => {
//     analyzeOrder.mockRejectedValue(new Error('Failed to fetch order analysis'));

//     render(<TestForm orderId="1" setOrderId={jest.fn()} goToHomePage={jest.fn()} />);

//     fireEvent.click(screen.getByText(/Analyze Order/i));

//     expect(screen.getByRole('progressbar')).toBeInTheDocument();

//     await waitFor(() => {
//       expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
//       expect(screen.getByText(/Order Id does not exist/i)).toBeInTheDocument();
//     });
//   });

//   test('navigates back to home', () => {
//     const goToHomePage = jest.fn();
//     render(<TestForm orderId="1" setOrderId={jest.fn()} goToHomePage={goToHomePage} />);

//     fireEvent.click(screen.getByText(/Back to Home/i));
//     expect(goToHomePage).toHaveBeenCalled();
//   });
// });


import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestForm from './../TestForm';  
import { analyzeOrder } from '../../../services/orderApi';

jest.mock('../../../services/orderApi', () => ({
    analyzeOrder: jest.fn(),
}));

jest.mock('./../AnalysisTable', () => () => <div>Analysis Table</div>);

describe('TestForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders component', () => {
        render(<TestForm orderId="" setOrderId={jest.fn()} goToHomePage={jest.fn()} />);

        expect(screen.getByLabelText(/Order ID/i)).toBeInTheDocument();
        expect(screen.getByText(/Analyze Order/i)).toBeInTheDocument();
        expect(screen.getByText(/Back to Home/i)).toBeInTheDocument();
    });

    test('handles input change', () => {
        const setOrderId = jest.fn();
        render(<TestForm orderId="" setOrderId={setOrderId} goToHomePage={jest.fn()} />);

        fireEvent.change(screen.getByLabelText(/Order ID/i), { target: { value: '123' } });
        expect(setOrderId).toHaveBeenCalledWith('123');
    });

    test('handles API call and displays results', async () => {
        const mockAnalysisData = {
            appliedRules: ['Rule 1', 'Rule 2'],
            // Include other necessary fields as per your AnalysisTable component
        };
        analyzeOrder.mockResolvedValueOnce({ data: mockAnalysisData });

        render(<TestForm orderId="1" setOrderId={jest.fn()} goToHomePage={jest.fn()} />);

        fireEvent.click(screen.getByText(/Analyze Order/i));

        expect(screen.getByRole('progressbar')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
            expect(screen.getByText(/Analysis Table/i)).toBeInTheDocument();
        });
    });

    test('displays message when no rules are applied', async () => {
        analyzeOrder.mockResolvedValueOnce({ data: { appliedRules: [] } });

        render(<TestForm orderId="1" setOrderId={jest.fn()} goToHomePage={jest.fn()} />);

        fireEvent.click(screen.getByText(/Analyze Order/i));

        await waitFor(() => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
            expect(screen.getByText(/No rules applied to this Order ID/i)).toBeInTheDocument();
        });
    });

    test('handles API call error', async () => {
        analyzeOrder.mockRejectedValue(new Error('Failed to fetch order analysis'));

        render(<TestForm orderId="1" setOrderId={jest.fn()} goToHomePage={jest.fn()} />);

        fireEvent.click(screen.getByText(/Analyze Order/i));

        expect(screen.getByRole('progressbar')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
            expect(screen.getByText(/Order Id does not exist/i)).toBeInTheDocument();
        });
    });

    test('navigates back to home', () => {
        const goToHomePage = jest.fn();
        render(<TestForm orderId="1" setOrderId={jest.fn()} goToHomePage={goToHomePage} />);

        fireEvent.click(screen.getByText(/Back to Home/i));
        expect(goToHomePage).toHaveBeenCalled();
    });
});
