const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
const defaultLength = 8;

export const generatePassword = (length?: number) => {
    let password = '';

    for (let i = 0; i < (length || defaultLength); i += 1) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return password;
};
