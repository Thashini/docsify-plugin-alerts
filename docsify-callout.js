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

  // Get plugin configuration from Docsify
  function getConfig() {
    const docsify = window.$docsify || {};
    return Object.assign({}, defaultConfig, docsify.callout || {});
  }

  /**
   * Create the HTML for a callout
   */
  function createCallout(type, content) {
    const config = getConfig();
    const typeConfig = config.types[type] || config.types.note;
    
    return `<div class="docsify-callout ${type}">
<div class="callout-title">${typeConfig.title}</div>
${content}
</div>`;
  }

  /**
   * Process markdown content to find and transform callouts
   */
  function processCallouts(content) {
    const config = getConfig();
    const types = Object.keys(config.types);
    const typePattern = types.join('|');
    
    // Pattern to match callout blocks
    // Matches lines starting with "> [!TYPE]" followed by lines starting with ">"
    const pattern = new RegExp(
      '(?:^|\n)> \\[!(' + typePattern + ')\\]\\s*(?:\n|$)((?:(?:>.*)?\n)*)',
      'gi'
    );

    return content.replace(pattern, function (match, type, body) {
      // Process the body content - remove leading '> ' from each line
      const lines = body.split('\n');
      const processedLines = [];
      
      for (let line of lines) {
        // Remove leading '> ' or '>' from each line
        const cleaned = line.replace(/^>\s?/, '');
        processedLines.push(cleaned);
      }
      
      // Join lines back together with newlines to preserve markdown formatting
      const cleanBody = processedLines.join('\n').trim();
      
      // Return the callout HTML with newlines preserved for markdown processing
      return '\n' + createCallout(type.toLowerCase(), cleanBody) + '\n';
    });
  }

  /**
   * Docsify plugin install function
   */
  function install(hook, vm) {
    // Process content before it's rendered
    hook.beforeEach(function (content, next) {
      const processed = processCallouts(content);
      next(processed);
    });
  }

  // Register the plugin with Docsify
  if (typeof window !== 'undefined' && window.$docsify) {
    window.$docsify.plugins = (window.$docsify.plugins || []).concat(install);
  }

  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = install;
  }

})();
