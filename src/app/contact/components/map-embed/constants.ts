export const PLACE_NAME = 'عسل فرید';
export const LAT = 35.8162602;
export const LNG = 50.9872511;

export const PLACE_URL =
  'https://www.google.com/maps/place/%D8%B9%D8%B3%D9%84+%D9%81%D8%B1%D9%8A%D8%AF%E2%80%AD/@35.8162081,50.9872366,20.1z/data=!4m7!3m6!1s0x3f8dbfbf3ea9a24d:0x30edeb6ca82155a4!4b1!8m2!3d35.8162602!4d50.9872511!16s%2Fg%2F11f2wbgr0d?entry=ttu';

export const mapEmbedUrl = (lat: number = LAT, lng: number = LNG) =>
  `https://www.google.com/maps?q=${lat},${lng}&z=18&hl=fa&output=embed`;

export const directionsLink = (lat: number = LAT, lng: number = LNG) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
