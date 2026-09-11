import { FeAuthService } from "@/feature/auth/application/fe/fe_auth_service";
import { FeUserService } from "@/feature/auth/application/fe/fe_user_service";
import React, { createContext, useContext, useMemo } from "react";

export type GlobalContainer = {
  authService: FeAuthService;
  userService: FeUserService;
};

export function createContainer(): GlobalContainer {
  return {
    authService: new FeAuthService(),
    userService: new FeUserService(),
  };
}

const GlobalContainerContext = createContext<GlobalContainer | null>(null);

export function GlobalContainerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = useMemo(() => createContainer(), []);
  return (
    <GlobalContainerContext.Provider value={container}>
      {children}
    </GlobalContainerContext.Provider>
  );
}

export function useContainer() {
  const ctx = useContext(GlobalContainerContext);
  if (!ctx)
    throw new Error("useContainer must be used within GlobalContainerProvider");
  return ctx;
}

export const useAuthService = () => useContainer().authService;
export const useUserService = () => useContainer().userService;
