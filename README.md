# Meauxbility - Transform Your Pain into Purpose

A comprehensive multi-page website for Meauxbility, a 501(c)(3) non-profit organization providing mobility grants and accessibility services to spinal cord injury survivors in Louisiana's Acadiana region.

## 🌐 Live Site

**Production URL:** https://inneranimal.github.io/fred/

## 📋 Project Overview

This is a static website built with HTML, CSS, and JavaScript, designed for deployment on GitHub Pages. The site features a component-based architecture with dynamic loading, responsive design, and accessibility compliance.

### 🎯 Mission
Empowering spinal cord injury survivors with mobility, independence, and hope through comprehensive programs and community support.

### 🏢 Organization Details
- **Name:** Meauxbility
- **EIN:** 33-4214907
- **Status:** 501(c)(3) Non-Profit
- **Service Area:** Louisiana's Acadiana Region
- **Founded:** 2024

## 🚀 Features

### 📄 Pages
- **Home** (`index.html`) - Landing page with hero section and features
- **About** (`about.html`) - Pain to Purpose story with animations (dark theme)
- **Programs** (`programs.html`) - Service offerings and eligibility (light theme)
- **Community** (`community.html`) - Member features and events (dark theme)
- **Resources** (`resources.html`) - Downloadable content and guides (dark theme)
- **Connect** (`connect.html`) - Contact and application forms (light theme)
- **Impact** (`impact.html`) - Donation tiers and impact stats (light theme)

### 🎨 Design System
- **Colors:**
  - Teal: `#339999` (primary light theme)
  - Orange: `#FF6B35` (accent light theme)
  - Purple: `#9B59B6` (accent dark theme)
  - Mint: `#4AECDC` (highlight dark theme)
- **Typography:** Inter font family (400-900 weights)
- **Themes:** Light and dark theme support
- **Responsive:** Mobile-first design with breakpoints at 480px, 768px, 1024px, 1440px

### 🧩 Components
- **Header** (`components/header.html`) - Navigation with mobile menu
- **Footer** (`components/footer.html`) - Site footer with donation modal
- **Dynamic Loading** - Components loaded via JavaScript

### 💳 Payment Integration
- **Stripe Integration** - Secure donation processing
- **Backend:** https://shhh-ox7c.onrender.com/donations
- **Environment Variables:** Uses `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## 🛠️ Technical Stack

### Frontend
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** - Component loading, form handling, animations
- **GSAP** - Advanced animations on About page
- **Google Model Viewer** - 3D GLB model in footer

### Backend Integration
- **Supabase** - Database and authentication
- **Stripe** - Payment processing
- **Google SMTP** - Email notifications
- **Render.com** - Backend API hosting

### Deployment
- **GitHub Pages** - Static site hosting
- **CDN** - Shopify CDN for images and assets

## 📁 Project Structure

```
fred/
├── index.html              # Home page
├── about.html              # About page (dark theme)
├── programs.html           # Programs page (light theme)
├── community.html          # Community page (dark theme)
├── resources.html          # Resources page (dark theme)
├── connect.html            # Connect page (light theme)
├── impact.html             # Impact page (light theme)
├── components/
│   ├── header.html         # Navigation header
│   └── footer.html         # Site footer with modal
├── css/
│   ├── header.css          # Header styles
│   ├── global.css          # Global styles
│   └── footer.css          # Footer styles
├── js/
│   ├── load-components.js  # Component loader
│   ├── navigation.js       # Navigation logic
│   ├── footer.js          # Footer functionality
│   └── donate-modal.js     # Donation modal
├── assets/
│   └── images/             # Image assets
└── scripts/
    └── cursor-init.sh      # Cursor CLI setup
```

## 🚀 Local Development

### Prerequisites
- Node.js 18+ (for local server)
- Modern web browser
- Git

### Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/InnerAnimal/fred.git
   cd fred
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local server:**
   ```bash
   npm run dev
   # or
   npx serve -s . -l 3000
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production (static site)
npm run start    # Start production server
npm run lint     # Run linting (placeholder)
npm run test     # Run tests (placeholder)
```

## 🌐 Deployment

### GitHub Pages
The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

**Deployment URL:** https://inneranimal.github.io/fred/

### Manual Deployment
1. **Commit changes:**
   ```bash
   git add .
   git commit -m "Update site content"
   git push origin main
   ```

2. **Verify deployment:**
   - Check GitHub Actions for build status
   - Visit the live URL after 2-3 minutes

## 🔧 Configuration

### Environment Variables
Create a `.env` file for local development:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Email Configuration
GOOGLE_SMTP_USER=...
GOOGLE_SMTP_PASS=...
```

### Cursor CLI Setup
```bash
# Make script executable
chmod +x scripts/cursor-init.sh

# Run setup
./scripts/cursor-init.sh
```

## 🎨 Brand Guidelines

### Logo Usage
- **Primary:** Meauxbility logo with teal/orange gradient
- **Format:** WebP with PNG fallback
- **CDN:** Shopify CDN for optimal performance

### Typography
- **Primary Font:** Inter (Google Fonts)
- **Weights:** 400, 500, 600, 700, 800, 900
- **Headings:** 900 weight, -0.02em letter-spacing
- **Body:** 400-600 weight, 1.6 line-height

### Color Palette
```css
/* Light Theme */
--teal: #339999;
--orange: #FF6B35;
--orange-dark: #E85D00;

/* Dark Theme */
--purple: #9B59B6;
--mint: #4AECDC;
```

## ♿ Accessibility

### WCAG 2.1 AA Compliance
- **Semantic HTML5** - Proper heading hierarchy
- **ARIA Labels** - Screen reader support
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus Indicators** - Visible focus states
- **Color Contrast** - Minimum 4.5:1 ratio
- **Alt Text** - Descriptive image alternatives

### Features
- Skip links for main content
- Mobile-responsive navigation
- Screen reader announcements
- High contrast mode support
- Reduced motion preferences

## 📱 Responsive Design

### Breakpoints
- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px - 1439px
- **Large Desktop:** 1440px+

### Mobile Features
- Touch-friendly buttons (min 44x44px)
- Swipe gestures for mobile menu
- Optimized images and fonts
- Fast loading on 3G networks

## 🔒 Security

### Best Practices
- No hardcoded API keys in source code
- Environment variables for sensitive data
- HTTPS enforcement
- Content Security Policy headers
- Input validation and sanitization

### Payment Security
- Stripe Elements for secure card input
- PCI DSS compliance through Stripe
- No card data stored locally
- Encrypted transmission

## 🧪 Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Navigation works on all devices
- [ ] Forms submit successfully
- [ ] Donation modal functions
- [ ] Mobile menu toggles
- [ ] Theme switching works
- [ ] Accessibility features function
- [ ] Cross-browser compatibility

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📊 Performance

### Optimization
- **Images:** WebP format with fallbacks
- **Fonts:** Preloaded critical fonts
- **CSS/JS:** Minified for production
- **CDN:** Shopify CDN for assets
- **Caching:** Browser caching headers

### Metrics
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- **HTML:** Semantic markup, accessibility attributes
- **CSS:** BEM methodology, custom properties
- **JavaScript:** ES6+, async/await, error handling
- **Commits:** Conventional commit messages

## 📞 Support

### Contact Information
- **Email:** info@meauxbility.org
- **Location:** Lafayette, Louisiana
- **EIN:** 33-4214907

### Technical Support
- Check GitHub Issues for known problems
- Review documentation for setup issues
- Contact development team for urgent matters

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Team:** Sam (CEO/Founder), Connor (CTO), Fred (CMO)
- **Community:** Spinal cord injury survivors and families
- **Partners:** Healthcare providers, accessibility advocates
- **Supporters:** Donors, volunteers, and community members

---

**Built with ❤️ for the spinal cord injury community**

*Last updated: November 2024*
