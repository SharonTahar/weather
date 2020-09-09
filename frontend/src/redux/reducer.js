import {combineReducers} from 'redux';
import { TEXT, DAYSTEXT, CITY, APIKEY, AUTHENTICATE } from './constants'


let initText = {
    searchText: '', 
}

export const getText = (state=initText, action={}) =>{
    switch (action.type) {
        case TEXT:
            // console.log('reducer:', action.type);
        return {...state, searchText:action.payload}
    default:
        return {...state}
    }
}

let initFMatch = {
    res: {}
}

export const setText = (state=initFMatch, action={}) => {
    switch (action.type) {
        case DAYSTEXT:
            return {...state, res:action.payload}
        default: 
            return {...state}
    }
}

let initCity = {
    city: []
}

export const setCity = (state=initCity, action={}) => {
    switch (action.type) {
        case CITY:
            return {...state, city:action.payload}
        default: 
            return {...state}
    }
}

let initAuthenticated = {
    isAuthenticated: false,
    user: []
}

export const authenticateUser = (state=initAuthenticated, action={}) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {...state, user:action.payload, isAuthenticated:true}
        default: 
            return {...state}
    }
}





const rootReducer = combineReducers({
    getText,
    setText,
    setCity,
    authenticateUser

})
export default rootReducer;