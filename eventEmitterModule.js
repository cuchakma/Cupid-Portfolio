const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");
const fileFolder = path.join(__dirname, "logs", );
const fileName   = "event-logs.txt";
const fullPath  = fileFolder + `/${fileName}`;

const logEvents = async (message) => {
  let  rows = 0;
  let data, row, last, getValue;
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;

  try {
    if( ! fs.existsSync(fileFolder) ) {
        fs.mkdirSync(fileFolder);
    }

    if(fs.existsSync(fullPath)) {
        data =  await fsPromises.readFile(fullPath, {encoding:'utf-8'});
        if( data?.length > 0 ) {
            row = data?.split(',');
            last = row[row?.length -1]?.split('-');
            getValue = parseInt(last[last?.length - 1].trim());
            rows = (getValue + 1);
        }
    }
    const logItem = `${dateTime},\t${uuid()},\t${message}, rows - ${rows}\n`;

    await fsPromises.appendFile(
      fullPath,
      logItem
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports = logEvents;
