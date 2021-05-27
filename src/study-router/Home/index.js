import React from 'react'
// history
import {BrowserRouter as Router, Link, Switch,Route,useHistory,withRouter} from 'react-router-dom';
// hash
// import { Link, Route, HashRouter as Router } from 'react-router-dom';

function Page1children1() {
    return (
        <h1>我是page1Children1</h1>
    )
}
function Page1children2() {
    return (
        <h1>我是Page1children2</h1>
    )
}



function Page1(props) {
    const routerChange1=()=>{
        props.history.push('/page1')
    }
    const routerChange2=()=>{
        props.history.push('/page1/page1Children2')
    }
    return (
        <>
            <h1>我是Page1</h1>
            <button page={'page1Children1'} onClick={routerChange1}>children1</button>
            <button page={'page1Children2'} onClick={routerChange2}>children2</button>
            <Switch>
                <Route exact path="/page1" component={Page1children1}></Route>
                <Route exact path="/page1/page1Children2" component={Page1children2}></Route>
            </Switch>
        </>

    )
};

function Page2() {
    return (
        <h1>我是Page2</h1>
    )
}

function Page3() {
    return (
        <h1>我是Page3</h1>
    )
}



class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            router:['page1','page2','page3']
        }
    }
    // let router=['page1','page2','page3'];
    // let history=useHistory()
    goNextPage(item){
        this.props.history.push(item)
    }

    render(){
        return (
            <>
                <div>Home</div>
                {this.state.router.map(item=>{
                    return <button onClick={this.goNextPage.bind(this,item)} key={item}>{item}</button>
                })}
                    {/*<ul>*/}
                    {/*    <li>*/}
                    {/*        <Link to="page1">Page1</Link>*/}
                    {/*    </li>*/}
                    {/*    <li>*/}
                    {/*        <Link to="page2">Page2</Link>*/}
                    {/*    </li>*/}
                    {/*    <li>*/}
                    {/*        <Link to="page3">Page3</Link>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}

                    <Switch>
                        <Route  path="/page1" component={Page1}></Route>
                        <Route  path="/page2" component={Page2}></Route>
                        <Route  path="/page3" component={Page3}></Route>
                    </Switch>

            </>
        )
    };
}

export default withRouter(Home)
