export namespace ErrorMessage {
    export function getRequiredErrorFieldMessage(field?: string): string {
        return `${field || 'Это поле'} обязательно.`;
    }

    export function getMinErrorFieldMessage(length: number, field?: string): string {
        return `${field || 'Это поле'} должно состоять минимум из ${length} символов`;
    }

    export function getMaxErrorFieldMessage(length: number, field?: string): string {
        return `${field || 'Это поле'} должно состоять максимум из ${length} символов`;
    }

    export function getEmailErrorFieldMessage(): string {
        return 'Некорректная почта';
    }

    export function getPhoneErrorFieldMessage(): string {
        return 'Некорректный номер телефона. Пример: 89223322111';
    }
}
