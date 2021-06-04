import { createStore,combineReducers,applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
const logger = createLogger();


const reducer = (state = {count: 0}, action) => {
  switch (action.type){
      case 'INCREASE': return {count: state.count + 1};
      case 'DECREASE': return {count: state.count - 1};
      default: return state;
  }
}


const reducer2 = (state = {count2: 0}, action) => {
    switch (action.type){
        case 'INCREASE2': return {count2: state.count2 + 1};
        case 'DECREASE2': return {count2: state.count2 - 1};
        default: return state;
    }
}



// const store = createStore(combineReducers({reducer,reducer2}), state);//等同于
export const store = createStore(combineReducers({reducer:reducer,reducer2:reducer2}),{},applyMiddleware(logger,thunk));

// console.log(store.getState())
// 返回{
//     reducer:{
//         count:0
//     },
//     reducer2:{
//         count2:0
//     }
// }

// store.subscribe(() =>
//     console.log(store.getState())
// );//监听器
// store.dispatch({
//     type:'INCREASE'
// })
// store.dispatch({
//     type:'DECREASE'
// })


// redux-thunk
// function asyncAction(){
//     return (dispatch)=>{
//         //进行一些异步操作后dispatch
//         setTimeout(()=>{
//             console.log('1S后');
//             dispatch({type:'INCREASE'})
//         },1000)
//     }
// }
//
// store.dispatch(asyncAction());