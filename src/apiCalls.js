export const fetchData = (url, methodType, data) => { 
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
        return fetch(url, {
            method: methodType,
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`status ${response.status} at URL: ${response.url}`);
            }
            return response;
        })
        .then(response => response.json());
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