import {combineReducers} from 'redux';
import intlReducer from './intl';
import {ScratchPaintReducer} from '../../../../src/index.js';

export default combineReducers({
    intl: intlReducer,
    scratchPaint: ScratchPaintReducer
});
