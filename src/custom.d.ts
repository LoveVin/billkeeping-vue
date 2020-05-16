//xxx.d.ts 的 d 是 define 的意思，表示 ts 中的变量定义，是全局的

type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date;
}
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

interface Window {
    tagList: tag[];
}