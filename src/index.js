import React from 'react';
import ReactDOM from 'react-dom';
import A11yMain from './containers/A11yMain';
// import a11y from 'react-a11y';
import './styles.css';

// if (process.env.NODE_ENV === 'development') a11y(React);

ReactDOM.render(
  <A11yMain />,
  document.getElementById('root')
);
