const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export const localizeNumber = (num, lang = 'en') => {
  if (num === null || num === undefined) return '';
  const numStr = String(num);
  if (lang !== 'ne') return numStr;

  return numStr.replace(/[0-9]/g, (digit) => devanagariDigits[parseInt(digit, 10)]);
};
