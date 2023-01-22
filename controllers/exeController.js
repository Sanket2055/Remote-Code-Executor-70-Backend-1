const path = require("path");
const fs = require("fs/promises");
const { exec } = require("child_process");
const os = require('os');
const tmpDir = os.tmpdir();

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

    await fs.writeFile(`${tmpDir}/code.js`, code, function (err) {
      if (err) throw err;
      console.log("The file has been saved!");
    });
    await fs.writeFile(`${tmpDir}/input.txt`, input, function (err) {
      if (err) throw err;
      console.log("The file has been saved!");
    });
    let output;
    exec(`node ${tmpDir}/code.js < ${tmpDir}/input.txt`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        sendResponse(error.message);
      }
      sendResponse(stdout);
    }, () => {
      // unlink the files
      fs.unlink("code.js");
      fs.unlink("input.txt");
    });
    function sendResponse(data) {
      res.json({ data });
    }
  } catch (err) {
    next(err);
  }
};
