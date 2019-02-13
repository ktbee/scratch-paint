import bindAll from 'lodash.bindall';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers/combine-reducers';
import {intlInitialState, IntlProvider} from './reducers/intl.js';
import PaintEditor from '../../../src/index.js';

const store = createStore(
    reducer,
    intlInitialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// These variables are going to be available in the "window global" intentionally.
// Allows you easy access to debug with `vm.greenFlag()` etc.
var canvas = document.getElementById('test');

document.getElementById('file').addEventListener('click', e => {
    document.body.removeChild(document.getElementById('loaded'));
});
document.getElementById('file').addEventListener('change', e => {
    const reader = new FileReader();
    const thisFileInput = e.target;
    const file = thisFileInput.files[0];

    reader.onload = () => {
        ReactDOM.render(
             <Provider store={store}>
                <IntlProvider>
                    <PaintEditor image={reader.result} onUpdateImage={()=>{}} onUpdateName={()=>{}} />
                </IntlProvider>
            </Provider>,
        document.querySelector('#loaded'));

        // we add a `#loaded` div to our document, the integration suite
        // waits for that element to show up to assume paint editor is ready
        const div = document.createElement('div');
        div.id='loaded';
        document.body.appendChild(div);
    };

    if (file.type.includes('svg')) {
        reader.readAsText(file);
    } else {
        reader.readAsDataURL(file);
    }
});
