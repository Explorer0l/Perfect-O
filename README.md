# 🌟 Stellar Stories: Space Weather Adventure

An interactive 3D digital children's book that explains space weather and its impact on Earth through an engaging story. Created for NASA Space Apps Challenge 2024.

## ✨ Features

- **3D Interactive Book**: Beautiful 3D book that opens and closes with scroll
- **Scroll-based Storytelling**: Story unfolds as you scroll through the page
- **Futuristic Design**: Holographic effects, animated starry background, and cosmic theme
- **13 Scenes**: Complete story with characters Khurshed, Mehrob, and Rawshan
- **Educational Content**: Real NASA facts about space weather, solar flares, and their impacts
- **Smooth Animations**: GSAP and Framer Motion for butter-smooth transitions

## 🚀 Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **GSAP** - Professional animation library
- **React Three Fiber** - 3D graphics
- **Lucide React** - Beautiful icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customization

### Adding Your Own Images

Replace placeholder images in `data/story.ts`:

```typescript
export const sceneImages: { [key: number]: string } = {
  1: '/images/scene1.jpg',  // Your image path
  2: '/images/scene2.jpg',
  // ... etc
};
```

Place your images in the `public/images/` directory.

### Adjusting Animation Speed

Modify scroll multiplier in `app/page.tsx`:

```typescript
const scrollMultiplier = 500; // Adjust this value
```

### Changing Colors

Edit color scheme in `tailwind.config.ts`:

```typescript
colors: {
  cosmic: {
    purple: "#8B5CF6",
    blue: "#3B82F6",
    pink: "#EC4899",
    cyan: "#06B6D4",
  },
}
```

## 📖 Story Structure

The story follows three friends - Khurshed, Mehrob, and Rawshan - as they learn about:

1. The Sun and its energy
2. Solar flares and coronal mass ejections
3. Earth's magnetic field
4. Aurora borealis
5. Impact on farmers and GPS
6. Airline operations during solar storms
7. Astronauts and space safety
8. Power grid vulnerabilities
9. Satellite communications
10. Space weather monitoring
11. Scientific teamwork
12. The Sun-Earth connection
13. Our cosmic connection

## 🎯 Design Philosophy

- **Futuristic aesthetic**: Holographic effects, neon glows, cosmic gradients
- **Smooth interactions**: Every scroll reveals new content seamlessly
- **Responsive design**: Works on desktop and mobile devices
- **Educational value**: Real NASA facts integrated into engaging narrative
- **Child-friendly**: Simple language, beautiful visuals, interactive experience

## 🌐 Deployment

### Option 1: Docker (рекомендуется)

```bash
# Быстрый старт с Docker Compose
docker-compose up --build

# Или вручную
docker build -t stellar-stories .
docker run -p 3000:3000 stellar-stories
```

Подробная инструкция в [DOCKER.md](./DOCKER.md)

### Option 2: Vercel

```bash
npm run build
# Follow Vercel deployment instructions
```

### Option 3: Render.com

Используйте `render.yaml` (Node.js) или `render-docker.yaml` (Docker) для автоматического деплоя.

### Option 4: Другие платформы

Проект поддерживает деплой на любую платформу с Docker:
- AWS ECS
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform
- Heroku

## 📝 Credits

- Story and concept: NASA Space Apps Challenge 2024
- Development: Modern web technologies
- Images: Unsplash (placeholder - replace with your own)
- Icons: Lucide React

## 📄 License

This project is created for educational purposes as part of NASA Space Apps Challenge.

---

Made with ❤️ and ✨ for space education
