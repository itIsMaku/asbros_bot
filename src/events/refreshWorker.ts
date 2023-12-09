import { DMChannel, MessageEmbed, TextChannel } from "discord.js";
import { onEvent } from "../abstract/event";
import config from "../../config.json";
import logger from "../utils/logger";
import { interval, worker } from "../worker";

export const event = onEvent("messageCreate", (message) => {
    let channel = message.channel;
    if (!(channel instanceof TextChannel)) return;
    if (message.author.bot) return;

    if (message.mentions.has("1175925151913738341")) {
        let embed = new MessageEmbed()
            .setDescription(`Refreshuji worker pro počítání uživatelů.`)
            .setTimestamp()
            .setColor("GREEN");
        channel.send({ embeds: [embed] });
        clearInterval(interval);
        worker();
        return;
    }
});
