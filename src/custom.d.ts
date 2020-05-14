//xxx.d.ts 的 d 是 define 的意思，表示 ts 中的变量定义，是全局的
type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date;
}