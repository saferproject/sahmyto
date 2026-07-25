import Karboom from "@/app/_interfaces/karboom";

type KarboomsStoreActionsType = {
  setActiveKarboom: (karboom: Karboom) => void;
  clearActiveKarboom: () => void;
  openKarboomActionDrawer: () => void;
  closeKarboomActionDrawer: () => void;
};

export default KarboomsStoreActionsType;
