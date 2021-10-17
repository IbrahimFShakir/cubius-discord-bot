exports.walk = (givenPath, filelist = []) => {
    var path = path || require('path');
    var fs = fs || require('fs'), files = fs.readdirSync(givenPath);
    filelist = filelist || [];

    files.forEach(file => {
        if (fs.statSync(path.join(givenPath, file)).isDirectory()) {
            filelist = this.walk(path.join(givenPath, file), filelist);
        }
        else {
            filelist.push(path.join(givenPath, file));
        }
    });
    return filelist;
}