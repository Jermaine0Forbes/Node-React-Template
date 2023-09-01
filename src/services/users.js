
export const fetchUser = async (id) => {
    const res = await fetch(process.env.URL+'/api/user/'+id);

    if(res.status == 200){
        return res.json();
    }

    return res.status
};

export const updateUser = async (id,data) => {
    return fetch(process.env.URL+'/api/user/'+id, {
        method: "PUT",
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(err => err);
};

export const deleteUser = async (id) => {
    const resp = await fetch(process.env.URL+'/api/user/'+id,{
        method: 'DELETE',
    });
    return await resp.status;
}