import axios from '@mapstore/framework/libs/ajax';
import {API} from '@mapstore/framework/api/searchText';

function getIcons(search, page=1, limit = 10){
    if(!search){
        search =''
    }
    const geoNodePageConfig = window.__GEONODE_CONFIG__ //||  {baseIconsUrl:'http://192.168.1.30:8003/' };
    const {baseIconsUrl} = geoNodePageConfig;
    const url = `${baseIconsUrl}icons/?format=json&search=${search}&page=${page}&limit=${limit}`
    return axios.get(url, {
        headers: {
            'Content-Type': "application/json"
        }
    }).then(function(response) {
        return response.data;
    });
}

export function initAppCustom(){
    API.Utils.setService("getIcons", getIcons)
}