import { useState } from "react"
import { Menu, Salad, Search } from "lucide-react"

import { Link } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"


import SearchForm from "./SearchForm"
import ToggleTheme from "./ToggleTheme"

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)

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
                    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="cursor-pointer">
                                <Search className="h-5 w-5" />
                                <span className="sr-only">Search</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader className="mb-3">
                                <DialogTitle>Search</DialogTitle>
                            </DialogHeader>
                            <SearchForm onSearchCompleted={() => setIsSearchOpen(false)} />
                        </DialogContent>
                    </Dialog>

                    <ToggleTheme />

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden cursor-pointer">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle>
                                    <Link to="/" className="flex items-center gap-2">
                                        <Salad className="h-5 w-5 text-orange-500" />
                                        <span className="font-bold">RecipeFinder</span>
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4 mt-4 p-2">
                                <Link
                                    to="/favorites"
                                    className="p-2 text-base"
                                    activeProps={{ className: "font-bold bg-gray-100/50 rounded-md" }}
                                >
                                    Favorites
                                </Link>
                                <Link
                                    to="/random"
                                    className="p-2 text-base"
                                    activeProps={{ className: "font-bold bg-gray-100/50 rounded-md" }}
                                >
                                    Random
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
