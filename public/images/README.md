# 📷 Scene Images

Place your 13 scene images here with the following names:

- `scene1.jpg` - Rooftop Under the Stars
- `scene2.jpg` - The Sun Awakes
- `scene3.jpg` - Earth's Invisible Shield
- `scene4.jpg` - The Farmer's Field
- `scene5.jpg` - The Pilot in the Sky
- `scene6.jpg` - The Astronaut's View
- `scene7.jpg` - Power Grid Control Room
- `scene8.jpg` - City of Connections
- `scene9.jpg` - The Data Watchers
- `scene10.jpg` - Solar Storm Showdown
- `scene11.jpg` - Back to the Rooftop
- `scene12.jpg` - Dawn Arrives
- `scene13.jpg` - Closing Frame

## Supported formats:
- JPG/JPEG
- PNG
- WebP

## Recommended dimensions:
- Width: 800-1200px
- Height: 600-900px
- Aspect ratio: 4:3 or 16:9

## After adding images:

Update `data/story.ts` to use local images:

```typescript
export const sceneImages: { [key: number]: string } = {
  1: '/images/scene1.jpg',
  2: '/images/scene2.jpg',
  3: '/images/scene3.jpg',
  // ... etc
};
```

Then restart the dev server with `npm run dev`
