export const validationPatterns = {
  name: /^[\u0600-\u06FF\s]{1,50}$/,
  phone_number: /^(0|\+98|0098)?[1-9][0-9]{9}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  birth_date: /^1[0-4]\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/, // تاریخ شمسی
  address: /^.{1,250}$/,
  plate: /^[0-9]{0,10}$/,
  unit: /^[0-9]{0,5}$/,
  province: /^[\u0600-\u06FF\s]{1,100}$/,
  city: /^[\u0600-\u06FF\s]{1,50}$/,
  postal_code: /^[0-9]{0,10}$/,
  receiver: /^[\u0600-\u06FFa-zA-Z\s]{1,50}$/,
};

export const digitsFaToEn = (str: string): string => {
  if (!str) return '';
  
  const strValue = String(str);
  
  return strValue
    .replace(/[۰-۹]/g, (d) => {
      const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
      return persianDigits.indexOf(d).toString();
    })
    .replace(/[٠-٩]/g, (d) => {
      const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
      return arabicDigits.indexOf(d).toString();
    });
};

export const digitsEnToFa = (str: string): string => {
  if (!str) return '';
  
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, (d) => persianDigits[parseInt(d)]);
};

export const validateName = (name: string): string | null => {
  const trimmed = name.trim();
  
  if (!trimmed) {
    return 'نام الزامی است';
  }
  
  if (!validationPatterns.name.test(trimmed)) {
    return 'نام فقط با حروف فارسی و فاصله (حداکثر ۵۰ کاراکتر)';
  }
  
  return null;
};

export const validatePhone = (phone: string): string | null => {
  const normalized = digitsFaToEn(phone.trim());
  
  if (!normalized) {
    return 'شماره موبایل الزامی است';
  }
  
  if (!validationPatterns.phone_number.test(normalized)) {
    return 'فرمت شماره صحیح نیست (مثل 0912xxxxxxx یا +98912xxxxxxx)';
  }
  
  return null;
};

export const validateEmail = (email: string): string | null => {
  const trimmed = email.trim();
  
  // ایمیل اختیاری است، اگر خالی بود خطا نده
  if (!trimmed) {
    return null;
  }
  
  if (!validationPatterns.email.test(trimmed)) {
    return 'فرمت ایمیل نامعتبر است (مثال: example@gmail.com)';
  }
  
  return null;
};

export const validateBirthDate = (birthDate: string): string | null => {
  const trimmed = birthDate.trim();
  
  // تاریخ تولد اختیاری است، اگر خالی بود خطا نده
  if (!trimmed) {
    return null;
  }
  
  if (!validationPatterns.birth_date.test(trimmed)) {
    return 'فرمت تاریخ تولد باید به صورت شمسی باشد (مثال: 1370/01/01)';
  }
  
  // اعتبارسنجی اضافی برای تاریخ
  const [year, month, day] = trimmed.split('/').map(Number);
  
  // بررسی ماه‌های 31 روزه
  const thirtyOneDays = [1, 3, 5, 7, 8, 10, 12];
  if (thirtyOneDays.includes(month) && day > 31) {
    return 'تعداد روزهای این ماه بیش از حد مجاز است';
  }
  
  // بررسی ماه‌های 30 روزه
  const thirtyDays = [4, 6, 9, 11];
  if (thirtyDays.includes(month) && day > 30) {
    return 'تعداد روزهای این ماه بیش از حد مجاز است';
  }
  
  // بررسی اسفند (ماه 12)
  if (month === 12) {
    // بررسی کبیسه بودن سال
    const isLeapYear = (1399 - year) % 4 === 0; // الگوی ساده برای کبیسه
    if (isLeapYear && day > 30) {
      return 'تعداد روزهای اسفند در سال کبیسه ۳۰ روز است';
    } else if (!isLeapYear && day > 29) {
      return 'تعداد روزهای اسفند در سال عادی ۲۹ روز است';
    }
  }
  
  return null;
};

export const validateAddress = (address: {
  province: string;
  city: string;
  address: string;
  receiver: string;
  Postal_code: string;
}): boolean => {
  const postalCode = digitsFaToEn(address.Postal_code?.trim() || '');
  
  return !!(
    address.province?.trim() &&
    address.city?.trim() &&
    address.address?.trim() &&
    address.receiver?.trim() &&
    postalCode &&
    postalCode.length === 10
  );
};