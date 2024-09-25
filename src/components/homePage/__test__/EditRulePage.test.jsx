//last working edit rule page code 
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import EditRulePage from '../EditRulePage';
// import * as promotionApi from '../../../services/promotionApi';
// import * as validationUtils from '../../../utility/validationUtils';
// import { BUTTON } from '../../../utility/constants';
// import '@testing-library/jest-dom'; 
// import React from 'react';

// jest.mock('../../../services/promotionApi');
// jest.mock('../../../utility/validationUtils');
// jest.mock('../../../utility/constants', () => ({
//     BUTTON: {
//         SAVE: 'Save',
//     },
// }));
// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useNavigate: jest.fn(),
// }));


// const mockFetchPromotionRuleById = promotionApi.fetchPromotionRuleById;
// const mockUpdatePromotionRule = promotionApi.updatePromotionRule;
// const mockConvertValue = validationUtils.convertValue;

// describe('EditRulePage', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     test('renders loading message initially', () => {
//         mockFetchPromotionRuleById.mockResolvedValueOnce({ data: {} });

//         render(
//             <Router>
//                 <EditRulePage />
//             </Router>
//         );

//         expect(screen.getByText(/Loading.../)).toBeInTheDocument();
//     });

//     test('fetches and displays rule data', async () => {
//         mockFetchPromotionRuleById.mockResolvedValueOnce({
//             data: {
//                 id: '1',
//                 name: 'Test Rule',
//                 priority: 1,
//                 conditions: { condition1: { subCondition1: 'value1' } },
//                 actions: { action1: { subAction1: 'value1' } },
//             },
//         });

//         render(
//             <Router>
//                 <EditRulePage />
//             </Router>
//         );

//         await waitFor(() => {
//             expect(screen.getByLabelText(/Name/)).toHaveValue('Test Rule');
//             expect(screen.getByLabelText(/Priority/)).toHaveValue(1);
//         });
//     });

//     test('updates form fields on input change', async () => {
//         mockFetchPromotionRuleById.mockResolvedValueOnce({
//             data: {
//                 id: '1',
//                 name: 'Test Rule',
//                 priority: 1,
//                 conditions: {},
//                 actions: {},
//             },
//         });

//         render(
//             <Router>
//                 <EditRulePage />
//             </Router>
//         );

//         await waitFor(() => {
//             expect(screen.getByLabelText(/Name/)).toHaveValue('Test Rule');
//         });

//         fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'Updated Rule' } });
//         expect(screen.getByLabelText(/Name/)).toHaveValue('Updated Rule');

//         fireEvent.change(screen.getByLabelText(/Priority/), { target: { value: '2' } });
//         expect(screen.getByLabelText(/Priority/)).toHaveValue(2);
//     });
    
// });



import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import EditRulePage from '../EditRulePage';
import * as promotionApi from '../../../services/promotionApi';
import * as validationUtils from '../../../utility/validationUtils';
import { BUTTON } from '../../../utility/constants';
import '@testing-library/jest-dom'; 
import React from 'react';

jest.mock('../../../services/promotionApi');
jest.mock('../../../utility/validationUtils');
jest.mock('../../../utility/constants', () => ({
    BUTTON: {
        SAVE: 'Save',
    },
}));
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const mockFetchPromotionRuleById = promotionApi.fetchPromotionRuleById;
const mockUpdatePromotionRule = promotionApi.updatePromotionRule;
const mockConvertValue = validationUtils.convertValue;

describe('EditRulePage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading message initially', () => {
        mockFetchPromotionRuleById.mockResolvedValueOnce({ data: {} });

        render(
            <Router>
                <EditRulePage />
            </Router>
        );

        expect(screen.getByText(/Loading.../)).toBeInTheDocument();
    });

    test('fetches and displays rule data', async () => {
        mockFetchPromotionRuleById.mockResolvedValueOnce({
            data: {
                id: '1',
                name: 'Test Rule',
                priority: 1,
                conditions: { condition1: { subCondition1: 'value1' } },
                actions: { action1: { subAction1: 'value1' } },
            },
        });

        render(
            <Router>
                <EditRulePage />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByLabelText(/Name/)).toHaveValue('Test Rule');
            expect(screen.getByLabelText(/Priority/)).toHaveValue(1);
        });
    });

    test('updates form fields on input change', async () => {
        mockFetchPromotionRuleById.mockResolvedValueOnce({
            data: {
                id: '1',
                name: 'Test Rule',
                priority: 1,
                conditions: {},
                actions: {},
            },
        });

        render(
            <Router>
                <EditRulePage />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByLabelText(/Name/)).toHaveValue('Test Rule');
        });

        fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'Updated Rule' } });
        expect(screen.getByLabelText(/Name/)).toHaveValue('Updated Rule');

        fireEvent.change(screen.getByLabelText(/Priority/), { target: { value: '2' } });
        expect(screen.getByLabelText(/Priority/)).toHaveValue(2);
    });

    test('submits form successfully', async () => {
        mockFetchPromotionRuleById.mockResolvedValueOnce({
            data: {
                id: '1',
                name: 'Test Rule',
                priority: 1,
                conditions: {},
                actions: {},
            },
        });
        mockUpdatePromotionRule.mockResolvedValueOnce({});

        render(
            <Router>
                <EditRulePage />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'Updated Rule' } });
        fireEvent.change(screen.getByLabelText(/Priority/), { target: { value: '2' } });

        fireEvent.click(screen.getByText('Save'));

        await waitFor(() => {
            expect(mockUpdatePromotionRule).toHaveBeenCalledWith('1', expect.objectContaining({
                name: 'Updated Rule',
                priority: 2,
                conditions: {},
                actions: {},
            }));
        });
    });

    test('handles error on form submission', async () => {
        mockFetchPromotionRuleById.mockResolvedValueOnce({
            data: {
                id: '1',
                name: 'Test Rule',
                priority: 1,
                conditions: {},
                actions: {},
            },
        });
        mockUpdatePromotionRule.mockRejectedValueOnce(new Error('Update failed'));

        render(
            <Router>
                <EditRulePage />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'Updated Rule' } });
        fireEvent.change(screen.getByLabelText(/Priority/), { target: { value: '2' } });

        fireEvent.click(screen.getByText('Save'));

        await waitFor(() => {
            expect(screen.getByText('Error updating rule.')).toBeInTheDocument();
        });
    });

    test('renders conditions and actions fields dynamically', async () => {
        mockFetchPromotionRuleById.mockResolvedValueOnce({
            data: {
                id: '1',
                name: 'Test Rule',
                priority: 1,
                conditions: {
                    condition1: { subCondition1: 'value1' },
                    condition2: { subCondition2: 'value2' },
                },
                actions: {
                    action1: { subAction1: 'value1' },
                    action2: { subAction2: 'value2' },
                },
            },
        });

        render(
            <Router>
                <EditRulePage />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByLabelText(/subCondition1/)).toHaveValue('value1');
            expect(screen.getByLabelText(/subCondition2/)).toHaveValue('value2');
            expect(screen.getByLabelText(/subAction1/)).toHaveValue('value1');
            expect(screen.getByLabelText(/subAction2/)).toHaveValue('value2');
        });
    });

    test('navigates to home on cancel', async () => {
        const navigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

        mockFetchPromotionRuleById.mockResolvedValueOnce({
            data: {
                id: '1',
                name: 'Test Rule',
                priority: 1,
                conditions: {},
                actions: {},
            },
        });

        render(
            <Router>
                <EditRulePage />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Cancel/ })).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole('button', { name: /Cancel/ }));

        await waitFor(() => {
            expect(navigate).toHaveBeenCalledWith('/');
        });
    });

    // test('handles error when fetching rule data', async () => {
    //     mockFetchPromotionRuleById.mockRejectedValueOnce(new Error('Fetch failed'));

    //     render(
    //         <Router>
    //             <EditRulePage />
    //         </Router>
    //     );

    //     await waitFor(() => {
    //         expect(screen.getByText('Error fetching rule details.')).toBeInTheDocument();
    //     });
    // });
});

