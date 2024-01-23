import axios from '@mapstore/framework/libs/ajax';
import {API} from '@mapstore/framework/api/searchText';

function getIcons(search, page=1, limit = 10){
    if(!search){
        search =''
    }
    const geoNodePageConfig = window.__GEONODE_CONFIG__ //||  {baseUrl:'http://192.168.1.30:8003/' };
    const {baseUrl} = geoNodePageConfig;
    const url = `${baseUrl}icons/?format=json&search=${search}&page=${page}&limit=${limit}`
    return axios.get(url, {
        headers: {
            'Content-Type': "application/json"
        }
    }).then(function(response) {
        return response.data;
    });
}
function wait(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function getExternalDataHub(dataId){
    const geoNodePageConfig = window.__GEONODE_CONFIG__ //||  {baseUrl:'http://192.168.1.30:8003/' };
    const {baseUrl} = geoNodePageConfig;
    const url = `${baseUrl}datahub/data/${dataId}`
    //await wait(1000)
    return axios.get(url, {
        headers: {
            'Content-Type': "application/json"
        }
    }).then(function(response) {
        const responseData = response.data;
        return responseData;
    });
    
}

export function initAppCustom(){
    API.Utils.setService("GET_ICONS_API", getIcons)
    API.Utils.setService("GET_DATAHUB_API", getExternalDataHub)
}