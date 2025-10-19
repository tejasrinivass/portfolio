# Teja Srinivas - Portfolio Website 🚀

A stunning, modern portfolio website showcasing full stack development and UI/UX design skills with smooth scrolling, wonderful animations, and beautiful design.

## ✨ Features

### 🎨 Design & Animations
- **Animated Background**: Beautiful gradient orbs with floating animations
- **Smooth Scrolling**: Seamless navigation between sections
- **Scroll Reveal Animations**: Elements fade and slide in as you scroll
- **Typing Effect**: Dynamic text animation in the hero section
- **Morphing Shapes**: Animated profile placeholder with morphing effects
- **3D Tilt Effect**: Interactive project cards with 3D hover effects
- **Parallax Effects**: Depth and movement throughout the page
- **Cursor Trail**: Elegant cursor following effect (desktop only)

### 📱 Responsive Design
- Fully responsive layout for all devices
- Mobile-friendly hamburger menu
- Optimized for tablets and desktops
- Touch-friendly interactions

### 🎯 Sections
1. **Hero Section**: Eye-catching introduction with animated text
2. **About Me**: Personal introduction with animated statistics
3. **Skills**: Categorized skill bars with progress animations
   - Frontend Development
   - Backend Development
   - UI/UX Design
4. **Projects**: Portfolio showcase with hover effects (6 projects)
5. **Contact**: Interactive form with social links
6. **Footer**: Clean and minimal

### 🛠️ Technologies Used
- Pure HTML5, CSS3, and Vanilla JavaScript
- Google Fonts (Poppins & Playfair Display)
- Font Awesome Icons
- CSS Grid & Flexbox
- CSS Animations & Transitions
- Intersection Observer API

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Open `index.html`** in your browser
3. That's it! No build process required.

```bash
# If you have a local server (optional)
python -m http.server 8000
# or
npx serve
```

## 📝 Customization Guide

### Update Personal Information

**In `index.html`:**
- Change name in line 32: `<h1 class="name">`
- Update contact information in the Contact section
- Modify social media links
- Add your own project descriptions

**In `script.js`:**
- Update the typing text array (line 39-45)
- Modify email in console message (line 459)

### Color Scheme

**In `styles.css` (lines 12-23):**
```css
--primary-color: #6366f1;      /* Main brand color */
--secondary-color: #8b5cf6;    /* Secondary brand color */
--accent-color: #ec4899;       /* Accent color */
```

### Adding Real Images

Replace the placeholder divs in `index.html`:
```html
<!-- Replace this -->
<div class="image-placeholder">
    <i class="fas fa-user-astronaut"></i>
</div>

<!-- With this -->
<img src="your-image.jpg" alt="Your Name">
```

## 🎨 Features Breakdown

### Smooth Scrolling
- Automatic smooth scroll to sections when clicking navigation links
- Offset adjusted for fixed navbar
- Works on all modern browsers

### Animations
- **Fade In**: Elements smoothly appear
- **Slide In**: Content slides from left/right/bottom
- **Scale**: Elements grow into view
- **Counter Animation**: Numbers count up on scroll
- **Skill Bars**: Progressively fill on scroll
- **Typing Effect**: Rotates through different roles

### Interactive Elements
- Contact form with validation (ready for backend integration)
- Hover effects on all interactive elements
- Active navigation link highlighting
- Scroll-to-top button
- Mobile menu toggle

### Easter Egg 🥚
Try entering the Konami Code: ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA

## 📱 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🔧 Integration Tips

### Connect Contact Form
In `script.js`, replace the simulated submission (line 243) with your backend:

```javascript
// Example with fetch API
fetch('your-api-endpoint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message })
})
.then(response => response.json())
.then(data => {
    showNotification('Message sent successfully!', 'success');
})
.catch(error => {
    showNotification('Failed to send message.', 'error');
});
```

### Add Analytics
Add before closing `</head>` tag:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
```

### Add Real Project Links
Update project links in the Projects section with your GitHub repos and live demos.

## 🎯 Performance
- Optimized animations using CSS transforms
- Debounced scroll events
- Lazy loading ready
- Minimal dependencies
- Fast load time

## 📄 File Structure
```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 💡 Tips for Customization
1. Keep the same structure for consistency
2. Test responsiveness on multiple devices
3. Optimize images before adding them
4. Keep animations smooth (don't overdo it)
5. Update meta tags for SEO
6. Add your own favicon

## 🤝 Credits
- **Design & Development**: Teja Srinivas
- **Fonts**: Google Fonts
- **Icons**: Font Awesome
- **Inspiration**: Modern portfolio trends

## 📬 Contact
- Email: teja.srinivas@email.com
- Location: San Francisco, CA

---

**Made with ❤️ and ☕ by Teja Srinivas**

*Feel free to fork, modify, and use this portfolio for your own purposes!*
