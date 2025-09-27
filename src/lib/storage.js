import fs from "fs";
import path from "path";

const walletsPath = path.resolve("src/data/wallets.json");

export function loadWallets() {
  if (!fs.existsSync(walletsPath)) return {};
  return JSON.parse(fs.readFileSync(walletsPath, "utf8"));
}

export function saveWallets(wallets) {
  fs.writeFileSync(walletsPath, JSON.stringify(wallets, null, 2));
}
