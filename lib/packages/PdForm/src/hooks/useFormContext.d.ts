export interface FormContextProps {
    resetAction: () => Promise<void>;
    submitAction: () => Promise<void>;
}
export declare function createFormContext(context: FormContextProps): {
    state: any;
};
export declare function useFormContext(): FormContextProps;
