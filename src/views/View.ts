
import {User} from '../models/User'
import {Model} from '../models/Model'

// specifices different types of propeties 
// that type T could have - this is for User model etc, other models
// could do it this was but instead we are using the Model ITSELF as a type constraint
// interface ModelForView {
//   on(eventName:string, callback: () => void): void
// }


// we are using a constraint for the generic so we know what properties it has
// we are using Model. But Model aslo contains a generic class. K is the second argemnent, which
//  will be the generic type which it has to have. Usually this is the UserProps interface. ie 
export abstract class View<T extends Model<K>, K> {


  regions: {[key:string]: Element} = {}
     // element is any HTML Element
  // initialise parent - which is an HTML element
  // this will be the parent HTML element that we insert html element

  constructor(public parent: Element, public model: T) {
    this.bindModel()
  }

  eventsMap():{ [key: string]: () => void}{
    return {}
  }
  abstract template(): string;

  // define regions object. Starts off empty
  // then is populated by mapRegions

 

  regionsMap(): {[key: string]: string}{
    return {}
  }

  bindModel(): void {

    this.model.on('change', () => {
      this.render();
    })
  }
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    // takes each event , splits it the 
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");
      // fragment 
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {
    
  }

    // the render method
  // renders an html document element
  render(): void {
    // replacing innerhtml with an empty string.
    // as an aside react/angular trys to compare what's in the DOM vs 
    // what we are updating it with
    this.parent.innerHTML = ''
    //   create template element
    // for more info see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
    // add html to template - add to parent element
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content)
    this.onRender();
    this.parent.append(templateElement.content);
  }


}