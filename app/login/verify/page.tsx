import VerifyPhone from "./_components/verify-phone";
import VerifyForm from "./_components/verify-form";
import VerifyRetry from "./_components/verify-retry";

export default function VerifyPage() {
  return (
    <div>
      <VerifyPhone />
      <VerifyForm />
      <VerifyRetry />
    </div>
  );
}
