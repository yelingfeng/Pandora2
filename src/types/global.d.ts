declare type Indexable<T extends any = any> = {
  [key: string]: T
}

declare type Hash<T> = Indexable<T>
