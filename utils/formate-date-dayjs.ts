import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
require(`dayjs/locale/en`);
require(`dayjs/locale/fr`);
require(`dayjs/locale/it`);
require(`dayjs/locale/de`);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.locale(`en`);
dayjs.locale(`fr`);
dayjs.locale(`it`);
dayjs.locale(`de`);

const localized = 'en';
export const formateDateDayjs = (date: Date) => {
  const todaysDate = new Date();
  const dateInit = dayjs(date);
  const currentYear = todaysDate.getFullYear();
  const dateYear = Number(dateInit.format('YYYY'));
  return currentYear === dateYear
    ? dateInit.format('ll')
    : dateInit.format('DD/MM/YYYY');
};

export const getMonthFormatDays = (date: Date) => {
  const currentMouth = dayjs(date).locale(localized).format('MMM');
  return currentMouth;
};

export const getDays = (date: Date) => dayjs(date).format('DD');

export const formateDDMMYYHH = (date: Date) => {
  return date ? dayjs(date).locale(localized).format('DD/MM/YYYY HH:mm') : null;
};

export const formateDMYHH = (date: Date, locale: string) => {
  return date ? dayjs(date).locale(locale).format('DD MMM YYYY') : null;
};

export const formateDDMMYYYY = (date: Date) => {
  return date ? dayjs(date).format('DD/MM/YYYY') : null;
};

export const formateFromNow = (date: Date, locale: string) =>
  dayjs(date).locale(locale).fromNow();

export const subtractYears = (numOfYears: number, date: Date) => {
  const dateSub = new Date(date.getTime());
  dateSub.setFullYear(dateSub.getFullYear() - numOfYears);
  return dateSub;
};
