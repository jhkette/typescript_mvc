
import { Model } from "./Model";
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import {Attributes} from "./Attributes";
import {Collection} from "./Collection"

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

// using a static method for object composition
// The static method return a new User - we then create a
// new user with the Attributes, Eventing and ApiSync class. 
const rootUrl = "http://localhost:3000/users";
export class User extends Model<UserProps>{
  static buildUser(attrs: UserProps) : User {
    return new User (
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    )
  }  
  static buildUserCollection(): Collection <User, UserProps> {
    return new Collection<User, UserProps>(
      'http://localhost:3000/users',
      (json:UserProps) => User.buildUser(json))
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100)
    this.set({age})
  }
}

const user = User.buildUser({})
user.get('id')
user.get('name')
user.get('age')