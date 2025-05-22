import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";

export default function ToggleTheme() {
    const { theme, setTheme } = useTheme();
    return (
        <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}>
            {theme === "dark" && <Sun className="h-4 w-4" />}
            {theme === "light" && <Moon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}