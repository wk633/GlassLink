import axios from 'axios';
import {message} from 'antd';
message.config({
    top: 54
})
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERR_MSG = 'ERR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const GET_LINKEDIN_JOBLIST = 'GET_LINKEDIN_JOBLIST';
const CHANGE_LINKEDIN_PAGE = 'CHANGE_LINKEDIN_PAGE';

const initState = {
    user: '',
    msg: {},
    linkedin: [],
    currentLinkedin: [],
    curLinkedinPage: 1
}
export default function user(state=initState, action){
    let p, currentLinkedin;
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state, isAuth: true, redirectTo: '/joblist', ...action.payload, msg:{type:'info', content: 'login success'}};
        case ERR_MSG:
            return {...state, isAuth: false, msg: {type:'error', content: action.errmsg}};
        case LOAD_DATA:
            return {...state, ...action.payload}
        case GET_LINKEDIN_JOBLIST:
            p = state.curLinkedinPage
            currentLinkedin = action.payload.linkedin ? action.payload.linkedin.slice((p-1)*10, p*10) : state.linkedin.slice((p-1)*10, p*10);
            return {...state, ...action.payload, currentLinkedin}
        case CHANGE_LINKEDIN_PAGE:
            p = action.payload.curLinkedinPage
            currentLinkedin = state.linkedin.slice((p-1)*10, p*10);
            console.log(p, currentLinkedin);
            return {...state, ...action.payload, currentLinkedin};
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
                dispatch(errmsg('network error'));
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
                dispatch(errmsg('network error'));
            }
        })
    }
}
export function loadData(userInfo){
    return {type: LOAD_DATA, payload: userInfo}
}
export function getLinkedinJobList(){
    return dispatch=>{
        axios.get('/user/notification?source=linkedin')
        .then(res=>{
            if(res.status === 200){
                if(res.data.code === 0){
                    console.log(res.data.data);
                    dispatch({
                        type: GET_LINKEDIN_JOBLIST, 
                        payload: {
                            'linkedin': res.data.data,
                            'currentLinkedin': []
                        }
                    });
                }else{
                    console.log(res.data.errmsg);
                    dispatch(errmsg(res.data.errmsg));
                }
            }else{
                dispatch(errmsg('network error'));
            }
        })
    }
}

export function changeLinkedinPage(page){
    console.log(page)
    return {type: CHANGE_LINKEDIN_PAGE, payload:{curLinkedinPage: page}}
}

function authSuccess(data){
    return {type: AUTH_SUCCESS, payload: data}
}
function errmsg(errmsg){
    return {errmsg, type: ERR_MSG};
}