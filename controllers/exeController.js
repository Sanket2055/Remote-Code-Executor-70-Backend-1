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
    const { code, input = "" } = req.body;

    await fs.writeFile(`${tmpDir}\\${fileName}.cpp`, code, function (err) {
      if (err) throw err;
      // console.log("The file has been saved!");
    });
    await fs.writeFile(`${tmpDir}\\${fileName}.txt`, input, function (err) {
      if (err) throw err;
      // console.log("The file has been saved!");
    });

    // compile the code
    const compile = await execAsync(
      `g++ -o ${tmpDir}\\${fileName} ${tmpDir}\\${fileName}.cpp`
    );

    // run the code
    const { error, stdout, stderr } = await execAsync(
      `${tmpDir}\\${fileName} < ${tmpDir}\\${fileName}.txt`
    );

    const output = error || stderr || stdout;
    // unlink the files
    await fs.unlink(`${tmpDir}\\${fileName}.cpp`);
    await fs.unlink(`${tmpDir}\\${fileName}.exe`);
    await fs.unlink(`${tmpDir}\\${fileName}.txt`);
    res.json({ data: output, status: true });
  } catch (err) {
    next(err);
  }
};

exports.executeJS = async (req, res, next) => {
  try {
    const fileName = await generateFileName();
    const { code, input = "" } = req.body;

    await fs.writeFile(`${tmpDir}/${fileName}.js`, code, function (err) {
      if (err) throw err;
      // console.log("The file has been saved!");
    });
    await fs.writeFile(`${tmpDir}/${fileName}.txt`, input, function (err) {
      if (err) throw err;
      // console.log("The file has been saved!");
    });
    const { error, stdout, stderr } = await execAsync(
      `node ${tmpDir}/${fileName}.js < ${tmpDir}/${fileName}.txt`
    );
    const output = error || stderr || stdout;
    await fs.unlink(`${tmpDir}\\${fileName}.js`);
    await fs.unlink(`${tmpDir}\\${fileName}.txt`);
    res.json({ data: output, status: true });
  } catch (err) {
    next(err);
  }
};

exports.executePY = async (req, res, next) => {
  try {
    const fileName = await generateFileName();
    const { code, input = "" } = req.body;

    await fs.writeFile(`${tmpDir}/${fileName}.py`, code, function (err) {
      if (err) throw err;
      // console.log("The file has been saved!");
    });
    await fs.writeFile(`${tmpDir}/${fileName}.txt`, input, function (err) {
      if (err) throw err;
      // console.log("The file has been saved!");
    });

    const { error, stdout, stderr } = await execAsync(
      `python ${tmpDir}/${fileName}.py < ${tmpDir}/${fileName}.txt`
    );
    const output = error || stderr || stdout;
    await fs.unlink(`${tmpDir}\\${fileName}.py`);
    await fs.unlink(`${tmpDir}\\${fileName}.txt`);
    res.json({ data: output, status: true });
  } catch (err) {
    next(err);
  }
};
