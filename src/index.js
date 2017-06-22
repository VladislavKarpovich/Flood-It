import App from './App';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Root = () => (
  <MuiThemeProvider>
      <App />
  </MuiThemeProvider>
);


const root =  document.getElementById('root');
ReactDOM.render(<Root />, root);
