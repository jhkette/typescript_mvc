import { AxiosPromise } from "axios";
import { AxiosResponse } from "axios";


interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

// interface for ApiSync class - to define class
interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

// interface for events - to define events class
interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

// has optional id property that is a number
interface HasId {
  id?: number;
}
// type T is going to be data structure that we are going to
// with
// TYPE T HAS AN ID PROPETY. TYPE T HAS A GENERIC TYPE CONSTRAINT
// OF HASiD - this lets typescript know that
// the generic has to have an id property
//  this fiex error on fetch method
export class Model<T extends HasId> {
  // using interaces here to set up relationship between
  // classes
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.attributes.get("id");

    if (typeof id !== "number") {
      throw new Error("Cannot fetch without id");
    }
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      // referencing this.set
      // in the class to also trigger change event.
      this.set(response.data);
    });
  }
  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((respnse: AxiosResponse): void => {
        this.trigger("save");
      })
      .catch(() => {
        this.trigger("error");
      });
  }
}
