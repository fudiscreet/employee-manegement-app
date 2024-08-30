import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useLoading } from '../contexts/LoadingContext';
import { useError } from '../contexts/ErrorContext';

const EmployeeEdit = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [photo, setPhoto] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { showError } = useError();

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/employees/${id}`);
        const { Name, Position } = response.data;
        setName(Name);
        setPosition(Position);
      } catch (error) {
        showError('Failed to fetch employee details');
        console.error('Error fetching employee:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id, setLoading, showError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('position', position);
    if (photo) formData.append('photo', photo);

    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/employees/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate(`/employees/${id}`);
    } catch (error) {
      showError('Failed to update employee');
      console.error('Error updating employee:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit Employee
      </Typography>
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        margin="normal"
        required
      />
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={(e) => setPhoto(e.target.files[0])}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span" sx={{ mt: 2, mb: 2 }}>
          Change Photo
        </Button>
      </label>
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Update Employee
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeEdit;