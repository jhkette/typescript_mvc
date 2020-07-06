import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";
import { AxiosResponse } from "axios";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = "http://localhost:3000/users";
export class User {
  // we don't need to create a static
  // function here which add a new eventing class
  // passed in from a contrcutir here.
  //  eventing is always going to be needed
  //  we are always going to need this class
  //  so just use it here. So we are hardcoding
  public events: Eventing = new Eventing();

  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  // the constructor takes the attrs parameter
  // this.attributes = a new instance of attributes that takes the UserProps
  // generic and the attrs
  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on(){
    return this.events.on
  }

  get trigger(){
    return this.events.trigger
  }

  get get(){
    return this.attributes.get
  }

  set (update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change')

  }

  fetch(): void{
    const id = this.attributes.get('id')

    if(typeof id !== 'number'){
      throw new Error('Cannot fetch without id')
    }
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      // referencing this.set
      // in the class to also trigger change
      // event.
      this.set(response.data)
    })
  }
  save(): void {
    this.sync.save(this.attributes.getAll())
    .then((respnse: AxiosResponse): void => {
      this.trigger('save')
    })
    .catch(() => {
      this.trigger('error')
    })
  }
}
