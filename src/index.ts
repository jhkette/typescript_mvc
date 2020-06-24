import {User} from './models/User'

const user = new User({name: "joe", age: 23})

user.on('change', () => {
    console.log('1')
})

user.on('change', () => {
    console.log('2')
})

console.log(user.trigger('change'))