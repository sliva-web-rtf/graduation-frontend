export type StrictRecord<K extends string | number | symbol, V> = Record<K, V> & {
    [key: string]: V;
};
