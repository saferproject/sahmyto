import { useWatch } from "react-hook-form";
import useAddContact from "../_hooks/use-add-contact";
import useEditContact from "../_hooks/use-edit-contact";
import { ContactFormProps } from "../_types/contact-form-props";
import ApiError from "@/app/_errors/api-error";
import { ContactFormType } from "../_schemas/contact-form-schema";
import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import useContactForm from "../_hooks/use-contact-form";
import { getContactFormInitial } from "../_constants/contact-form-initial";
import DescriptionInput from "@/app/_components/description-input";

export default function ContactFormComponent({
  formState,
  contact,
  onSuccess,
}: ContactFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setValues,
    setError,
    formState: { errors },
  } = useContactForm();

  const { description } = useWatch({ control });

  const { mutate: addContact, isPending: addingContact } = useAddContact();
  const { mutate: editContact, isPending: editingContact } = useEditContact();

  useEffect(() => {
    const initialValues = getContactFormInitial();

    if (formState === "EDIT" && contact) {
      setValues({
        ...initialValues,
        phone: contact.phone,
        first_name: contact.first_name,
        last_name: contact.last_name,
      });
    } else setValues(initialValues);
  }, [formState, contact, setValues]);

  const handleMutationSuccess = () => {
    setValues(getContactFormInitial());
    onSuccess();
  };

  const handleMutationError = (error: Error) => {
    if (error instanceof ApiError && error.errors)
      Object.entries(error.errors).forEach(([field, errors]) =>
        setError(field as keyof ContactFormType, {
          message: errors[0],
          type: "validate",
        }),
      );
  };

  const submit = (data: ContactFormType) => {
    if (formState === "EDIT" && contact) {
      editContact(
        { ...data, contactId: contact.id },
        {
          onSuccess: handleMutationSuccess,
          onError: handleMutationError,
        },
      );
      return;
    }

    addContact(data, {
      onSuccess: handleMutationSuccess,
      onError: handleMutationError,
    });
  };

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit(submit)}
    >
      <TextField
        {...register("phone")}
        type="tel"
        inputMode="tel"
        label="شماره تماس"
        error={!!errors.phone}
        helperText={errors.phone?.message ?? ""}
        required
      />
      <div className="flex items-center gap-4">
        <TextField
          {...register("first_name")}
          label="نام"
          error={!!errors.first_name}
          helperText={errors.first_name?.message ?? ""}
          fullWidth
          required
        />
        <TextField
          {...register("last_name")}
          label="نام خانوادگی"
          error={!!errors.last_name}
          helperText={errors.last_name?.message ?? ""}
          fullWidth
          required
        />
      </div>
      <DescriptionInput
        register={register("description")}
        currentlength={description?.length ?? 0}
        error={!!errors.description}
        helperText={errors.description?.message ?? ""}
      />
      <Button
        variant="contained"
        type="submit"
        loading={addingContact || editingContact}
        fullWidth
      >
        ثبت
      </Button>
    </form>
  );
}
