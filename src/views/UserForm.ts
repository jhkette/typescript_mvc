export class UserForm {
  // element is any HTML Element
  // initialise parent - which is an HTML element
  // this will be the parent HTML element that we insert html element  

  constructor(public parent: Element){}

  template(): string {
    return `<div>
        <h1>User form</h1>
        <input />
        </div>`;
  }

  render(): void {
      const templateElement = document.createElement('template')
      templateElement.innerHTML = this.template()

      this.parent.append(templateElement)

  }
}
