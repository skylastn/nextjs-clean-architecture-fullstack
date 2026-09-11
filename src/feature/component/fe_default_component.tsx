import { useRouter } from "next/router";
import FeHeaderUI from "./header/fe_header_ui";

type FeDefaultComponentProps = {
  children: React.ReactNode;
};

export default function FeDefaultComponent({
  children,
}: FeDefaultComponentProps) {
  const router = useRouter();
  const onlyDashboard = router.pathname.startsWith("/dashboard");

  return (
    <main>
      {onlyDashboard && <FeHeaderUI />}
      {children}
    </main>
  );
}
