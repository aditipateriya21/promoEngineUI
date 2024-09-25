import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function AnalysisTable({ data }) {
    const { appliedRules } = data;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="order analysis table">
                <TableHead>
                    <TableRow>
                        <TableCell>Rule ID</TableCell>
                        <TableCell>Rule Name</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appliedRules.map((ruleObj, index) => {
                        const rule = ruleObj.rule;
                        return (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {rule.id}
                                </TableCell>
                                <TableCell>{rule.name}</TableCell>
                                <TableCell>{rule.priority}</TableCell>
                                <TableCell>{rule.status}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AnalysisTable;
