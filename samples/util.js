// This is a JS file with scripts
// related with multi-theming showcase.
//
// You don't need to include this in your project.
// in order to use bootlaterus.

const bootlaterusUtils = {};

bootlaterusUtils.ChangeTheme = function (path) {
  let cssLink = $('link[href*=".css"]');
  cssLink.replaceWith(`<link href="${path}" type="text/css" rel="stylesheet">`);
}

bootlaterusUtils.GetUI = function(isRootPath) {
  const themes = {"bootlaterus":"../css/bootlaterus.css","bootlaterus + fonts":"../css/bootlaterus-cfonts.css","bootlaterus default bootstrap":"../css/bootlaterus-default-bootstrap.css","bootlaterus docs":"../css/bootlaterus-docs.css","bootlaterus docs + fonts":"../css/bootlaterus-docs-cfonts.css","bootlaterus docs default bootstrap":"../css/bootlaterus-docs-default-bootstrap.css","bootlaterus docs light":"../css/bootlaterus-docs-light.css","bootlaterus docs light + fonts":"../css/bootlaterus-docs-light-cfonts.css","bootlaterus light":"../css/bootlaterus-light.css","bootlaterus light + fonts":"../css/bootlaterus-light-cfonts.css"};
  const themesHtml = Object.entries(themes).reduce((str, current) => {
    const [key, value] = current;
    str += `<a class="dropdown-item" href="#" data-theme-path="${isRootPath ? value.replace('../', '') : value}">${key}</a>`;
    return str;
  }, '');

  return `<li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="theme-dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Choose Theme
            </a>
            <div class="dropdown-menu text-small-contents" aria-labelledby="theme-dropdown">
              ${themesHtml}
            </div>
          </li>`;
}

bootlaterusUtils.CreateThemeSelector = function(selector, isRootPath) {
  $(selector).html(this.GetUI(isRootPath));
}



$(function() {
  const isRootPath = $('#theme-selector').data('is-root');
  bootlaterusUtils.CreateThemeSelector('#theme-selector', isRootPath);

  $('a[data-theme-path]').click(function() {
    bootlaterusUtils.ChangeTheme($(this).data('theme-path'));
  })
});
