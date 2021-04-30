import React from 'react';

export default class JSX extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            text:props.text||'随机数为',
            randomNum:parseInt(Math.random()*100),
            list:['1a','2b','3c','4d','5f'].map(item=>{
            return (<li>列表{item}</li>)
        })
        }
    }
    updateText(){
        this.setState({
            randomNum:parseInt(Math.random()*100)
        })
    }
    render() {
        return (
            <div>
                <p>JSX component</p>
                <p>{this.state.randomNum>50&&this.state.randomNum+'大于50'}</p>
                <p>{this.state.text+this.state.randomNum}</p>
                <button onClick={this.updateText.bind(this)}>切换按钮</button>
                <h2>列表渲染</h2>
                <ul>{this.state.list}</ul>
            </div>
        )
    };
}
