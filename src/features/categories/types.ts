export enum CategoryNames {
  politics = 'politics',
  sport = 'sport',
  tech = 'tech',
  fashion = 'fashion',
  'karpov.courses' = 'karpov.courses',
  other = 'other',
}

export interface Category {
  id: number;
  name: CategoryNames;
}
