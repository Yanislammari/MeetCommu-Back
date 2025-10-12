import { FileUpload } from "graphql-upload/Upload.mjs";
import path from "path";
import fs, { WriteStream } from "fs";
import { Readable } from "stream";
import { finished } from "stream/promises";

export const storeFile = async (file: Promise<FileUpload>, folderName: string): Promise<string> => {
  const { createReadStream, filename } = await file;
  const uploadDir: string = path.join(process.cwd(), "uploads", folderName);
  const fileName: string = `${Date.now()}-${filename}`;
  const filePath: string = path.join(uploadDir, fileName);
  const stream: Readable = createReadStream();
  const out: WriteStream = fs.createWriteStream(filePath);
  stream.pipe(out);
  await finished(out);
  return fileName;
}
