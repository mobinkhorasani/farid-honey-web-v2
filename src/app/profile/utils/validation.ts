export const validationPatterns = {
  name: /^[\u0600-\u06FF\s]{1,50}$/,
  phone_number: /^(0|\+98|0098)?[1-9][0-9]{9}$/,
  address: /^.{1,250}$/,
  plate: /^[0-9]{0,10}$/,
  unit: /^[0-9]{0,5}$/,
  province: /^[\u0600-\u06FF\s]{1,100}$/,
  city: /^[\u0600-\u06FF\s]{1,50}$/,
  postal_code: /^[0-9]{1,20}$/,
  receiver: /^[\u0600-\u06FFa-zA-Z\s]{1,50}$/,
};

export const digitsFaToEn = (str: string): string => {
  return str
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
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

export const validateAddress = (address: {
  province: string;
  city: string;
  address: string;
  receiver: string;
  Postal_code: string;
}): boolean => {
  return !!(
    address.province?.trim() &&
    address.city?.trim() &&
    address.address?.trim() &&
    address.receiver?.trim() &&
    address.Postal_code?.trim()
  );
};
