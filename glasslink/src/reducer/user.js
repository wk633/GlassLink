import axios from 'axios';
import {message} from 'antd';
message.config({
    top: 54
})
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERR_MSG = 'ERR_MSG';

const initState = {
    user: '',
    msg: {}
}
export default function user(state=initState, action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state, isAuth: true, redirectTo: '/joblist', ...action.payload, msg:{type:'info', content: 'login success'}};
        case ERR_MSG:
            return {...state, isAuth: false, msg: {type:'error', content: action.errmsg}};
        default:
            return state;
    }
}
export function login({user, pwd}){
    return dispatch => {
        axios.post('/user/login', {user, pwd})
        .then(res=>{
            if(res.status === 200){
                if(res.data.code === 0){
                    dispatch(authSuccess(res.data.data));
                }else{
                    console.log(res.data.errmsg);
                    dispatch(errmsg(res.data.errmsg));
                }
            }else{
                dispatch('network error');
            }
        })
    }
}
export function signup({user, pwd}) {
    return dispatch => {
        axios.post('user/signup', {user, pwd})
        .then(res=>{
            if(res.status === 200){
                if(res.data.code === 0){
                    dispatch(authSuccess(res.data.data));
                }else{
                    console.log(res.data.errmsg);
                    dispatch(errmsg(res.data.errmsg));
                }
            }else{
                dispatch('network error');
            }
        })
    }
}

function authSuccess(data){
    return {type: AUTH_SUCCESS, payload: data}
}
function errmsg(errmsg){
    return {errmsg, type: ERR_MSG};
}