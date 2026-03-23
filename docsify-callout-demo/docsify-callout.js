/**
 * Docsify Callout Plugin
 * 
 * Transforms markdown blockquotes with special syntax into styled callout boxes.
 * 
 * Usage in markdown:
 * 
 * > [!NOTE]
 * > Your note content here.
 *
 * > [!WARNING]
 * > Your warning content here.
 *
 * > [!TIP]
 * > Your tip/feature notice content here.
 *
 * > [!INFO]
 * > Your info content here.
 */

(function () {
  'use strict';

  // Default configuration
  const defaultConfig = {
    types: {
      note: { icon: 'ℹ', title: 'NOTE', color: '#008080' },
      warning: { icon: '⚠', title: 'WARNING', color: '#c0392b' },
      tip: { icon: '★', title: 'FEATURE NOTICE', color: '#7d8c3f' },
      info: { icon: 'ℹ', title: 'INFO', color: '#3498db' }
    }
  };

   function getConfig() {
    var docsify = window.$docsify || {};
    var config = docsify.callout || {};
    return {
      types: Object.assign({}, defaultConfig.types, config.types || {})
    };
  }

   function createCallout(type, content) {
    var config = getConfig();
    var typeConfig = config.types[type] || config.types.note;
    
    return '<div class="docsify-callout ' + type + '">\n' +
           '<div class="callout-title">' + typeConfig.title + '</div>\n' +
           content + '\n' +
           '</div>';
  }

  function processCallouts(content) {
    var config = getConfig();
    var types = Object.keys(config.types);
    var typePattern = types.join('|');
    
    // Fixed pattern - properly captures all consecutive > lines
    var pattern = new RegExp(
      '(^|\\n)> \\[!(' + typePattern + ')\\]\\s*\\n((?:>[^\\n]*(?:\\n|$))*)',
      'gi'
    );

    return content.replace(pattern, function (match, prefix, type, body) {
      var lines = body.split('\n');
      var processedLines = [];
      
      for (var i = 0; i < lines.length; i++) {
        processedLines.push(lines[i].replace(/^>\s?/, ''));
      }
      
      var cleanBody = processedLines.join('\n').trim();
      return prefix + createCallout(type.toLowerCase(), cleanBody);
    });
  }

  var calloutPlugin = function (hook, vm) {
    hook.beforeEach(function (markdown, next) {
      try {
        var processed = processCallouts(markdown);
        next(processed);
      } catch (err) {
        console.error('Docsify Callout Plugin error:', err);
        next(markdown);
      }
    });
  };

  $docsify = $docsify || {};
  $docsify.plugins = [].concat(calloutPlugin, $docsify.plugins || []);
 })();