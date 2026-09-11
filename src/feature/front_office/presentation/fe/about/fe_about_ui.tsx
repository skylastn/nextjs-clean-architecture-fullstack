import { useAboutLogic } from "./fe_about_logic";

export default function FeAboutUI() {
  const { content } = useAboutLogic();

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
