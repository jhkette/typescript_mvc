import {User, UserProps} from '../models/User';
import {View} from './View'

// Here we are creating a view class so we are adding in User
// which extends the model class and also adding Userprops
export class UserForm  extends View<User, UserProps> {
 


  //   template function returns a string - which is html
  template(): string {
    return `<div>
        <input placeholder="${this.model.get("name")}"/>
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save User</button>
        </div>`;
  }

  //   how to bind events in a basic way
  // takes an html fragment 
  eventsMap(): { [key: string]: () => void } {
    return {
    
      'click:.set-age': this.onSetAge,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick
    };
  }

  onSaveClick = (): void => {
    this.model.save()
  }

  onSetAge = () : void => {
    this.model.setRandomAge()
  }

  onSetNameClick = (): void => {
    
    const input = this.parent.querySelector('input')
    // null check - we have a tsc config 
    // we have to do a null check - the input variable could be null,
    // so we are checking for this. Would create an error otherwise
    if(input){
    const name = input.value
    }

    this.model.set({name})
  }
}
