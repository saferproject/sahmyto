export default interface ConfirmationDialogProps {
  isOpen: boolean;
  isPending: boolean;
  title: string;
  icon: React.ReactNode;
  mainDiscription: string;
  vector?: React.ReactNode;
  extraDescription?: string;
  confirmButtonTitle?: string;
  onConfirm: () => void;
  onClose: () => void;
}
