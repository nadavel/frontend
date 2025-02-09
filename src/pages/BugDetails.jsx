import { bugService } from "../services/bug.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

import { useState, useEffect } from 'react'
import { useParams } from "react-router"
import {  Link } from 'react-router-dom'


export function BugDetails() {

    const [bug, setBug] = useState(null)
    const { bugId } = useParams()

    useEffect(() => {
        bugService
            .getById(bugId)
            .then(setBug)
            .catch(err => { showErrorMsg('Cannot load bug') })
    }, [bugId])

    return (
        bug && <div>
            <h3>Bug Details 🐛</h3>
            <h4>{bug.title}</h4>
            <p>Severity: <span>{bug.severity}</span></p>
            <Link to="/bug">Back to List</Link>
        </div>
    )
}

