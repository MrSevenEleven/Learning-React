import {observable, action, makeAutoObservable} from 'mobx';


// mobx6版本，装饰器声明已经无效（只做标注），要实现Observable，Action等声明。必须makeObservable或者makeAutoObservable显性声明。
// 对于普通对象，依然可以使用装饰器语法
// class Store {
//     @observable count = 0;
//     @observable name = 'wang';
//
//     @action changeName=()=>{
//         this.name='周'
//     }
//     @action changeCount=()=>{
//         this.count++;
//         console.log(this.count)
//     }
// }


class Store {
    constructor() {
        makeAutoObservable(this)
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

export default Store;