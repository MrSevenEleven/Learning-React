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

- 渲染多个组件  
  可以通过使用 {} 在 JSX 内构建一个元素集合
    ```javascript
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
      <li>{number}</li>
    );
  
    ReactDOM.render(
        <ul>{listItems}</ul>,
        document.getElementById('root')
    );
    ```
  
- key  
  key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。
    ```javascript
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
      <li key={number.toString()}>
        {number}
      </li>
    );
    ```

- 用key提取组件  
元素的 key 只有放在就近的数组上下文中才有意义。  
一个好的经验法则是：在 map() 方法中的元素需要设置 key 属性。
  

- key 只是在兄弟节点之间必须唯一


- 在 JSX 中嵌入 map()  
JSX 允许在大括号中嵌入任何表达式，所以我们可以内联 map() 返回的结果
    ```javascript
    function NumberList(props) {
        const numbers = props.numbers;
        return (
            <ul>
                {numbers.map((number) =>
                    <ListItem key={number.toString()}
                    value={number} />
                )}
            </ul>
        );
    }
    ```
  
###表单  
- 受控组件  
  表单元素通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新。
  把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。
  

- textarea标签
    ```javascript
        class NameForm extends React.Component {
          constructor(props) {
            super(props);
            this.state = {value: ''};
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
          }
          handleChange(event) {
            this.setState({value: event.target.value});
          }
          handleSubmit(event) {
            alert('提交的名字: ' + this.state.value);
            event.preventDefault();
          }
          render() {
            return (
              <form onSubmit={this.handleSubmit}>
                <label>
                  名字:
                  <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="提交" />
              </form>
            );
          }
        }
    ```
  由于在表单元素上设置了 value 属性，因此显示的值将始终为 this.state.value，这使得 React 的 state 成为唯一数据源。由于 handlechange 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新

- select标签  
  ```javascript
  <select>
    <option value="grapefruit">葡萄柚</option>
    <option value="lime">酸橙</option>
    <option selected value="coconut">椰子</option>
    <option value="mango">芒果</option>
  </select>
  ```
  由于 selected 属性的缘故，椰子选项默认被选中。React 并不会使用 selected 属性，而是在根 select 标签上使用 value 属性。
  ```
  ···
   render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            选择你喜欢的风味:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="grapefruit">葡萄柚</option>
              <option value="lime">酸橙</option>
              <option value="coconut">椰子</option>
              <option value="mango">芒果</option>
            </select>
          </label>
          <input type="submit" value="提交" />
        </form>
      );  
    }
    ···
  ```
  
- 文件input标签  
  ```javascript
  <input type="file" />
  ```
  因为它的 value 只读，所以它是 React 中的一个非受控组件。


- 处理多个输入  
  当需要处理多个 input 元素时，我们可以给每个元素添加 name 属性，并让处理函数根据 event.target.name 的值选择要执行的操作。
  
- 受控输入空值  


###状态提升  
- 状态提升  
  - 在 React 中，将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state。这就是所谓的“状态提升”。   
  - 在 React 应用中，任何可变数据应当只有一个相对应的唯一“数据源”。通常，state 都是首先添加到需要渲染数据的组件中去。然后，如果其他组件也需要这个 state，那么你可以将它提升至这些组件的最近共同父组件中。你应当依靠自上而下的数据流，而不是尝试在不同组件间同步 state。   
  - 虽然提升 state 方式比双向绑定方式需要编写更多的“样板”代码，但带来的好处是，排查和隔离 bug 所需的工作量将会变少。由于“存在”于组件中的任何 state，仅有组件自己能够修改它，因此 bug 的排查范围被大大缩减了
  
###组合vs继承 
- 包含关系  
  props.children（默认插槽）  
  ```
  function FancyBorder(props) {
    return (
      <div className={'FancyBorder FancyBorder-' + props.color}>
        {props.children}
      </div>
    );
  }
  
  ···
  
  function WelcomeDialog() {
    return (
      <FancyBorder color="blue">
        <h1 className="Dialog-title">
          Welcome
        </h1>
        <p className="Dialog-message">
          Thank you for visiting our spacecraft!
        </p>
      </FancyBorder>
    );
  }
  ```
  自行约定多个插槽：将所需内容传入 props，并使用相应的 prop。  
  ```
    function SplitPane(props) {
      return (
        <div className="SplitPane">
          <div className="SplitPane-left">
            {props.left}
          </div>
          <div className="SplitPane-right">
            {props.right}
          </div>
        </div>
      );
    }
    
    function App() {
      return (
        <SplitPane
          left={
            <Contacts />
          }
          right={
            <Chat />
            }
         />
      );
    }
  ```
  
- 特例关系  
组件复用
  
###react哲学  
####第一步：将设计好的 UI 划分为组件层级  
- 根据单一功能原则来判定组件的范围。也就是说，一个组件原则上只能负责一个功能。如果它需要负责更多的功能，这时候就应该考虑将它拆分成更小的组件。

####第二步：用 React 创建一个静态版本  
- 先用已有的数据模型渲染一个不包含交互功能的 UI。最好将渲染 UI 和添加交互这两个过程分开。这是因为，编写一个应用的静态版本时，往往要编写大量代码，而不需要考虑太多交互细节；添加交互功能时则要考虑大量细节，而不需要编写太多代码。所以，将这两个过程分开进行更为合适。
- props 是父组件向子组件传递数据的方式。即使你已经熟悉了 state 的概念，也完全不应该使用 state 构建静态版本。state 代表了随时间会产生变化的数据，应当仅在实现交互时使用。
- 当你的应用比较简单时，使用自上而下的方式更方便；对于较为大型的项目来说，自下而上地构建，并同时为低层组件编写测试是更加简单的方式。

####确定 UI state 的最小（且完整）表示  
- 为了正确地构建应用，你首先需要找出应用所需的 state 的最小表示，并根据需要计算出其他所有数据。其中的关键正是 DRY: Don’t Repeat Yourself。只保留应用所需的可变 state 的最小集合，其他数据均由它们计算产生。

####第四步：确定 state 放置的位置  
- 找到根据这个 state 进行渲染的所有组件。
- 找到他们的共同所有者（common owner）组件（在组件层级上高于所有需要该 state 的组件）。
- 该共同所有者组件或者比它层级更高的组件应该拥有该 state。
- 如果你找不到一个合适的位置来存放该 state，就可以直接创建一个新的组件来存放该 state，并将这一新组件置于高于共同所有者组件层级的位置。

####第五步：添加反向数据流  
处于较低层级的表单组件更新较高层级中的 state。