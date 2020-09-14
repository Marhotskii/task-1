import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ConcatPage} from './pages/ConcatPage'
import {GeneratePage} from './pages/GeneratePage'
import {ImportPage} from './pages/ImportPage'

export const useRoutes = () => {
    return (
        <Switch>
            <Route path='/concat' exact>
                <ConcatPage/>
            </Route>
            <Route path='/generate' exact>
                <GeneratePage/>
            </Route>
            <Route path='/import' exact>
                <ImportPage/>
            </Route>
            <Redirect to='/generate' />
        </Switch>
    )
}