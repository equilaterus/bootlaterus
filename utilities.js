function getDirectoryContent(path) {
    const fs = require('fs');
    return fs.readdirSync(path);
}

function generateExportedFilePath(filePath, theme) {
    if (theme === '_default.scss')
        return `${filePath}.scss`;
    const themeName = theme.slice(1,-5);
    return `${filePath}-${themeName}.scss`;
}

module.exports.getBootlaterusFiles = function getBootlaterusFiles(path, outpath, themesDirectoryName, mainFileName) {
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
        const exportedFilePathBase = `${outpath}/${bootlaterusDirectory}/${bootlaterusDirectory}`;
        const mainFilePath = `${path}/${bootlaterusDirectory}/${mainFileName}`;
        themeFiles.forEach(themeFile => {
            const themeFilePath = `${path}/${themesDirectoryName}/${themeFile}`;
            const exportedFilePath = generateExportedFilePath(exportedFilePathBase, themeFile);
            bootlaterusFiles[exportedFilePath] = [themeFilePath, mainFilePath];
        });
    });    
    
    return bootlaterusFiles;
}

module.exports.getBootlaterusDistFiles = function getBootlaterusDistFiles(outpath, bootlaterusFiles) {
    const prebuildFiles = Object.keys(bootlaterusFiles);
    const distFiles = {};
    prebuildFiles.forEach(file => {
        const fileNameBeginPosition = file.lastIndexOf('/');
        const fileNameEndPosition = file.lastIndexOf('.');
        const fileName = file.substring(fileNameBeginPosition+1, fileNameEndPosition);
        distFiles[`${outpath}/${fileName}.css`] = file;
    });

    return distFiles;
}
