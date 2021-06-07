import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Store from './store'
import {observer} from "mobx-react";


@observer
class App extends React.Component({Store}) {

    render() {
        return (
            <Fragment>
                <div>MOBX</div>
                <div>Store is {Store.name}
                </div>
            </Fragment>
        )
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);