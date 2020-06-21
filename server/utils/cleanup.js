var fs = require("fs");
require("dotenv").config();

const uploadsFolder = process.env.UPLOADS_FOLDER;
const uploadsCleanupInterval = Number.parseInt(process.env.UPLOADS_CLEANUP_INTERVAL ? process.env.UPLOADS_CLEANUP_INTERVAL : 60000);
const uploadsTTL = Number.parseInt(process.env.UPLOADS_TTL ? process.env.UPLOADS_TTL : 1800000);

const initializeCleanup = () => {
    runCleanup();
    setInterval(() => {
        runCleanup();
    }, uploadsCleanupInterval);    
};

const runCleanup = () => {
  console.log("Executing temp file cleanup");
  fs.readdir(uploadsFolder, function (err, files) {
    files = files
      .map(function (fileName) {
        return {
          name: fileName,
          time: fs.statSync(uploadsFolder + "/" + fileName).mtime.getTime(),
        };
      })
      .filter((f) => {
        return f.time + uploadsTTL < Date.now();
      })
      .sort(function (a, b) {
        return a.time - b.time;
      })
      .map(function (v) {
        return { fn: v.name, dt: new Date(v.time) };
      })
      .forEach((r) => {
        fs.exists(uploadsFolder + "/" + r.fn, (exists) => {
          fs.unlink(uploadsFolder + "/" + r.fn, () => {
            console.log(r.fn + " DELETED");
          });
        });
      });
    if (err) console.error(err);
    //console.log(files);
  });
};

module.exports.initializeCleanup = initializeCleanup;
