import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../contexts/LoadingContext';
import { useError } from '../contexts/ErrorContext';

const EmployeeForm = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { showError } = useError();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('position', position);
    formData.append('photo', photo);

    setLoading(true);
    try {
      await axios.post('http://localhost:3000/employees', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/');
    } catch (error) {
      showError('Failed to create employee');
      console.error('Error creating employee:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add New Employee
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
          Upload Photo
        </Button>
      </label>
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Add Employee
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeForm;