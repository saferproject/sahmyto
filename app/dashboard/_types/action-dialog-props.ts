export type ActionDialogProps = {
  isOpen: boolean;
  title: string;
  icon: React.ReactNode;
  description: string;
  actionButtons: React.ReactNode;
  persistant: boolean;
  onClose: () => void;
};