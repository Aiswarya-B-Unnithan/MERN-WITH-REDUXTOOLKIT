import axios from 'axios';


const URL = 'http://localhost:3001/admin';


export const addUserdetails = async (data) => {

    try {
        console.log("step2")
        return await axios.post(`${URL}/add`, data)
    } catch (error) {
        console.log('error while clling add user Api', error)
    }
}

export const getUsers = async (req, res) => {
    console.log('get Userrrrsss')
    try {
        return await axios.get(`${URL}/all`)
    } catch (error) {
        console.log('error while calling getUserss Api',error)

    }

}

export const getUser = async (id) => {
    console.log('usssss', id)
    try {

        return await axios.get(`${URL}/${id}`)
    } catch (error) {
        console.error('erro while calling the user get api:', error);
        throw error;

    }

}

export const editUser = async (user, id) => {
    console.log(user, id, 'useeer')
    try {
        return await axios.put(`${URL}/${id}`, user)
    } catch (error) {
        console.log('error while calling Edit User', error)
    }
}


export const deleteUser = async (id) => {
    console.log('deleteee')
    try {
        return await axios.delete(`${URL}/${id}`)
    } catch (error) {
        console.log('errorrrrrrrr', error)
    }
}

