# Docsify Callout Plugin Demo

This page demonstrates all the callout types available in the Docsify Callout Plugin.

---

## NOTE Callout

Use the `NOTE` callout for general information and helpful tips.

> [!NOTE]
> To support the flexible use of your hardware, VBS4 supports an *Offline* use case, where a VBS World Server is not required. 

---

> [!WARNING]
> THIS IS TESTED BY THASHINI

--- 


> [!INFO]
> This is tested by thashini '

---

## WARNINING

---


Use the `WARNING` callout to alert users about important issues or limitations.

> [!WARNING]
> While berms are functional in VBS4, Editor Objects with underground cutting (such as trenches) are not.
> - To create berms, see [Earthworks (Berms)](#), or use VBS Geo.
> - To create trenches, use VBS Geo.
>
> VBS Geo berms and trenches cannot be modified by earth-moving vehicles.
>
> For more information on using VBS Geo to create berms and trenches, see [Placing and Editing Models](#) and [Elevation Line Editing](#).

---

## TIP Callout (Feature Notice)

Use the `TIP` callout for feature announcements and upcoming changes.

> [!TIP]
> Bohemia Interactive Simulations intends to enable the majority of these features or provide equivalent replacement features in future releases of VBS4.

---

## INFO Callout

Use the `INFO` callout for additional context and supplementary information.

> [!INFO]
> This feature is available starting from version 2.0. Make sure to update your installation to access all new capabilities.

---

## Markdown Support

Callouts support full markdown formatting:

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

---

## Usage

To use callouts in your markdown, use this syntax:

```markdown
> [!NOTE]
> Your note content here.

> [!WARNING]
> Your warning content here.

> [!TIP]
> Your tip content here.

> [!INFO]
> Your info content here.
```

---

## Installation

1. Copy `docsify-callout.js` and `docsify-callout.css` to your Docsify project
2. Include them in your `index.html`:

```html
<link rel="stylesheet" href="docsify-callout.css">
<script src="docsify-callout.js"></script>
```

3. Configure in your Docsify setup (optional):

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
