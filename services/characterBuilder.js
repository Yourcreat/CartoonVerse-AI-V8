const memory = require("./characterMemory");

function buildPrompt(chatId, scenePrompt) {

  const character =
    memory.getCharacter(chatId);

  if (!character) {
    return scenePrompt;
  }

  return `
MAIN CHARACTER

${character}

=====================

SCENE

${scenePrompt}

=====================

IMPORTANT RULES

- Use EXACTLY the same character.
- Same face.
- Same hairstyle.
- Same eyes.
- Same clothes.
- Same shoes.
- Same colors.
- Same body.
- Never redesign the character.
- Pixar 3D.
- Disney Quality.
- Cinematic lighting.
- Ultra detailed.
`;
}

module.exports = {
  buildPrompt
};
