import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import axios from 'axios';
import { useLoading } from '../contexts/LoadingContext';
import { useError } from '../contexts/ErrorContext';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { showError } = useError();

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        showError('Failed to fetch employee details');
        console.error('Error fetching employee:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id, setLoading, showError]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:3000/employees/${id}`);
        navigate('/');
      } catch (error) {
        showError('Failed to delete employee');
        console.error('Error deleting employee:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!employee) return null;

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <CardMedia
        component="img"
        height="300"
        image={employee.photoUrl}
        alt={employee.Name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {employee.Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Position: {employee.Position}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Employee ID: {employee.EmployeeId}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Button component={Link} to={`/edit/${employee.EmployeeId}`} variant="contained" color="primary">
          Edit
        </Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
        <Button component={Link} to="/" variant="outlined">
          Back to List
        </Button>
      </Box>
    </Card>
  );
};

export default EmployeeDetail;