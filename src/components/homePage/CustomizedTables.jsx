import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Box, Checkbox } from '@mui/material'; 
import { Link } from 'react-router-dom'; 

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.common.white, 
  '&.Mui-checked': {
    color: theme.palette.common.white, 
  },
}));

const formatConditions = (conditions) => {
  if (!conditions) {
    return <div>No conditions available.</div>;
  }
  console.log(typeof(conditions.minOrderAmount));

  // if (conditions.minOrderAmount && typeof conditions.minOrderAmount === 'object') {
  //   const { amount } = conditions.minOrderAmount;
  //   return <div><strong>Minimum Order Amount:</strong> ${amount}</div>;
  // }

  if (conditions.minOrderAmount && typeof conditions.minOrderAmount === 'object') {
    const { amount } = conditions.minOrderAmount; 
    return <div><strong>Minimum Order Amount:</strong> ${amount}</div>;
  }

  if (conditions.itemQuantityThreshold) {
    const { itemId, quantity } = conditions.itemQuantityThreshold;
    return (
      <div>
        <strong>Item ID:</strong> {itemId}<br />
        <strong>Quantity:</strong> {quantity}
      </div>
    );
  }

  if (conditions.bogo) {
    const { itemId, buyQuantity, getQuantity } = conditions.bogo;
    return (
      <div>
        <strong>Item ID:</strong> {itemId}<br />
        <strong>Buy Quantity:</strong> {buyQuantity}<br />
        <strong>Get Quantity:</strong> {getQuantity}
      </div>
    );
  }

  return <div>No specific condition found.</div>;
};


const CustomizedTables = ({ rules, handleDelete }) => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (event) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedRows(new Set(rules.map(rule => rule.id)));
    } else {
      setSelectedRows(new Set());
    }
    setSelectAll(checked);
  };

  const handleDeleteSelected = () => {
    selectedRows.forEach(id => handleDelete(id));
    setSelectedRows(new Set());
    setSelectAll(false);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteSelected}
          disabled={selectedRows.size === 0}
        >
          Delete Selected
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table aria-label="customized table" sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <StyledCheckbox
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </StyledTableCell>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Conditions</StyledTableCell>
              <StyledTableCell>Priority</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rules.map((rule) => (
              <StyledTableRow key={rule.id}>
                <StyledTableCell>
                  <Checkbox
                    checked={selectedRows.has(rule.id)}
                    onChange={() => {
                      setSelectedRows((prev) => {
                        const newSelection = new Set(prev);
                        if (newSelection.has(rule.id)) {
                          newSelection.delete(rule.id);
                        } else {
                          newSelection.add(rule.id);
                        }
                        setSelectAll(newSelection.size === rules.length);
                        return newSelection;
                      });
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell>{rule.id}</StyledTableCell>
                <StyledTableCell>{rule.name}</StyledTableCell>
                <StyledTableCell>{formatConditions(rule.conditions)}</StyledTableCell>
                <StyledTableCell>{rule.priority}</StyledTableCell>
                <StyledTableCell>{rule.status}</StyledTableCell>
                <StyledTableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      component={Link}
                      to={`/edit-rule/${rule.id}`} // Ensure correct path
                      variant="outlined"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(rule.id)}
                      variant="outlined"
                      color="error"
                    >
                      Delete
                    </Button>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomizedTables;

