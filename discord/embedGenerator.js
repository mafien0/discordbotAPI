const { EmbedBuilder, resolveColor } = require("discord.js");
const config = require("../config.json");

// Embed generator
function generateEmbed(header, content, color = null) {
    if (!color) color = config.discord.embed.colors.white || "#ffffff";
    return new EmbedBuilder()
        .setTitle(header)
        .setDescription(content)
        .setColor(resolveColor(color));
}
const createError = (header, content) => generateEmbed(header, content,
    config.discord.embed.colors.red || "#ff0000");
const createSuccess = (header, content) => generateEmbed(header, content,
    config.discord.embed.colors.green || "#00ff00");
const createWarning = (header, content) => generateEmbed(header, content,
    config.discord.embed.colors.yellow || "#ffff00");

module.exports = { createEmbed: generateEmbed, createError, createSuccess, createWarning };
