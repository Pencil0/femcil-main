const fs = require("fs");
const DefaultSettings = require("../src/Settings");
const ServerHandle = require("../src/ServerHandle");
const { genCommand } = require("../src/commands/CommandList");
const readline = require("readline");

const DefaultCommands = require("../src/commands/DefaultCommands");
const DefaultProtocols = [
    require("../src/protocols/LegacyProtocol"),
    require("../src/protocols/ModernProtocol"),
];
const DefaultGamemodes = [
    require("../src/gamemodes/FFA"),
    require("../src/gamemodes/Teams"),
    require("../src/gamemodes/LastManStanding")
];

/** @returns {DefaultSettings} */
function readSettings() {
    try { return JSON.parse(fs.readFileSync("./settings.json", "utf-8")); }
    catch (e) {
        console.log("caught error while parsing/reading settings.json:", e.stack);
        process.exit(1);
    }
}
/** @param {DefaultSettings} settings */
function overwriteSettings(settings) {
    fs.writeFileSync("./settings.json", JSON.stringify(settings, null, 4), "utf-8");
}

if (!fs.existsSync("./settings.json"))
    overwriteSettings(DefaultSettings);
let settings = readSettings();

const currentHandle = new ServerHandle(settings);
overwriteSettings(currentHandle.settings);
require("./log-handler")(currentHandle);
const logger = currentHandle.logger;

// --- START OF MODIFIED SECTION ---
// This line MUST run unconditionally, as it starts the actual game server
currentHandle.start();

// Now, conditionally set up the interactive command stream
if (process.stdin.isTTY) { // Check if running in an interactive terminal
    logger.inform("Detected interactive terminal. Initializing CLI.");

    let commandStreamClosing = false;
    const commandStream = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true,
        prompt: "",
        historySize: 64,
        removeHistoryDuplicates: true
    });
    commandStream.once("SIGINT", () => {
        logger.inform("command stream caught SIGINT");
        commandStreamClosing = true;
        commandStream.close();
        currentHandle.stop(); // Stop the server when exiting CLI
        process.exitCode = 0;
    });

    // Register interactive commands (these were previously outside,
    // but they primarily interact via the command stream, so moving them inside
    // makes sense for a cleaner separation)
    DefaultCommands(currentHandle.commands, currentHandle.chatCommands);
    currentHandle.protocols.register(...DefaultProtocols);
    currentHandle.gamemodes.register(...DefaultGamemodes);
    currentHandle.commands.register(
        genCommand({
            name: "start",
            args: "",
            desc: "start the handle",
            exec: (handle, context, args) => {
                if (!handle.start()) handle.logger.print("handle already running");
            }
        }),
        genCommand({
            name: "stop",
            args: "",
            desc: "stop the handle",
            exec: (handle, context, args) => {
                if (!handle.stop()) handle.logger.print("handle not started");
            }
        }),
        genCommand({
            name: "exit",
            args: "",
            desc: "stop the handle and close the command stream",
            exec: (handle, context, args) => {
                handle.stop();
                commandStream.close();
                commandStreamClosing = true;
            }
        }),
        genCommand({
            name: "reload",
            args: "",
            desc: "reload the settings from local settings.json",
            exec: (handle, context, args) => {
                handle.setSettings(readSettings());
                logger.print("done");
            }
        }),
        genCommand({
            name: "save",
            args: "",
            desc: "save the current settings to settings.json",
            exec: (handle, context, args) => {
                overwriteSettings(handle.settings);
                logger.print("done");
            }
        }),
    );

    function ask() {
        if (commandStreamClosing) return;
        commandStream.question("@ ", (input) => {
            setTimeout(ask, 0); // Continue asking questions
            if (!(input = input.trim())) return;
            logger.printFile(`@ ${input}`);
            if (!currentHandle.commands.execute(null, input))
                logger.print(`unknown command`);
        });
    }

    setTimeout(() => {
        logger.debug("command stream open");
        ask(); // Start the interactive prompt
    }, 1000);

} else {
    // If not in an interactive terminal (e.g., on Render), just log that we are skipping CLI
    logger.inform("Running in non-interactive mode. Skipping CLI prompts and commands.");
    // In this mode, only currentHandle.start() will execute, which is what we want for Render.
}
// --- END OF MODIFIED SECTION ---
