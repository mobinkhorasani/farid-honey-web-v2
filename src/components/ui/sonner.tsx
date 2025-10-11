"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "#fd9800ff",
          "--normal-text": "#000000ff",
          // "--normal-border": "#e5e7eb",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
