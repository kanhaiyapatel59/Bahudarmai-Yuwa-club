import { localizeNumber } from './numberLocalizer';

const nepaliMonths = [
  'वैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज',
  'कात्तिक', 'मंसिर', 'पुस', 'माघ', 'फागुन', 'चैत'
];

export const formatDate = (dateInput, lang = 'en') => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  if (lang === 'ne') {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const formatted = `${localizeNumber(day, 'ne')} ${nepaliMonths[month]} ${localizeNumber(year, 'ne')}`;
    return formatted;
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
