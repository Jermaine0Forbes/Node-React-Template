export const createEntry = async (data) => {
    return await fetch(process.env.URL+'/api/entry/create', { 
        method:'POST', 
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data),
    })
    .catch(err => err);
}

export const fetchEntries = async (id) => {
    return await fetch(process.env.URL+'/api/entries/'+id)
    .then(resp => resp.json())
    .catch(err => err);
}