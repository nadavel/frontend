import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { BugDetails } from './pages/BugDetails.jsx'
import { UserIndex } from './pages/UserIndex.jsx'
import { BugEdit } from './pages/BugEdit.jsx'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


export function RootCmp() {

    return (
        <Router>
            <AppHeader />
            <Routes>
                <Route element={<HomePage />} path="/"></Route>
                <Route element={<BugIndex />} path="/bug"></Route>
                <Route element={<BugDetails />} path="/bug/:bugId"></Route>
                <Route path="/bug/edit" element={<BugEdit />} />
                <Route path="/bug/edit/:bugId" element={<BugEdit />} />
                <Route element={<AboutUs />} path="/about"></Route>
                <Route element={<UserIndex />} path="/users"></Route>
            </Routes>
            <AppFooter />
        </Router>
    )
}


