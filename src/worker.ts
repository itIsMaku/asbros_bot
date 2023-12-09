import logger from "./utils/logger";
import { client } from "./app";
import config from "../config.json";

export let interval: any = undefined;

export async function worker() {
    let guild = client.guilds.resolve(config.guild);
    if (guild == undefined || guild == null) {
        logger.error("Worker | Guild not found.");
        return;
    }
    logger.info("Worker | Worker is running.");
    interval = setInterval(() => {
        client.user?.setPresence({
            activities: [
                {
                    name: `${guild?.memberCount} uživatelů`,
                    type: "LISTENING",
                },
            ],
            status: "idle",
        });
    }, 1000 * 60);
}
