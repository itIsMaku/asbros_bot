import { DMChannel, MessageEmbed, TextChannel } from "discord.js";
import { onEvent } from "../abstract/event";
import config from "../../config.json";
import logger from "../utils/logger";

export const event = onEvent("messageCreate", (message) => {
    let channel = message.channel;
    if (!(channel instanceof TextChannel)) return;
    if (message.author.bot) return;

    if (message.member?.permissions.has("MANAGE_MESSAGES")) return;

    const bannedWords = config.banned_words;
    const words = message.content.split(" ");
    for (let word of words) {
        for (let bannedWord of bannedWords) {
            if (new RegExp(bannedWord).test(word)) {
                message.delete();
                let embed = new MessageEmbed()
                    .setTitle("Zakázané slovo")
                    .setDescription(
                        `Uživatel ${message.author.toString()} poslal zakázané slovo.`
                    )
                    .addFields({
                        name: "Regex pattern slova",
                        value: `\`${bannedWord}\``,
                    })
                    .setTimestamp()
                    .setColor("RED");
                channel.send({ embeds: [embed] });
                message.member?.timeout(60000, "Zakázané slovo.").then(() => {
                    logger.info(
                        `User ${message.author.tag} was timed out for 60 seconds.`
                    );
                });
                return;
            }
        }
    }
});
