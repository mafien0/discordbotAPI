require("dotenv").config();

const { createApi } = require("./api/main");
const { createBot } = require("./discord/main");

// Create api
const api = createApi();
const port = process.env.PORT || 3000;
api.listen(port, () => {
    console.log(`API is running on port ${port}`);
});

// Create discord
const bot = createBot();
const token = process.env.DISCORD_TOKEN;

if (!token) {
    throw new Error("DISCORD_TOKEN environment variable is required");
}

bot.login(token).then(() => {
    console.log(`Bot is running on port ${port}`);
});
// Test

