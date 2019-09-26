import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form';
import {store} from './redux/actions/form.actions'
import {Provider} from 'react-redux';


ReactDOM.render(
    <Provider store={store}>
        <Form />
    </Provider>,
    document.querySelector('#root')
);