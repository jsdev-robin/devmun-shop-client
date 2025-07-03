export const generateBarcode = () => {
  const timestamp = Date.now().toString().slice(-10);
  const random = Math.floor(100000 + Math.random() * 900000);

  return `${timestamp}${random}`;
};
