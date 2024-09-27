
export const fetchUser = async (id) => {
    const res = await fetch(process.env.URL+'/api/user/'+id);

    if(res.status == 200){
        return res.json();
    }

    return res.status
};

export const fetchUsers = async () => {
    const res = await fetch(process.env.URL+'/api/users');
    return res.json();
 }

export const updateUser = async (id,data) => {
   const res = await fetch(process.env.URL+'/api/user/'+id, {
        method: "PUT",
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    })
    // .then(res => res.text())
    .catch(err => console.error(err));

    return res;
    // console.log(res)
    // if(res.ok){
        
    //     return res.text();
    // }
};

export const deleteUser = async (id) => {
    const resp = await fetch(process.env.URL+'/api/user/'+id,{
        method: 'DELETE',
    });
    return await resp.status;
}

export const postUser = (formData) =>{
    return fetch(process.env.URL+'/api/register', { 
        method:'POST', 
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(formData),
    })
    .catch(err => console.error(err));
};