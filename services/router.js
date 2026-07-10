module.exports = function getIntent(message) {

  const text = message.toLowerCase();

  if (text.includes("story")) return "story";

  if (text.includes("character")) return "character";

  if (text.includes("scene")) return "scene";

  if (text.includes("storyboard")) return "storyboard";

  if (text.includes("voice")) return "voice";

  if (text.includes("movie")) return "movieplus";

  if (text.includes("episode")) return "episode";

  if (text.includes("pdf")) return "pdf";

  if (text.includes("zip")) return "zip";

  return "chat";

};
