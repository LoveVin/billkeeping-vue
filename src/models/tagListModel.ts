const localStorageKeyName = 'tagList';
type tagListModel = {
    data: string[];
    create: (name: string) => 'success' | 'duplicated';
    fetch: () => string[];
    save: () => void;
}
const tagListModel: tagListModel = {
    data: [],
    create(name: string) {
        if(this.data.indexOf(name) >= 0){return 'duplicated';}
        this.data.push(name);
        this.save();
        return 'success';
    },
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return  this.data;
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};

export default tagListModel;