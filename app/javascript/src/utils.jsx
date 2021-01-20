export async function fetchLogin(method, url, data) {

    const apiRequest = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    
    return await fetch(url, apiRequest)
    .then(response => response.json()).then(data => { 
        return data.success
    }).catch(error => console.log("Error: ", error))
    
}

export async function fetchSignUp(method, url, data) {

    const apiRequest = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    
    return await fetch(url, apiRequest)
    .then(response => response.json()).then(data => console.log('Success?: ', data.success)).catch(error => console.log("Error: ", error))
    
}

export default fetchLogin