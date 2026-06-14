import Karboom from "@/app/_interfaces/karboom";

type KarboomsStoreActionsType = {
  setActiveKarboom: (karboom: Karboom) => void;
  clearActiveKarboom: () => void;
  openKarboomActionDrawer: () => void;
  closeKarboomActionDrawer: () => void;
  openExpenseDrawer: () => void;
  closeExpenseDrawer: () => void;
  openIncomeDrawer: () => void;
  closeIncomeDrawer: () => void;
};

export default KarboomsStoreActionsType;
