const { spawn, exec } = require("child_process");
const { promisify } = require("util");
const execAsync = promisify(exec);

async function runCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command}`);
    const child = exec(command, { ...options });

    child.stdout.on("data", (data) => {
      process.stdout.write(data);
    });

    child.stderr.on("data", (data) => {
      process.stderr.write(data);
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}: ${command}`));
      }
    });

    child.on("error", reject);
  });
}

function spawnService(command, name, colorCode) {
  const prefix = `\x1b[${colorCode}m[${name}]\x1b[0m`;
  console.log(`${prefix} Starting: ${command}`);

  const child = spawn(command, { shell: true, stdio: "pipe" });

  child.stdout.on("data", (data) => {
    const lines = data
      .toString()
      .split("\n")
      .filter((line) => line.trim());
    lines.forEach((line) => {
      console.log(`${prefix} ${line}`);
    });
  });

  child.stderr.on("data", (data) => {
    const lines = data
      .toString()
      .split("\n")
      .filter((line) => line.trim());
    lines.forEach((line) => {
      console.error(`${prefix} ERROR: ${line}`);
    });
  });

  child.on("error", (error) => {
    console.error(`${prefix} Failed to start:`, error);
  });

  return child;
}

async function main() {
  try {
    console.log("🚀 Starting Module Federation setup...");

    // 1. FIRST BUILD THE REMOTE APPS to generate remoteEntry.js
    console.log("📦 Building remote applications...");
    await runCommand("pnpm --filter cart-app build");
    await runCommand("pnpm --filter products-app build");
    console.log("✅ Remote apps built successfully!");

    // 2. NOW SERVE THE BUILT REMOTE APPS
    console.log("🌐 Serving remote applications...");
    const cartApp = spawnService("pnpm --filter cart-app serve", "CART", 34);
    const productsApp = spawnService(
      "pnpm --filter products-app serve",
      "PRODUCTS",
      32
    );

    // 3. Wait a bit for remote apps to be ready
    console.log("⏳ Waiting for remote apps to be ready...");
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // 4. START THE HOST APP IN DEV MODE
    console.log("🏠 Starting host application...");
    const containerApp = spawnService(
      "pnpm --filter container-app dev",
      "CONTAINER",
      33
    );

    // Handle cleanup
    process.on("SIGINT", () => {
      console.log("\n🛑 Shutting down all services...");
      [cartApp, productsApp, containerApp].forEach((child) => {
        child.kill("SIGINT");
      });
      process.exit(0);
    });

    // Keep process running
    await new Promise(() => {});
  } catch (error) {
    console.error("❌ Setup Error:", error.message);
    process.exit(1);
  }
}

main();
