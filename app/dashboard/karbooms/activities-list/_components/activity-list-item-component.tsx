import { useSnackbar } from "notistack";
import { useState, type MouseEvent } from "react";
import { motion } from "motion/react";
import useDeleteActivityEndpoint from "../_hooks/use-delete-activity-endpoint";
import { ActivityListItemProps } from "../_types/activity-list-item-props";

export default function ActivityListItemComponent({
  activity,
  index,
  onEdit,
}: ActivityListItemProps) {
  const {} = activity;

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
    <motion.li
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: membership_status === "pending" ? 0.6 : 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
      transition={{ delay: index * 0.1, duration: 0.2, ease: "easeIn" }}
      className="relative overflow-visible"
    ></motion.li>
  );
}
