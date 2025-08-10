<!-- Banner -->
<p align="center">
  <img src="./assets/banner.png" alt="CopyWrite — Next-Generation Handwriting to Document SaaS" width="100%" style="max-width:1100px; border-radius:12px;" />
</p>

# ✍️ CopyWrite — From Handwriting to Fully Formatted Documents

**CopyWrite** is a next-generation SaaS that goes far beyond traditional OCR.  
It doesn’t just convert handwriting to text — it **recreates the original document with full formatting, tables, and structure** intact.

The platform features an **in-browser document editor** with capabilities rivaling **Microsoft Word** for text documents and **Excel** for tables — allowing users to review, edit, save, and export their documents in over **20 formats**.

This repository contains the **public landing page & solutions site** for CopyWrite, built with **Next.js + React**.
https://www.copywritee.com/

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#platform-architecture">Architecture</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#installation">Installation</a> ·
  <a href="#security">Security</a> ·
  <a href="#contact">Contact</a>
</p>


## 🚀 Features

### Landing Page / Solutions Site (this repo)
- Modern, responsive **Next.js** landing page
- Solutions overview with **interactive demos** and **use case sections**
- SEO-optimized blog / solutions hub
- Integrated analytics & lead capture forms
- Dynamic sections powered by React hooks for smooth animations

### Full CopyWrite Platform (private SaaS repo)
> 🚧 This is in a **private repository**, but here's what the production platform delivers:

#### 📄 Advanced Handwriting Conversion
- AI-powered recognition engine trained for **complex handwriting styles**
- Converts not just words, but **layout, formatting, and tables**
- Recognizes **headers, lists, bold/italics, and spacing**

#### 📝 In-Browser Document Editing
- MS Word-like **rich text editor** for text-based docs
- Excel-like **table editor** for structured data
- Edit, format, and review documents before saving/export

#### 💾 Document Management
- Save documents into **folders** within user accounts
- Organize, rename, and version-control files
- Retrieve & re-edit anytime

#### 📤 Export in 20+ Formats
- PDF, DOCX, XLSX, ODT, RTF, HTML, Markdown, and more
- One-click download or send to external storage integrations


## 🏗 Platform Architecture

CopyWrite is a **two-repo architecture**:

1. **Public Landing Page** (this repo)  
   - Next.js + React  
   - Showcases solutions, features, and onboarding  
   - Drives leads into the main SaaS app

2. **Core SaaS Platform** (private repo)  
   - **Frontend:** MERN Stack (MongoDB, Express, React, Node.js)  
   - **Backend AI Engine:** Python (custom OCR + layout preservation models)  
   - **File Export Engine:** Multi-format conversion via Python + Node bridges  
   - Secure authentication & document storage


## 📊 Tech Stack (this repo)
- Next.js 14  
- React 18  
- Styled Components / Tailwind CSS  
- Framer Motion (animations)  
- SEO-friendly meta handling  
- Vercel for hosting

## 📦 Installation (for local development)
```bash
# Clone the repo
git clone https://github.com/<your-username>/<this-repo>.git
cd <this-repo>

# Install dependencies
npm install

# Start development server
npm run dev
```
🔒 Security
No sensitive credentials are stored in this repository

Production SaaS uses end-to-end encryption for document storage

Private AI model APIs are secured behind authentication layers

🌍 Production Status
Landing page live and linked to production SaaS

Core platform in active use by pilot customers

Multi-language support under development

📬 Contact
📧 Email: danieelatu@gmail.com
💼 LinkedIn: [Daniel Atu](https://www.linkedin.com/in/dalu-atu)
🌍 Live Site: https://www.copywritee.com/

⭐ If you’re impressed with CopyWrite, give the repo a star and follow for updates — it motivates the team to keep pushing document AI forward.
