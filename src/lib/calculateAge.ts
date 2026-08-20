export function calculateAge(birthday: Date | string | undefined): string {
    if (!birthday) {
        return "-";
    }

    const birthDate = birthday instanceof Date ? birthday : new Date(birthday);

    if (isNaN(birthDate.getTime())) {
        return "-";
    }

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age.toString();
}
