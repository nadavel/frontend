import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/' :
    '//localhost:3030/api/'

const BASE_USER_URL = BASE_URL + 'user/'
const BASE_AUTH_URL = BASE_URL + 'auth/'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    query,
    getById,
    remove,
    update,
    getEmptyUser
}

window.userService = userService

async function query() {
    try {
        const { data: users } = await axios.get(BASE_USER_URL)
        return users
    } catch (err) {
        console.error('Failed to get users', err)
        throw err
    }
}

async function getById(userId) {
    try {
        const { data: user } = await axios.get(BASE_USER_URL + userId)
        return user
    } catch (err) {
        console.error(`Failed to get user with id ${userId}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        return await axios.remove(BASE_USER_URL + userId)
    } catch (err) {
        console.error(`Failed to remove user with id ${userId}`, err)
        throw err
    }
}

async function update(userToUpdate) {
    try {
        const updatedUser = await axios.put(BASE_USER_URL, userToUpdate)
        if (getLoggedinUser().id === updatedUser.id) saveLocalUser(updatedUser)
        return updatedUser
    } catch (err) {
        console.error('Failed to update user', err)
        throw err
    }
}

async function login(credentials) {
    try {debugger
        const { data: user } = await axios.post(BASE_AUTH_URL + 'login', credentials)
        if (user) {
            return saveLocalUser(user)
        }
    } catch (err) {
        console.error('Failed to login', err)
        throw err
    }
}

async function signup(credentials) {
    try {
        const { data: user } = await axios.post(BASE_AUTH_URL + 'signup', credentials)
        return saveLocalUser(user)
    } catch (err) {
        console.error('Failed to signup', err)
        throw err
    }
}

async function logout() {
    try {
        await axios.post(BASE_AUTH_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    } catch (err) {
        console.error('Failed to logout', err)
        throw err
    }
}

function getEmptyUser() {
    return {
        username: '',
        fullname: '',
        password: '',
        imgUrl: '',
    }
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

