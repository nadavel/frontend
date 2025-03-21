import { BugPreview } from "./BugPreview.jsx"
import { Link } from "react-router-dom";


export function BugList({ bugs, onRemoveBug, onEditBug }) {

    return (
        < ul className="bug-list" >
            {
                bugs.map(bug => {
                    return (
                        <li className="bug-preview" key={bug._id}>
                            < BugPreview bug={bug} />
                            <div>
                                <button onClick={() => onRemoveBug(bug._id)}>x</button>
                                <button><Link to={`/bug/edit/${bug._id}`}>Edit</Link></button>
                            </div>
                            <Link to={`/bug/${bug._id}`}>Details</Link>
                        </li>
                    )
                })
            }
        </ul >
    )
}

