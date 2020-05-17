import recordStore from '@/store/recordStore';
import tagStore from '@/store/tagStore';

const store = {
    count : 0,
    ...recordStore,
    ...tagStore,
    addCount(){
        this.count += 1;
    }
};

console.log(store);

export default store;