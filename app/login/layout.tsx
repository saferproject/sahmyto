import LoginHeader from "./_components/sign-in-header";
import LoginHero from "./_components/sign-in-hero";
import LoginFooter from "./_components/sign-in-footer";
import LoginLayoutProps from "./_interfaces/login-layout-props";
import { ReactQueryProvider } from "../query-client";
import { UserInfoStoreProvider } from "../_providers/user-info-provider";
import ThemeRegistry from "../theme-registery";

export default function SignInPage({ children }: LoginLayoutProps) {
  return (
    <ThemeRegistry>
      <ReactQueryProvider>
        <UserInfoStoreProvider>
          <div className="flex h-screen w-screen flex-col items-center justify-between px-8 py-12">
            <LoginHeader />
            <LoginHero />
            {children}
            <LoginFooter />
          </div>
        </UserInfoStoreProvider>
      </ReactQueryProvider>
    </ThemeRegistry>
  );
}
