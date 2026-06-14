export default interface DescriptionInputProps {
  label?: string;
  rows?: number;
  maxLength?: number;
  register: object;
  currentlength: number;
  error: boolean;
  helperText: string;
}