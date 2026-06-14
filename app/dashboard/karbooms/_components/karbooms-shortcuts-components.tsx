import { KARBOOMS_SHORTCUTS } from "../_constants/karbooms-shortcuts";
import ShortcutComponent from "./shortcut-component";

export default function KarboomsShortcutsComponents() {
  return (
    <div className="w-full flex items-center justify-between">
      {KARBOOMS_SHORTCUTS.map(({ id, ...other }) => (
        <ShortcutComponent key={id} {...other} />
      ))}
    </div>
  );
}
