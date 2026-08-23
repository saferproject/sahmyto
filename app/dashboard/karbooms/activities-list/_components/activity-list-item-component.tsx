import { useSnackbar } from "notistack";
import { useState, type MouseEvent } from "react";

import AnimatedListItem from "@/app/_components/animated-list-item-component";
import useDeleteActivityEndpoint from "../_hooks/use-delete-activity-endpoint";
import { ActivityListItemProps } from "../_types/activity-list-item-props";

export default function ActivityListItemComponent({
  activity,
  index,
  onEdit,
}: ActivityListItemProps) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const { mutate: deleteActivity } = useDeleteActivityEndpoint();

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    onEdit(activity);
  };

  const handleDelete = () => {
    handleCloseMenu();
    deleteActivity(activity.id);
  };

  return (
    <AnimatedListItem
      index={index}
      className="relative overflow-visible"
    ></AnimatedListItem>
  );
}
