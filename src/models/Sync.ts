import axios, { AxiosPromise } from "axios";
// we are return an axiospromise 'type' so importing it
// with the axios library here
import {UserProps} from './User'

interface HasId{
  // because it is an optional property
  // and we have ts config set to true
  // property of id will be number | undefined
  // if not strict type would just be number
    id?: number
}

export class Sync<T extends HasId> {

    constructor(public rootUrl: string){}
    fetch(id: number):AxiosPromise  {
        return axios.get(`${this.rootUrl}/${id}`)
         
      }
      save(data: T): AxiosPromise  {
        const {id} = data;
        if (id) {
          return axios.put(`${this.rootUrl}/${id}`, data);
        } else {
          return axios.post(`${this.rootUrl}`, data);
        }
      }
}