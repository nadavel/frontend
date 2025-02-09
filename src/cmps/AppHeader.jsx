import { UserMsg } from './UserMsg.jsx';
import { userService } from './../services/user.service.js'
import { LoginSignup } from './LoginSignup.jsx';

import { useState } from "react"
import { useNavigate } from "react-router"
import { NavLink } from "react-router-dom"

// const { NavLink, useNavigate } = ReactRouterDOM

export function AppHeader() {



    return (
        <header>
            <UserMsg />
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
