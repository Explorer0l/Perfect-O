export interface StoryLine {
  type: 'dialogue' | 'narration' | 'didYouKnow' | 'stage';
  character?: string;
  text: string;
}

export interface Scene {
  id: number;
  title: string;
  lines: StoryLine[];
  imagePosition: 'left' | 'right';
}

export const storyData: Scene[] = [
  {
    id: 1,
    title: "Rooftop Under the Stars",
    imagePosition: "right",
    lines: [
      { type: 'dialogue', character: 'Khurshed', text: 'You know why we can see the stars at night?' },
      { type: 'dialogue', character: 'Mehrob', text: 'Why?' },
      { type: 'dialogue', character: 'Khurshed', text: 'Because when I go to sleep, I stop shining—and the stars finally get their turn!' },
      { type: 'dialogue', character: 'Rawshan', text: '(laughs) Wait, what?' },
      { type: 'dialogue', character: 'Khurshed', text: 'Exactly! My name Khurshed means Sun!' },
      { type: 'dialogue', character: 'Khurshed', text: 'And your names are bright too—Mehrob means place of light, and Rawshan means luminous! We\'re basically a mini-galaxy!' },
      { type: 'dialogue', character: 'Mehrob', text: 'Whoa … So we\'re tiny suns?' },
      { type: 'dialogue', character: 'Khurshed', text: 'Maybe! But do you know what the real Sun is doing right now while we\'re talking?' },
      { type: 'didYouKnow', text: 'The Sun is a giant ball of hot plasma—mostly hydrogen and helium—so huge that 1.3 million Earths could fit inside it!' },
    ]
  },
  {
    id: 2,
    title: "The Sun Awakes",
    imagePosition: "left",
    lines: [
      { type: 'dialogue', character: 'Khurshed', text: 'The Sun looks calm from far away, but it\'s always bubbling, spinning, and shooting out energy. Scientists call this space weather!' },
      { type: 'dialogue', character: 'Khurshed', text: 'When the Sun burps energy, we call those solar flares. When it throws out huge clouds, that\'s a coronal mass ejection!' },
      { type: 'dialogue', character: 'Rawshan', text: 'That looks dangerous!' },
      { type: 'dialogue', character: 'Khurshed', text: 'It can be! But Earth has a secret shield. I\'ll show you.' },
      { type: 'didYouKnow', text: 'A single solar flare can release more energy than millions of nuclear bombs combined!' },
    ]
  },
  {
    id: 3,
    title: "Earth's Invisible Shield",
    imagePosition: "right",
    lines: [
      { type: 'dialogue', character: 'Khurshed', text: 'Earth has its own invisible superhero shield—the magnetic field! It protects us from the Sun\'s wild mood swings.' },
      { type: 'dialogue', character: 'Mehrob', text: 'Is that why we don\'t get fried?' },
      { type: 'dialogue', character: 'Khurshed', text: 'Exactly! Those lines catch the charged particles and send them dancing near the poles—creating the northern and southern lights!' },
      { type: 'dialogue', character: 'Rawshan', text: 'It\'s like the sky is painting!' },
      { type: 'didYouKnow', text: 'Auroras happen when solar particles hit Earth\'s atmosphere, making gases like oxygen and nitrogen glow in bright colors.' },
    ]
  },
  {
    id: 4,
    title: "The Farmer's Field",
    imagePosition: "left",
    lines: [
      { type: 'dialogue', character: 'Khurshed', text: 'Farmers use satellites and GPS to guide their tractors and drones. But when solar storms strike—signals can go wobbly!' },
      { type: 'dialogue', character: 'Khurshed', text: 'Imagine planting a whole field one meter off! That\'s why even farmers check space-weather reports.' },
      { type: 'didYouKnow', text: 'Strong solar storms can make GPS errors grow from a few centimeters to over ten meters!' },
    ]
  },
  {
    id: 5,
    title: "The Pilot in the Sky",
    imagePosition: "right",
    lines: [
      { type: 'dialogue', character: 'Khurshed', text: 'Up high, pilots have their own space-weather adventures. Near the poles, radio signals can fade because of solar storms.' },
      { type: 'dialogue', character: 'Khurshed', text: 'Airlines sometimes change flight paths to stay safe. Even in the sky, the Sun decides the rules.' },
      { type: 'didYouKnow', text: 'During strong solar storms, airlines move polar flights closer to the equator to avoid radiation and radio blackouts.' },
    ]
  },
  {
    id: 6,
    title: "The Astronaut's View",
    imagePosition: "left",
    lines: [
      { type: 'dialogue', character: 'Khurshed', text: 'Astronauts live without Earth\'s magnetic shield. When the Sun flares, they hide in safe modules inside the station.' },
      { type: 'dialogue', character: 'Khurshed', text: 'Their computers, cameras—even heart monitors—can glitch if hit by radiation.' },
      { type: 'dialogue', character: 'Rawshan', text: 'So space weather reaches space too?' },
      { type: 'dialogue', character: 'Khurshed', text: 'Exactly! That\'s why NASA keeps eyes on the Sun 24/7.' },
      { type: 'didYouKnow', text: 'Satellites like NASA\'s SOHO and Parker Solar Probe constantly watch the Sun to predict solar storms before they hit Earth.' },
    ]
  },
  {
    id: 7,
    title: "Power Grid Control Room",
    imagePosition: "right",
    lines: [
      { type: 'dialogue', character: 'Khurshed', text: 'Space weather can even shake our power lines. Huge surges from solar storms can overload transformers.' },
      { type: 'dialogue', character: 'Khurshed', text: 'Engineers keep watch so our cities don\'t go dark.' },
      { type: 'dialogue', character: 'Mehrob', text: 'Like cosmic electricians!' },
      { type: 'dialogue', character: 'Khurshed', text: 'Exactly—superheroes with voltage meters.' },
      { type: 'didYouKnow', text: 'In 1989, a solar storm knocked out power in Quebec, Canada, leaving millions without electricity for nine hours!' },
    ]
  },
  {
    id: 8,
    title: "City of Connections",
    imagePosition: "left",
    lines: [
      { type: 'dialogue', character: 'Khurshed', text: 'Everything we love—phones, internet, GPS—talks to satellites. Space weather can make those satellites feel dizzy!' },
      { type: 'dialogue', character: 'Khurshed', text: 'When your Wi-Fi drops for no reason … sometimes it\'s not your router—it\'s the Sun playing games!' },
      { type: 'dialogue', character: 'Rawshan', text: 'So the Sun can break my game?' },
      { type: 'dialogue', character: 'Khurshed', text: '(laughing) Yup! The universe just pressed pause on you.' },
      { type: 'didYouKnow', text: 'Solar storms can charge satellite surfaces, causing small electric shocks that confuse their circuits.' },
    ]
  },
  {
    id: 9,
    title: "The Data Watchers",
    imagePosition: "right",
    lines: [
      { type: 'dialogue', character: 'Khurshed', text: 'Scientists watch the Sun with telescopes, probes, and computers. They build models to warn pilots, farmers, and engineers before storms arrive.' },
      { type: 'dialogue', character: 'Khurshed', text: 'It\'s teamwork between people on the ground and machines in space!' },
      { type: 'didYouKnow', text: 'Space-weather forecasts travel from solar observatories to governments and airlines within minutes.' },
    ]
  },
  {
    id: 10,
    title: "Solar Storm Showdown",
    imagePosition: "left",
    lines: [
      { type: 'dialogue', character: 'Khurshed', text: 'When a big solar storm rushes toward us, it meets Earth\'s shield like waves against a strong wall.' },
      { type: 'dialogue', character: 'Khurshed', text: 'Most of the time, Earth wins. That\'s why scientists never stop learning—to keep our lights, planes, and gadgets safe.' },
      { type: 'didYouKnow', text: 'A solar storm takes about 15–18 hours to reach Earth—just enough time for scientists to send out alerts.' },
    ]
  },
  {
    id: 11,
    title: "Back to the Rooftop",
    imagePosition: "right",
    lines: [
      { type: 'dialogue', character: 'Mehrob', text: 'That was epic. The Sun\'s like … alive!' },
      { type: 'dialogue', character: 'Rawshan', text: 'And Earth\'s a superhero planet.' },
      { type: 'dialogue', character: 'Khurshed', text: '(smiling) Yep. Every day the Sun and Earth dance together—and all our gadgets join the beat.' },
      { type: 'didYouKnow', text: 'Even your smartwatch and weather app use satellite data that can be affected by space weather!' },
    ]
  },
  {
    id: 12,
    title: "Dawn Arrives",
    imagePosition: "left",
    lines: [
      { type: 'dialogue', character: 'Mehrob', text: 'Wait … is it morning already?' },
      { type: 'dialogue', character: 'Rawshan', text: 'We talked all night!' },
      { type: 'dialogue', character: 'Khurshed', text: '(grinning) Looks like I\'m awake again.' },
      { type: 'dialogue', character: 'Khurshed', text: 'You know, the Sun never really sleeps. It just spins, sending tiny hello messages of light everywhere — through phones, radios, and even our smiles.' },
      { type: 'dialogue', character: 'Mehrob', text: '(laughing) So if I smile, does that count as solar energy?' },
      { type: 'dialogue', character: 'Khurshed', text: 'Totally! Just don\'t overheat!' },
      { type: 'didYouKnow', text: 'The Sun has been shining for 4.6 billion years — and will keep glowing for about 5 billion more.' },
    ]
  },
  {
    id: 13,
    title: "Closing Frame",
    imagePosition: "right",
    lines: [
      { type: 'dialogue', character: 'Khurshed', text: 'Every beam of light that touches Earth comes from the same star that wakes me up every morning.' },
      { type: 'dialogue', character: 'Khurshed', text: 'So next time your phone glows or your lights turn on — just remember, the Sun and you are talking.' },
    ]
  }
];

// Local images from public/images directory
export const sceneImages: { [key: number]: string } = {
  1: '/images/scene1.png',
  2: '/images/scene2.png',
  3: '/images/scene3.png',
  4: '/images/scene4.png',
  5: '/images/scene5.png',
  6: '/images/scene6.png',
  7: '/images/scene7.png',
  8: '/images/scene8.png',
  9: '/images/scene9.png',
  10: '/images/scene10.png',
  11: '/images/scene11.png',
  12: '/images/scene12.png',
  13: '/images/scene13.png',
  14: '/images/scene14.png',
};
