exports.checkCommand = (usedCommandName, client) => {
    const path = require('path');
    const walker = require('./walker');

    console.log("TES");
    const files = walker.walk(`${__dirname}/../commands`);
    files.forEach(commandPath => {
        console.log("FUCK YOU");
        var command = require(commandPath);
        if (usedCommandName === path.parse(commandPath).base) {
            command.use(usedCommandName);
            return true;
        }
    });
}