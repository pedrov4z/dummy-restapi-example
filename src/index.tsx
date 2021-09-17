import { CssBaseline } from '@material-ui/core';
import { ConfirmProvider } from 'material-ui-confirm';
import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import MuiThemeProvider from './components/MuiThemeProvider/MuiThemeProvider';
import EmployeesProvider from './contexts/EmployeesContext';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider>
      <ConfirmProvider>
        <EmployeesProvider>
          <App />
          <ToastContainer />
        </EmployeesProvider>
      </ConfirmProvider>
      <CssBaseline />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
