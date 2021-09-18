
import { AppScaffold } from '@/presentation/components'
import { Home } from '@/presentation/pages'
import { useTheme } from '@material-ui/core'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const Router: React.FC = () => {
    const theme = useTheme();
    
    return (
        <BrowserRouter>
            <AppScaffold>
                <Switch>
                    <Route path="/" exact component={Home} />
                </Switch>

                <ToastContainer position="bottom-center" theme={theme.palette.type} />
            </AppScaffold>
        </BrowserRouter>
    )
}

export default Router;
