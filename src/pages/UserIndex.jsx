import rect, { useState, useEffect } from "react"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js';
import { Link } from "react-router-dom";

export function UserIndex() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.query().then(setUsers)
    }, [])

    async function onRemoveUser(userId) {
        try {

            await userService.remove(userId)
            setUsers(prevUsers => prevUsers.filter(user => user._id !== userId))
            console.log('Removed successfully - user MSG YAY');
        } catch (err) {
            console.log('here is the msg from the server', err.response.data)
            console.log('Had issues removing the user')
        }
    }

    async function onEditUser(userId) {
        const user = users.find(user => user._id === userId)
        let userToSave = {
            _id: userId,
            fullname: prompt('Full name?', user.fullname),
            username: prompt('Username?', user.username),
            password: prompt('Password?', user.password)
        }

        try {
            const savedUser = await userService.save(userToSave)
            setUsers(prevUsers => [...prevUsers, savedUser])
            showSuccessMsg('User updated')
        } catch (err) {
            console.log('Had issues updating user', err)
            showErrorMsg('Cannot add user')
        }
    }

    async function onAddUser() {
        let user = {
            fullname: prompt('Full name?'),
            username: prompt('Username?'),
            password: prompt('Password?')
        }
        user.createdAt = Date.now()

        try {
            const savedUser = await userService.save(user)
            setUsers(prevUsers => [...prevUsers, savedUser])
            showSuccessMsg('User added')
        } catch (err) {
            console.log('Had issues adding user', err)
            showErrorMsg('Cannot add user')
        }
    }

    return <section className="admin-dashboard">

        <hr />
        <button onClick={onAddUser}>Add User +</button>
        <h3>Here are the usersss</h3>

        {
            users.map(user => <div key={user._id} style={{ border: "1px solid black", padding: "15px", margin: "10px" }}>
                <h4>user name: {user.username}</h4>
                <h4>id: {user._id}</h4>
                <button onClick={() => onRemoveUser(user._id)}>Remove user</button>
                <button><Link to={`/user/edit/${user._id}`}>Edit</Link></button>
            </div>)
        }


        <pre>
            {JSON.stringify(users, null, 2)}
        </pre>


    </section>
}