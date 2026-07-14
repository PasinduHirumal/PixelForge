# ⚡ PixelForge — Premium Client-Side Image Cropper & Converter

PixelForge is a state-of-the-art, high-performance, offline-first image cropping and extension conversion toolkit. Built with Next.js 16+, React 19, TailwindCSS v4, Framer Motion, and the native HTML5 Canvas API, PixelForge enables developers, designers, and creators to process high-resolution images completely in the browser sandbox.

---

## 🚀 Key Features

### 📐 Precision Image Cropping
- **Free Crop & Aspect Ratio Presets**: Crop images freely or choose from preset dimensions tailored for Social Media (Post, Story, Banner, Profile), paper formats (A4), or standard video resolutions.
- **Circular Crop Masking**: Perfect for profile avatars and round badges.
- **Dynamic Resizing**: Scale and export cropped selections to custom resolutions while locking or unlocking aspect ratios.
- **Transformations**: Fine-tune with Zoom scales, rotation angles, and horizontal/vertical mirror flipping.
- **Granular Undo/Redo**: Full history state stack tracking all custom adjustments, allowing users to reverse changes step-by-step.

### 🔄 Multi-Format Extension Converter & Optimizer
- **Next-Gen Extensions**: Convert standard images (PNG, JPEG/JPG, WebP, AVIF, BMP, ICO, and static single-frame GIF) to modern WebP and AVIF formats, reducing file size payloads by 50% to 80% with no detail loss.
- **File Renaming**: Rename outputs on-the-fly.
- **Adaptive Transparency Fill**: For conversions from formats supporting alpha transparency (e.g. PNG) to solid background formats (e.g. JPEG, BMP), select between custom White or Black backgrounds to prevent blocky artifacts.
- **Resolution Scaling**: Scale converted files to precise width/height dimensions.
- **Visual Compression Controls**: Fine-tune compression quality sliders for JPEG, WebP, and AVIF.
- **Real-Time Savings Estimator**: Instant side-by-side file resolution and weight comparison, showing percentage gains in bytes saved.

### 🛡️ Privacy & Performance First
- **100% Client-Side Sandbox**: All image operations are executed inside the browser using HTML5 Canvas. Your images are never uploaded to any remote server, guaranteeing absolute confidentiality.
- **Sub-Second Performance**: Processing bypasses network roundtrips, scaling and rendering high-resolution images in milliseconds.
- **Zero Subscriptions or Limits**: Fully open, free, and watermark-free.

---

## 🎨 Tech Stack & Design System
- **Core Framework**: [Next.js](https://nextjs.org/) App Router & [React 19](https://react.dev/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/) with a curated, modern glassmorphic design theme (featuring beautiful frosted-glass panels, indigo/violet/cyan glow effects, custom hover micro-animations, and full dark-mode optimization).
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for premium workspace entries and sliding sidebar reviews.
- **Icons**: [Lucide React](https://lucide.dev/) for crisp, modern iconography.
- **Cropping Logic**: Integrated [react-easy-crop](https://github.com/ValentinKolyasnikov/react-easy-crop) customizable canvas container.

---

## ⚙️ Installation & Local Development

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/PasinduHirumal/image-cropper-and-extention-changer.git
   cd image-cropper-and-extention-changer
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to experience the app.

4. **Lint and Validate Rules**:
   ```bash
   npm run lint
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📐 Project Structure
```text
├── app/
│   ├── layout.tsx         # Global layouts and html metadata headers
│   ├── page.tsx           # Premium Landing page with features grid and FAQs
│   ├── about/             # Info on client-side sandboxing, canvas pipeline, and privacy
│   ├── convert/           # Converter page routing and file drop loaders
│   ├── crop/              # Cropper page routing and crop workspace initialization
│   ├── globals.css        # Tailwind v4 configuration, custom themes, and glassmorphic utilities
│   └── privacy/           # Privacy policy and offline security policy declarations
├── components/
│   ├── convert/           # Conversion workspace settings and file comparisons
│   ├── crop/              # Crop adjustments controls, workspace cropper, and output previews
│   └── shared/            # Common UI elements (Button, Slider, Select, Dropzone, ThemeToggle, Toast)
├── hooks/                 # Custom state managers (useCrop, useConvert, useImageUpload, useDownload)
├── utils/                 # Off-screen Canvas rendering pipelines, encoders, and file helpers
└── types/                 # Standard typescript models and crop areas metadata definitions
```

---

## ⚖️ License
Distributed under the MIT License. See `LICENSE` for more information.
