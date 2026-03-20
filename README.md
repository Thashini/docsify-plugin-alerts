# Docsify Callout Plugin

A beautiful Docsify plugin that adds styled callout boxes (NOTE, WARNING, TIP, INFO) to your documentation.

![Demo Screenshot](demo-screenshot.png)

## Features

- 🎨 **4 callout types**: NOTE (teal), WARNING (red), TIP/FEATURE NOTICE (olive), INFO (blue)
- ✨ **Icons**: Each callout has a unique icon (ℹ, ⚠, ★)
- 📝 **Full markdown support**: Bold, italic, lists, code blocks, links
- 🌙 **Dark mode ready**: CSS includes dark mode support
- ⚡ **Lightweight**: Minimal CSS and JS

## Demo

The demo is running at `http://localhost:9999/` with all callout examples.

## Installation

### 1. Copy Files

Copy these files to your Docsify project:

```
docsify-callout.js      # The plugin
docsify-callout.css     # The styles
```

### 2. Update index.html

Add the CSS and JS to your `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Your existing styles -->
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/lib/themes/vue.css">
  
  <!-- Add the callout styles -->
  <link rel="stylesheet" href="docsify-callout.css">
</head>
<body>
  <div id="app"></div>

  <script>
    // Docsify config
    window.$docsify = {
      name: 'Your Docs',
      // ... other config
    };
  </script>
  
  <!-- Add the callout plugin BEFORE docsify -->
  <script src="docsify-callout.js"></script>
  
  <!-- Docsify -->
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
</body>
</html>
```

## Usage

In your markdown files, use this syntax:

```markdown
> [!NOTE]
> Your note content here.

> [!WARNING]
> Your warning content here.

> [!TIP]
> Your tip or feature notice content here.

> [!INFO]
> Your info content here.
```

### Examples

#### NOTE
```markdown
> [!NOTE]
> To support the flexible use of your hardware, VBS4 supports an *Offline* use case.
```

#### WARNING with Lists
```markdown
> [!WARNING]
> While berms are functional in VBS4, Editor Objects with underground cutting are not.
> - To create berms, see [Earthworks (Berms)](#), or use VBS Geo.
> - To create trenches, use VBS Geo.
```

#### TIP / Feature Notice
```markdown
> [!TIP]
> Bohemia Interactive Simulations intends to enable the majority of these features in future releases.
```

#### Full Markdown Support
```markdown
> [!NOTE]
> **Bold text**, *italic text*, and `inline code` are all supported.
> 
> - List item 1
> - List item 2
> - List item 3
>
> ```javascript
> // Even code blocks work!
> console.log("Hello from callout!");
> ```
```

## Customization

You can customize the callout titles and colors in your Docsify config:

```javascript
window.$docsify = {
  callout: {
    types: {
      note: { icon: 'ℹ', title: 'NOTE', color: '#008080' },
      warning: { icon: '⚠', title: 'WARNING', color: '#c0392b' },
      tip: { icon: '★', title: 'FEATURE NOTICE', color: '#7d8c3f' },
      info: { icon: 'ℹ', title: 'INFO', color: '#3498db' }
    }
  }
};
```

## File Structure

```
docsify-callout-demo/
├── index.html              # Demo page
├── README.md               # Demo content with all examples
├── docsify-callout.js      # Plugin (copy to your project)
└── docsify-callout.css     # Styles (copy to your project)
```

## Running the Demo Locally

```bash
cd docsify-callout-demo
python3 -m http.server 9999
# Open http://localhost:9999/
```

Or use any static file server:

```bash
npx serve .
# or
npx http-server .
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- All modern browsers with CSS3 support

## License

MIT License
