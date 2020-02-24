import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/App';
// eslint-disable-next-line no-unused-vars
// import style from './css/App.less';
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './components/Luna_Full_Version_HTML/LESS/style.less'
// import './components/Luna_Full_Version_HTML/styles/style.css'
import * as serviceWorker from './serviceWorker';
import reducer from './redux/Store/reducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
const store = createStore(reducer, applyMiddleware(thunk));
serviceWorker.unregister();

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));