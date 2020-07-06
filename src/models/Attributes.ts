import {UserProps} from './User'

export class Attributes<T> {


    constructor(private data: T) {}
    // K is a generic  like T here
    // Here we are saying the type of K can only be a key of T
    // this is the constraint. It's going to return a key of T
    get<K extends keyof T>(key: K): T[K]{
      return this.data[key];
    }
    set(update: T): void {
      Object.assign(this.data, update);
    }

}