import { useEffect, useState } from "react"

export function BugSort({ sortBy, onSetSortBy }) {

	const [sortByToEdit, setSortByToEdit] = useState(sortBy)

	useEffect(() => {
		onSetSortBy(sortByToEdit)
	}, [sortByToEdit])

	function handleSortChange(ev) {
		const { name, value } = ev.target
		setSortByToEdit({ ...sortByToEdit, [name]: value })
	}

	return <section className="bug-sort">
		<select id="selectOption" name="by" onChange={handleSortChange} value={sortBy.by}>
			<option value="">Sort by</option>
			<option value="severity">severity</option>
			<option value="title">title</option>
			<option value="createdAt">createdAt</option>
		</select>

		<select name="sortDir" onChange={handleSortChange} value={sortBy.sortDir}>
			<option value="">sorting order</option>
			<option value="1">ascending</option>
			<option value="-1">descending</option>
		</select>
	</section>
}