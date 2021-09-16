import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppScaffold from '../AppScaffold/AppScaffold'
import Home from '../Pages/Home/Home'

export default function Router() {
    return (
        <BrowserRouter>
            <AppScaffold>
                <Switch>
                    <Route path="/" exact component={Home} />
                </Switch>
            </AppScaffold>
        </BrowserRouter>
    )
}
