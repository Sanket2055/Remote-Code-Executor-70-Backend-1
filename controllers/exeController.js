const path = require("path");
const fs = require("fs/promises");
const { exec } = require("child_process");
const os = require("os");
const tmpDir = os.tmpdir();
const { generateFileName } = require("../helpers/generateName");
const util = require("util");
const execAsync = util.promisify(exec);

exports.executeCpp = async (req, res, next) => {
  try {
    const fileName = await generateFileName();
    const codePath = path.join(tmpDir, fileName + ".cpp");
    const inputPath = path.join(tmpDir, fileName + ".txt");
    const exePath = path.join(tmpDir, fileName);
    const { code, input = "" } = req.body;

    await fs.writeFile(codePath, code, function (err) {
      if (err) throw err;
    });
    await fs.writeFile(inputPath, input, function (err) {
      if (err) throw err;
    });

    // compile the code
    await execAsync(`g++ -o ${exePath}.exe ${codePath}`);

    // run the code
    const { error, stdout, stderr } = await execAsync(
      `${exePath}.exe < ${inputPath}`,
      { timeout: 2000 }
    ).catch((error) => {
      if (error.killed && error.signal === "SIGTERM") {
        throw new Error("Time limit exceeded");
      }
      throw error;
    });
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

exports.executeJavaScript = async (req, res, next) => {
  try {
    const fileName = await generateFileName();
    const { code, input = "" } = req.body;
    const codePath = path.join(tmpDir, fileName + ".js");
    const inputPath = path.join(tmpDir, fileName + ".txt");

    await fs.writeFile(codePath, code, function (err) {
      if (err) throw err;
    });
    await fs.writeFile(inputPath, input, function (err) {
      if (err) throw err;
    });
    const { error, stdout, stderr } = await execAsync(
      `node ${codePath} < ${inputPath}`,
      { timeout: 2000 }
    ).catch((error) => {
      if (error.killed && error.signal === "SIGTERM") {
        throw new Error("Time limit exceeded");
      }
      throw error;
    });

    const output = error || stderr || stdout;
    await fs.unlink(codePath);
    await fs.unlink(inputPath);
    res.json({ data: output, status: true });
  } catch (err) {
    next(err);
  }
};

exports.executePython = async (req, res, next) => {
  try {
    const fileName = await generateFileName();
    const { code, input = "" } = req.body;
    const codePath = path.join(tmpDir, fileName + ".py");
    const inputPath = path.join(tmpDir, fileName + ".txt");
    await fs.writeFile(codePath, code, function (err) {
      if (err) throw err;
    });
    await fs.writeFile(inputPath, input, function (err) {
      if (err) throw err;
    });

    const { error, stdout, stderr } = await execAsync(
      `python3 ${codePath} < ${inputPath}`,
      { timeout: 2000 }
    ).catch((error) => {
      if (error.killed && error.signal === "SIGTERM") {
        throw new Error("Time limit exceeded");
      }
      throw error;
    });
    const output = error || stderr || stdout;
    await fs.unlink(codePath);
    await fs.unlink(inputPath);
    res.json({ data: output, status: true });
  } catch (err) {
    next(err);
  }
};

exports.executeC = async (req, res, next) => {
  try {
    const fileName = await generateFileName();
    const codePath = path.join(tmpDir, fileName + ".c");
    const inputPath = path.join(tmpDir, fileName + ".txt");
    const exePath = path.join(tmpDir, fileName);
    const { code, input = "" } = req.body;

    await fs.writeFile(codePath, code, function (err) {
      if (err) throw err;
    });
    await fs.writeFile(inputPath, input, function (err) {
      if (err) throw err;
    });

    // compile the code
    await execAsync(`gcc -o ${exePath}.exe ${codePath}`);

    // run the code
    const { error, stdout, stderr } = await execAsync(
      `${exePath}.exe < ${inputPath}`,
      { timeout: 2000 }
    ).catch((error) => {
      if (error.killed && error.signal === "SIGTERM") {
        throw new Error("Time limit exceeded");
      }
      throw error;
    });
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

exports.executeGo = async (req, res, next) => {
  try {
    const fileName = await generateFileName();
    const { code, input = "" } = req.body;
    const codePath = path.join(tmpDir, fileName + ".go");
    const inputPath = path.join(tmpDir, fileName + ".txt");
    await fs.writeFile(codePath, code, function (err) {
      if (err) throw err;
    });
    await fs.writeFile(inputPath, input, function (err) {
      if (err) throw err;
    });

    const { error, stdout, stderr } = await execAsync(
      `go run ${codePath} < ${inputPath}`,
      { timeout: 2000 }
    ).catch((error) => {
      if (error.killed && error.signal === "SIGTERM") {
        throw new Error("Time limit exceeded");
      }
      throw error;
    });
    const output = error || stderr || stdout;
    await fs.unlink(codePath);
    await fs.unlink(inputPath);
    res.json({ data: output, status: true });
  } catch (err) {
    next(err);
  }
};

exports.executeJava = async (req, res, next) => {
  try {
    const fileName = await generateFileName();
    const { code, input = "" } = req.body;
    const codePath = path.join(tmpDir, fileName + ".java");
    const inputPath = path.join(tmpDir, fileName + ".txt");
    await fs.writeFile(codePath, code, function (err) {
      if (err) throw err;
    });
    await fs.writeFile(inputPath, input, function (err) {
      if (err) throw err;
    });

    const { error, stdout, stderr } = await execAsync(
      `java ${codePath} < ${inputPath}`,
      { timeout: 2000 }
    ).catch((error) => {
      if (error.killed && error.signal === "SIGTERM") {
        throw new Error("Time limit exceeded");
      }
      throw error;
    });
    const output = error || stderr || stdout;
    await fs.unlink(codePath);
    await fs.unlink(inputPath);
    res.json({ data: output, status: true });
  } catch (err) {
    next(err);
  }
};
