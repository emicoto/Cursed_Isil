const { spawn } = require("child_process");
const _resolve = (...w) => path.resolve(nw.__dirname, `./`, ...w);
const { platform, arch } = require("os");

const nwRestart = function () {
  var child,
    child_process = require("child_process");
  if (process.platform == "darwin") {
    child = child_process.spawn(
      "open",
      ["-n", "-a", process.execPath.match(/^([^\0]+?\.app)\//)[1]],
      { detached: true }
    );
  } else {
    child = child_process.spawn(process.execPath, [], { detached: true });
  }
  child.unref();
  const fake = nw.Window.get();
  fake.hide();
  fake.showDevTools();

  nw.Window.open("./public/index.html", {}, (win) => {
    if (!App) {
      App = win.window;
      console.log("App loaded.");
    }
    win.showDevTools();
    win.on("close", () => {
      win.close(true);
      fake.close(true);
    });
  });
};

const scbuild = function () {
  const SYSTEM = {
    platform: platform(),
    arch: arch(),
  };
  console.log(SYSTEM);
  const tweego = () => {
    const system = {
      win32: "win",
      linux: "linux",
      darwin: "osx",
    };
    if (!system[SYSTEM.platform])
      throw new Error("请用 Windows系统, Linux系统 或 Mac系统");
    return _resolve(
      `_workspace/.twine/tweego_${system[SYSTEM.platform]}${
        SYSTEM.arch.includes("64") ? "64" : "86"
      }${SYSTEM.platform === "win32" ? ".exe" : ""}`
    );
  };
  const COMMANDS = [tweego()];
  const TWEEGO_PATH = _resolve("_workspace/.twine/StoryFormats");
  const options = {
    html: `-o ${_resolve("public/index.html")}`,
    Head: `--head ${_resolve("_workspace/head.html")}`,
    src: _resolve("_workspace/gamecode"),
    isWatch: process.argv.includes("-w") ? "-w" : "",
    modules: `--module=${_resolve("_workspace/modules")}`,
    // ...getJS(),
  };
  for (const key in options) {
    COMMANDS.push(options[key]);
  }

  const string = COMMANDS.join(" ");
  console.log(string);

  const result = spawn("cmd.exe", ["/c", string], {
    env: {
      TWEEGO_PATH,
    },
  });
  result.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  result.stderr.on("data", (data) => {
    console.error(data.toString());
  });
};
