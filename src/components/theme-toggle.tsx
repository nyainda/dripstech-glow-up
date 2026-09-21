import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  return <Button variant="outline" size="icon" onClick={toggleTheme} className="size-10 border-border bg-transparent shadow-none" aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`} title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}>
    {resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
  </Button>;
}
