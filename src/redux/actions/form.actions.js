import { bindActionCreators } from 'redux';
import { combineReducers, createStore } from 'redux';

export const ACTION_UPDATE_DATA = 'ACTION_UPDATE_DATA';

const InitialData = {
    data: {
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        email: ''
    }
}

export default function SubmitForm(state = InitialData, action) {

    switch (action.type) {
        case ACTION_UPDATE_DATA:
            return {...state, data: action.payload};
                
        default:
            return state;
    }
}

export const updateData = (data) => {
    return {
        type: ACTION_UPDATE_DATA,
        payload: data
    }
};

const reducers = combineReducers({
    submit: SubmitForm
})

export const store = createStore(reducers);

store.subscribe(() => {
    console.log(store.getState());
})

export const actionCreators = bindActionCreators(
    {
      updateData
    },
    store.dispatch
  );