function generate(prompt) {

  const url =
    "https://image.pollinations.ai/prompt/" +
    encodeURIComponent(prompt);

  return url;

}

module.exports = {
  generate
};
