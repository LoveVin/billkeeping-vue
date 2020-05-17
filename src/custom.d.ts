//xxx.d.ts 的 d 是 define 的意思，表示 ts 中的变量定义，是全局的

type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date;
}
type Tag = {
    id: string;
    name: string;
}
type tagListModel = {
    data: Tag[];
    create: (name: string) => 'success' | 'duplicated';//联合类型
    fetch: () => Tag[];
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
    save: () => void;
    remove: (id: string) => boolean;
}

interface Window {
    tagList: Tag[];
    findTag: (id: string) => Tag | undefined;
    createTag: (name: string) => void;
    removeTag: (id: string) => boolean;
    updateTag: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
    recordList: RecordItem[];
    createRecord: (record: RecordItem) => void;
}
