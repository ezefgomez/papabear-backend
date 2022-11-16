import fs from "fs";

export const getErrorController = (req, res) => {
    if (req.session.route == "register") {
        fs.unlinkSync("public/uploads/" + req.session.fileName);
    }

    res.render("pages/error", {
        message: req.session.message,
        route: req.session.route,
    });
    req.session.destroy();
};