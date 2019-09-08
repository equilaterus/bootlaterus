"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// This is a JS file with scripts
// related with multi-theming showcase.
//
// You don't need to include this in your project.
// in order to use bootlaterus.
var bootlaterusUtils = {};

bootlaterusUtils.ChangeTheme = function (path) {
  var cssLink = $('link[href*=".css"]');
  cssLink.replaceWith("<link href=\"".concat(path, "\" type=\"text/css\" rel=\"stylesheet\">"));
};

bootlaterusUtils.GetUI = function (isRootPath) {
  var themes = {
    "bootlaterus": "../css/bootlaterus.css",
    "bootlaterus + fonts": "../css/bootlaterus-cfonts.css",
    "bootlaterus default bootstrap": "../css/bootlaterus-default-bootstrap.css",
    "bootlaterus docs": "../css/bootlaterus-docs.css",
    "bootlaterus docs + fonts": "../css/bootlaterus-docs-cfonts.css",
    "bootlaterus docs default bootstrap": "../css/bootlaterus-docs-default-bootstrap.css",
    "bootlaterus docs light": "../css/bootlaterus-docs-light.css",
    "bootlaterus docs light + fonts": "../css/bootlaterus-docs-light-cfonts.css",
    "bootlaterus light": "../css/bootlaterus-light.css",
    "bootlaterus light + fonts": "../css/bootlaterus-light-cfonts.css"
  };
  var themesHtml = Object.entries(themes).reduce(function (str, current) {
    var _current = _slicedToArray(current, 2),
        key = _current[0],
        value = _current[1];

    str += "<a class=\"dropdown-item\" href=\"#\" data-theme-path=\"".concat(isRootPath ? value.replace('../', '') : value, "\">").concat(key, "</a>");
    return str;
  }, '');
  return "<li class=\"nav-item dropdown dropdown-dark\">\n            <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"theme-dropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n              Choose Theme\n            </a>\n            <div class=\"dropdown-menu text-small-contents\" aria-labelledby=\"theme-dropdown\">\n              ".concat(themesHtml, "\n            </div>\n          </li>");
};

bootlaterusUtils.CreateThemeSelector = function (selector, isRootPath) {
  $(selector).html(this.GetUI(isRootPath));
};

$(function () {
  var isRootPath = $('#theme-selector').data('is-root');
  bootlaterusUtils.CreateThemeSelector('#theme-selector', isRootPath); // Theme change handler

  $('a[data-theme-path]').click(function () {
    bootlaterusUtils.ChangeTheme($(this).data('theme-path'));
  }); // Smooth scroll handler

  $('a').on('click', function (event) {
    if (!this.hash) return;
    event.preventDefault();
    var target = this.hash;
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 800, function () {
      // Update URL
      window.location.hash = target;
    });
  });
});
//# sourceMappingURL=util.js.map
