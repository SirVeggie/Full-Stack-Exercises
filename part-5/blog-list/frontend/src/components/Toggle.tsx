
type ToggleProps = {
  visible: boolean;
  children: React.ReactNode;
};

export function Toggle({ visible, children }: ToggleProps) {
  return <>{visible ? children : null}</>;
}