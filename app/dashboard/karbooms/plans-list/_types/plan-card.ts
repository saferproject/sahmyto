import type { StaticImageData } from "next/image";

export type PlanCard = {
  id: string;
  title: string;
  label: string;
  price: string;
  features: string[];
  accentColor: string;
  headerColor: string;
  glowColor: string;
  crownCount: 1 | 2;
  icon: StaticImageData;
};
