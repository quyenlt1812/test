import {
  format,
  differenceInWeeks,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns';
import {vi, enUS} from 'date-fns/locale';
import i18n from '../translation';

export const toNow = (date) => {
  const currentYear = new Date().getFullYear();
  const recognitionYear = new Date(date).getFullYear();
  const differentWeeks = differenceInWeeks(new Date(), new Date(date));
  const differentDays = differenceInDays(new Date(), new Date(date));
  const differentHours = differenceInHours(new Date(), new Date(date));
  const differentMinutes = differenceInMinutes(new Date(), new Date(date));

  if (differentMinutes < 1) return i18n.t('just-now');
  if (differentHours < 1) return i18n.t('minutes', {minutes: differentMinutes});
  if (differentDays < 1) return i18n.t('hours', {hours: differentHours});
  if (differentWeeks < 1) return i18n.t('days', {days: differentDays});
  if (differentWeeks < 4) return i18n.t('weeks', {weeks: differentWeeks});
  if (recognitionYear === currentYear) {
    return format(new Date(date), 'd MMM', {
      locale: i18n.language === 'vi' ? vi : enUS,
    });
  }
  return format(new Date(date), 'd MMM yyyy', {
    locale: i18n.language === 'vi' ? vi : enUS,
  });
};
