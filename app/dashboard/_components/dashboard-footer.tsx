import { NAVIGATION_ITEMS } from "../_constants/navigation-items";
import NavigationItemCompoent from "./navigation-item-component";

export default function DashboardFooter() {
  return (
    <footer className="bg-gray-100 w-full rounded-t-[48px] px-8 pt-8 pb-4">
      <ul className="border-secondary flex items-center justify-evenly rounded-full border bg-white px-4 py-2 shadow-lg">
        {NAVIGATION_ITEMS.map(({ id, ...other }) => (
          <NavigationItemCompoent key={id} {...other} />
        ))}
      </ul>
    </footer>
  );
}
