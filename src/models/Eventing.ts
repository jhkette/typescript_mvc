
type Callback = () => void;
export class Eventing {

    events: {[key: string]: Callback[]} = {}
    on(eventName: string, callback: Callback) {
        const handlers = this.events[eventName] || []
        handlers.push(callback)
        this.events[eventName] = handlers
      }

}