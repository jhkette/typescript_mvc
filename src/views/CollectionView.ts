import { Collection } from '../models/Collection';

//Collectionview is a generic class. class Takes T and K generic. IE User model as T and UserProps as K
// K defines T
export abstract class CollectionView<T, K> {
    constructor(public parent: Element, public collection: Collection<T, K>) {}

  abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    //   remove HTML to stop repetition
    this.parent.innerHTML = '';


    // create a template element
    const templateElement = document.createElement('template');

    //iterate through all different models in this.collection.models
    for (let model of this.collection.models) {
      // parent element that we are going to pass into item parent
      const itemParent = document.createElement('div');
      // render item  
      this.renderItem(model, itemParent);
      templateElement.content.append(itemParent);
    }
    // append element
    this.parent.append(templateElement.content);
  }
}