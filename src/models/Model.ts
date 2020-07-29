import { AxiosPromise } from "axios";
import { AxiosResponse } from "axios";
import { UserProps } from "./User";

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

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
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

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
