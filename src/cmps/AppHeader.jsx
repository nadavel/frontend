import { UserMsg } from './UserMsg.jsx';
import { userService } from './../services/user.service.js'
import { LoginSignup } from './LoginSignup.jsx';
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useState } from "react"
import { useNavigate } from "react-router"
import { NavLink } from "react-router-dom"

// const { NavLink, useNavigate } = ReactRouterDOM

export function AppHeader() {
    const [loggedinUser, setLoggedinUser] = useState(userService.getLoggedinUser())

    async function onLogin(credentials) {
        console.log(credentials)
        try {
            const user = await userService.login(credentials)
            setLoggedinUser(user)
        } catch (err) {
            console.log('Cannot login :', err)
            showErrorMsg(`Cannot login`)
        }
    }

    async function onSignup(credentials) {
        console.log(credentials)
        try {
            const user = await userService.signup(credentials)
            setLoggedinUser(user)
            showSuccessMsg(`Welcome ${user.fullname}`)
        } catch (err) {
            console.log('Cannot signup :', err)
            showErrorMsg(`Cannot signup`)
        }
        // add signup
    }

    async function onLogout() {
        try {
            await userService.logout()
            setLoggedinUser(null)
        } catch (err) {
            console.log('can not logout');
        }
        // add logout
    }

    return (
        <header>
            <UserMsg />
            <section className="login-signup-container">
                {!loggedinUser && <LoginSignup onLogin={onLogin} onSignup={onSignup} />}

                {loggedinUser && <div className="user-preview">
                    <h3>Hello {loggedinUser.fullname}</h3>
                    <button onClick={onLogout}>Logout</button>
                </div>}
            </section>
            <nav>
                <NavLink to='/'>Home</NavLink> |
                <NavLink to='/bug'>Bugs</NavLink> |
                <NavLink to='/about'>About</NavLink> |
                <NavLink to='/users'>Users</NavLink>
            </nav>
            <h1>Bugs are Forever</h1>
        </header>
    )
}

function GreetUser({ user, onLogout, setUser }) {
    if (!user) return <LoginSignup setUser={setUser} />
    else {
        return (
            <div>
                <h2>Hello {user.username}</h2>
                <button onClick={onLogout}>Logout</button>
            </div>
        )
    }
}
