const { faker } = require('@faker-js/faker');

// Function to generate random user data
function generateRandomUsers(count = 100) {

  // Helper function to get random element from array
  const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

  // Helper function to get random number in range
  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Helper function to generate random date in the past (18-80 years)
  const getRandomBirthDate = () => {
    const today = new Date();
    const minAge = 18;
    const maxAge = 80;
    const yearOffset = getRandomNumber(minAge, maxAge);
    const monthOffset = getRandomNumber(0, 11);
    const dayOffset = getRandomNumber(1, 28); // Simplified to avoid month length issues

    const birthDate = new Date(
      today.getFullYear() - yearOffset,
      monthOffset,
      dayOffset
    );

    return birthDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  // Generate users
  const users = [];

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${getRandomNumber(1, 999)}`;
    const email = `${username}@${faker.internet.domainName()}`;

    const user = {
      id: i + 1,
      username: username,
      email: email,
      password: `pass${getRandomNumber(100000, 999999)}`, // Not secure, just for demo
      firstName: firstName,
      lastName: lastName,
      birthDate: getRandomBirthDate(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state({ abbreviated: true }),
        zipCode: getRandomNumber(10000, 99999).toString(),
        country: faker.location.countryCode('alpha-2')
      },
      phoneNumber: faker.phone.number({ style: 'international' }),
      occupation: faker.person.jobTitle(),
      registeredAt: new Date(Date.now() - getRandomNumber(86400000, 86400000 * 365 * 5)).toISOString(), // Between now and 5 years ago
      isActive: Math.random() > 0.2, // 80% chance of being active
      preferences: {
        theme: getRandomElement(['light', 'dark', 'system']),
        notifications: Math.random() > 0.3, // 70% chance of having notifications enabled
        language: getRandomElement(['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE'])
      },
      vehicle_info:{
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        year: getRandomNumber(2000, 2023),
        vin: faker.vehicle.vin()
      }
    };

    users.push(user);
  }

  return users;
}


exports.generateRandomUsers = generateRandomUsers;
