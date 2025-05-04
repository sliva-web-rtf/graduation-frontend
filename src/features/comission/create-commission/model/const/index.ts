import { CommissionFormStep } from '../types';

export const CommissionFormStepRus: Record<CommissionFormStep, string> = {
    [CommissionFormStep.Info]: 'Основная информация',
    [CommissionFormStep.Experts]: 'Эксперты',
    [CommissionFormStep.Groups]: 'Группы',
    [CommissionFormStep.Students]: 'Студенты',
    [CommissionFormStep.Submit]: 'Готово',
};

export const CommissionFormStepDescription: Record<CommissionFormStep, string> = {
    [CommissionFormStep.Info]: 'Заполните основную информацию о комиссии',
    [CommissionFormStep.Experts]: 'Выберите экспертов на каждый этап ВКР',
    [CommissionFormStep.Groups]: 'Добавьте академические группы',
    [CommissionFormStep.Students]: 'Выберите студентов на каждый этап ВКР',
    [CommissionFormStep.Submit]: 'Проверьте введенные данные и отправьте форму',
};
