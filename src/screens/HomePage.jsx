import React, { useEffect, useState } from 'react';
import { fetchPromotionRules, deletePromotionRule } from '../services/promotionApi';
import NotificationBanner from '../components/config/NotificationBanner';
import CustomizedTables from '../components/homePage/CustomizedTables';
import { Container, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
    const [promotionRules, setPromotionRules] = useState([]);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const loadPromotionRules = async () => {
            try {
                const response = await fetchPromotionRules();
                setPromotionRules(response.data);
            } catch (error) {
                console.error('Error fetching promotion rules:', error);
            }
        };

        loadPromotionRules();
    }, []);

    const handleDelete = async (ruleId) => {
        try {
            await deletePromotionRule(ruleId);
            const response = await fetchPromotionRules();
            setPromotionRules(response.data);
            setNotification({ type: 'success', message: 'Rule deleted successfully!' });
        } catch (error) {
            console.error('Error deleting promotion rule:', error);
            setNotification({ type: 'error', message: 'Error deleting rule!' });
        }
    };

    const dismissNotification = () => {
        setNotification(null);
    };

    return (
        <Container component="main" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NotificationBanner notification={notification} onDismiss={dismissNotification} />
          
            <CustomizedTables
                rules={promotionRules}
                handleDelete={handleDelete}
            />
        </Container>
    );
}

export default HomePage;

