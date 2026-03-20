/**
 * Docsify Callout Theme Plugin
 * 
 * This plugin transforms markdown callout syntax into styled HTML callouts.
 * 
 * Usage in your markdown:
 * > [!NOTE]
 * > Your note content here.
 *
 * > [!WARNING]
 * > Your warning content here.
 *
 * > [!TIP]
 * > Your tip content here.
 *
 * > [!INFO]
 * > Your info content here.
 *
 * > [!DANGER]
 * > Your danger content here.
 *
 * Or use the blockquote syntax:
 * > **NOTE**
 * > Your note content here.
 */

(function () {
  // Plugin configuration
  const config = window.$docsify && window.$docsify.callout || {};
  
  // Supported callout types
  const calloutTypes = ['NOTE', 'WARNING', 'TIP', 'INFO', 'DANGER'];
  
  // Callout titles (can be customized)
  const defaultTitles = {
    NOTE: 'NOTE',
    WARNING: 'WARNING',
    TIP: 'TIP',
    INFO: 'INFO',
    DANGER: 'DANGER'
  };
  
  // Merge with user config
  const titles = Object.assign({}, defaultTitles, config.titles || {});

  /**
   * Process markdown content to transform callout syntax
   */
  function processCallouts(content) {
    // Pattern 1: [!TYPE] syntax
    // Matches: > [!NOTE]\n> Content
    const alertPattern = new RegExp(
      '^> \\[!(' + calloutTypes.join('|') + ')\\]\\s*\\n((?:> .*\\n?)+)',
      'gmi'
    );
    
    // Pattern 2: **TYPE** syntax
    // Matches: > **NOTE**\n> Content
    const boldPattern = new RegExp(
      '^> \\*\\*(' + calloutTypes.join('|') + ')\\*\\*\\s*\\n((?:> .*\\n?)+)',
      'gmi'
    );

    // Replace [!TYPE] syntax
    content = content.replace(alertPattern, function (match, type, body) {
      return createCallout(type.toLowerCase(), body);
    });

    // Replace **TYPE** syntax
    content = content.replace(boldPattern, function (match, type, body) {
      return createCallout(type.toLowerCase(), body);
    });

    return content;
  }

  /**
   * Create HTML callout structure
   */
  function createCallout(type, body) {
    // Clean up the body - remove leading '> ' from each line
    const cleanBody = body
      .split('\n')
      .map(line => line.replace(/^>\s?/, ''))
      .join('\n')
      .trim();
    
    const title = titles[type.toUpperCase()] || type.toUpperCase();
    
    return `<div class="docsify-callout ${type}">
  <div class="callout-title">${title}</div>
  <p>${cleanBody}</p>
</div>`;
  }

  // Install plugin
  function install(hook, vm) {
    hook.beforeEach(function (content) {
      return processCallouts(content);
    });
  }

  // Register plugin
  if (typeof window !== 'undefined' && window.$docsify) {
    window.$docsify.plugins = [].concat(
      window.$docsify.plugins || [],
      install
    );
  }

  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = install;
  }
})();
