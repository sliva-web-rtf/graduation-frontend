import { InputField } from '../model/types/InputField';

export const COMMON_INPUTS: InputField[] = [
    {
        id: 1,
        label: 'Области науки и технологии',
        defaultValue: `1 Естественные науки
       1.2 Компьютерные науки и информатика
       1.3 Физические науки
2 Технические науки
       2.2 Электроника, фотоника, приборостроение и связь
       2.3 Информационные технологии и телекоммуникации
       2.4 Энергетика и электротехника`,
        multiline: true,
    },
    {
        id: 2,
        label: 'О себе',
        defaultValue:
            // eslint-disable-next-line max-len
            'Моя область научных исследований посвящена управлению и стабильности энергосистем. В частности, я работаю над приложениями PMU для мониторинга и улучшения стабильности энергосистем при слабом сигнале и переходных процессах. Также я работаю над системами аварийного управления для распределительных сетей. И последнее направление деятельности - программирование приложений для анализа энергосистем.',
        multiline: true,
    },
];

export const STUDENTSPECIFICINPUTS: InputField[] = [
    { id: 3, label: 'Уровень образования', defaultValue: 'Бакалавр' },
    { id: 4, label: 'Курс', defaultValue: '1' },
];

export const PROFESSORSPECIFICINPUTS: InputField[] = [
    { id: 5, label: 'Ученая степень, ученое звание, должность', defaultValue: 'Доцент, канд. пед. наук' },
    { id: 6, label: 'Профиль Urfu', defaultValue: 'Ссылка' },
    { id: 7, label: 'Профиль Scopus', defaultValue: 'Ссылка' },
    { id: 8, label: 'Профиль РИНЦ', defaultValue: 'Ссылка' },
];
export const createOrderedInputs = (specificInputs: InputField[]) => [...specificInputs, ...COMMON_INPUTS];
