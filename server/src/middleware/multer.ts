import {Request,Response, NextFunction} from "express";
import multer from "multer";
import fs from "fs";
// const sharp = require("sharp");

const storage = multer.diskStorage({
  destination: (req:Request, file:any, cb:Function) => {
    cb(null, "./uploads");
  },
  filename: async (req:Request, file:any, cb:Function) => {
    const originalFilename = file.originalname;
    const newFilename = Date.now() + "-" + originalFilename.replace(/\s/g, "_");
    cb(null, newFilename);
  },
});

const upload = multer({
  storage: storage,
});

// const processImage = async (req, res, next) => {
//   if (req.file) {
//     try {
//       await sharp(req.file.path)
//         .resize({ width: 100, height: 100, fit: "inside" })
//         .toFile("./uploads/" + "compressed_" + req.file.filename);
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ code: 500, success: false, msg: error.message });
//     }
//   }
//   next();
// };

// const processImages = async (req, res, next) => {
//   const images = req.files.images;
//   if (images && images.length > 0) {
//     try {
//       const resizePromises = images.map(async (file) => {
//         await sharp(file.path)
//           .resize({ width: 100, height: 100, fit: "inside" })
//           .toFile("./uploads/" + "compressed_" + file.filename);
//       });

//       await Promise.all(resizePromises);
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ code: 500, success: false, msg: error.message });
//     }
//   }
//   next();
// };

export default { upload };
