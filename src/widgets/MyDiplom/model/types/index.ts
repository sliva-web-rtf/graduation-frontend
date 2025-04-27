export enum StageOptions {
    Main = 'Основная информация',
}

type StageType = 'Defence' | 'PreDefence' | 'FormattingReview';
type Stage = { name: string; type: StageType; description?: string; endsAt?: string };

export type DiplomSchema = {
    stage: Stage;
    stages: Stage[];
    stageOptions: string[];
};
