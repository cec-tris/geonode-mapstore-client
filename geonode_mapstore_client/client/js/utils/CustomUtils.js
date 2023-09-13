import {API} from '@mapstore/framework/api/searchText';
import DataHubAPI from '@js/api/geonode/datahub/index';


export function initAppCustom(){
    API.Utils.setService("GET_ICONS_API", DataHubAPI.getIcons)
    API.Utils.setService("GET_EXTERNAL_DATA_API", DataHubAPI.getExternalData)
    API.Utils.setService("CUSTOM_GEOCODE", DataHubAPI.geocode)
}