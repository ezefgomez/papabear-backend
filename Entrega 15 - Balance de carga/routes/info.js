const express = require("express");
const { Router } = express;

const infoRouter = Router();

infoRouter.get("/info", async (req, res) => {
    const info = {
        inputArgs: process.argv.slice(2),
        path: process.cwd(),
        os: process.platform,
        processId: process.pid,
        nodeVersion: process.version,
        folder: __dirname,
        rss: process.memoryUsage().rss,
        cpus: require("os").cpus().length,
    };
    res.json(info);
});

module.exports = infoRouter;