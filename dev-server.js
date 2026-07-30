const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const nextDir = path.join(__dirname, ".next");

function clean() {
  try { fs.rmSync(nextDir, { recursive: true, force: true }); } catch {}
}

function start() {
  clean();
  console.log("[dev-server] Starting Next.js...");

  const child = spawn("npx", ["next", "dev"], {
    stdio: "inherit",
    shell: true,
    cwd: __dirname,
    env: { ...process.env, NODE_OPTIONS: "--max-old-space-size=4096" },
  });

  child.on("exit", (code) => {
    if (code !== 0 && code !== null) {
      console.log(`[dev-server] Next.js exited with code ${code}. Restarting in 2s...`);
      setTimeout(start, 2000);
    }
  });

  child.on("error", (err) => {
    console.error("[dev-server] Error:", err.message);
    setTimeout(start, 2000);
  });
}

start();
