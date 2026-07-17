const freeRouter = require("./freeRouter");

async function generate(prompt) {

    return await freeRouter.generate(prompt);

}

module.exports = {
    generate
};
