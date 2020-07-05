import {User} from './models/User'

const user = new User({name: "new record", age: 8})
const user1 = new User({name: "new record2", age: 9})
user.save()
user1.save()


user.events.on('change', () => {
    console.log('change')
})


user.events.trigger('change')