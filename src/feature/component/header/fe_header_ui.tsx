import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useHeaderLogic } from "./fe_header_logic";

export default function FeHeaderUI() {
  const { user, isLogin, isMenuOpen, toggleMenu, handleLogout } =
    useHeaderLogic();

  return (
    <nav className={styles.navbar}>
      <div className="flex items-center">
        <Image
          src="/auth/logo_lugu.png"
          width={50}
          height={50}
          alt="logo"
          className="ml-4"
        />
      </div>

      <div className="hidden md:flex gap-4 mx-4 p-2">
        {isLogin ? (
          <button
            onClick={handleLogout}
            className="text-2xl font-semibold text-orange-700 hover:text-red-800 transition duration-200 ease-in-out"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="text-2xl font-semibold text-orange-700 hover:text-red-800 transition duration-200 ease-in-out"
          >
            Login
          </Link>
        )}
      </div>

      <div className="md:hidden flex items-center justify-between w-full px-4">
        <div style={{ paddingLeft: "10px" }}>
          <p className="font-bold text-sm">Hello {user?.name || "SJM"}</p>
          <p className="text-gray-500 font-semibold text-sm">
            {user?.id || "Sales "}
          </p>
        </div>

        <button onClick={toggleMenu}>
          {isMenuOpen ? (
            <CloseOutlined style={{ fontSize: "24px", color: "black" }} />
          ) : (
            <MenuOutlined style={{ fontSize: "24px", color: "black" }} />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className={styles.popup}>
          {isLogin ? (
            <button onClick={handleLogout} className={styles.popupItem}>
              Logout
            </button>
          ) : (
            <Link href="/auth/login" className={styles.popupItem}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
