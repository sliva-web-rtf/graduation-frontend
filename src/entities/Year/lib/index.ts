export const getCurrentAcademicYear = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;

    if (now.getMonth() >= 8) {
        return `${currentYear.toString().slice(-2)}/${nextYear.toString().slice(-2)}`;
    }

    const prevYear = currentYear - 1;

    return `${prevYear.toString()}/${currentYear.toString()}`;
};
