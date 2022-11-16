import log4js from "log4js";

log4js.configure({
    appenders: {
        console: { type: "console" },
        fileWarn: { type: "file", filename: "warn.log" },
        fileError: { type: "file", filename: "error.log" },
        myloggerConsole: {
            type: "logLevelFilter",
            appender: "console",
            level: "info",
        },
        myloggerWarn: {
            type: "logLevelFilter",
            appender: "fileWarn",
            level: "warn",
        },
        myloggerError: {
            type: "logLevelFilter",
            appender: "fileError",
            level: "error",
        },
    },

    categories: {
        default: {
            appenders: ["myloggerConsole", "myloggerWarn", "myloggerError"],
            level: "all",
        },
    },
});

export const logger = log4js.getLogger();