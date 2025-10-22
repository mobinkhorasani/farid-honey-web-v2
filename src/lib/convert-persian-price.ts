  export const convertPersianPrice = (price: string) => {
    if (!price) return 0;
    const englishNumbers = price
      .replace(/۰/g, "0")
      .replace(/۱/g, "1")
      .replace(/۲/g, "2")
      .replace(/۳/g, "3")
      .replace(/۴/g, "4")
      .replace(/۵/g, "5")
      .replace(/۶/g, "6")
      .replace(/۷/g, "7")
      .replace(/۸/g, "8")
      .replace(/۹/g, "9")
      .replace(/٬/g, "")
      .replace(/,/g, "");
    return parseInt(englishNumbers);
  };