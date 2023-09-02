export const loginUser = async (data) => {
    const resp = await fetch(process.env.URL+'/api/login', {
        method: "POST",
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    });
    return  resp;
}
export const registerUser =  (formData) =>{
    return fetch(process.env.URL+'/api/register', { 
        method:'POST', 
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(formData),
    })
    .catch(err => console.error(err));
}