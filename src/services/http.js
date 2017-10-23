import axios from 'axios';
import config from '../config.json'
axios.defaults.baseURL = config.baseUrl;

// get all api data
export async function search(origin, destination, outwardDate, adults, children, returnDate, railcards, filClass, singles, returns, advance, offpeack, anytime) {
    let firstClass, standardClass;
    if(filClass === 'firstClass') {
        firstClass = true;
    } else if(filClass === 'standardClass') {
        standardClass = true;
    } else {
        firstClass = false;
        standardClass = false;
    }
    try {
        const search = await axios.get(`jp`, {
            params: {origin,destination,outwardDate,adults,children,returnDate,railcards,firstClass,standardClass,singles,returns,advance,offpeack,anytime}
        });
        return search.data;
    } catch (e) {
        console.error(e);
    }
}
