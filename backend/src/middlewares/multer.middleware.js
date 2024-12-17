import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/temp");
    },
    filename: (req, file, cb) => {
        // Extract the original file name and extension
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext);

        // Append current date and time to the original name
        const currentDateTime = new Date()
            .toISOString()
            .replace(/[-T:.Z]/g, ""); // Format to YYYYMMDDHHMMSS

        const newFileName = `${baseName}-${currentDateTime}${ext}`;

        cb(null, newFileName);
    },
});

export const upload = multer({ storage });
