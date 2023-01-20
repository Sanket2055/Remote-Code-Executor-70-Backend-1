const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
exports.executeCPP = async (req, res, next) => {
  try {
    const { code, input = "" } = req.body;

    await fs.writeFile("code.cpp", code, function (err) {
      if (err) throw err;
      console.log("The file has been saved!");
    });
    await fs.writeFile("input.txt", input, function (err) {
      if (err) throw err;
      console.log("The file has been saved!");
    });

    // compile the code
    const compile = await exec(`g++ ${"code.cpp"} -o code.exe`);

    // run the code
    const run = await exec(`code.exe < input.txt`);

    // unlink the files
    fs.unlinkSync("code.cpp");
    fs.unlinkSync("input.txt");
    // work under progress
    res.json({ run });
  } catch (err) {
    next(err);
  }
};

exports.executeJS = async (req, res, next) => {
  try {
    const { code, input = "" } = req.body;

    await fs.writeFile("code.js", code, function (err) {
      if (err) throw err;
      console.log("The file has been saved!");
    });
    await fs.writeFile("input.txt", input, function (err) {
      if (err) throw err;
      console.log("The file has been saved!");
    });
    let output;
    await exec(`node code.js < input.txt`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        sendResponse(error.message);
      }
      sendResponse(stdout);
    });
    // unlink the files
    // fs.unlinkSync("code.js");
    // fs.unlinkSync("input.txt");
    function sendResponse(data) {
      res.json({ data });
    }
  } catch (err) {
    next(err);
  }
};
