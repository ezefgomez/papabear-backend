function generatorNumber(param) {
    let allNumbers = [];
    let maxQty = param || 100000000;

    for (let i = 0; i < maxQty; i++) { 
        allNumbers.push(randomNumber());
    }

    let numbers = allNumbers.reduce((acc, cur) => (acc[cur] ? acc[cur] += 1 : acc[cur] = 1, acc), {});
    return numbers;
}

function randomNumber() { 
    return Math.floor(Math.random() * (1000 - 1) + 1) ;
}

process.on('message', message => {
    let data = generatorNumber(message.number);
    process.send(data);
    process.exit();
});