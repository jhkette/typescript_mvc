// define a type - atype annotation called callback
// this creates a type function that returns nothing
type Callback = () => void;

export class Eventing {
  // events is an empty pbject that will have strings as keys
  // and callback functions as
  events: { [key: string]: Callback[] } = {};
  on(eventName: string, callback: Callback) {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }
    handlers.forEach((callback) => {
      callback();
    });
  }
}
