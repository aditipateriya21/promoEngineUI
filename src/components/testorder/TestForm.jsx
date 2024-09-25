import React, { useState } from 'react';
import { Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import AnalysisTable from './AnalysisTable'; 
import { analyzeOrder } from '../../services/orderApi'; 

function TestForm({ orderId, setOrderId, goToHomePage }) {
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTest = async () => {
        setLoading(true);
        setError(null);
        setAnalysis(null);
        try {
            const response = await analyzeOrder(orderId); 
            setAnalysis(response.data);
        } catch (error) {
            setError('Order Id does not exist');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack spacing={2} sx={{ padding: 2 }}>
            <TextField
                label="Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                fullWidth
            />
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleTest} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Analyze Order'}
                </Button>
                <Button variant="outlined" onClick={goToHomePage}>
                    Back to Home
                </Button>
            </Stack>

            {error && <Typography color="error">{error}</Typography>}
            {analysis && analysis.appliedRules.length === 0 && (
                <Typography color="textSecondary">No rules applied to this Order ID.</Typography>
            )}
            {analysis && analysis.appliedRules.length > 0 && <AnalysisTable data={analysis} />}
        </Stack>
    );
}

export default TestForm;
