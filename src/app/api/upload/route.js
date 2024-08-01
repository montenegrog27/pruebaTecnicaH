import multer from "multer";
import nextConnect from "next-connect";
import fs from "fs";
import path from "path";

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
});

const handler = nextConnect({
  onError(err, req, res) {
    res.status(500).end(`Sorry, something went wrong: ${err.message}`);
  },
  onNoMatch(req, res) {
    res.status(405).end(`Method '${req.method}' Not Allowed`);
  },
});

handler.use(upload.single("file"));

handler.post((req, res) => {
  if (req.file) {
    res.status(200).json({ file: req.file });
  } else {
    res.status(400).json({ error: "No file uploaded" });
  }
});

export default handler;
