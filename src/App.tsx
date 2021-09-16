import React from 'react';
import './App.css';
import Router from './components/Router/Router';
import EmployeesProvider from './contexts/EmployeesContext';

function App() {
  return (
    <EmployeesProvider>
      <Router />
    </EmployeesProvider>
  )
}

export default App;
