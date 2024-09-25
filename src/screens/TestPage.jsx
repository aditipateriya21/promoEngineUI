import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TestForm from '../components/testorder/TestForm';
import { analyzeOrder } from '../services/orderApi'; 

function TestPage() {
    const [orderId, setOrderId] = useState('');

    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/'); 
    };

    return (
        <div className="test-page">
            <div className="test-form">
                <h2>Order Explainer</h2>
                <TestForm
                    orderId={orderId}
                    setOrderId={setOrderId}
                    goToHomePage={goToHomePage}
                />
            </div>
        </div>
    );
}

export default TestPage;
