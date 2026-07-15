const aiRouter = require("./aiRouter");
const memory = require("./characterMemory");

async function createMovie(chatId, topic) {

  // ==========================
  // STORY
  // ==========================

  const story = await aiRouter.generate(`
You are an award-winning Pixar and Disney screenwriter.

Topic:
${topic}

Create:

# Title

# Hook

# Main Character

# Beginning

# Conflict

# Climax

# Ending

# Moral

1000-1200 words.

Language:
English.
`);

  // ==========================
  // CHARACTER
  // ==========================

  let character = memory.getCharacter(chatId);

  if (!character) {

    character = await aiRouter.generate(`
You are Pixar Character Designer.

Create ONE permanent character.

Topic:
${topic}

Return:

Name

Age

Face Shape

Hair

Eyes

Eyebrows

Skin Tone

Height

Body

Costume

Shoes

Accessories

Personality

Voice

Special Features

IMPORTANT:
This character must remain EXACTLY the same in every future scene and image.
`);

    memory.setCharacter(chatId, character);

  }

  // ==========================
  // SCENES
  // ==========================

  const scene = await aiRouter.generate(`
You are Pixar Storyboard Artist.

Story:

${story}

Character:

${character}

Create exactly 10 connected scenes.

Each scene must contain:

Scene Number

Narration

Dialogue

Image Prompt

Video Prompt

Keep the SAME character in every scene.
`);

  // ==========================
  // VOICE
  // ==========================

  const voice = await aiRouter.generate(`
You are a professional voice-over writer.

Story:

${story}

Create only the narration script.

Natural.
Emotional.
Disney Style.
`);

  // ==========================
  // IMAGE PROMPTS
  // ==========================

  const imagePrompts = await aiRouter.generate(`
Create 10 professional Pixar image prompts.

Character:

${character}

Scenes:

${scene}

One image prompt for every scene.
`);

  // ==========================
  // VIDEO PROMPTS
  // ==========================

  const videoPrompts = await aiRouter.generate(`
Create 10 cinematic AI video prompts.

Character:

${character}

Scenes:

${scene}

One video prompt for every scene.
`);

  return {

    story,

    character,

    scene,

    voice,

    imagePrompts,

    videoPrompts

  };

}

module.exports = {

  createMovie

};
