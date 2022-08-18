export const categoryNames: { [index: string]: string } = {
  index: 'Главная',
  fashion: 'Мода',
  tech: 'Технологии',
  politics: 'Политика',
  sport: 'Спорт',
};

export const categoryIds: { [index: string]: number } = {
  index: 0,
  fashion: 3,
  tech: 1,
  politics: 4,
  sport: 2,
};

export const beautifyDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
  });
};
