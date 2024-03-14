import { ICatalogCard } from 'widgets/CatalogCard/model/types/ICatalogCard';

const chips = [
  'Машинное обучение',
  'Анализ данных',
  'Web-разработка',
  'Проектирование ИС',
  '1С-Битрикс',
  '1С-Предприятие',
  'Информационная безопасность',
];
const titles = ['Коротков Александр Кириллович', 'Миронова Елизавета Михайловна', 'Токарев Александр Максимович'];
const subtitles = ['Старший преподаватель', 'Доцент, канд. пед. наук', 'Доцент, канд. тех. наук'];
const limit = { current: 5, max: 15 };

const generate = (length: number): ICatalogCard[] => Array.from({ length }, (_, index) => ({
  title: titles[index],
  chips,
  subtitle: subtitles[index],
  limit,
}));

export const catalogCards = generate(3);
