import { userService } from "../services/user.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"

export function UserEdit() {
    const [user, setUser] = useState({ username: '', fullname: '', password: '', score: 0 })
    const { userId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (userId) {
            userService.getById(userId)
                .then(user => setUser(user))
                .catch(err => showErrorMsg('Cannot load user'))
        }
    }, [userId])

    function handleChange({ target }) {debugger
        const { name, value } = target
        setUser(prevUser => ({ ...prevUser, [name]: value }))
    }

    function onSaveUser(ev) {debugger
        ev.preventDefault()
        userService.save(user)
            .then(() => {
                showSuccessMsg('User saved')
                navigate('/users')
            })
            .catch(err => showErrorMsg('Cannot save user'))
    }

    return (
        <section>
            <h2>{userId ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={onSaveUser}>
                <label>
                    Username:
                    <input type="text" name="username" value={user.username} onChange={handleChange} />
                </label>
                <label>
                    Fullname:
                    <input type="text" name="fullname" value={user.fullname} onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={user.password} onChange={handleChange} />
                </label>
                <label>
                    Score:
                    <input type="number" name="score" value={user.score} onChange={handleChange} />
                </label>
                <button type="submit">Save</button>
            </form>
        </section>
    )
}