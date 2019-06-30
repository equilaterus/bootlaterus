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

bootlaterusUtils.GetUI = function() {
  const themes = $BUILD_THEMES;
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

bootlaterusUtils.CreateThemeSelector = function(selector) {
  $(selector).html(this.GetUI());
}



$(function() {
  bootlaterusUtils.CreateThemeSelector('#theme-selector');

  $('a[data-theme-path]').click(function() {
    bootlaterusUtils.ChangeTheme($(this).data('theme-path'));
  })
});