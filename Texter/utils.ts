export const mapString = (text: string, map: Record<string, string>) => text.split("").map(l => map[l] ?? l).join("");

export interface TexterCommand {
    /**
     * The internal name of the command
     */
    name: string;
    /**
     * A list of names to register this command under
     */
    aliases: string[];
    /**
     * A description of this command
     */
    description: string;
};