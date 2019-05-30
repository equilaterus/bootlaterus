// This is a JS file with scripts
// related with multi-theming showcase.
//
// You don't need to include this in your project.
// in order to use bootlaterus.

const bootlaterusUtils = {};

bootlaterusUtils.ChangeTheme = function (path) {
  var cssLink = $('link[href*=".css"]');
  cssLink.replaceWith(`<link href="${path}" type="text/css" rel="stylesheet">`);
}

bootlaterusUtils.GetUI = function() {
  const themes = {"bootlaterus + fonts":"../css/bootlaterus-cfonts.css","bootlaterus":"../css/bootlaterus.css","bootlaterus light":"../css/bootlaterus-light.css","bootlaterus docs + fonts":"../css/bootlaterus-docs-cfonts.css","bootlaterus docs":"../css/bootlaterus-docs.css","bootlaterus docs light":"../css/bootlaterus-docs-light.css"};
  const themesHtml = Object.entries(themes).reduce((str, current) => {
    const [key, value] = current;
    str += `<a class="dropdown-item" href="#" data-theme-path="${value}">${key}</a>`;
    return str;
  }, '');

  return `<li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="theme-dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Choose Theme
            </a>
            <div class="dropdown-menu" aria-labelledby="theme-dropdown">
              ${themesHtml}
            </div>
          </li>`;
}

bootlaterusUtils.CreateThemeSelector = function() {
  console.log(this.GetUI());
  $('#theme-selector').html(this.GetUI());
}



$(function() {
  bootlaterusUtils.CreateThemeSelector();

  $('a[data-theme-path]').click(function() {
    bootlaterusUtils.ChangeTheme($(this).data('theme-path'));
  })
});