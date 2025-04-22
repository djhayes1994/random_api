const fs = require('fs');
const read_json = require("./readJSON");
const path = require('path');

// Description: This script generates random user data for testing purposes.


const firstNames_filePath = path.join(__dirname, '../data/firstNames.json');
const lastNames_filePath = path.join(__dirname, '../data/lastNames.json');
const domains_filePath = path.join(__dirname, '../data/domains.json');
const cities_filePath = path.join(__dirname, '../data/cities.json');
const streetNames_filePath = path.join(__dirname, '../data/streetNames.json');
const streetTypes_filePath = path.join(__dirname, '../data/streetTypes.json');
const jobTitles_filePath = path.join(__dirname, '../data/jobTitles.json');
const states_filePath = path.join(__dirname, '../data/states.json');

function generateRandomUsers(count = 100) {
  // Read JSON files
  const firstNames = read_json.readJSONFile(firstNames_filePath);

  const lastNames = read_json.readJSONFile(lastNames_filePath);

  const domains = read_json.readJSONFile(domains_filePath);

  const cities = read_json.readJSONFile(cities_filePath);

  const states = read_json.readJSONFile(states_filePath);

  const jobTitles = read_json.readJSONFile(jobTitles_filePath);

  const streetNames = read_json.readJSONFile(streetNames_filePath);

  const streetTypes = read_json.readJSONFile(streetTypes_filePath);

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

  // Helper function to generate random phone number
  const generatePhoneNumber = () => {
    const areaCode = getRandomNumber(100, 999);
    const prefix = getRandomNumber(100, 999);
    const lineNumber = getRandomNumber(1000, 9999);
    return `${areaCode}-${prefix}-${lineNumber}`;
  };

  // Generate users
  const users = [];

  for (let i = 0; i < count; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${getRandomNumber(1, 999)}`;
    const email = `${username}@${getRandomElement(domains)}`;

    const user = {
      id: i + 1,
      username: username,
      email: email,
      password: `pass${getRandomNumber(100000, 999999)}`, // Not secure, just for demo
      firstName: firstName,
      lastName: lastName,
      birthDate: getRandomBirthDate(),
      address: {
        street: `${getRandomNumber(100, 9999)} ${getRandomElement(streetNames)} ${getRandomElement(streetTypes)}`,
        city: getRandomElement(cities),
        state: getRandomElement(states),
        zipCode: getRandomNumber(10000, 99999).toString(),
        country: 'USA'
      },
      phoneNumber: generatePhoneNumber(),
      occupation: getRandomElement(jobTitles),
      registeredAt: new Date(Date.now() - getRandomNumber(86400000, 86400000 * 365 * 5)).toISOString(), // Between now and 5 years ago
      isActive: Math.random() > 0.2, // 80% chance of being active
      preferences: {
        theme: getRandomElement(['light', 'dark', 'system']),
        notifications: Math.random() > 0.3, // 70% chance of having notifications enabled
        language: getRandomElement(['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE'])
      }
    };

    users.push(user);
  }

  return users;
}


exports.generateRandomUsers = generateRandomUsers;
