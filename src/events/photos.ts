import { TextChannel } from "discord.js";
import { onEvent } from "../abstract/event";
import config from "../../config.json";

export const event = onEvent("messageCreate", (message) => {
    let channel = message.channel;
    if (!(channel instanceof TextChannel)) return;
    if (message.author.bot) return;
    if (channel.id != config.photo_room) return;

    message.react("✅");
});
