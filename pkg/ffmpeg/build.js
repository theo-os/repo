import { exec } from "bun-utilities";
import { mkdirSync, renameSync, readdirSync, lstatSync } from "fs";

const tarball = await fetch("https://johnvansickle.com/ffmpeg/builds/ffmpeg-git-amd64-static.tar.xz");

await Bun.write("ffmpeg.tar.xz", await tarball.blob());

try {
	mkdirSync("build");
} catch {
}
exec(["tar", "xvf", "ffmpeg.tar.xz", "-C", "build"]);

const ffmpegDir = readdirSync("build").find(f => lstatSync(`build/${f}`).isDirectory());

renameSync(`build/${ffmpegDir}`, "build/ffmpeg");

console.log("DONE");

