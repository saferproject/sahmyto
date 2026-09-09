import Karboom from "@/app/_interfaces/karboom";

export type KarboomDetails = Omit<Karboom, "income" | "expense" | "type"> &
  Partial<Pick<Karboom, "income" | "expense" | "type">> & {
    status: string;
  };
