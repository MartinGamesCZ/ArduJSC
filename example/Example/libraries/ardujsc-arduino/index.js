const pinMode = (pin, mode) => {
    return mode == 'INPUT' ? `pinMode(${pin}, INPUT);` : `pinMode(${pin}, OUTPUT);`
}

const Functions = {
    pinMode: pinMode
}

module.exports = Functions