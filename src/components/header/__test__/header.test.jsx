import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Header from './../header'; 
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; 

describe('Header Component', () => {
    test('renders the Header component correctly', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        
        
        expect(screen.getByRole('banner')).toBeInTheDocument();
        expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
        
        expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
        expect(screen.getByText(/PromoEngine/i)).toBeInTheDocument();
    });

    test('opens and closes the menu on button click', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const menuButton = screen.getByRole('button', { name: /menu/i });
        fireEvent.click(menuButton);
        
        expect(screen.getByText(/Create Rule/i)).toBeVisible();
        expect(screen.getByText(/Order Explainer/i)).toBeVisible();
        expect(screen.getByText(/Evaluate Order/i)).toBeVisible();

        const menuItem = screen.getByText(/Create Rule/i);
        fireEvent.click(menuItem);

        expect(screen.queryByText(/Create Rule/i)).not.toBeVisible();
    });

    test('navigates to the correct route on menu item click', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Header />} />
                    <Route path="/create-rule" element={<div>Create Rule Page</div>} />
                    <Route path="/order-explainer" element={<div>Order Explainer Page</div>} />
                    <Route path="/evaluate-order" element={<div>Evaluate Order Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        const menuButton = screen.getByRole('button', { name: /menu/i });
        fireEvent.click(menuButton);

        const createRuleMenuItem = screen.getByText(/Create Rule/i);
        fireEvent.click(createRuleMenuItem);

        // Check if the URL changes to the correct path and page content is rendered
        expect(screen.getByText(/Create Rule Page/i)).toBeInTheDocument();
    });
    
});
