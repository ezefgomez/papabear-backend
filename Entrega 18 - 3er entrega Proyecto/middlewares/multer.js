import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public");
    },
    filename: function (req, file, cb) {
        req.body.fileName = Date.now() + file.originalname;
        cb(null, req.body.fileName);
    },
});

export const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png)$/)) {
            return cb(new Error("Error en el tipo de archivo."));
        }
        cb(null, true);
    },
});