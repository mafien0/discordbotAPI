require("dotenv").config();

const { createApi } = require("./api/api");
const { createBot } = require("./discord/discord");

// Note the added imported function
const { setDiscordClient, initChannels } = require("./discord/messageService");

// Create api
const api = createApi();
const port = process.env.PORT || 3000;
api.listen(port, () => {
    console.log(`API is running on port ${port}`);
});

// Create discord bot
const bot = createBot();
const token = process.env.DISCORD_TOKEN;

if (!token) {
    throw new Error("DISCORD_TOKEN environment variable is required");
}

bot.login(token).then(() => {
    setDiscordClient(bot);
    initChannels().then(() => console.log("Channels initialized"));
    console.log("Discord bot is up");
});
