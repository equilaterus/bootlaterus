function getDirectoryContent(path) {
    const fs = require('fs');
    return fs.readdirSync(path);
}

function generateExportedFilePath(filePath, theme) {
    if (theme === '_default.scss')
        return `${filePath}.scss`;
    const themeName = theme.slice(1,-5).replace(/_/g, '-');
    return `${filePath}-${themeName}.scss`;
}

function getFileContents(filepath) {
  const fs = require('fs');
  return fs.readFileSync(filepath);
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

module.exports.getDistRelativePath = function getDistRelativePath(distFiles) {
    return Object.keys(distFiles).map((path) => path.replace('./dist', '..'));
}

module.exports.getReadableThemeName = function getReadableThemeName(path) {
  return path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))
          .replace(/-|_/g, ' ')
          .replace('cfonts', '+ fonts');
}

module.exports.getThemesMetadata = function getThemesMetadata(distFiles) {
  
  const paths = this.getDistRelativePath(distFiles).reduce((result, current) => {
    result[this.getReadableThemeName(current)] = current;
    return result;
  }, {});

  const result = {}
  Object.keys(paths).sort().forEach(function(key) {
    result[key] = paths[key];
  });
  return JSON.stringify(
    result
  );
}

module.exports.getFile = function getFile(basepath, filename) {
  return getFileContents(`${basepath}${filename}`);
}

module.exports.getFilenamesFromDirectory = function getFilenamesFromDirectory(path, extension) {
  return getDirectoryContent(path)
    .filter(file => file.includes(extension))
    .map(file => `${path}/${file}`);
}

module.exports.getHtmlDistFiles = function getHtmlDistFiles(htmlFiles, srcpath, distpath) {
  let distFiles = {};
  return htmlFiles.reduce( (prev, file) => {
    const dist = file.replace(srcpath, distpath);
    const current = {};
    current[dist] = file;
    return {...prev, ...current};
  }, distFiles);
}

module.exports.getRenderTags = function getRenderTags(src) {
  return [...new Set(src.match(/<\s*Render\s*[^>]*>/g))];
}
