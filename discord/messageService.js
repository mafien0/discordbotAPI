// Hold a reference to the Discord client, set from index.js
let client = null;

// Channels will be filled on bot login
const CHANNELS = {
    chat: null,
    status: null,
    updates: null,
};

// get a discord client from `index.js`. will be set on bot login
function setDiscordClient(discordClient) {
    if (!discordClient) throw new Error("Discord client is required");
    client = discordClient;
}

async function getChannelById(id) {
    if (!id) throw new Error("No channel ID provided");
    if (!client) throw new Error("Discord client is not initialized");

    const channel = await client.channels.fetch(id);

    if (!channel) {
        throw new Error(`Channel not found for ID: ${id}`);
    }
    if (!channel.isTextBased()) {
        throw new Error(`Channel ${id} is not text-based`);
    }

    return channel;
}

async function initChannels() {
    CHANNELS.chat = await getChannelById(process.env.DISCORD_CHANNEL_CHAT);
    CHANNELS.status = await getChannelById(process.env.DISCORD_CHANNEL_STATUS);
    CHANNELS.updates = await getChannelById(process.env.DISCORD_CHANNEL_UPDATES);
}

async function sendMsg(msg, type = "chat") {
    if (!msg) throw new Error("No message provided");
    if (!CHANNELS[type])  throw new Error(`Channel for type "${type}" is not initialized`);

    console.log(`Sending message to "${type}" channel`);
    return CHANNELS[type].send(msg);
}
const sendEmbedMsg = (msg) => sendMsg({ embeds: [msg] });

module.exports = {
    setDiscordClient,
    initChannels,
    sendMsg,
    sendEmbedMsg,
};