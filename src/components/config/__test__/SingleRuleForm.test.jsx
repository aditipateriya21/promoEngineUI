import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SingleRuleForm from '../SingleRuleForm';
import '@testing-library/jest-dom';


// describe('SingleRuleForm', () => {
//     const onSaveMock = jest.fn();
//     const onBackMock = jest.fn();

//     beforeEach(() => {
//         render(<SingleRuleForm onSave={onSaveMock} onBack={onBackMock} />);
//     });


//     test('calls onBack when Back button is clicked', () => {
//         fireEvent.click(screen.getByRole('button', { name: /Back/i }));
//         expect(onBackMock).toHaveBeenCalled();
//     });

//     test('shows error when required fields are missing', async () => {
//         fireEvent.click(screen.getByRole('button', { name: /Save Rule/i }));

//         expect(await screen.findByText(/Missing required fields/i)).toBeInTheDocument();
//     });
// });










// describe('SingleRuleForm', () => {
//     const onSaveMock = jest.fn();
//     const onBackMock = jest.fn();

//     beforeEach(() => {
//         jest.clearAllMocks(); // Clear previous calls
//     });

//     test('renders the form correctly', () => {
//         render(<SingleRuleForm onSave={onSaveMock} onBack={onBackMock} />);
    
//         expect(screen.getByLabelText(/Rule Name/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Conditions/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Actions/i)).toBeInTheDocument(); // Ensure this label exists
//         expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
//         expect(screen.getByText(/Save Rule/i)).toBeInTheDocument();
//         expect(screen.getByText(/Back/i)).toBeInTheDocument();
//     });
    

//     test('validates required fields on submit', async () => {
//         render(<SingleRuleForm onSave={onSaveMock} onBack={onBackMock} />);

//         fireEvent.click(screen.getByText(/Save Rule/i));

//         expect(await screen.findByText(/Missing required fields/i)).toBeInTheDocument();
//     });

//     test('validates status is not numeric', async () => {
//         render(<SingleRuleForm onSave={onSaveMock} onBack={onBackMock} />);

//         fireEvent.change(screen.getByLabelText(/Rule Name/i), { target: { value: 'Test Rule' } });
//         fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 1 } });
//         fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: '123' } });

//         fireEvent.click(screen.getByText(/Save Rule/i));

//         expect(await screen.findByText(/Status cannot be numeric/i)).toBeInTheDocument();
//     });

//     test('submits valid form data', async () => {
//         render(<SingleRuleForm onSave={onSaveMock} onBack={onBackMock} />);
    
//         fireEvent.change(screen.getByLabelText(/Rule Name/i), { target: { value: 'Test Rule' } });
//         fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 1 } });
//         fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'active' } });
    
//         // Select condition type
//         fireEvent.mouseDown(screen.getByLabelText(/Conditions/i));
//         fireEvent.click(screen.getByText(/Minimum Order Amount/i));
    
//         // Set minimum order amount
//         fireEvent.change(screen.getByRole('spinbutton', { name: /Minimum Order Amount/i }), { target: { value: 10 } });
    
//         // Select action type
//         fireEvent.click(screen.getByLabelText(/Actions/i));
//         fireEvent.click(screen.getByText(/Discount Percentage/i));
    
//         // Set discount percentage
//         fireEvent.change(screen.getByLabelText(/Discount Percentage/i), { target: { value: 20 } });
    
//         fireEvent.click(screen.getByText(/Save Rule/i));
    
//         await waitFor(() => {
//             expect(onSaveMock).toHaveBeenCalledWith(expect.objectContaining({
//                 _id: 'test_rule',
//                 name: 'Test Rule',
//                 conditions: {
//                     minOrderAmount: { amount: 10 }
//                 },
//                 actions: {
//                     discountPercentage: 20
//                 },
//                 priority: 1,
//                 status: 'active',
//                 _class: "com.Aditi.PromoEngine.model.Rule"
//             }));
//         });
//     });
    
//     test('displays error for invalid conditions', async () => {
//         render(<SingleRuleForm onSave={onSaveMock} onBack={onBackMock} />);

//         fireEvent.change(screen.getByLabelText(/Rule Name/i), { target: { value: 'Test Rule' } });
//         fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 1 } });
//         fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'active' } });

//         fireEvent.mouseDown(screen.getByLabelText(/Conditions/i));
//         fireEvent.click(screen.getByText(/BOGO/i));

//         // Leave BOGO fields empty
//         fireEvent.click(screen.getByText(/Save Rule/i));

//         expect(await screen.findByText(/BOGO conditions must have valid Item ID, Buy Quantity, and Get Quantity greater than 0/i)).toBeInTheDocument();
//     });

//     test('navigates back when Back button is clicked', () => {
//         render(<SingleRuleForm onSave={onSaveMock} onBack={onBackMock} />);

//         fireEvent.click(screen.getByText(/Back/i));
//         expect(onBackMock).toHaveBeenCalled();
//     });
// });




describe('SingleRuleForm', () => {
    const onSaveMock = jest.fn();
    const onBackMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(); // Clear previous calls
    });

    // test('renders the form correctly', () => {
    //     render(<SingleRuleForm onSave={onSaveMock} onBack={onBackMock} />);
    
    //     expect(screen.getByLabelText(/Rule Name/i)).toBeInTheDocument();
    //     expect(screen.getByLabelText(/Conditions/i)).toBeInTheDocument();
    //     expect(screen.getByLabelText(/Actions/i)).toBeInTheDocument();
    //     expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument();
    //     expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    //     expect(screen.getByText(/Save Rule/i)).toBeInTheDocument();
    //     expect(screen.getByText(/Back/i)).toBeInTheDocument();
    // });

    test('validates required fields on submit', async () => {
        render(<SingleRuleForm onSave={onSaveMock} onBack={onBackMock} />);
        fireEvent.click(screen.getByText(/Save Rule/i));
        expect(await screen.findByText(/Missing required fields/i)).toBeInTheDocument();
    });

    test('validates status is not numeric', async () => {
        render(<SingleRuleForm onSave={onSaveMock} onBack={onBackMock} />);
        fireEvent.change(screen.getByLabelText(/Rule Name/i), { target: { value: 'Test Rule' } });
        fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 1 } });
        fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: '123' } });
        fireEvent.click(screen.getByText(/Save Rule/i));
        expect(await screen.findByText(/Status cannot be numeric/i)).toBeInTheDocument();
    });
    test('submits valid form data', async () => {
        const onSaveMock = jest.fn();
        const onBackMock = jest.fn();
        
        render(<SingleRuleForm onSave={onSaveMock} onBack={onBackMock} />);
        
        // Fill out the form
        fireEvent.change(screen.getByLabelText(/Rule Name/i), { target: { value: 'Test Rule' } });
        fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 1 } });
        fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'active' } });
        
        // Select condition type
        fireEvent.mouseDown(screen.getByLabelText(/Conditions/i));
        fireEvent.click(screen.getByText(/Minimum Order Amount/i));
        
        // Wait for the minimum order amount input to be visible
        const minOrderAmountInput = await screen.findByTestId('min-order-amount');
        
        // Log the input for debugging
        console.log(minOrderAmountInput); // Check if it's rendered correctly
    
        // Ensure it's an input of type number
        expect(minOrderAmountInput).toBeInTheDocument();
        expect(minOrderAmountInput).toHaveAttribute('type', 'number');
        
        // Set minimum order amount using test ID
        fireEvent.change(minOrderAmountInput, { target: { value: '10' } }); // Use string '10'
        
        // Click on the Actions dropdown to open it
        fireEvent.mouseDown(screen.getByRole('combobox', { name: /Actions/i }));
        
        // Select the action type from the dropdown
        fireEvent.click(screen.getByText(/Discount Percentage/i)); // Adjust text based on dropdown options
        
        // Set discount percentage
        fireEvent.change(screen.getByLabelText(/Discount Percentage/i), { target: { value: '20' } }); // Use string '20'
        
        // Submit the form
        fireEvent.click(screen.getByText(/Save Rule/i));
        
        await waitFor(() => {
            expect(onSaveMock).toHaveBeenCalledWith(expect.objectContaining({
                _id: 'test_rule',
                name: 'Test Rule',
                conditions: {
                    minOrderAmount: { amount: 10 }
                },
                actions: {
                    discountPercentage: 20
                },
                priority: 1,
                status: 'active',
                _class: "com.Aditi.PromoEngine.model.Rule"
            }));
        });
    });
    
    test('displays error for invalid conditions', async () => {
        render(<SingleRuleForm onSave={onSaveMock} onBack={onBackMock} />);
        fireEvent.change(screen.getByLabelText(/Rule Name/i), { target: { value: 'Test Rule' } });
        fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 1 } });
        fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'active' } });
        fireEvent.mouseDown(screen.getByLabelText(/Conditions/i));
        fireEvent.click(screen.getByText(/BOGO/i));
        fireEvent.click(screen.getByText(/Save Rule/i));
        expect(await screen.findByText(/BOGO conditions must have valid Item ID, Buy Quantity, and Get Quantity greater than 0/i)).toBeInTheDocument();
    });

    test('navigates back when Back button is clicked', () => {
        render(<SingleRuleForm onSave={onSaveMock} onBack={onBackMock} />);
        fireEvent.click(screen.getByText(/Back/i));
        expect(onBackMock).toHaveBeenCalled();
    });
});
