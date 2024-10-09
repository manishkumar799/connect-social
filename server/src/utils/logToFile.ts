import fs from "fs";
import path from "path";
const logToFile = (filename:string, data:any) => {
  const filePath = path.join(__dirname, filename);
  fs.appendFile(
    filePath,
    `${new Date().toISOString()}: ${JSON.stringify(data, null, 2)}\n\n`,
    (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("Data logged to file:", filename);
      }
    }
  );
};

export default logToFile;
