import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Box, Button, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { fetchPromotionRuleById, updatePromotionRule } from '../../services/promotionApi';
import { convertValue } from '../../utility/validationUtils'; 
import { BUTTON } from '../../utility/constants';

function EditRulePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [rule, setRule] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { SAVE } = BUTTON;

    useEffect(() => {
        const loadRule = async () => {
            try {
                const response = await fetchPromotionRuleById(id);
                const data = response.data;
                setRule({
                    ...data,
                    conditions: data.conditions || {},
                    actions: data.actions || {}
                });
            } catch (error) {
                console.error('Error fetching rule:', error);
                setError('Error fetching rule details.');
            }
        };

        loadRule();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRule((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleConditionsChange = (e, key) => {
        const { name, value } = e.target;
        setRule((prev) => ({
            ...prev,
            conditions: {
                ...prev.conditions,
                [key]: {
                    ...prev.conditions[key],
                    [name]: convertValue(value) // Use the utility function
                }
            }
        }));
    };

    const handleActionsChange = (e, key) => {
        const { name, value } = e.target;
        setRule((prev) => ({
            ...prev,
            actions: {
                ...prev.actions,
                [key]: {
                    ...prev.actions[key],
                    [name]: convertValue(value) // Use the utility function
                }
            }
        }));
    };

    const handleSubmit = async () => {
        try {
            const updatedConditions = Object.keys(rule.conditions).reduce((acc, key) => {
                acc[key] = convertValue(rule.conditions[key]); // Use the utility function
                return acc;
            }, {});

            const updatedActions = Object.keys(rule.actions).reduce((acc, key) => {
                acc[key] = convertValue(rule.actions[key]); // Use the utility function
                return acc;
            }, {});

            const updatedRule = {
                ...rule,
                conditions: updatedConditions,
                actions: updatedActions
            };

            await updatePromotionRule(id, updatedRule);
            setSuccess('Rule updated successfully!');
            setError(null);
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error('Error updating rule:', error);
            setError('Error updating rule.');
            setSuccess(null);
        }
    };

    if (!rule) {
        return <div>Loading...</div>;
    }

    // Generate form fields dynamically for conditions
    const renderConditionsFields = (conditions) => {
        return Object.keys(conditions).map(key => {
            const value = conditions[key];
            if (typeof value === 'object' && value !== null) {
                return (
                    <div key={key}>
                        <Typography variant="h6" component="h2">
                            {key}
                        </Typography>
                        {Object.keys(value).map(subKey => (
                            <TextField
                                key={subKey}
                                name={subKey}
                                label={subKey}
                                value={value[subKey] || ''}
                                onChange={(e) => handleConditionsChange(e, key)}
                                fullWidth
                                margin="normal"
                            />
                        ))}
                    </div>
                );
            }
            return (
                <TextField
                    key={key}
                    name={key}
                    label={key}
                    value={value || ''}
                    onChange={(e) => handleConditionsChange(e, key)}
                    fullWidth
                    margin="normal"
                />
            );
        });
    };

    // Generate form fields dynamically for actions
    const renderActionsFields = (actions) => {
        return Object.keys(actions).map(key => {
            const value = actions[key];
            if (typeof value === 'object' && value !== null) {
                return (
                    <div key={key}>
                        <Typography variant="h6" component="h2">
                            {key}
                        </Typography>
                        {Object.keys(value).map(subKey => (
                            <TextField
                                key={subKey}
                                name={subKey}
                                label={subKey}
                                value={value[subKey] || ''}
                                onChange={(e) => handleActionsChange(e, key)}
                                fullWidth
                                margin="normal"
                            />
                        ))}
                    </div>
                );
            }
            return (
                <TextField
                    key={key}
                    name={key}
                    label={key}
                    value={value || ''}
                    onChange={(e) => handleActionsChange(e, key)}
                    fullWidth
                    margin="normal"
                />
            );
        });
    };

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Edit Promotion Rule
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <Box component="form" noValidate sx={{ mt: 3 }}>
                <TextField
                    name="name"
                    label="Name"
                    value={rule.name || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="priority"
                    label="Priority"
                    type="number"
                    value={rule.priority || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={rule.status || ''}
                        onChange={handleChange}
                    >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                        {/* Removed Pending state */}
                    </Select>
                </FormControl>
                <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
                    Conditions
                </Typography>
                {renderConditionsFields(rule.conditions)}
                <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
                    Actions
                </Typography>
                {renderActionsFields(rule.actions)}
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        {SAVE}
                    </Button>
                    <Button variant="outlined" color="secondary" sx={{ ml: 2 }} onClick={() => navigate('/')}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default EditRulePage;
