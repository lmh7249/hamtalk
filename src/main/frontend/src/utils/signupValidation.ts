export const isValidName = (name: string): boolean => {
    const regex = /^[가-힣]{1,}$/;
    return regex.test(name);
};

export const isValidYear = (year: string): boolean => {
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(year, 10);
    return yearNum >= 1900 && yearNum <= currentYear;
};

export const isValidMonth = (month: string): boolean => {
    return month >= '01' && month <= '12';
};

export const isValidDay = (day: string, month: string, year: string): boolean => {
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    const daysInMonth = new Date(yearNum, monthNum, 0).getDate();

    return dayNum >= 1 && dayNum <= daysInMonth;
};

export const isValidGender = (gender: string): boolean => {
    return ["M", "F", "O"].includes(gender);
};

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
    return emailRegex.test(email);
};

export const isValidVerificationCode = (verificationCode: string): boolean => {
    return verificationCode === "123456";
};

export const isValidPassword = (password: string, confirmPassword: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

    if (!passwordRegex.test(password)) {
        return false;
    }

    return password === confirmPassword;
};