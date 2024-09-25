import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { evaluateOrder } from '../services/promotionApi'; 

function EvaluateOrder() {
    const [orderJson, setOrderJson] = useState('');
    const [orderData, setOrderData] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); 
    const handleInputChange = (event) => {
        setOrderJson(event.target.value);
    };

    const validateOrder = (parsedOrder) => {
        if (!parsedOrder.id) {
            return 'Order ID cannot be null.';
        }
    
        if (!Array.isArray(parsedOrder.items) || parsedOrder.items.length === 0) {
            return 'At least one item must be included in the order.';
        }
    
        for (const item of parsedOrder.items) {
            if (!item.id) {
                return 'Item ID cannot be null for all items.';
            }
            if (!item.name) {
                return 'Name cannot be null for all items.';
            }
            if (!item.quantity || item.quantity <= 0) {
                return `Quantity must be greater than zero for item ID: ${item.id}.`;
            }
            if (!item.price || item.price < 0) {
                return `Price must be greater than zero for item ID: ${item.id}.`;
            }
        }
    
        return null; 
    };
    

    const handleSubmit = async () => {
        try {
            const parsedOrder = JSON.parse(orderJson); 

            
            const validationError = validateOrder(parsedOrder);
            if (validationError) {
                setError(validationError);
                setOrderData(null);
                return;
            }

            const response = await evaluateOrder(parsedOrder); 
            setOrderData(response.data); 
            setError(null); 
        } catch (err) {
            
            if (err instanceof SyntaxError) {
                setError('Invalid JSON format. Please check your JSON syntax.');
            } else if (err.response && err.response.data) {
                setError(`Evaluation error: ${err.response.data.message}`); 
            } else {
                setError('An unknown error occurred. Please try again.');
            }
            setOrderData(null);
        }
    };

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Evaluate Order
            </Typography>
            <Box sx={{ mb: 2 }}>
                <TextField
                    label="Order Details (JSON)"
                    multiline
                    rows={10}
                    variant="outlined"
                    fullWidth
                    value={orderJson}
                    onChange={handleInputChange}
                    placeholder='{"orderId": "12345", "items": [{"itemId": "item1", "name": "Item 1", "quantity": 2, "price": 50}], "orderTotalBeforeDiscount": 100, "discountApplied": 10, "finalOrderTotal": 90}'
                />
            </Box>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Evaluate Order
            </Button>

            {error && (
                <Box sx={{ mt: 2 }}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            )}

            {orderData && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Order Details:</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="order details table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderData.items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Typography variant="h6" sx={{ mt: 2 }}>Order Summary:</Typography>
                    <Box sx={{ mb: 2 }}>
                        <Typography>Order Total Before Discount: ${orderData.orderTotalBeforeDiscount}</Typography>
                        <Typography>Discount Applied: ${orderData.discountApplied}</Typography>
                        <Typography>Final Order Total: ${orderData.finalOrderTotal}</Typography>
                        {orderData.actionDetails && (
                            <Typography sx={{ mt: 2 }}>Actions Taken: {orderData.actionDetails}</Typography>
                        )}
                    </Box>
                </Box>
            )}

            <Box sx={{ mt: 2 }}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate('/')} 
                >
                    Back to Home
                </Button>
            </Box>
        </Container>
    );
}

export default EvaluateOrder;
