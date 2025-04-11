export const fetchTags = async () => {
    return await fetch(process.env.URL+'/api/tags/', { 
        method:'GET', 
        headers:{
            'Content-Type': "application/json"
        },
    })
    .then(resp => resp.json())
    .catch(err => console.error(err));
}

export const fetchTag = async (id) => {
    return await fetch(process.env.URL+'/api/tag/'+id, { 
        method:'GET', 

    })
    .then(resp => resp.json())
    .catch(err => console.error(err));
}


export const updateTag = async (data) => {
    return await fetch(process.env.URL+'/api/update/tag/', { 
        method:'PUT', 
        headers:{
            'Content-Type': "application/json",
            
        },
        body: JSON.stringify(data),
    });

}
