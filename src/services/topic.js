export const createTopic = async (data) => {
    return await fetch(process.env.URL+'/api/topic/create', { 
        method:'POST', 
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data),
    })
    .catch(err => console.error(err));
}

export const fetchTopic = async (id) => {
    return await fetch(process.env.URL+'/api/topic/'+id, { 
        method:'GET', 
        // headers:{
        //     'Content-Type': "application/json"
        // },
        // body: JSON.stringify({id: data}),
    })
    .then(resp => resp.json())
    .catch(err => console.error(err));
}


export const fetchTopics = async (id) => {
    return await fetch(process.env.URL+'/api/topics/'+id, { 
        method:'GET', 
        headers:{
            'Content-Type': "application/json"
        },
        // body: JSON.stringify({id: data}),
    })
    .then(resp => resp.json())
    .catch(err => console.error(err));
}