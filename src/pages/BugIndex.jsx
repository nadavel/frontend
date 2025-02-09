import { utilService } from '../../../backend/services/util.service.js'
import { BugFilter } from '../cmps/BugFilter.jsx'
import { BugList } from '../cmps/BugList.jsx'
import { BugSort } from '../cmps/BugSort.jsx'
import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useState, useEffect } from 'react'

export function BugIndex() {

    const [bugs, setBugs] = useState(null)
    const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(bugService.getDefaultSort())

    useEffect(() => {
        loadBugs()
    }, [filterBy, sortBy])

    async function loadBugs() {
        try {
            const bugs = await bugService.query(filterBy, sortBy)
            setBugs(bugs)
        } catch (err) {
            console.log('Cannot load bugs')
            showErrorMsg('Cannot load bugs')
        }
    }

    function onSetFilterBy(fieldsToUpdate) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...fieldsToUpdate }))
    }

    function onSetSortBy(fieldsToUpdate) {
        setSortBy(prevSortBy => ({ ...prevSortBy, ...fieldsToUpdate }))
    }

    function onChangePageIdx(pageIdx) {
        setFilterBy(prevFilter => ({ ...prevFilter, pageIdx }))
    }

    async function onRemoveBug(bugId) {
        try {
            await bugService.remove(bugId)
            setBugs(prevBugs => prevBugs.filter(bug => bug._id !== bugId))
            showSuccessMsg('Bug removed')
        } catch (err) {
            console.log('Cannot remove bug', err);
            showErrorMsg('Cannot remove bug')
        }
    }

    async function onAddBug() {
        const bug = {
            title: prompt('Bug title?'),
            severity: +prompt('Bug severity'),
            desc: 'some basic descrition'
        }

        try {
            const savedBug = await bugService.save(bug)
            setBugs(prevBugs => [...prevBugs, savedBug])
            showSuccessMsg('Bug added')
        } catch (err) {
            console.log('Had issues adding bug', err)
            showErrorMsg('Cannot add bug')
        }
    }

    async function onEditBug(bug) {
        const severity = +prompt('New severity?')
        const bugToSave = { ...bug, severity }
        try {
            const savedBug = await bugService.save(bugToSave)
            console.log(savedBug)
            setBugs(prevBugs => prevBugs.map(bug => bug._id === savedBug._id ? savedBug : bug))
            showSuccessMsg('Bug updated')
        } catch (err) {
            console.log('Cannot update bug', err);
            showErrorMsg('Cannot update bug')
        }
    }

    if (!bugs) return <div>Loading...</div>
    const isPaging = filterBy.pageIdx !== undefined
    return (
        <div>
            <h3>Bugs App</h3>
            <main>

                <div className="bug-pagination">
                    <label> Use paging
                        <input type="checkbox" checked={isPaging} onChange={() => onChangePageIdx(isPaging ? undefined : 0)} />
                    </label>
                    {isPaging && <>
                        <button onClick={() => onChangePageIdx(filterBy.pageIdx - 1)}>-</button>
                        <span>{filterBy.pageIdx + 1}</span>
                        <button onClick={() => onChangePageIdx(filterBy.pageIdx + 1)}>+</button>
                    </>}
                </div>
                <BugFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                <BugSort sortBy={sortBy} onSetSortBy={onSetSortBy} />
                <br /><br />

                <button onClick={onAddBug}>Add Bug +</button>
                <BugList
                    bugs={bugs}
                    onRemoveBug={onRemoveBug}
                    onEditBug={onEditBug} />
            </main>
        </div>
    )
}

