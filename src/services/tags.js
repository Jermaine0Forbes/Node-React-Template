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