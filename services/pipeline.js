const aiRouter = require("./aiRouter");
const memory = require("./characterMemory");

async function createMovie(chatId, topic) {

  // ==========================
  // STORY
  // ==========================

  const story = await aiRouter.generate(`
You are an award-winning Pixar and Disney screenwriter.

TOPIC:
${topic}

IMPORTANT RULES:

- Create ONLY ONE main character.
- Never create another hero.
- The entire movie must revolve around ONE character.
- Family Friendly.
- Emotional.
- Cinematic.

Return:

# Movie Title

# Hook

# Main Character

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

# Beginning

# Conflict

# Climax

# Ending

# Moral

Length:
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

TOPIC:
${topic}

Create ONE permanent character.

Return:

Name

Age

Face Shape

Hair

Eyes

Eyebrows

Skin Tone

Height

Body Type

Costume

Shoes

Accessories

Personality

Voice

Special Features

Facial Expressions

Walking Style

IMPORTANT:

This character is LOCKED.

Never change:

Name
Face
Hair
Eyes
Eyebrows
Skin
Height
Body
Costume
Shoes
Accessories
Personality
Voice
Special Features
Expressions

This character must remain identical forever.
`);

    memory.setCharacter(chatId, character);

  }

  // ==========================
  // SCENES
  // ==========================

  const scene = await aiRouter.generate(`
You are Pixar Storyboard Artist.

STORY:

${story}

CHARACTER:

${character}

IMPORTANT RULES:

Use ONLY this character.

Never redesign.

Never change:

Name

Face

Hair

Eyes

Eyebrows

Skin

Body

Height

Costume

Shoes

Accessories

Personality

Expressions

Never create another hero.

Create EXACTLY 10 connected scenes.

Each scene must contain:

Scene Number

Narration

Dialogue

Image Prompt

Video Prompt

Every Image Prompt must describe the SAME character.

Every Video Prompt must describe the SAME character.
`);

  // ==========================
  // VOICE
  // ==========================

  const voice = await aiRouter.generate(`
You are a Disney Voice Writer.

Story:

${story}

Create ONLY narration.

Natural.

Emotional.

Professional.

Pixar Style.
`);

  // ==========================
  // IMAGE PROMPTS
  // ==========================

  const imagePrompts = await aiRouter.generate(`
You are Pixar Image Prompt Engineer.

CHARACTER:

${character}

SCENES:

${scene}

IMPORTANT:

Use ONLY this character.

Never change:

Face

Hair

Eyes

Body

Costume

Shoes

Accessories

Expressions

Create EXACTLY 10 image prompts.

Each prompt must be highly detailed.

Pixar Quality.

Disney Quality.

3D Animation.

Ultra Detailed.

Cinematic Lighting.

Family Friendly.
`);

  // ==========================
  // VIDEO PROMPTS
  // ==========================

  const videoPrompts = await aiRouter.generate(`
You are Pixar Video Prompt Engineer.

CHARACTER:

${character}

SCENES:

${scene}

IMPORTANT:

Use ONLY this character.

Never redesign the character.

Every scene must contain:

Camera

Lighting

Character Motion

Facial Expression

Environment

Animation

Create EXACTLY 10 cinematic AI video prompts.

Pixar Style.

Disney Style.

Movie Quality.
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
