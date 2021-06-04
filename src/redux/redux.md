# redux&&redux-react
redux是一个状态管理工具，相较于vuex只能在Vue项目中应用，redux不限于框架。而redux-react将redux与react集成。

## redux  
```
import { createStore,combineReducers,applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';    //diapatch可以传如函数
import {createLogger} from 'redux-logger';  //日志打印
const logger = createLogger();

export const store = createStore(combineReducers({reducer:reducer,reducer2:reducer2}),{},applyMiddleware(logger,thunk));
//创建store对象
```
createStore参数：
- reducer或combineReducers(类似module拆分)
- state默认值，可选
- 中间价，可选

### 使用  
- state：  
  数据存储对象。store.getState()获取state
- reducer(state,action)：  
  创建不同type的action及action对state的处理动作，返回一个新的state
- store.dispatch(action)  
  触发某个type的action，action为一个object对象：
    ```
        dispatch({
            type:ACTIONTYPE,
            params:‘参数’
        })
    ```  

####其他  
- store.subscribe   
  store监听器
    ```
    store.subscribe(() =>
        console.log(store.getState())
    );
    ```

## react-redux  
```
···
import { Provider } from 'react-redux';
ReactDOM.render(
    <Provider value={store}>
        <APP />
    </Provider>,
    document.getElementById('root')
);

```  
在provider包裹下的子组件可以在props中获取store