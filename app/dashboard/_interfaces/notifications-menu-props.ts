import { KarboomRequest } from "../_types/karboom-request";

export default interface NotificationsMenuProps {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onClose: () => void;
  requests: KarboomRequest[];
  isLoading: boolean;
  isError: boolean;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
  mutatingRequest: number | null;
  requestIsAccepting: boolean;
  requestIsRejecting: boolean;
}
