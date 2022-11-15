export const fetchData = (url, methodType, body) => { 
    if (methodType === 'GET') {
        return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`status ${response.status} at URL: ${response.url}`);
            }
            return response;
        })
        .then(response => response.json());
    }
    
    if (methodType === 'POST') {
        // const postBookings = [];
        const bookings = fetch(url, {
            method: methodType,
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`status ${response.status} at URL: ${response.url}`);
            }
            return response;
        })
        .then((response) => response.json())
        .then(data => console.log('POST', data))
        // postBookings.push(bookings)
        // return postBookings
    }

    if (methodType === 'DELETE') {
        return fetch(url, {
            method: methodType,
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`status ${response.status} at URL: ${response.url}`);
            }
            return response;
        })
    }
}

export function postAll(requests) {
    return Promise.all(requests)
    .then((data) => data)
}