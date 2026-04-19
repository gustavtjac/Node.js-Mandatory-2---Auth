const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchGet(endpoint) {
    try {
        const response = await fetch(BASE_URL + endpoint, {
            credentials: 'include'
        });


        if(!response.ok){
            throw await response.json();
        }

        return await response.json();
    } catch (error) {
        throw error;
    };
}


export async function fetchPost(endpoint, body) {
    try {
        const response = await fetch(BASE_URL + endpoint, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if(!response.ok){
            throw await response.json();
        }

        return await response.json();
    } catch (error) {
        console.log(error)
        throw error;
    }

}