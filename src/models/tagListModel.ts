const localStorageKeyName = 'tagList';
type tag = {
    id: string;
    name: string;
}
type tagListModel = {
    data: tag[];
    create: (name: string) => 'success' | 'duplicated';
    fetch: () => tag[];
    save: () => void;
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
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};

export default tagListModel;