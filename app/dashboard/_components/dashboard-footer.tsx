import { NAVIGATION_ITEMS } from "../_constants/navigation-items";
import NavigationItemComponent from "./navigation-item-component";

export default function DashboardFooter() {
  return (
    <footer className="fixed bottom-4 w-full bg-transparent px-4">
      <ul className="bg-secondary-lightest/60 flex items-center justify-between rounded-full p-3 shadow-lg backdrop-blur-sm">
        {NAVIGATION_ITEMS.map(({ id, ...other }) => (
          <NavigationItemComponent key={id} {...other} />
        ))}
      </ul>
    </footer>
  );
}
