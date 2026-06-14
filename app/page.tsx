"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();

  const handleNavigationToIntro = () => {
    router.push("/intro");
  };

  const handleNavigationToLogin = () => {
    router.push("/login");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center gap-4">
      <Button onClick={handleNavigationToIntro} variant="contained">
        Intro
      </Button>
      <Button onClick={handleNavigationToLogin} variant="contained">
        Login
      </Button>
    </div>
  );
}
