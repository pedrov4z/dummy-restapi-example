import MuiThemeProvider from '@/presentation/components/MuiThemeProvider/MuiThemeProvider';
import EmployeesProvider from '@/presentation/contexts/EmployeesContext';
import Router from '@/presentation/router/Router';
import { CssBaseline } from '@material-ui/core';
import { ConfirmProvider } from 'material-ui-confirm';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <MuiThemeProvider>
      <ConfirmProvider>
        <EmployeesProvider>
          <Router />
        </EmployeesProvider>
      </ConfirmProvider>
      <CssBaseline />
    </MuiThemeProvider>
  )
}

export default App;
