import { Button, Menu, MenuItem } from "@mui/material";

import AnimatedListItem from "@/app/_components/animated-list-item-component";
import { ContactListItemProps } from "../_types/contact-list-item-props";
import { useState, MouseEvent } from "react";
import useDeleteContact from "../_hooks/use-delete-contact";

export default function ContactListItemComponent({
  index,
  contact,
  onEdit,
  onSelect,
}: ContactListItemProps) {
  const { id, first_name, last_name, phone } = contact;

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const { mutate: deleteDriver } = useDeleteContact();

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleDelete = () => {
    handleCloseMenu();
    deleteDriver(id);
  };

  return (
    <AnimatedListItem
      index={index}
      className="border-secondary text-body flex items-center justify-between rounded-2xl border p-4 text-sm"
    >
      <p>{`${first_name} ${last_name}`}</p>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => onEdit(contact)}>ویرایش</MenuItem>
        <MenuItem onClick={handleDelete}>حذف</MenuItem>
      </Menu>
      <div className="flex items-center gap-4">
        <p>{phone}</p>
      {onSelect ? (
        <Button
          type="button"
          variant="contained"
          aria-label="انتخاب"
          onClick={() => onSelect(contact)}
        >
          انتخاب
        </Button>
      ) : (
        <Button
          type="button"
          variant="contained"
          aria-label="عملیات"
          onClick={handleOpenMenu}
        >
          عملیات
        </Button>
      )}
      </div>
    </AnimatedListItem>
  );
}
