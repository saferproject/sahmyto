import FreePlanCrown from "./_assets/images/free-plan-crown.png";
import PlanCardComponent from "./_components/plan-card-component";
import PlansSummaryComponent from "./_components/plans-summary-component";

import type { PlanCard } from "./_types/plan-card";

const activePlan = {
  title: "رایگان",
  code: "FREE",
  icon: FreePlanCrown,
};

const plans: PlanCard[] = [
  {
    id: "free",
    title: "پلن رایگان سهمیتو",
    label: "GoldenPlane",
    price: "۱۲.۳۶۰.۰۰۰",
    features: [
      "دسترسی به بخشی از امکانات سهمیتو",
      "اضافه کردن کاربر، راننده، شریک، تا ۱۰۰ نفر",
      "مشاهده فعالیت کاربران، بستن ماه مالی هر ماه",
    ],
    accentColor: "#ff6a00",
    headerColor: "#ffd2b3",
    glowColor: "rgba(255, 106, 0, 0.38)",
    crownCount: 1,
    icon: FreePlanCrown,
  },
  {
    id: "gold",
    title: "پلن طلایی سهمیتو",
    label: "GoldenPlane",
    price: "۱۲.۳۶۰.۰۰۰",
    features: [
      "دسترسی به بخشی از امکانات سهمیتو",
      "اضافه کردن کاربر، راننده، شریک، تا ۱۰۰ نفر",
      "مشاهده فعالیت کاربران، بستن ماه مالی هر ماه",
    ],
    accentColor: "#f7c500",
    headerColor: "#fff4d5",
    glowColor: "rgba(247, 197, 0, 0.4)",
    crownCount: 2,
    icon: FreePlanCrown,
  },
  {
    id: "silver",
    title: "پلن نقره ای سهمیتو",
    label: "GoldenPlane",
    price: "۱۲.۳۶۰.۰۰۰",
    features: [
      "دسترسی به تمامی امکانات بازدیدفنی",
      "اضافه کردن تعداد مدیران فنی تا ۱۰۰ نفر",
      "مشاهده فعالیت مدیران فنی",
    ],
    accentColor: "#bcc7dc",
    headerColor: "#f0f2ff",
    glowColor: "rgba(188, 199, 220, 0.5)",
    crownCount: 1,
    icon: FreePlanCrown,
  },
];

export default function PlansListPage() {
  return (
    <div className="flex w-full flex-col gap-6.75">
      <PlansSummaryComponent activePlan={activePlan} />
      <ul className="flex w-full max-w-full flex-col gap-5 self-end">
        {plans.map((plan) => (
          <li key={plan.id}>
            <PlanCardComponent plan={plan} />
          </li>
        ))}
      </ul>
    </div>
  );
}
