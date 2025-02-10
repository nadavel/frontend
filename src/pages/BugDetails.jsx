import { bugService } from "../services/bug.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

import { useState, useEffect } from 'react'
import { useParams } from "react-router"
import {  Link } from 'react-router-dom'


export function BugDetails() {

    const [bug, setBug] = useState(null)
    const { bugId } = useParams()

    useEffect(() => {debugger
        bugService
            .getById(bugId)
            .then(bug => { console.log(bug);
             setBug(bug) })
            .catch(err => { showErrorMsg('Cannot load bug') })
    }, [bugId])

    return (
        bug && <div>
            <h3>Bug Details 🐛</h3>
            <h4>{bug.title}</h4>
            <p>Severity: <span>{bug.severity}</span></p>
            <p>Description: <span>{bug.desc}</span></p>
            <p>Labels: {bug.labels.map((label, index) => (
             <span key={index}>{`[${label}]`} </span>))}</p>
            <Link to="/bug">Back to List</Link>
        </div>
    )
}

