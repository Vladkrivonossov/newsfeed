import { CategoryNames } from './types';

export const categoryTitles: Record<CategoryNames, string> = {
  fashion: 'Мода',
  tech: 'Технологии',
  ['karpov.courses']: 'Karpov',
  politics: 'Политика',
  sport: 'Спорт',
  other: 'Прочее',
};

export const categoryIds: Record<CategoryNames, number> = {
  fashion: 3,
  ['karpov.courses']: 6,
  tech: 1,
  politics: 4,
  sport: 2,
  other: 5,
};

export const beautifyDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
  });
};
