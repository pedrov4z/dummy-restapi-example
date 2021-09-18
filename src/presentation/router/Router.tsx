
import { AppScaffold } from '@/presentation/components'
import { Home } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Router: React.FC = () => {
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

export default Router;
