//
// Object Destructuring
//

const person = {
    name: 'Tim',
    age: 29,
    location: {
        city: 'Reims',
        temp: 8
    }
};

const { name = 'Anonymous', age } = person;

console.log(`${name} is ${age}.`);

const { city, temp } = person.location;
if (person.location.city && person.location.temp){
    console.log(`It's ${temp} in ${city}.`);
}


const book = {
    title: 'Anansi Boys',
    author: 'Neil Gaiman',
    publisher: {
        name: 'Vertigo'
    }
};

const { name: publisherName = 'self-Published' } = book.publisher;
console.log(publisherName);

//
// Array Destructuring
//

const adress = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
const [street, city, state, zip] = adress;
console.log(`You are in ${city}, ${state}.`);

const item = ['coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [brew, small, medium, large] = item;
console.log(`A medium ${brew} costs ${medium}`);