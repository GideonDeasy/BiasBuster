/**
 * Midjourney prompt templates for Bias Buster educational game
 * Each prompt is designed to be kid-friendly, educational, and visually engaging
 */

const STYLE_PARAMS = {
  base: {
    default: "digital art, educational illustration, kid-friendly",
    detailed: "clean vector style, soft shadows, subtle textures",
    mood: "positive and engaging, welcoming atmosphere"
  },
  artStyles: {
    cartoon: "modern cartoon style, pixar-inspired character design",
    vector: "clean vector art, geometric shapes, minimalist design",
    playful: "whimsical illustration, playful character design"
  },
  colors: {
    bright: "vibrant colors, playful palette, high contrast",
    soft: "soft pastel colors, gentle gradients",
    educational: "primary colors, clear visual hierarchy"
  },
  lighting: {
    cheerful: "bright cheerful lighting, soft ambient glow",
    dramatic: "subtle dramatic lighting for emphasis",
    flat: "flat even lighting for clear information"
  },
  quality: "--v 6 --q 2",
  ratios: {
    landscape: "--ar 16:9",
    square: "--ar 1:1",
    portrait: "--ar 9:16",
    wide: "--ar 21:9"
  }
};

const createPrompt = (scene, style = "default", ratio = "landscape") => {
  const baseStyle = STYLE_PARAMS.base[style];
  const artStyle = STYLE_PARAMS.artStyles.cartoon;
  const colors = STYLE_PARAMS.colors.bright;
  const lighting = STYLE_PARAMS.lighting.cheerful;
  const aspectRatio = STYLE_PARAMS.ratios[ratio];
  
  return `${scene}, ${baseStyle}, ${artStyle}, ${colors}, ${lighting}, no text, ${STYLE_PARAMS.quality} ${aspectRatio}`;
};

export const imagePrompts = {
  // Core Game Visuals
  gameLogo: createPrompt("cute brain character wearing superhero cape, holding magnifying glass, simple mascot design"),
  gameBackground: createPrompt("abstract pattern of question marks and light bulbs, subtle educational symbols"),
  
  // Confirmation Bias
  confirmationBias: {
    intro: createPrompt("cartoon space explorer in cute spaceship scanning colorful planets, holographic displays showing planet data"),
    game: createPrompt("split scene: red planet with obvious plants vs blue planet with subtle life signs, space explorer making decision"),
    success: createPrompt("space explorer discovering surprising life forms on different colored planets, celebration moment")
  },

  // Availability Bias
  availabilityBias: {
    intro: createPrompt("child watching news on tablet showing weather report, thought bubble showing exaggerated storms"),
    game: createPrompt("split scene: small local park with normal weather vs dramatic news report about minor rain"),
    success: createPrompt("child looking at statistics chart comparing real vs perceived weather events, 'aha' moment expression")
  },

  // Anchoring Bias
  anchoringBias: {
    intro: createPrompt("toy store scene with two identical toys, one with very high price tag, child looking confused"),
    game: createPrompt("split scene: expensive toy store vs reasonable toy store, child comparing prices"),
    success: createPrompt("child with notepad comparing different toy prices, making smart decision")
  },

  // Additional Biases
  inGroupBias: {
    intro: createPrompt("diverse group of children in playground, some forming groups based on shirt colors"),
    game: createPrompt("children mixing up their usual groups, playing together with shared toys"),
    success: createPrompt("big group of diverse children playing together, breaking previous group boundaries")
  },

  gamblersFallacy: {
    intro: createPrompt("arcade with simple coin flip game, thought bubbles showing probability symbols"),
    game: createPrompt("split scene: coin flip history vs future flip possibility, child thinking deeply"),
    success: createPrompt("child understanding independence of events, teaching probability to friends")
  },

  // UI Elements
  successBadge: createPrompt("shining golden badge with brain symbol, stars and sparkles"),
  trophyIcon: createPrompt("cute trophy with brain design, celebration confetti"),
  
  // Educational Elements
  thinkingProcess: createPrompt("child's head with visible thought process, gears and lightbulbs, decision-making symbols"),
  learningMoment: createPrompt("child having 'aha' moment, light bulb above head, surrounded by floating question marks turning into exclamation marks"),

  // New Cognitive Biases
  bandwagonEffect: {
    intro: createPrompt("crowd of kids following popular toy trend, one child thinking independently", "default", "landscape"),
    game: createPrompt("split scene: group following trend vs individual making unique choice", "detailed", "landscape"),
    success: createPrompt("diverse choices celebrated, children showing different preferences", "playful", "landscape")
  },

  dunningKruger: {
    intro: createPrompt("child confidently teaching wrong math solution, thought bubble showing misunderstanding", "default", "landscape"),
    game: createPrompt("learning journey mountain with stages of understanding, cartoon child climbing", "detailed", "wide"),
    success: createPrompt("child realizing complexity, sharing humble learning moment with friends", "playful", "landscape")
  },

  sunkCostFallacy: {
    intro: createPrompt("child continuing to build wobbly tower despite obvious problems", "default", "portrait"),
    game: createPrompt("split scene: continuing failed project vs starting fresh approach", "detailed", "landscape"),
    success: createPrompt("child learning to let go, starting new better project", "playful", "landscape")
  },

  negativeityBias: {
    intro: createPrompt("child's art wall with many positive and one negative comment, focus on negative", "default", "landscape"),
    game: createPrompt("balancing scale with positive and negative experiences, child learning perspective", "detailed", "square"),
    success: createPrompt("child celebrating both successes and learning from mistakes", "playful", "landscape")
  },

  // Interactive Elements
  gameElements: {
    buttons: {
      correct: createPrompt("glowing green checkmark button with stars", "vector", "square"),
      incorrect: createPrompt("gentle red X button with learning symbol", "vector", "square"),
      next: createPrompt("arrow button with encouraging glow", "vector", "square")
    },
    rewards: {
      stars: createPrompt("collection of animated star rewards, sparkling", "playful", "wide"),
      badges: createPrompt("set of achievement badges with brain themes", "vector", "square"),
      celebration: createPrompt("celebration scene with confetti and happy brain character", "playful", "landscape")
    }
  },

  // Educational Overlays
  overlays: {
    tutorial: createPrompt("floating UI elements showing game instructions, gentle glow", "vector", "wide"),
    feedback: createPrompt("thought bubble with learning moment illustration", "playful", "square"),
    progress: createPrompt("brain power meter filling up with knowledge", "vector", "portrait")
  }
};

// Export helper functions
export const generateCustomPrompt = (sceneDescription, style = "default", ratio = "landscape") => 
  createPrompt(sceneDescription, style, ratio);

export const getStyleOptions = () => ({
  styles: Object.keys(STYLE_PARAMS.base),
  ratios: Object.keys(STYLE_PARAMS.ratios)
}); 