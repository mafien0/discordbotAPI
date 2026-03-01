const express = require("express");
const { apiKeyMiddleware } = require("./auth");

const { sendEmbedMsg } = require("../discord/messageService");
const { createMessage } = require("../discord/embeds");

function createRouter() {
    const app = express();
    app.use(express.json());

    app.get("/", (req, res) => {
        res.send("API is up");
    });

    // Send message
    app.post("/send-message", apiKeyMiddleware, async (req, res) => {
        const {msgHeader, msgContent} = req.body;

        if (!msgHeader || !msgContent) {
            return res.status(400).json({error: "msgHeader and msgContent are required"});
        }

        try {
            await sendEmbedMsg(createMessage(msgHeader, msgContent));
            return res.status(200).json({message: "Message sent successfully"});
        } catch (err) {
            console.error(err);
            return res.status(500).json({error: "Internal server error"});
        }
    });
    return app;
}

module.exports = { createApi: createRouter };