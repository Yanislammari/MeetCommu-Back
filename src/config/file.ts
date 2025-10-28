import { FileUpload } from "graphql-upload/Upload.mjs";
import path from "path";
import fs, { WriteStream } from "fs";
import { Readable } from "stream";
import { finished } from "stream/promises";
import dotenv from "dotenv";

dotenv.config();
const BASE_URL: string = process.env.BASE_URL as string;

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

export const deleteFile = async (fileUrl: string): Promise<void> => {
  const filePath: string = path.join(process.cwd(), "uploads", fileUrl.replace(`${BASE_URL}/uploads/`, ""));
  await fs.promises.unlink(filePath);
}
