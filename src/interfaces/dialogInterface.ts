export interface ConfirmationDialogProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
}


export interface DialogProps {
    title: string;
    message: string;
}