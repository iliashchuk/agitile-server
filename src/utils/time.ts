import { subDays } from 'date-fns';

export const getRandomDateWithinWeekBefore = (): Date => {
  return subDays(new Date(), Math.random() * 7);
};
