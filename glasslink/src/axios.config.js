import axios from 'axios';

axios.interceptors.request.use(function(config){
    // do something
    console.log("axios.interceptors.request");
    return config;
})
axios.interceptors.response.use(function(config) {
    // do something
    console.log("axios.interceptors.response");
    return config;
})