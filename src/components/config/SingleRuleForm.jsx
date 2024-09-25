// import React, { useState } from 'react';
// import {
//     TextField,
//     Button,
//     Container,
//     Typography,
//     Grid,
//     MenuItem,
//     Select,
//     InputLabel,
//     FormControl,
//     Alert
// } from '@mui/material';

// function SingleRuleForm({ onSave, onBack }) {
//     const [rule, setRule] = useState({
//         name: '',
//         conditions: {
//             minOrderAmount: { amount: 0 },
//             itemQuantityThreshold: { itemId: '', quantity: 0 },
//             bogo: { itemId: '', buyQuantity: 0, getQuantity: 0 }
//         },
//         actions: {
//             discountPercentage: 0,
//             freeItem: { itemId: '', quantity: 0 },
//             bogo: { itemId: '', buyQuantity: 0, getQuantity: 0 }
//         },
//         priority: 0,
//         status: '',
//         conditionType: '',
//         actionType: ''
//     });

//     const [error, setError] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         if (name.startsWith('condition')) {
//             const conditionType = name.split('_')[1];
//             setRule((prevRule) => ({
//                 ...prevRule,
//                 conditions: {
//                     ...prevRule.conditions,
//                     [conditionType]: {
//                         ...prevRule.conditions[conditionType],
//                         [name.split('_')[2]]: ['amount', 'quantity', 'buyQuantity', 'getQuantity'].includes(name.split('_')[2]) ? parseFloat(value) : value
//                     }
//                 }
//             }));
//         } else if (name.startsWith('action')) {
//             const actionType = name.split('_')[1];
//             if (actionType === 'discountPercentage') {
//                 setRule((prevRule) => ({
//                     ...prevRule,
//                     actions: {
//                         ...prevRule.actions,
//                         discountPercentage: parseFloat(value)
//                     }
//                 }));
//             } else {
//                 setRule((prevRule) => ({
//                     ...prevRule,
//                     actions: {
//                         ...prevRule.actions,
//                         [actionType]: {
//                             ...prevRule.actions[actionType],
//                             [name.split('_')[2]]: ['quantity', 'buyQuantity', 'getQuantity'].includes(name.split('_')[2]) ? parseFloat(value) : value
//                         }
//                     }
//                 }));
//             }
//         } else {
//             setRule((prevRule) => ({
//                 ...prevRule,
//                 [name]: name === 'priority' ? parseInt(value) : value
//             }));
//         }
//     };

    
    

//     const validateForm = () => {
//         if (!rule.name || !rule.priority || !rule.status) {
//             throw new Error('Missing required fields');
//         }

//         if (!isNaN(rule.status)) {
//             throw new Error('Status cannot be numeric');
//         }

//         if (!rule.conditionType) {
//             throw new Error('Please select a condition type');
//         }

//         if (rule.conditionType === 'minOrderAmount' && rule.conditions.minOrderAmount.amount <= 0) {
//             throw new Error('Minimum Order Amount must be greater than 0');
//         }

//         if (rule.conditionType === 'itemQuantityThreshold' && 
//             (!rule.conditions.itemQuantityThreshold.itemId || rule.conditions.itemQuantityThreshold.quantity <= 0)) {
//             throw new Error('Item Quantity Threshold must have a valid Item ID and Quantity greater than 0');
//         }

//         if (rule.conditionType === 'bogo' && 
//             (!rule.conditions.bogo.itemId || rule.conditions.bogo.buyQuantity <= 0 || rule.conditions.bogo.getQuantity <= 0)) {
//             throw new Error('BOGO conditions must have valid Item ID, Buy Quantity, and Get Quantity greater than 0');
//         }

//         // Check if an action is selected
//         if (!rule.actionType) {
//             throw new Error('Please select an action type');
//         }

//         // Validate actions
//         if (rule.actionType === 'discountPercentage' && rule.actions.discountPercentage <= 0) {
//             throw new Error('Discount Percentage must be greater than 0');
//         }

//         if (rule.actionType === 'freeItem' && 
//             (!rule.actions.freeItem.itemId || rule.actions.freeItem.quantity <= 0)) {
//             throw new Error('Free Item must have a valid Item ID and Quantity greater than 0');
//         }

//         if (rule.actionType === 'bogo' && 
//             (!rule.actions.bogo.itemId || rule.actions.bogo.buyQuantity <= 0 || rule.actions.bogo.getQuantity <= 0)) {
//             throw new Error('BOGO actions must have valid Item ID, Buy Quantity, and Get Quantity greater than 0');
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (isSubmitting) return;

//         setError(null);
//         setIsSubmitting(true);

//         try {
//             validateForm();

//             const newRule = {
//                 _id: rule.name.replace(/\s+/g, '_').toLowerCase(),
//                 name: rule.name,
//                 conditions: {},
//                 actions: {},
//                 priority: rule.priority,
//                 status: rule.status,
//                 _class: "com.Aditi.PromoEngine.model.Rule"
//             };

//             if (rule.conditions.minOrderAmount.amount) {
//                 newRule.conditions.minOrderAmount = {
//                     amount: rule.conditions.minOrderAmount.amount
//                 };
//             }

//             if (rule.conditions.itemQuantityThreshold.itemId && rule.conditions.itemQuantityThreshold.quantity) {
//                 newRule.conditions.itemQuantityThreshold = {
//                     itemId: rule.conditions.itemQuantityThreshold.itemId,
//                     quantity: rule.conditions.itemQuantityThreshold.quantity
//                 };
//             }

//             if (rule.conditions.bogo.itemId && rule.conditions.bogo.buyQuantity && rule.conditions.bogo.getQuantity) {
//                 newRule.conditions.bogo = {
//                     itemId: rule.conditions.bogo.itemId,
//                     buyQuantity: rule.conditions.bogo.buyQuantity,
//                     getQuantity: rule.conditions.bogo.getQuantity
//                 };
//             }

//             if (rule.actions.discountPercentage) {
//                 newRule.actions.discountPercentage = rule.actions.discountPercentage;
//             }

//             if (rule.actions.freeItem.itemId && rule.actions.freeItem.quantity) {
//                 newRule.actions.freeItem = {
//                     itemId: rule.actions.freeItem.itemId,
//                     quantity: rule.actions.freeItem.quantity
//                 };
//             }

//             if (rule.actions.bogo.itemId && rule.actions.bogo.buyQuantity && rule.actions.bogo.getQuantity) {
//                 newRule.actions.bogo = {
//                     itemId: rule.actions.bogo.itemId,
//                     buyQuantity: rule.actions.bogo.buyQuantity,
//                     getQuantity: rule.actions.bogo.getQuantity
//                 };
//             }

//             console.log('Submitting new rule:', newRule);
//             await onSave(newRule);

//             // Resetting the form
//             setRule({
//                 name: '',
//                 conditions: {
//                     minOrderAmount: { amount: 0 },
//                     itemQuantityThreshold: { itemId: '', quantity: 0 },
//                     bogo: { itemId: '', buyQuantity: 0, getQuantity: 0 }
//                 },
//                 actions: {
//                     discountPercentage: 0,
//                     freeItem: { itemId: '', quantity: 0 },
//                     bogo: { itemId: '', buyQuantity: 0, getQuantity: 0 }
//                 },
//                 priority: 0,
//                 status: '',
//                 conditionType: '',
//                 actionType: ''
//             });
//         } catch (error) {
//             console.error('Error during submission:', error);
//             setError(error.message || 'An error occurred while saving the rule');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <Container>
//             <Typography variant="h6">Create a Rule</Typography>
//             {error && <Alert severity="error">{error}</Alert>}
//             <form onSubmit={handleSubmit}>
//                 <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                         <TextField
//                             label="Rule Name"
//                             name="name"
//                             value={rule.name}
//                             onChange={handleChange}
//                             fullWidth
//                             margin="normal"
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <InputLabel id="condition-select-label">
//                             Conditions <span style={{ color: 'red' }}>*</span>
//                         </InputLabel>
//                         <FormControl fullWidth margin="normal">
//                             <Select
//                                 labelId="condition-select-label" 
//                                 id="action-select" // Ensure this ID is set

//                                 name="conditionType"
//                                 value={rule.conditionType}
//                                 onChange={(e) => setRule({ ...rule, conditionType: e.target.value })}
//                             >
//                                 <MenuItem value="minOrderAmount">Minimum Order Amount</MenuItem>
//                                 <MenuItem value="itemQuantityThreshold">Item Quantity Threshold</MenuItem>
//                                 <MenuItem value="bogo">BOGO</MenuItem>
//                             </Select>
//                         </FormControl>

//                          {rule.conditionType === 'minOrderAmount' && (
//                              <TextField
//                                 label="Minimum Order Amount"
//                                 name="condition_minOrderAmount_amount"
//                                 type="number"
//                                 value={rule.conditions.minOrderAmount.amount}
//                                 onChange={handleChange}
//                                 fullWidth
//                                 margin="normal"
//                                 data-testid="min-order-amount" // Add this line

//                             />
//                         )} 
  

//                         {rule.conditionType === 'itemQuantityThreshold' && (
//                             <>
//                                 <TextField
//                                     label="Condition Item ID"
//                                     name="condition_itemQuantityThreshold_itemId"
//                                     value={rule.conditions.itemQuantityThreshold.itemId}
//                                     onChange={handleChange}
//                                     fullWidth
//                                     margin="normal"
//                                 />
//                                 <TextField
//                                     label="Condition Quantity"
//                                     name="condition_itemQuantityThreshold_quantity"
//                                     type="number"
//                                     value={rule.conditions.itemQuantityThreshold.quantity}
//                                     onChange={handleChange}
//                                     fullWidth
//                                     margin="normal"
//                                 />
//                             </>
//                         )}
//                         {rule.conditionType === 'bogo' && (
//                             <>
//                                 <TextField
//                                     label="BOGO Item ID"
//                                     name="condition_bogo_itemId"
//                                     value={rule.conditions.bogo.itemId}
//                                     onChange={handleChange}
//                                     fullWidth
//                                     margin="normal"
//                                 />
//                                 <TextField
//                                     label="Buy Quantity"
//                                     name="condition_bogo_buyQuantity"
//                                     type="number"
//                                     value={rule.conditions.bogo.buyQuantity}
//                                     onChange={handleChange}
//                                     fullWidth
//                                     margin="normal"
//                                 />
//                                 <TextField
//                                     label="Get Quantity"
//                                     name="condition_bogo_getQuantity"
//                                     type="number"
//                                     value={rule.conditions.bogo.getQuantity}
//                                     onChange={handleChange}
//                                     fullWidth
//                                     margin="normal"
//                                 />
//                             </>
//                         )}
//                     </Grid>
//                     <Grid item xs={12}>
//                         <InputLabel>
//                             Actions <span style={{ color: 'red' }}>*</span>
//                         </InputLabel>
//                         <FormControl fullWidth margin="normal">
//                             <Select
//                                 name="actionType"
//                                 value={rule.actionType}
//                                 onChange={(e) => setRule({ ...rule, actionType: e.target.value })}
//                             >
//                                 <MenuItem value="discountPercentage">Discount Percentage</MenuItem>
//                                 <MenuItem value="freeItem">Free Item</MenuItem>
//                                 <MenuItem value="bogo">BOGO</MenuItem>
//                             </Select>
//                         </FormControl>

//                         {rule.actionType === 'discountPercentage' && (
//                             <TextField
//                                 label="Discount Percentage"
//                                 name="action_discountPercentage"
//                                 type="number"
//                                 value={rule.actions.discountPercentage}
//                                 onChange={handleChange}
//                                 fullWidth
//                                 margin="normal"
//                             />
//                         )}
//                         {rule.actionType === 'freeItem' && (
//                             <>
//                                 <TextField
//                                     label="Free Item ID"
//                                     name="action_freeItem_itemId"
//                                     value={rule.actions.freeItem.itemId}
//                                     onChange={handleChange}
//                                     fullWidth
//                                     margin="normal"
//                                 />
//                                 <TextField
//                                     label="Free Item Quantity"
//                                     name="action_freeItem_quantity"
//                                     type="number"
//                                     value={rule.actions.freeItem.quantity}
//                                     onChange={handleChange}
//                                     fullWidth
//                                     margin="normal"
//                                 />
//                             </>
//                         )}
//                         {rule.actionType === 'bogo' && (
//                             <>
//                                 <TextField
//                                     label="BOGO Item ID"
//                                     name="action_bogo_itemId"
//                                     value={rule.actions.bogo.itemId}
//                                     onChange={handleChange}
//                                     fullWidth
//                                     margin="normal"
//                                 />
//                                 <TextField
//                                     label="Buy Quantity"
//                                     name="action_bogo_buyQuantity"
//                                     type="number"
//                                     value={rule.actions.bogo.buyQuantity}
//                                     onChange={handleChange}
//                                     fullWidth
//                                     margin="normal"
//                                 />
//                                 <TextField
//                                     label="Get Quantity"
//                                     name="action_bogo_getQuantity"
//                                     type="number"
//                                     value={rule.actions.bogo.getQuantity}
//                                     onChange={handleChange}
//                                     fullWidth
//                                     margin="normal"
//                                 />
//                             </>
//                         )}
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             label="Priority"
//                             name="priority"
//                             type="number"
//                             value={rule.priority}
//                             onChange={handleChange}
//                             fullWidth
//                             margin="normal"
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             label="Status"
//                             name="status"
//                             value={rule.status}
//                             onChange={handleChange}
//                             fullWidth
//                             margin="normal"
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
//                             Save Rule
//                         </Button>
//                         <Button variant="outlined" color="secondary" onClick={onBack} style={{ marginLeft: '8px' }}>
//                             Back
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </form>
//         </Container>
//     );
// }

// export default SingleRuleForm;


import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Alert
} from '@mui/material';

function SingleRuleForm({ onSave, onBack }) {
    const [rule, setRule] = useState({
        name: '',
        conditions: {
            minOrderAmount: { amount: 0 },
            itemQuantityThreshold: { itemId: '', quantity: 0 },
            bogo: { itemId: '', buyQuantity: 0, getQuantity: 0 }
        },
        actions: {
            discountPercentage: 0,
            freeItem: { itemId: '', quantity: 0 },
            bogo: { itemId: '', buyQuantity: 0, getQuantity: 0 }
        },
        priority: 0,
        status: '',
        conditionType: '',
        actionType: ''
    });

    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('condition')) {
            const conditionType = name.split('_')[1];
            setRule((prevRule) => ({
                ...prevRule,
                conditions: {
                    ...prevRule.conditions,
                    [conditionType]: {
                        ...prevRule.conditions[conditionType],
                        [name.split('_')[2]]: ['amount', 'quantity', 'buyQuantity', 'getQuantity'].includes(name.split('_')[2]) ? parseFloat(value) : value
                    }
                }
            }));
        } else if (name.startsWith('action')) {
            const actionType = name.split('_')[1];
            if (actionType === 'discountPercentage') {
                setRule((prevRule) => ({
                    ...prevRule,
                    actions: {
                        ...prevRule.actions,
                        discountPercentage: parseFloat(value)
                    }
                }));
            } else {
                setRule((prevRule) => ({
                    ...prevRule,
                    actions: {
                        ...prevRule.actions,
                        [actionType]: {
                            ...prevRule.actions[actionType],
                            [name.split('_')[2]]: ['quantity', 'buyQuantity', 'getQuantity'].includes(name.split('_')[2]) ? parseFloat(value) : value
                        }
                    }
                }));
            }
        } else {
            setRule((prevRule) => ({
                ...prevRule,
                [name]: name === 'priority' ? parseInt(value) : value
            }));
        }
    };

    const validateForm = () => {
        if (!rule.name || !rule.priority || !rule.status) {
            throw new Error('Missing required fields');
        }

        if (!isNaN(rule.status)) {
            throw new Error('Status cannot be numeric');
        }

        if (!rule.conditionType) {
            throw new Error('Please select a condition type');
        }

        if (rule.conditionType === 'minOrderAmount' && rule.conditions.minOrderAmount.amount <= 0) {
            throw new Error('Minimum Order Amount must be greater than 0');
        }

        if (rule.conditionType === 'itemQuantityThreshold' && 
            (!rule.conditions.itemQuantityThreshold.itemId || rule.conditions.itemQuantityThreshold.quantity <= 0)) {
            throw new Error('Item Quantity Threshold must have a valid Item ID and Quantity greater than 0');
        }

        if (rule.conditionType === 'bogo' && 
            (!rule.conditions.bogo.itemId || rule.conditions.bogo.buyQuantity <= 0 || rule.conditions.bogo.getQuantity <= 0)) {
            throw new Error('BOGO conditions must have valid Item ID, Buy Quantity, and Get Quantity greater than 0');
        }

        if (!rule.actionType) {
            throw new Error('Please select an action type');
        }

        if (rule.actionType === 'discountPercentage' && rule.actions.discountPercentage <= 0) {
            throw new Error('Discount Percentage must be greater than 0');
        }

        if (rule.actionType === 'freeItem' && 
            (!rule.actions.freeItem.itemId || rule.actions.freeItem.quantity <= 0)) {
            throw new Error('Free Item must have a valid Item ID and Quantity greater than 0');
        }

        if (rule.actionType === 'bogo' && 
            (!rule.actions.bogo.itemId || rule.actions.bogo.buyQuantity <= 0 || rule.actions.bogo.getQuantity <= 0)) {
            throw new Error('BOGO actions must have valid Item ID, Buy Quantity, and Get Quantity greater than 0');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setError(null);
        setIsSubmitting(true);

        try {
            validateForm();

            const newRule = {
                _id: rule.name.replace(/\s+/g, '_').toLowerCase(),
                name: rule.name,
                conditions: {},
                actions: {},
                priority: rule.priority,
                status: rule.status,
                _class: "com.Aditi.PromoEngine.model.Rule"
            };

            if (rule.conditions.minOrderAmount.amount) {
                newRule.conditions.minOrderAmount = {
                    amount: rule.conditions.minOrderAmount.amount
                };
            }

            if (rule.conditions.itemQuantityThreshold.itemId && rule.conditions.itemQuantityThreshold.quantity) {
                newRule.conditions.itemQuantityThreshold = {
                    itemId: rule.conditions.itemQuantityThreshold.itemId,
                    quantity: rule.conditions.itemQuantityThreshold.quantity
                };
            }

            if (rule.conditions.bogo.itemId && rule.conditions.bogo.buyQuantity && rule.conditions.bogo.getQuantity) {
                newRule.conditions.bogo = {
                    itemId: rule.conditions.bogo.itemId,
                    buyQuantity: rule.conditions.bogo.buyQuantity,
                    getQuantity: rule.conditions.bogo.getQuantity
                };
            }

            if (rule.actions.discountPercentage) {
                newRule.actions.discountPercentage = rule.actions.discountPercentage;
            }

            if (rule.actions.freeItem.itemId && rule.actions.freeItem.quantity) {
                newRule.actions.freeItem = {
                    itemId: rule.actions.freeItem.itemId,
                    quantity: rule.actions.freeItem.quantity
                };
            }

            if (rule.actions.bogo.itemId && rule.actions.bogo.buyQuantity && rule.actions.bogo.getQuantity) {
                newRule.actions.bogo = {
                    itemId: rule.actions.bogo.itemId,
                    buyQuantity: rule.actions.bogo.buyQuantity,
                    getQuantity: rule.actions.bogo.getQuantity
                };
            }

            console.log('Submitting new rule:', newRule);
            await onSave(newRule);

            // Resetting the form
            setRule({
                name: '',
                conditions: {
                    minOrderAmount: { amount: 0 },
                    itemQuantityThreshold: { itemId: '', quantity: 0 },
                    bogo: { itemId: '', buyQuantity: 0, getQuantity: 0 }
                },
                actions: {
                    discountPercentage: 0,
                    freeItem: { itemId: '', quantity: 0 },
                    bogo: { itemId: '', buyQuantity: 0, getQuantity: 0 }
                },
                priority: 0,
                status: '',
                conditionType: '',
                actionType: ''
            });
        } catch (error) {
            console.error('Error during submission:', error);
            setError(error.message || 'An error occurred while saving the rule');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container>
            <Typography variant="h6">Create a Rule</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Rule Name"
                            name="name"
                            value={rule.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel id="condition-select-label">
                            Conditions <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <FormControl fullWidth margin="normal">
                            <Select
                                labelId="condition-select-label" 
                                id="action-select" // Ensure this ID is set
                                name="conditionType"
                                value={rule.conditionType}
                                onChange={(e) => setRule({ ...rule, conditionType: e.target.value })}
                            >
                                <MenuItem value="minOrderAmount">Minimum Order Amount</MenuItem>
                                <MenuItem value="itemQuantityThreshold">Item Quantity Threshold</MenuItem>
                                <MenuItem value="bogo">BOGO</MenuItem>
                            </Select>
                        </FormControl>

                        {rule.conditionType === 'minOrderAmount' && (
                            <TextField
                                label="Minimum Order Amount"
                                name="condition_minOrderAmount_amount"
                                type="number"
                                value={rule.conditions.minOrderAmount.amount}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                data-testid="min-order-amount" // Add data-testid here


                            />
                        )}

                        {rule.conditionType === 'itemQuantityThreshold' && (
                            <>
                                <TextField
                                    label="Condition Item ID"
                                    name="condition_itemQuantityThreshold_itemId"
                                    value={rule.conditions.itemQuantityThreshold.itemId}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Condition Quantity"
                                    name="condition_itemQuantityThreshold_quantity"
                                    type="number"
                                    value={rule.conditions.itemQuantityThreshold.quantity}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                            </>
                        )}
                        {rule.conditionType === 'bogo' && (
                            <>
                                <TextField
                                    label="BOGO Item ID"
                                    name="condition_bogo_itemId"
                                    value={rule.conditions.bogo.itemId}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Buy Quantity"
                                    name="condition_bogo_buyQuantity"
                                    type="number"
                                    value={rule.conditions.bogo.buyQuantity}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Get Quantity"
                                    name="condition_bogo_getQuantity"
                                    type="number"
                                    value={rule.conditions.bogo.getQuantity}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                            </>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>
                            Actions <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <FormControl fullWidth margin="normal">
                            <Select
                                name="actionType"
                                value={rule.actionType}
                                onChange={(e) => setRule({ ...rule, actionType: e.target.value })}
                            >
                                <MenuItem value="discountPercentage">Discount Percentage</MenuItem>
                                <MenuItem value="freeItem">Free Item</MenuItem>
                                <MenuItem value="bogo">BOGO</MenuItem>
                            </Select>
                        </FormControl>

                        {rule.actionType === 'discountPercentage' && (
                            <TextField
                                label="Discount Percentage"
                                name="action_discountPercentage"
                                type="number"
                                value={rule.actions.discountPercentage}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        )}
                        {rule.actionType === 'freeItem' && (
                            <>
                                <TextField
                                    label="Free Item ID"
                                    name="action_freeItem_itemId"
                                    value={rule.actions.freeItem.itemId}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Free Item Quantity"
                                    name="action_freeItem_quantity"
                                    type="number"
                                    value={rule.actions.freeItem.quantity}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                            </>
                        )}
                        {rule.actionType === 'bogo' && (
                            <>
                                <TextField
                                    label="BOGO Item ID"
                                    name="action_bogo_itemId"
                                    value={rule.actions.bogo.itemId}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Buy Quantity"
                                    name="action_bogo_buyQuantity"
                                    type="number"
                                    value={rule.actions.bogo.buyQuantity}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Get Quantity"
                                    name="action_bogo_getQuantity"
                                    type="number"
                                    value={rule.actions.bogo.getQuantity}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                            </>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Priority"
                            name="priority"
                            type="number"
                            value={rule.priority}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Status"
                            name="status"
                            value={rule.status}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Save Rule
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={onBack} style={{ marginLeft: '8px' }}>
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default SingleRuleForm;
