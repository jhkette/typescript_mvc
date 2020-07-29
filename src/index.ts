import {User} from './models/User'

const user =  User.buildUser({name: "new record", age: 8})
const user1 = User.buildUser({id: 1, name: 'newer name', age: 0})



console.log(user.get('name'))

user1.on('save', ()=> {
    console.log(user1)
})

user1.save()
// user.trigger('change')

user.set({name: 'new name'})