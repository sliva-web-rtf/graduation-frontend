import { useCallback, useEffect } from 'react';

/**
 * Хук для отображения предупреждения при перезагрузке или закрытии страницы,
 * если есть несохраненные изменения
 *
 * @param hasUnsavedChanges - Функция, определяющая есть ли несохраненные данные
 */
export const useUnsavedChangesWarning = (hasUnsavedChanges: () => boolean) => {
    const handleBeforeUnload = useCallback(
        (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges()) {
                e.preventDefault();
            }

            return null;
        },
        [hasUnsavedChanges],
    );

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasUnsavedChanges, handleBeforeUnload]);
};
