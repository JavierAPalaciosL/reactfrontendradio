import { SEARCH } from '../routes/Routes';
import { PARSERCHANNEL } from '../routes/Routes';

export default class RadioAPI {

    constructor() {}
    
    async searchStation(query) {
        const response = await fetch(`${SEARCH}?query=${query}`, {
            method: 'GET',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        });
        const json = await response.json();
        return json;
    }

    async parseChannel(channel) {
        const response = await fetch(`${PARSERCHANNEL}/${channel}`, {
            method: 'GET',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        });
        const json = await response.json();
        return json;
    }

}