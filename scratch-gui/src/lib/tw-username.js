const generateRandomUsername = () => {
    const DIGITS = 5;
    const randomNumber = Math.round(Math.random() * (10 ** DIGITS));
    const randomId = randomNumber.toString().padStart(DIGITS, '0');
    const randomUsername = `user${randomId}`;
    return randomUsername;
};

export {
    generateRandomUsername
};
