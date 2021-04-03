import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { loadTheme } from '@fluentui/style-utilities';

import { BrowserRouter as Router } from 'react-router-dom';

loadTheme({
  palette: {
    themePrimary: '#75f4ff',
    themeLighterAlt: '#050a0a',
    themeLighter: '#132729',
    themeLight: '#23494d',
    themeTertiary: '#469299',
    themeSecondary: '#67d6e0',
    themeDarkAlt: '#83f5ff',
    themeDark: '#96f6ff',
    themeDarker: '#b2f9ff',
    neutralLighterAlt: '#191b1c',
    neutralLighter: '#222325',
    neutralLight: '#2f3234',
    neutralQuaternaryAlt: '#383b3d',
    neutralQuaternary: '#3f4245',
    neutralTertiaryAlt: '#5d6165',
    neutralTertiary: '#e2e2e2',
    neutralSecondary: '#e7e7e7',
    neutralPrimaryAlt: '#ebebeb',
    neutralPrimary: '#d4d4d4',
    neutralDark: '#f5f5f5',
    black: '#fafafa',
    white: '#111213',
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
