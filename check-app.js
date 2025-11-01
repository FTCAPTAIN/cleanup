import fs from "fs";
import path from "path";

const projectRoot = process.cwd();
const requiredFiles = [
  "index.html",
  "package.json",
  "vercel.json",
  "src/main.tsx",
  "src/main.jsx",
];

console.log("🔍 Checking Cleanzup project structure...\n");

// Check for missing files
requiredFiles.forEach((file) => {
  const fullPath = path.join(projectRoot, file);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ Found: ${file}`);
  } else {
    console.log(`❌ Missing: ${file}`);
  }
});

// Check for React mount point
try {
  const html = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
  if (html.includes("id=\"root\"") || html.includes("id=\"app\"")) {
    console.log("\n✅ HTML contains a React mount point (#root or #app).");
  } else {
    console.log("\n⚠️  No React mount point found in index.html.");
  }
} catch {
  console.log("\n⚠️  index.html not found or unreadable.");
}

// Check package.json scripts
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json")));
  console.log("\n📦 npm scripts found:");
  console.log(pkg.scripts || "⚠️  No scripts defined.");

  if (pkg.scripts && pkg.scripts.build && pkg.scripts.dev) {
    console.log("✅ Build & Dev scripts exist.");
  } else {
    console.log("❌ Missing 'build' or 'dev' script in package.json.");
  }
} catch {
  console.log("\n⚠️  Could not read package.json.");
}

// Check Vercel config
try {
  const vercel = JSON.parse(fs.readFileSync(path.join(projectRoot, "vercel.json")));
  if (vercel.routes) {
    console.log("\n✅ vercel.json has route configuration.");
  } else {
    console.log("\n⚠️  vercel.json exists but has no routes.");
  }
} catch {
  console.log("\n⚠️  Could not read vercel.json.");
}

console.log("\n✅ Check complete. If your app is still blank, send me this full output.");
