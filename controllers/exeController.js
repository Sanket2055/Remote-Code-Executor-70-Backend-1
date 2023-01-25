const path = require("path");
const fs = require("fs/promises");
const { exec } = require("child_process");
const os = require("os");
const tmpDir = os.tmpdir();
const { generateFileName } = require("../helpers/generateName");
const util = require("util");
const execAsync = util.promisify(exec);

exports.executeCPP = async (req, res, next) => {
  try {
    const fileName = await generateFileName();
    const codePath = path.join(tmpDir, fileName + ".cpp");
    const inputPath = path.join(tmpDir, fileName + ".txt");
    const exePath = path.join(tmpDir, fileName);
    const { code, input = "" } = req.body;

    await fs.writeFile(codePath, code, function (err) {
      if (err) throw err;
      // console.log("The file has been saved!");
    });
    await fs.writeFile(inputPath, input, function (err) {
      if (err) throw err;
      // console.log("The file has been saved!");
    });

    // compile the code
    const compile = await execAsync(`g++ -o ${exePath}.exe ${codePath}`);

    // run the code
    const { error, stdout, stderr } = await execAsync(
      `${exePath}.exe < ${inputPath}`
    );

    const output = error || stderr || stdout;
    // unlink the files
    await fs.unlink(`${codePath}`);
    await fs.unlink(`${exePath}.exe`);
    await fs.unlink(`${inputPath}`);
    res.json({ data: output, status: true });
  } catch (err) {
    next(err);
  }
};

exports.executeJS = async (req, res, next) => {
  try {
    const fileName = await generateFileName();
    const { code, input = "" } = req.body;
    // join the path tmpdir and filename
    const codePath = path.join(tmpDir, fileName + ".js");
    const inputPath = path.join(tmpDir, fileName + ".txt");

    await fs.writeFile(codePath, code, function (err) {
      if (err) throw err;
      // console.log("The file has been saved!");
    });
    await fs.writeFile(inputPath, input, function (err) {
      if (err) throw err;
      // console.log("The file has been saved!");
    });
    const { error, stdout, stderr } = await execAsync(
      `node ${codePath} < ${inputPath}`
    );

    const output = error || stderr || stdout;
    await fs.unlink(codePath);
    await fs.unlink(inputPath);
    res.json({ data: output, status: true });
  } catch (err) {
    next(err);
  }
};

exports.executePY = async (req, res, next) => {
  try {
    const fileName = await generateFileName();
    const { code, input = "" } = req.body;
    const codePath = path.join(tmpDir, fileName + ".js");
    const inputPath = path.join(tmpDir, fileName + ".txt");
    await fs.writeFile(codePath, code, function (err) {
      if (err) throw err;
      // console.log("The file has been saved!");
    });
    await fs.writeFile(inputPath, input, function (err) {
      if (err) throw err;
      // console.log("The file has been saved!");
    });

    const { error, stdout, stderr } = await execAsync(
      `python3 ${codePath} < ${inputPath}`
    );
    const output = error || stderr || stdout;
    await fs.unlink(codePath);
    await fs.unlink(inputPath);
    res.json({ data: output, status: true });
  } catch (err) {
    next(err);
  }
};
