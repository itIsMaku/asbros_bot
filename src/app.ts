import { Intents, MessageEmbed } from "discord.js";
import { Client } from "discordx";
import config from "../config.json";
import logger from "./utils/logger";
import { registerEvents } from "./abstract/event";
import { registerCommands } from "./abstract/commands";
import { worker } from "./worker";

export const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.DIRECT_MESSAGES,
    ],
});

client.on("ready", async () => {
    await client.initApplicationCommands();
    registerCommands();
    registerEvents();

    logger.info("Bot | Successfully started.");

    worker();
});

client.login(config.bot.token);
