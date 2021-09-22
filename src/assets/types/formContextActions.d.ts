export interface FormContextActions {
    handleSubmit: (e: any) => void;
    handleAmountInput: (e: any) => void;
    handleAddressInput: (e: any) => void;
    handleTokenAddressInput: (e: any) => void;
    handleCurrency: (e: any) => void;
    handleSpeed: (e: any) => void;
    handleProductInput: (e: any) => void;
    handleReset: () => void;
}
