import { KarboomRequest } from "../_types/karboom-request";

export default interface CollaborationRequestProps {
  request: KarboomRequest;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
  mutatingRequest: number | null;
  requestIsAccepting: boolean;
  requestIsRejecting: boolean;
}
