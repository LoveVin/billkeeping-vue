const localStorageKeyName = 'tagList';
type tag = {
    id: string;
    name: string;
}
type tagListModel = {
    data: tag[];
    create: (name: string) => 'success' | 'duplicated';//联合类型
    fetch: () => tag[];
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
    save: () => void;
    remove: (id: string) => boolean;
}
const tagListModel: tagListModel = {
    data: [],
    create(name: string) {
        const names = this.data.map(tag => tag.name);
        if (names.indexOf(name) >= 0) {
            return 'duplicated';
        }
        this.data.push({'id': name, 'name': name});
        this.save();
        return 'success';
    },
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    update(id, name){
        const idList = this.data.map(item => item.id);
        if(idList.indexOf(id) >= 0){
            const names = this.data.map(item => item.name);
            if(names.indexOf(name) >= 0){
                return 'duplicated';
            }else{
                const tag = this.data.filter(item => item.id === id)[0];
                tag.id = tag.name = name;
                this.save();
                return 'success';
            }
        }else{
            return 'not found';
        }
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    remove(id){
        let index = -1;
        for(let i = 0; i < this.data.length; i++){
            if(this.data[i].id === id){
                index = i;
                break;
            }
        }
        this.data.splice(index,1);
        this.save();
        return true;
    }
};

export default tagListModel;