import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Pagination, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLoading } from '../contexts/LoadingContext';
import { useError } from '../contexts/ErrorContext';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { loading, setLoading } = useLoading();
  const { showError } = useError();
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/employees');
        setEmployees(response.data);
        setTotalPages(Math.ceil(response.data.length / rowsPerPage));
      } catch (error) {
        showError('Failed to fetch employees');
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [setLoading, showError]);


  const filteredEmployees = employees.filter(employee => 
    employee.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.Position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedEmployees = filteredEmployees.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Employee List
      </Typography>
      <TextField
        fullWidth
        label="Search employees"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        margin="normal"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEmployees.map((employee) => (
              <TableRow key={employee.EmployeeId}>
                <TableCell>{employee.Name}</TableCell>
                <TableCell>{employee.Position}</TableCell>
                <TableCell>
                  <img src={employee.photoUrl} alt={employee.Name} style={{ width: 50, height: 50, objectFit: 'cover' }} />
                </TableCell>
                <TableCell>
                  <Button component={Link} to={`/employees/${employee.EmployeeId}`} variant="contained" color="primary" size="small">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        color="primary"
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

export default EmployeeList;