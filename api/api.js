const express = require("express");
const { apiKeyMiddleware } = require("./auth");

const { sendEmbedMsg } = require("../discord/messageService");
const { createMessage } = require("../discord/embedGenerator");

function createApi() {
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
            // Send a message
            await sendEmbedMsg(createMessage(msgHeader, msgContent));

            // Log
            console.log(`Message sent: ${msgHeader} : ${msgContent}`);

            // Send a success response
            return res.status(200).json({message: "Message sent successfully"});
        } catch (err) {
            // Log errors and provide feedback
            console.error(err);
            return res.status(500).json({error: "Internal server error"});
        }
    });
    return app;
}

module.exports = { createApi };