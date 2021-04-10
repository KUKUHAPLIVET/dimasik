import React  from "react";

import ReactDOM from 'react-dom';
import store from "./redux/reduxStore";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import DimasikJsApp from "./app";


ReactDOM.render(<DimasikJsApp/>, document.getElementById('root'));


