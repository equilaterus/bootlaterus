
module.exports.getDirectoryContent = function getDirectoryContent(path) {
    console.log(path)
    const fs = require('fs');
    return fs.readdirSync(path);
}

module.exports.getBootlaterusFiles = function getBootlaterusFiles(path, themesDirectoryName, mainFileName) {
    console.log(path)
    const directories = getDirectoryContent(path);
    console.log(directories)
    
    const themesDirectory = directories.find(directory => directory === themesDirectoryName);
    const bootlaterusDirectories = directories.filter(directory => directory !== themesDirectoryName);

    if (!themesDirectory)
        throw 'themes directory not found';
    if (!bootlaterusDirectories)
        throw 'bootlaterus directories not found';

    const themeFiles = themesDirectory.getMainFiles(`${path}\\${themesDirectory}`);
    const bootlaterusFiles = {};

    bootlaterusDirectories.forEach(bootlaterusDirectory => {
        const exportedFilePath = `${path}\\${bootlaterusDirectory}\\${bootlaterusDirectory}.css`;
        const mainFilePath = `${path}\\${bootlaterusDirectory}\\${mainFileName}`;
        themeFiles.forEach(themeFile => {
            const themeFilePath = `${path}\\${themesDirectoryName}\\${themeFile}`;
            bootlaterusFiles[exportedFilePath] = [themeFilePath, mainFilePath];
        });
    });        
}
