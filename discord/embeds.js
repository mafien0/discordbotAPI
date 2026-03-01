const { EmbedBuilder, resolveColor } = require("discord.js");
const config = require("../config.json");

const colors = config.discord.embed.colors;

// Embed generator
function generateEmbed(header, content, color = null) {
    if (!header) throw new Error("Header cannot be empty");
    if (!content) throw new Error("Content cannot be empty");
    if (!color) color = colors.white || "#ffffff";

    return new EmbedBuilder()
        .setTitle(header)
        .setDescription(content)
        .setColor(resolveColor(color));
}

// Different types of embeds
const createMessage = (header, content) => generateEmbed(header, content,
    colors.white || "#ffffff");
const createError = (header, content) => generateEmbed(header, content,
    colors.red || "#ff0000");
const createSuccess = (header, content) => generateEmbed(header, content,
    colors.green || "#00ff00");
const createWarning = (header, content) => generateEmbed(header, content,
    colors.yellow || "#ffff00");

module.exports = { createMessage, createError, createSuccess, createWarning };
