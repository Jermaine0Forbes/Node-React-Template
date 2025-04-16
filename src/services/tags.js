export const fetchTags = async (page) => {
    return await fetch(process.env.URL+'/api/tags/?page='+page, { 
        method:'GET', 
        headers:{
            'Content-Type': "application/json"
        },
    })
    .then(resp => resp.json())
    .catch(err => console.error(err));
}

export const fetchEntriesByTag = async (id, page) => {
    return await fetch(process.env.URL+`/api/tag/entries?id=${id}&page=${page}`, { 
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
