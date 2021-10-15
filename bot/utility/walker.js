exports.walk = (path) => {
    const fs = require('fs');
    var files = [];
    var fullPath = path;
    fs.readdirSync(path).forEach(rPath => {
        fullPath += (`/${rPath}`); // currently fixing this
        if (fs.existsSync(fullPath)) {
            if (fs.lstatSync(fullPath).isDirectory())
                this.walk(fullPath);
            else
                files.push(fullPath);
        }
    });
    console.log(files);
    console.log("FINNISH");
    return files;
}