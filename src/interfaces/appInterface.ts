import { DialogProps } from "./dialogInterface";

export interface AppProps {
    loading: Boolean;
    dialogConfig: DialogProps;
    setDialogConfig: (config: any, dispatch: any) => void;
}