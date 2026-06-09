If your goal is to **follow the current SPF.io design**, then don't over-engineer the design system. The site is intentionally simple and optimized for lead generation.

### Core Colors

```css
:root {
  --primary: #14A7E0;
  --primary-dark: #0E6FBF;

  --accent: #F4C84A;

  --white: #FFFFFF;
  --background: #F7F8FA;

  --text-primary: #2F3A4A;
  --text-secondary: #5E6B7A;

  --border: #E5E7EB;
}
```

---

### Typography

```css
font-family: Inter, Arial, sans-serif;
```

```css
h1 {
  font-size: 56px;
  font-weight: 700;
}

h2 {
  font-size: 40px;
  font-weight: 700;
}

h3 {
  font-size: 28px;
  font-weight: 600;
}

body {
  font-size: 18px;
  line-height: 1.6;
}
```

---

### Buttons

Primary CTA style:

```css
.btn-primary {
  background: #F4C84A;
  color: #111827;
  border-radius: 999px;
  padding: 14px 28px;
  font-weight: 600;
}
```

Secondary CTA:

```css
.btn-secondary {
  background: #14A7E0;
  color: white;
  border-radius: 999px;
}
```

---

### Layout

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding-inline: 24px;
}
```

Spacing:

```css
section {
  padding-block: 80px;
}
```

---

### Border Radius

SPF uses soft corners but not modern "super rounded" SaaS styles.

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-pill: 999px;
```

---

### Shadows

Very minimal.

```css
box-shadow:
0 2px 8px rgba(0,0,0,.08);
```

Avoid heavy glassmorphism, blur, or neon effects.

---

### Hero Section Structure

```text
+------------------------------------------------+
| Navbar                                         |
+------------------------------------------------+
| Left:                                           |
| H1                                              |
| Description                                     |
| CTA Button                                      |
|                                                  |
| Right:                                           |
| Human-focused image                              |
+------------------------------------------------+
| Lead Form                                       |
+------------------------------------------------+
| Customer Logos                                  |
+------------------------------------------------+
```

This is exactly the structure visible in your screenshot.

---

### Tailwind Tokens

```css
@theme {
  --color-primary: #14A7E0;
  --color-primary-dark: #0E6FBF;

  --color-accent: #F4C84A;

  --color-background: #F7F8FA;

  --color-text: #2F3A4A;
  --color-text-muted: #5E6B7A;

  --radius-button: 999px;
  --radius-card: 12px;

  --shadow-card: 0 2px 8px rgba(0,0,0,.08);
}
```

The key is that SPF.io is **trust-first, enterprise-first, and conversion-first**. If you copy it closely, prioritize:

1. Blue as the dominant brand color.
2. Yellow only for CTAs.
3. Lots of white space.
4. Human photography instead of abstract illustrations.
5. Simple forms above the fold.
6. Customer logos immediately after the hero.
7. Minimal visual effects and animations.

That's much closer to SPF.io than adopting a trendy Stripe/Linear-style design system.

Good catch. Looking at the actual HTML/CSS source you uploaded, SPF.io is **not using Inter**.

The site loads these Google Fonts: 

```html
Roboto
Source Sans Pro
```

There is also an additional stylesheet for:

```html
Open Sans
```

loaded later in the page. 

### Most likely font usage

Based on the visual appearance and common Divi theme defaults:

```css
Headings:
Roboto

Body:
Source Sans Pro
```

or

```css
Headings:
Roboto

Body:
Open Sans
```

The hero headline in your screenshot definitely looks much closer to **Roboto Bold (700)** than Inter.

---

### If you want to clone SPF.io exactly

```css
:root {
  --font-heading: "Roboto", sans-serif;
  --font-body: "Source Sans Pro", sans-serif;
}
```

```css
body {
  font-family: var(--font-body);
  font-size: 18px;
  line-height: 1.6;
  color: #2F3A4A;
}

h1,h2,h3,h4,h5,h6 {
  font-family: var(--font-heading);
  font-weight: 700;
}
```

---

### Modern equivalent (same feeling, cleaner)

If you're building a new product but want the SPF.io feel:

```css
Headings: Inter
Body: Inter
```

or

```css
Headings: Inter
Body: Source Sans Pro
```

But if your instruction is literally:

> "just follow the current"

then use:

```css
Roboto + Source Sans Pro
```

because that is what the live site is loading today. 

My recommendation for a faithful clone:

```css
font-family: "Source Sans Pro", sans-serif;

h1,h2,h3,h4,h5,h6 {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
}
```

That will get you very close to the typography shown in the screenshot.
