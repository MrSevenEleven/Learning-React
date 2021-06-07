import React, {Fragment} from 'react';
import Store from './store'
import {observer} from "mobx-react";

let appStore=new Store();
@observer
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <div>MOBX</div>
                <View store={appStore}/>
                <Action store={appStore}/>
            </Fragment>
        )
    }
}

const View=observer((props)=>{
    return (
        <Fragment>
            <div>Store.name is {props.store.name}</div>
            <div>Store.count is {props.store.count}</div>
        </Fragment>
    )
})


const Action=(props)=>{
    return (
        <Fragment>
            <button onClick={props.store.changeCount}>changeCount</button>
            <button onClick={props.store.changeName}>changeName</button>
        </Fragment>
    )
}


export default App;