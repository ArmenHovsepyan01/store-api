module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Armen',
        lastName: 'Hovsepyan',
        email: 'earh@gmail.com',
        password: '12345670',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
