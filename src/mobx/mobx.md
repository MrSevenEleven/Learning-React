## mobX

官方文档：https://mobx.js.org/observable-state.html

- 对于class类对象，mobx6版本，装饰器声明已经无效（只做标注），要实现Observable，Action等声明。必须makeObservable或者makeAutoObservable显性声明。
- 对于普通对象，依然可以使用装饰器语法

### observable

声明响应式对象及属性state

### action

触发state变化

### computed  

计算属性


- class类型语法  
6.0版本前：
```
class Store {
    @observable count = 0;
    @observable name = 'wang';

    @action changeName=()=>{
        this.name='周'
    }
    @action changeCount=()=>{
        this.count++;
        console.log(this.count)
    }
}

```

6.0版本后：
```
class Store {
    constructor() {
        makeAutoObservable(this)
        //或
        //makeObservable(this, {
        //    name: observable,
        //    count: observable,
        //    changeName: action,
        //    changeCount: action,
        //})
    }

    count = 0;
    name = 'wang';

    changeName = () => {
        this.name = '周'
    }
    changeCount = () => {
        this.count++;
    }
}
```





## mobx-react

将state注入组件并响应时触发更新 @observer/observer()
Provider父组件注入 @inject('store)