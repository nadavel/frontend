import { bugService } from "../services/bug.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"

export function BugEdit() {
    const [bug, setBug] = useState({ title: '', severity: '', desc: '', labels: [] })
    const { bugId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (bugId) {
            bugService.getById(bugId)
                .then(bug => setBug(bug))
                .catch(err => showErrorMsg('Cannot load bug'))
        }
    }, [bugId])

    function handleChange({ target }) {
        const { name, value } = target
        setBug(prevBug => ({ ...prevBug, [name]: value }))
    }

    function handleLabelsChange({ target }) {
        const { value } = target
        setBug(prevBug => ({ ...prevBug, labels: value.split(',').map(label => label.trim()) }))
    }

    function onSaveBug(ev) {
        ev.preventDefault()
        bugService.save(bug)
            .then(() => {
                showSuccessMsg('Bug saved')
                navigate('/bug')
            })
            .catch(err => showErrorMsg('Cannot save bug'))
    }

    return (
        <section>
            <h2>{bugId ? 'Edit Bug' : 'Add Bug'}</h2>
            <form onSubmit={onSaveBug}>
                <label>
                    Title:
                    <input type="text" name="title" value={bug.title} onChange={handleChange} />
                </label>
                <label>
                    Severity:
                    <input type="number" name="severity" value={bug.severity} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <input type="text" name="desc" value={bug.desc} onChange={handleChange} />
                </label>
                <label>
                    Labels (comma separated):
                    <input type="text" name="labels" value={bug.labels.join(', ')} onChange={handleLabelsChange} />
                </label>
                <button type="submit">Save</button>
            </form>
        </section>
    )
}