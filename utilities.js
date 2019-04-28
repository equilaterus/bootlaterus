function getDirectoryContent(path) {
    const fs = require('fs');
    return fs.readdirSync(path);
}

module.exports.getBootlaterusFiles = function getBootlaterusFiles(path, themesDirectoryName, mainFileName) {
    const directories = getDirectoryContent(path);
        
    const themesDirectory = directories.find(directory => directory === themesDirectoryName);
    const bootlaterusDirectories = directories.filter(directory => directory !== themesDirectoryName);
    
    if (!themesDirectory)
        throw 'themes directory not found';
    if (!bootlaterusDirectories)
        throw 'bootlaterus directories not found';

    const themeFiles = getDirectoryContent(`${path}/${themesDirectory}`);    
    const bootlaterusFiles = {};

    bootlaterusDirectories.forEach(bootlaterusDirectory => {
        const exportedFilePath = `${path}/${bootlaterusDirectory}/${bootlaterusDirectory}.scss`;
        const mainFilePath = `${path}/${bootlaterusDirectory}/${mainFileName}`;
        themeFiles.forEach(themeFile => {
            const themeFilePath = `${path}/${themesDirectoryName}/${themeFile}`;
            bootlaterusFiles[exportedFilePath] = [themeFilePath, mainFilePath];
        });
    });    
    
    return bootlaterusFiles;
}
