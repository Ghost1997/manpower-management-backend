import multer from "multer";
import crypto from "crypto";
const PATH = "./images/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    let customFileName = crypto.randomBytes(18).toString("hex"),
      fileExtension = file.originalname.split(".")[1]; // get file extension from original file name
    cb(null, customFileName + "." + fileExtension);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Allowed only .png, .jpg, .jpeg and .gif"));
    }
  },
});

export default upload;
