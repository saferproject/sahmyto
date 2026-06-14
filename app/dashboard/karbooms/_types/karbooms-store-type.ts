import Karboom from "@/app/_interfaces/karboom";
import KarboomsStoreActionsType from "./karbooms-store-actions-type";
import { KarboomStoreTriggers } from "./karboom-store-triggers";

type KarboomsStore = Karboom & KarboomsStoreActionsType & KarboomStoreTriggers;

export default KarboomsStore;