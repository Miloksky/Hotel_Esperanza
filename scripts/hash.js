const bcrypt = require('bcrypt');

const plainPassword = '1234'; 

bcrypt.hash(plainPassword, 10).then(hash => {
  console.log('Contraseña hasheada:', hash);
});
