export default function LoadingComponent({
  className = "",
}: {
  className?: string;
}) {
  return <div className={`spinner ${className}`} />;
}
