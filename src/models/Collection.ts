
import {Eventing} from './Eventing'
import axios, {AxiosResponse} from 'axios';
// T is the type of whatever collection we needd. Ie user, messgae, comments
export class Collection <T, K>{
    constructor(public rootUrl: string,
        public deserialise: (json: K ) => T){}
    models: T[] = [];
    events: Eventing = new Eventing()


    get on(){
        return this.events.on
    }

    get trigger(){
        return this.events.trigger
    }

    fetch(): void {
        axios.get(this.rootUrl)
        .then((response: AxiosResponse) => {
            response.data.forEach((value: K) => {
                
                this.models.push(this.deserialise(value))
            });
        })

        this.trigger('change')
    }
}