import { Link } from "@tanstack/react-router"

import { Salad } from "lucide-react"

import ToggleTheme from "./ToggleTheme"
import MobileMenu from "./MobileMenu"
import SearchDialog from "./SearchDialog"

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="px-2 flex h-14 items-center">
                <Link to="/" className="flex items-center gap-2 mr-4">
                    <Salad className="h-5 w-5 text-orange-500" />
                    <span className="font-bold">RecipeFinder</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-sm">
                    <Link
                        to="/favorites"
                        className={`transition-colors hover:text-foreground/80 text-foreground/60`}
                        activeProps={{ className: "font-bold text-foreground" }}
                    >
                        Favorites
                    </Link>
                    <Link
                        to="/random"
                        className={`transition-colors hover:text-foreground/80 text-foreground/60`}
                        activeProps={{ className: "font-bold text-foreground" }}
                    >
                        Random
                    </Link>
                </nav>

                <div className="flex items-center ml-auto gap-2">
                    {/* Search Dialog */}
                    <SearchDialog />

                    {/* Theme Toggler */}
                    <ToggleTheme />

                    {/* Mobile Menu */}
                    <MobileMenu />
                </div>
            </div>
        </header>
    )
}
