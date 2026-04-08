import type { ElementType, ReactNode } from "react";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
};

export function Container<T extends ElementType = "div">({
  as,
  children,
  className = "",
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={`mx-auto w-full max-w-5xl px-5 sm:px-8 ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
