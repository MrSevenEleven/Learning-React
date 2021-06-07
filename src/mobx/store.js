import {observable} from 'mobx';

class Store {
    @observable
    count = 0;
    @observable
    name = 'wang';
}

export default Store;