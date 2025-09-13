// Store locations data
export const stores = [
  { city: "تهران", address: "خیابان ولیعصر، پلاک ۱۲۵", phone: "021-88776590" },
  { city: "اصفهان", address: "خیابان چهارباغ، پاسار، طبقه ۲", phone: "031-33334455" },
  { city: "کرج", address: "محمدشهر، بلوار دشت بهشت، خیابان نصیریه", phone: "026-36210882" },
];

// Quick links for footer
export const quickLinks = [
  { title: "خانه", href: "/" },
  { title: "محصولات", href: "/products" },
  { title: "درباره ما", href: "/about" },
  { title: "تماس", href: "/contact" },
];

// Social media links
export const socials = [
  { label: "Instagram", href: "#", icon: "Instagram" as const },
  { label: "X", href: "#", icon: "X" as const },
  { label: "Telegram", href: "#", icon: "Send" as const },
  { label: "WhatsApp", href: "#", icon: "MessageCircle" as const },
];

// Company information
export const companyInfo = {
  name: 'عسل فرید',
  establishedYear: '۱۴۰۲',
  currentYear: '۱۴۰۴',
  email: 'info@asalfarid.com',
  supportPhone: '021-88776590',
  website: 'https://asalfarid.com',
  businessHours: {
    weekdays: 'شنبه تا پنج‌شنبه',
    hours: '۹:۰۰ تا ۱۸:۰۰'
  }
}