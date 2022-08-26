export interface IAlertDialog {
  onClickOkay: () => void;
  onClickCancel: () => void;
  title: string;
  message: string;
  show: boolean;
}
