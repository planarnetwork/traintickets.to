import axios from 'axios';

axios.defaults.baseURL = 'http://traintickets.to/';

// get all api data
export async function search(origin, destination, outwardDate, adults, children, returnDate, railcards, filClass, singles, returns, advance) {
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
        const search = await axios.get(`jp/journey-plan`, {
            withCredentials: true,
            headers: {
                'Accept': '/',
                'Content-Type': 'application/json',
            },
            params: {origin,destination,outwardDate,adults,children,returnDate,railcards,firstClass,standardClass,singles,returns,advance}
        });
        return search.data;
    } catch (e) {
        console.error(e);
    }
}
