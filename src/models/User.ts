import axios, {AxiosResponse} from 'axios';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
  
}
// define a type - atype annotation called callback
// this creates a type function that returns nothing
type Callback = () => void;

export class User {
  // events is an empty pbject that will have strings as keys 
  // and callback functions as 
  events: {[key: string]: Callback[]} = {}
  constructor(private data: UserProps) {}

  get(propName: string): number | string {
    return this.data[propName];
  }
  set(update: UserProps): void {
    Object.assign(this.data, update);
  }
  // we are using Callback -a type annotation here
  on(eventName: string, callback: Callback) {
    const handlers = this.events[eventName] || []
    handlers.push(callback)
    this.events[eventName] = handlers
  }
  trigger(eventName: string): void {
    const handlers = this.events[eventName]

    if(!handlers || handlers.length === 0){
      return
    }
    handlers.forEach(callback => {
      callback()
    })
    
  }

  fetch(): void {
    axios.get(`http://localhost:3000/users/${this.get('id')}`)
    .then((response: AxiosResponse): void => {
      this.set(response.data);
    })

  }
}
