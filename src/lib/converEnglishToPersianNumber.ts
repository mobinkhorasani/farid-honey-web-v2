export const convertPersianToEnglish = (value: string, asNumber = false) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const result = value.replace(/[۰-۹]/g, d => String(persianDigits.indexOf(d)));
    return asNumber ? Number(result) : result;
};
