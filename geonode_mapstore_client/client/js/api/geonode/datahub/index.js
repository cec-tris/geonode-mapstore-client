import axios from '@mapstore/framework/libs/ajax';
import {
    parseDevHostname
} from '@js/utils/APIUtils';

const assign = require('object-assign');

let endpoints = {
    'geocode': '/datahub/search/geocode',
    'reverseGeocode': '/datahub/search/reversegeocode',
    'externalData' : '/datahub/data',
    'icons' :'/icons'
};

function getBaseUrl(){
    const geoNodePageConfig = window.__GEONODE_CONFIG__ //||  {baseUrl:'http://192.168.1.30:8003/' };
    const {baseUrl} = geoNodePageConfig;
    return baseUrl;
}

function wait(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

const defaultOptions = {}
const DataHubAPI = {
    geocode: function(text, options) {
        var params = assign({q: text}, defaultOptions, options || {});
        const url = parseDevHostname(endpoints['geocode'])
        return axios.get(url, { params }).then(function(response) {
            console.log("chumano geocode", response)
            const responseData = response.data && response.data.result;
            return responseData;
        });
    },
    reverseGeocode: function(coords, options) {
        const params = assign({lat: coords.lat, lon: coords.lng}, options || {}, defaultOptions);
        const url = parseDevHostname(endpoints['reverseGeocode'])
        return axios.get(url, { params }); 
    },

    getExternalData: async function getExternalData(dataId){
        const baseUrl = getBaseUrl();
        const url = `${baseUrl}datahub/data/${dataId}`
        await wait(1000)
        return axios.get(url, {
            headers: {
                'Content-Type': "application/json"
            }
        }).then(function(response) {
            console.log("chumano getExternalData", response)
            const responseData = response.data;
            return responseData;
        });
        
    },
    getIcons: function (search, page=1, limit = 10){
        if(!search){
            search =''
        }
        const baseUrl = getBaseUrl();
        const url = `${baseUrl}icons/?format=json&search=${search}&page=${page}&limit=${limit}`
        return axios.get(url, {
            headers: {
                'Content-Type': "application/json"
            }
        }).then(function(response) {
            return response.data;
        });
    }
    
};



export default DataHubAPI;