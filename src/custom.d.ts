//xxx.d.ts 的 d 是 define 的意思，表示 ts 中的变量定义，是全局的

type RootState = {
    recordList: RecordItem[];
    tagList: Tag[];
    currentTag?: Tag;
}
type RecordItem = {
    tags: Tag[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: string;
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

