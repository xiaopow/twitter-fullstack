import { safeCredentials, handleErrors } from './utils/fetchHelper';

export async function fetchLogin(data) {

    const apiRequest = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }
    
    return await fetch('api/sessions', safeCredentials(apiRequest))
    .then(response => response.json()).then(data => { 
        return data.success
    }).catch(error => console.log("Error: ", error))   
}

export async function fetchSession() {

    const apiRequest = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }
    
    return await fetch('api/authenticated', apiRequest)
    .then(response => response.json()).then(data => { 
        console.log(data.authenticated)
        return data
    }).catch(error => console.log("Error: ", error))   
}
export async function destroySession() {

    const apiRequest = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    }
    
    return await fetch('api/sessions', safeCredentials(apiRequest))
    .then(response => response).then(data => { 
        console.log(data)
    }).catch(error => console.log("Error: ", error))   
}

export async function fetchSignUp(data) {

    const apiRequest = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    
    return await fetch('api/users', safeCredentials(apiRequest))
    .then(response => response.json()).then(data => console.log('Success?: ', data.user)).catch(error => console.log("Error: ", error))
    
}

export default fetchLogin