const path = require("path")
const files_list = process.argv.slice(2);

files_list.forEach(file => {
  const xp = require(`../${file}`);
//   {
//   default: {
//     id: 'iHUPdK1bRdSSmjjScnO5Q',
//     name: 'test-xp',
//     rotate: false,
//     rotate_precondition: { product: [Object], user_country: [Object] },
//     distribution: { '0': 'control_1', '495': 'control_2', '990': '1' },
//     feature_flags: {
//       '1': [Object],
//       control: [Object],
//       control_1: [Object],
//       control_2: [Object]
//     }
//   }
// }
// {
//   default: {
//     id: 'iHUPdK1bRdSSmjjScnO5Q',
//     name: 'xp1',
//     rotate: false,
//     rotate_precondition: { product: [Object], user_country: [Object] },
//     distribution: { '0': 'control_1', '500': 'TESTE', '750': '1' },
//     feature_flags: {
//       '1': [Object],
//       control: [Object],
//       control_1: [Object],
//       control_2: [Object]
//     }
//   }
// }
  console.log(xp);
})