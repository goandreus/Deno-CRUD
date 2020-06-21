import {Response} from 'https://deno.land/x/oak/mod.ts'

interface User {
    id: string 
    name: string
}

const users: User[] = [{
    id: "1",
    name: "Andres"
}];


export const getUsers = ({response} : {response:Response} ) => {
    response.body = {
        message: 'successful Query',
        users
    }
}
export const getUser = () => {}
export const createUser = () => {}
export const updateUser = () => {}
export const deleteUser = () => {}