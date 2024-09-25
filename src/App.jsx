import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConfigPage from './screens/ConfigPage'; 
import Header from './components/header/header'
import Test from './screens/TestPage';
import HomePage from './screens/HomePage';
import './App.css'; // Make sure you have your styles here
import EvaluateOrder from './screens/EvaluateOrder';
import EditRulePage from './components/homePage/EditRulePage';


function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create-rule" element={<ConfigPage />} />
                <Route path="/order-explainer" element={<Test />} /> 
                <Route path="/evaluate-order" element={<EvaluateOrder />} />
                <Route path="/edit-rule/:id" element={<EditRulePage/>} />

             <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;

