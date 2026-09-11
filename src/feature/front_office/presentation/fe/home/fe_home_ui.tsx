import { useHomeLogic } from "./fe_home_logic";

export default function FeHomeUI() {
  const { content } = useHomeLogic();

  return (
    <div>
      <div>{content.greeting}</div>
    </div>
  );
}
