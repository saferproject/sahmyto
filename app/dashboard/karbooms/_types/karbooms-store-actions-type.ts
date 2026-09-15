import Karboom from "@/app/_types/karboom";

type KarboomsStoreActionsType = {
  setActiveKarboom: (karboom: Karboom) => void;
  clearActiveKarboom: () => void;
  openKarboomActionDrawer: () => void;
  closeKarboomActionDrawer: () => void;
};

export default KarboomsStoreActionsType;
