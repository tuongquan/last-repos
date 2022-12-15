
// import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
 import * as serviceWorker from './serviceWorker';
import {createRoot} from 'react-dom/client';
// ReactDOM.render(<App />, document.getElementById('root'));
const container = document.getElementById('root');
const app = createRoot(container);
app.render(<App></App>);
serviceWorker.unregister();
