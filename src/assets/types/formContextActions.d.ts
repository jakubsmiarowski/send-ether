export interface FormContextActions {
    handleSubmit: (e: any) => void;
    handleAmountInput: (e: string) => void;
    handleAddressInput: (e: string) => void;
    handleTokenAddressInput: (e: string) => void;
    handleCurrency: (e: string) => void;
    handleSpeed: (e: string) => void;
    handleProductInput: (e: string) => void;
    handleReset: () => void;
}
