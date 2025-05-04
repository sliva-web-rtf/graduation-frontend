import { CommissionFormSchema } from '@/features/comission/create-commission/model';
import { createContext, ReactNode, useContext, useMemo } from 'react';

type EditCommissionContextType = {
    data: CommissionFormSchema['forms'] | null;
};

type EditCommissionContextProviderProps = {
    children: ReactNode;
    initialData?: CommissionFormSchema['forms'];
};

export const EditCommissionContext = createContext<EditCommissionContextType>({
    data: null,
});

export const EditCommissionContextProvider = (props: EditCommissionContextProviderProps) => {
    const { children, initialData } = props;

    const contextValue = useMemo(
        () => ({
            data: initialData ?? null,
        }),
        [initialData],
    );

    return <EditCommissionContext.Provider value={contextValue}>{children}</EditCommissionContext.Provider>;
};

export const useEditCommissionContext = () => {
    const context = useContext(EditCommissionContext);

    if (!context) {
        return null;
    }

    return context.data;
};
