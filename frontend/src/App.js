import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeDetail from './components/EmployeeDetail';
import EmployeeEdit from './components/EmployeeEdit';
import { LoadingProvider } from './contexts/LoadingContext';
import { ErrorProvider } from './contexts/ErrorContext';

const App = () => {
  return (
    <ErrorProvider>
      <LoadingProvider>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Employee Management
              </Typography>
              <Button color="inherit" component={Link} to="/">
                Employee List
              </Button>
              <Button color="inherit" component={Link} to="/add">
                Add Employee
              </Button>
            </Toolbar>
          </AppBar>
          <Container maxWidth="md" sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={<EmployeeList />} />
              <Route path="/add" element={<EmployeeForm />} />
              <Route path="/employees/:id" element={<EmployeeDetail />} />
              <Route path="/edit/:id" element={<EmployeeEdit />} />
            </Routes>
          </Container>
        </Router>
      </LoadingProvider>
    </ErrorProvider>
  );
};

export default App;