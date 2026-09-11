import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { FeUserResponse } from "@/feature/auth/domain/fe/response/fe_user_response";
import { useUserService } from "@/shared/dependency_injection/global_container";
import { useAuthLogic } from "@/shared/logic/auth_logic";

export const useHeaderLogic = () => {
  const router = useRouter();
  const userService = useUserService();
  const { isLogin, logout } = useAuthLogic();
  const [user, setUser] = useState<FeUserResponse | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const getUser = useCallback(async (): Promise<void> => {
    const result = await userService.me();
    result.fold(
      () => setUser(null),
      (data) => setUser(data),
    );
  }, [userService]);

  useEffect(() => {
    if (!isLogin) {
      setUser(null);
      return;
    }
    getUser();
  }, [isLogin, getUser]);

  const toggleMenu = () => setMenuOpen((open) => !open);

  const handleLogout = async (): Promise<void> => {
    setMenuOpen(false);
    await logout();
    await router.push("/auth/login");
  };

  return { user, isLogin, isMenuOpen, toggleMenu, handleLogout };
};
