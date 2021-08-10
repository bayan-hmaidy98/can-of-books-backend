const mongoose = require('mongoose');
const bookSchema = require('./books.model');

const userSchema = new mongoose.Schema({
    email: { type: String },
    books: [bookSchema]
});

const userModel = mongoose.model('users', userSchema);

const seedUserData =() => {
    const newUser = new userModel({ 
        ownerEmail: 'bayanhdy98@gmail.com',
        books: [
            {
                bookName: 'The Prophet',
                description: 'The Prophet is a collection of poetic essays that are philosophical, spiritual, and, above all, inspirational. Gibran’s musings are divided into twenty-eight chapters covering such sprawling topics as love, marriage, children, giving, eating and drinking, work, joy and sorrow, housing, clothes, buying and selling, crime and punishment, laws, freedom, reason and passion, pain, self-knowledge, teaching, friendship, talking, time, good and evil, prayer, pleasure, beauty, religion, and death.',
                status: 'available'
            },
            {
                bookName: 'Chess Story',
                description: 'Travelers by ship from New York to Buenos Aires find that on board with them is the world champion of chess, an arrogant and unfriendly man. They come together to try their skills against him and are soundly defeated. Then a mysterious passenger steps forward to advise them and their fortunes change. How he came to possess his extraordinary grasp of the game of chess and at what cost lie at the heart of Zweigs story.',
                status: 'available'
            },
            {
                bookName:'Blindness',
                description:'A city is hit by an epidemic of "white blindness" that spares no one. Authorities confine the blind to an empty mental hospital, but there the criminal element holds everyone captive, stealing food rations, and assaulting women. There is one eyewitness to this nightmare who guides her charges—among them a boy with no mother, a girl with dark glasses, a dog of tears—through the barren streets, and their procession becomes as uncanny as the surroundings are harrowing.',
                status: 'available'
            }
        ]
    })

    newUser.save();
}
module.exports = {userModel , seedUserData};
