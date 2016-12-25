"use strict";

const userPackages = require("..");

userPackages("ionicabizau", (err, res) => {
    console.log(err || res);
});
// [ { name: '3abn',
//     description: 'A 3ABN radio client in the terminal.',
//     homepage: 'https://github.com/IonicaBizau/3abn#readme',
//     bugs:
//      { email: null,
//        url: 'https://github.com/IonicaBizau/3abn/issues' },
//     version: '2.1.3',
//     versions: {},
//     'dist-tags': {},
//     access: 'public',
//     permissions: 'write' },
//   ... ]
