import { Plugin } from "aliucord/entities";
import { MessageActions } from "aliucord/metro";
import * as maps from "./maps";
import { AliucordCommand, ApplicationCommandOptionType } from "aliucord/api";
import { mapString } from "./utils";

export default class Texter extends Plugin {
    public start() {
        for (const map of Object.values(maps)) {
            const data: Omit<AliucordCommand, "name"> = {
                description: map.info.description,
                options: [{
                    name: "text",
                    description: "The text to transform",
                    type: ApplicationCommandOptionType.STRING,
                    required: true
                }],
                execute: ([text], ctx) => {
                    MessageActions.sendMessage(ctx.channel.id, {
                        content: mapString(text as string, map.mappings)
                    });
                }
            };

            for (const alias of map.info.aliases) {
                this.commands.registerCommand({
                    ...data,
                    name: alias
                })
            }
        }
    }

    public stop = () => this.commands.unregisterAll();
}