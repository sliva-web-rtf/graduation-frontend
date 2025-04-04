import { CommissionFormStep } from '../types';

export const CommissionFormStepRus: Record<CommissionFormStep, string> = {
    [CommissionFormStep.Info]: 'Основное',
    [CommissionFormStep.Experts]: 'Эксперты',
    [CommissionFormStep.Groups]: 'Группы',
    [CommissionFormStep.Students]: 'Студенты',
    [CommissionFormStep.Submit]: 'Готово',
};

export const CommissionFormStepDescription: Record<CommissionFormStep, string> = {
    [CommissionFormStep.Info]: 'Заполните основную информацию о комиссии',
    [CommissionFormStep.Experts]: 'Добавьте экспертов',
    [CommissionFormStep.Groups]: 'Добавьте академические группы',
    [CommissionFormStep.Students]: 'Отредактируйте список студентов',
    [CommissionFormStep.Submit]: '',
};
