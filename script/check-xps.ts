const files_list = process.argv.slice(2);

files_list.forEach(file => {
  const xp = require(`./${file}`);
  console.log(xp);
})