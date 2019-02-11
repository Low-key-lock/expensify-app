const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'Tim',
            age: 29
        });
    }, 5000)
});

console.log('Before');

promise.then((data) => {
    console.log('1', data);
return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is my other promise');
    }, 5000)
});

}).then(() => {
    console.log('Does this run?');
}).catch((error) => {
    console.log('error: ', error);
});

console.log('After');
