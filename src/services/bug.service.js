import Axios from 'axios'
var axios = Axios.create({
    withCredentials: true,
})

export const bugService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    getDefaultSort
}
const BASE_URL = '//localhost:3030/api/bug/'


async function query(filterBy = { txt: '' }, sortBy = { by: '', sortDir: '' }) {
    const { data: bugs } = await axios.get(BASE_URL, { params: { filterBy, sortBy } })
    return bugs
}

async function getById(bugId) {
    const { data: bug } = await axios.get(BASE_URL + bugId)
    return bug
}

function remove(bugId) {
    return axios.delete(BASE_URL + bugId)
}

async function save(bug) {
    const method = bug._id ? 'put' : 'post'
    const { data: savedBug } = await axios[method](BASE_URL, bug)
    return savedBug
}

function getDefaultFilter() {
    return { txt: '', minSeverity: '', pageIdx: undefined }
}

function getDefaultSort() {
    return { by: '', sortDir: '' }
}
