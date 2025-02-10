import { useEffect, useState } from "react"


export function BugFilter({ filterBy, onSetFilterBy }) {
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

	useEffect(() => {
		onSetFilterBy(filterByToEdit)
	}, [filterByToEdit])

	function handleFilterChange(ev) {
		debugger
		let { name: field, value, type } = ev.target
		if (type === 'number') value = +value
		setFilterByToEdit({ ...filterByToEdit, [field]: value })
	}


	return <section className="bug-filter">

		{/* TODO: Add filter by labels too */}
		<label>
			Search by text
			<input
				placeholder="Search for bug"
				type="text"
				name="txt"
				value={filterByToEdit.txt}
				onChange={handleFilterChange}
			/>
		</label>

		<label>Search by minimun severity
			<input
				type="number"
				name="minSeverity"
				value={filterByToEdit.minSeverity}
				onChange={handleFilterChange}
			/>
		</label>

		<label>
                Search by labels
                <input
                    placeholder="Search for labels"
                    type="text"
                    name="labels"
                    value={filterByToEdit.labels}
                    onChange={handleFilterChange}
                />
            </label>

	</section>
}