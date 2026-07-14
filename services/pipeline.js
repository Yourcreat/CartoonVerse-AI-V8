const aiRouter = require("./aiRouter");
const memory = require("./characterMemory");

async function createMovie(chatId, topic) {

  // ==========================
  // STORY
  // ==========================

  const story = await aiRouter.generate(`
You are a Pixar Story Writer.

Create a cinematic story.

Topic:
${topic}

Return:

Title

Hook

Story

Ending

Moral
`);

  // ==========================
  // CHARACTER
  // ==========================

  let character = memory.getCharacter(chatId);

  if (!character) {

    character = await aiRouter.generate(`
You are Pixar Character Designer.

Create ONE professional character.

Topic:
${topic}

Return:

Name

Age

Face

Hair

Eyes

Costume

Shoes

Accessories

Personality

Everything must remain identical forever.
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

Create 10 connected scenes.

Each scene must contain:

Scene Number

Narration

Dialogue

Image Prompt

Video Prompt
`);

  // ==========================
  // VOICE
  // ==========================

  const voice = await aiRouter.generate(`
Create professional narration.

Story:

${story}

Return voice-over only.
`);

  return {

    story,

    character,

    scene,

    voice

  };

}

module.exports = {

  createMovie

};
