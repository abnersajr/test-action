const path = require("path")
const files_list = process.argv.slice(2);

files_list.forEach(file => {
  const xp = require(path.join(__dirname, file));
  console.log(xp);
})