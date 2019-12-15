import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import {CourseProvider} from './Context'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <CourseProvider>
    <Router>
<App />
</Router>
</CourseProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA