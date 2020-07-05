
import { Eventing } from "./Eventing";
import {Sync} from './Sync'

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users'
export class User {

  // we don't need to create a static
  // function here which add a new eventing class
  // passed in from a contrcutir here. 
  //  eventing is always going to be needed
  //  we are always going to need this class
  //  so just use it here. So we are hardcoding
  public events: Eventing = new Eventing()

  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl)


 



 
}
