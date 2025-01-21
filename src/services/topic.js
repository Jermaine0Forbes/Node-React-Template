export const createTopic = async (data) => {
    return await fetch(process.env.URL+'/api/topic/create', { 
        method:'POST', 
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(formData),
    })
    .catch(err => console.error(err));
}