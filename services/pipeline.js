const aiRouter = require("./aiRouter");
const memory = require("./characterMemory");

async function createMovie(chatId, topic) {

    // =========================
    // STORY
    // =========================

    const story = await aiRouter.generate(`
You are an Oscar-winning Pixar and Disney Screenwriter.

TOPIC:
${topic}

IMPORTANT RULES:

• Create ONLY ONE main character.
• Never introduce another hero.
• Family Friendly.
• Emotional.
• Funny.
• Cinematic.

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

Body Type

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

    // =========================
    // CHARACTER MEMORY
    // =========================

    let character = memory.getCharacter(chatId);

    if (!character) {

        character = await aiRouter.generate(`
You are Pixar Character Designer.

TOPIC:
${topic}

Create ONE permanent character.

Return ONLY:

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

Never change anything.

Every future image must use this exact character.
`);

        memory.setCharacter(chatId, character);

    }
      // =========================
    // STORYBOARD SCENES
    // =========================

    const scenePrompt = `
You are a Pixar Storyboard Artist.

STORY:

${story}

CHARACTER:

${character}

IMPORTANT RULES:

- Use ONLY this character.
- Never redesign the character.
- Keep face, hair, eyes, costume, shoes, accessories and personality identical.
- Create EXACTLY 10 connected scenes.

For EACH scene return:

# Scene Number

Narration

Dialogue

Image Prompt

Video Prompt

Each Image Prompt must describe the SAME character consistently.

Each Video Prompt must describe the SAME character consistently.
`;

    const scene = await aiRouter.generate(scenePrompt);

    // =========================
    // VOICE SCRIPT
    // =========================

    const voicePrompt = `
You are a professional Disney voice-over writer.

Story:

${story}

Create ONLY narration.

Requirements:

- Emotional
- Natural
- Family Friendly
- Pixar Style
- Ready for AI voice generation
`;

    const voice = await aiRouter.generate(voicePrompt);
      // =========================
    // IMAGE + VIDEO PROMPTS
    // =========================

    const imagePrompt = `
You are a Pixar Image Prompt Engineer.

CHARACTER:

${character}

SCENES:

${scene}

IMPORTANT:

- Use ONLY this character.
- Never change face, hair, eyes, body, costume, shoes or accessories.
- Create EXACTLY 10 ultra-detailed Pixar 3D image prompts.
- Cinematic lighting.
- Disney quality.
- Family friendly.
`;

    const videoPrompt = `
You are a Pixar Video Prompt Engineer.

CHARACTER:

${character}

SCENES:

${scene}

IMPORTANT:

- Use ONLY this character.
- Never redesign the character.
- Every scene must include:
  - Camera Angle
  - Camera Movement
  - Character Motion
  - Facial Expression
  - Environment
  - Lighting
  - Animation Style

Create EXACTLY 10 cinematic AI video prompts.

Style:
Pixar
Disney
Movie Quality
`;

    // Generate image + video prompts together
    const [imagePrompts, videoPrompts] = await Promise.all([
        aiRouter.generate(imagePrompt),
        aiRouter.generate(videoPrompt)
    ]);

    // =========================
    // RETURN PROJECT
    // =========================

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
