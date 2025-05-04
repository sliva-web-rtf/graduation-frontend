import { CommissionFormSchema } from '@/features/comission/create-commission/model';
import { createContext, ReactNode, useContext, useMemo } from 'react';

type EditCommissionContextType = {
    editData: CommissionFormSchema['forms'] | null;
    commissionId: string | null;
};

type EditCommissionContextProviderProps = {
    children: ReactNode;
    initialData?: CommissionFormSchema['forms'];
    commissionId?: string | null;
};

export const EditCommissionContext = createContext<EditCommissionContextType>({
    editData: null,
    commissionId: null,
});

export const EditCommissionContextProvider = (props: EditCommissionContextProviderProps) => {
    const { children, initialData, commissionId } = props;

    const contextValue = useMemo(
        () => ({
            editData: initialData ?? null,
            commissionId: commissionId ?? null,
        }),
        [initialData, commissionId],
    );

    return <EditCommissionContext.Provider value={contextValue}>{children}</EditCommissionContext.Provider>;
};

export const useEditCommissionContext = () => {
    const context = useContext(EditCommissionContext);

    const value = useMemo(() => {
        return {
            editData: context.editData,
            commissionId: context.commissionId,
        };
    }, [context]);

    if (!context) {
        return null;
    }

    return value;
};
