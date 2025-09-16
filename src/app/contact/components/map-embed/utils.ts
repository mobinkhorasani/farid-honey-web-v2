export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const dummy = document.createElement('input');
      dummy.value = text;
      document.body.appendChild(dummy);
      dummy.select();
      document.execCommand?.('copy');
      document.body.removeChild(dummy);
      return true;
    } catch {
      return false;
    }
  }
};
