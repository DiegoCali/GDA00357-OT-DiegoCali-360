export const phoneValidation = (phone: string) => {
    // Phone number must be 4 digits a dash and 4 digits
    const phoneRegex = /^[0-9]{4}-[0-9]{4}$/;
    return phoneRegex.test(phone);
}

export const emailValidation = (email: string) => {
    // Email must have a @ and a .
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}