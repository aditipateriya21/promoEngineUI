//new config code.
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SingleRuleForm from '../components/config/SingleRuleForm';
import NotificationBanner from '../components/config/NotificationBanner'; 
import { createPromotionRule } from '../services/promotionApi';

function ConfigPage() {
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    const handleSingleRuleSave = async (rule) => {
        try {
            await createPromotionRule(rule); 
            setNotification({ type: 'success', message: 'Single rule saved successfully!' });
        } catch (error) {
            console.log(error);
            setNotification({ type: 'error', message: 'Failed to save the single rule' });
        }
    };

   

    const goToHomePage = () => {
        navigate('/'); 
    };

    return (
        <div className="config-page">
           

           
            <NotificationBanner
                notification={notification}
                onDismiss={() => setNotification(null)}
            />
            <SingleRuleForm
             onSave={handleSingleRuleSave}
             onBack={goToHomePage}
            />

           
        </div>
    );
}

export default ConfigPage;
