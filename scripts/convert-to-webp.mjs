import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const publicDir = path.resolve(process.cwd(), "public");
const exts = new Set([".png", ".jpg", ".jpeg"]);

const files = (await readdir(publicDir)).filter((f) =>
  exts.has(path.extname(f).toLowerCase())
);

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const input = path.join(publicDir, file);
  const output = path.join(
    publicDir,
    path.basename(file, path.extname(file)) + ".webp"
  );

  const before = (await stat(input)).size;
  await sharp(input)
    .rotate() // respect EXIF orientation
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(output);
  const after = (await stat(output)).size;

  totalBefore += before;
  totalAfter += after;
  console.log(
    `${file} -> ${path.basename(output)}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
  );
}

console.log(
  `\nTOTAL: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`
);
