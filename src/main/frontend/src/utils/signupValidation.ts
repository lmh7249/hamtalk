export const isValidName = (name: string): { isValid: boolean; errorMessage: string } => {
    const regex = /^[가-힣]{1,}$/;
    const isValid = regex.test(name); // 유효성 검사를 한 번만 수행
    return {
        isValid,
        errorMessage: isValid ? '' : '이름을 정확히 입력해주세요.',
    };
};

export const isValidBirthDate = (
    year: string,
    month: string,
    day: string
): { isValid: boolean; errorMessage: string } => {
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(year, 10);
    const monthNum = parseInt(month, 10);
    const dayNum = parseInt(day, 10);

    // 유효성 검사 로직
    const isYearValid = yearNum >= 1900 && yearNum <= currentYear;
    const isMonthValid = monthNum >= 1 && monthNum <= 12;
    const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
    const isDayValid = dayNum >= 1 && dayNum <= daysInMonth;

    // 검증 결과 반환
    if (!isYearValid || !isMonthValid || !isDayValid) {
        return {
            isValid: false,
            errorMessage: '생년월일을 정확히 입력해주세요.',
        };
    }

    return {
        isValid: true,
        errorMessage: '',
    };
};

export const isValidGender = (gender: string): { isValid: boolean; errorMessage: string } => {
    const isValid = ["M", "F", "O"].includes(gender);
    return {
        isValid,
        errorMessage: isValid ? '' : '성별을 선택해주세요.',
    };
};

export const isValidEmail = (email: string): { isValid: boolean; errorMessage: string } => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(email);
    return {
        isValid,
        errorMessage: isValid ? '' : '유효한 이메일 주소를 입력해주세요.',
    };
};

export const isValidVerificationCode = (verificationCode: string): { isValid: boolean; errorMessage: string } => {
    const isValid = verificationCode === "123456";
    return {
        isValid,
        errorMessage: isValid ? '' : '인증 코드를 정확히 입력해주세요.',
    };
};

export const isValidPassword = (password: string, confirmPassword: string): { isValid: boolean; errorMessage: string } => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    // 비밀번호 형식 검증
    if (!passwordRegex.test(password)) {
        return {
            isValid: false,
            errorMessage: '영문, 숫자, 특수문자를 조합해서 입력해주세요. (8~16자)',
        };
    }
    // 비밀번호와 확인 비밀번호 일치 여부 검증
    if (password !== confirmPassword) {
        return {
            isValid: false,
            errorMessage: '비밀번호와 확인 비밀번호가 일치하지 않습니다.',
        };
    }

    // 모든 조건 통과
    return {
        isValid: true,
        errorMessage: '',
    };
};