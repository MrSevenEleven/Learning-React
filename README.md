## 摘要

###组件&props
- 组件：函数组件、class组件。
- props传参
- 所有组件必须像纯函数一样保护它们的props不被更改
- 组件名称必须以大写字母开头，React 会将以小写字母开头的组件视为原生 DOM 标签。例如，<div/>代表HTML的div标签，而<Welcome/>则代表一个组件，并且需在作用域内使用 Welcome。

###state&生命周期
- State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件
- 函数组件转换为class组件：   
    1.创建同名es6class，继承于React.Component   
    2.添加render()方法，将函数体移到render()方法中    
    3.render()方法中使用this.props替换props使用
    
    ```
    class Clock extends React.Component {
       render() {
         return (
           <div>
             <h1>Hello, world!</h1>
             <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
           </div>
         );
       }
     }
    ```
- 组件中添加局部state（添加class构造函数）
    ```
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
    ```

- 使用 this.setState()来时刻更新组件state:   
    1.不要直接修改state
    ```
    // Wrong,不会重新渲染组件
    this.state.comment = 'Hello';
    // Correct
    this.setState({comment: 'Hello'});
    ```
    2.State 的更新可能是异步的(出于性能，React可能会把多个setState()调用合并成一个调用)。     
    因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。     
    ```
    // Wrong
    this.setState({
     counter: this.state.counter + this.props.increment,
    });
    // Correct
    this.setState((state, props) => ({
      counter: state.counter + props.increment
    }));
    ```  
    3.数据时向下流动的
    
###事件处理
- React事件命名采用小驼峰式
- 使用JSX语法时需要传入一个函数作为事件处理函数，而不是一个字符串
    ```
    <button onClick={activateLasers}>
    Activate Lasers
    </button>
    ```
- 不能通过返回false的方式阻止默认行为。必须显式的使用preventDefault 。
- 绑定this问题(回调函数中涉及this，需要在JSX中使用能绑定this的语法)
    ```
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
    ```
- 向事件处理程序传递参数，如：
    ```
    <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
    <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
    ```

###条件渲染
- if
    ```
    ···
    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (isLoggedIn) {
          button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
          button = <LoginButton onClick={this.handleLoginClick} />;
        }
    
        return (
          <div>
            <Greeting isLoggedIn={isLoggedIn} />
            {button}
          </div>
        );
      }
    ···
    ```
- 与运算符 &&
    ```
      return (
        <div>
          <h1>Hello!</h1>
          {unreadMessages.length > 0 &&
            <h2>
              You have {unreadMessages.length} unread messages.
            </h2>
          }
        </div>
      );
    ```
- 三目运算符
    ```
    render() {
      const isLoggedIn = this.state.isLoggedIn;
      return (
        <div>
          {isLoggedIn
            ? <LogoutButton onClick={this.handleLogoutClick} />
            : <LoginButton onClick={this.handleLoginClick} />
          }
        </div>
      );
    }
    ```
- 阻止组件渲染    
极少数情况下，可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，可以让render方法直接返回null，而不进行任何渲染。
    ```
    function WarningBanner(props) {
      if (!props.warn) {
        return null;
      }
    
      return (
        <div className="warning">
          Warning!
        </div>
      );
    }
    ···
    ```

###列表&key
wanghuichuang@zhihui.com
RXQ#yF!I9LmsfDL#
