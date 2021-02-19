import React from 'react';
import ReactDOM from 'react-dom';

//
// let text = 1000000000;
// const element = (
//     <div>
//         <h1>{text}</h1>
//         <button onClick={toggle}>toggle</button>
//     </div>
//
// );
//
// function toggle() {
//     text += 1;
// }
class LoggingButton extends React.Component {
    handleClick() {
        console.log('this is:', this);
    }

    render() {
        // 此语法确保 `handleClick` 内的 `this` 已被绑定。
        return (
            <button onClick={() => this.handleClick()}>
                Click me
            </button>
        );
    }
}

ReactDOM.render(
    // element,
    <LoggingButton></LoggingButton>,
    document.getElementById('root')
);

