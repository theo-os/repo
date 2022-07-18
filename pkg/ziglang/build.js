import { exec } from "bun-utilities";
import { mkdirSync, renameSync } from "fs";

const versionsResponse = await fetch("https://ziglang.org/download/index.json");

const versions = await versionsResponse.json();
const tarball = await fetch(versions.master["x86_64-linux"].tarball);

console.log(`downloading zig: ${versions.master.version}`);

await Bun.write("zig.tar.xz", await tarball.blob());

try {
	mkdirSync("build");
} catch { }
exec(["tar", "xvf", "zig.tar.xz", "-C", "build"]);

renameSync(`build/zig-linux-x86_64-${versions.master.version}`, "build/zig");

console.log("DONE");

