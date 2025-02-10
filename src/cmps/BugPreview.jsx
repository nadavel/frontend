import {utilService} from '../services/util.service.js'

export function BugPreview({ bug }) {
    const timestamp = utilService.formatTimestamp(bug.createdAt)
    return (
        <article >
            <h4>{bug.title}</h4>
            <h1>🐛</h1>
            <p>Severity: <span>{bug.severity}</span></p>
            <p>owner: <span>{bug.ownerId}</span></p>
            <p>Created at: <span>{timestamp}</span></p>
        </article>
    )
}