import { useRef, useState } from "react"
import { Dices, Heart, Menu, Salad } from "lucide-react"

import { Link } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function MobileMenu() {
    const [sheetOpened, setSheetOpened] = useState(false);
    const closeRef = useRef<HTMLButtonElement>(null);

    const handleOpenChange = (open: boolean) => {
        setSheetOpened(open)
    };

    const closeSheetProgrammatically = () => {
        closeRef.current?.click()
    };

    return (
        <Sheet open={sheetOpened} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden cursor-pointer">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>
                        <Link to="/" className="flex items-center gap-2" onClick={() => closeSheetProgrammatically()}>
                            <Salad className="h-5 w-5 text-orange-500" />
                            <span className="font-bold">RecipeFinder</span>
                        </Link>
                    </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-4 p-2">
                    <Link
                        to="/favorites"
                        className="flex items-center gap-3 rounded-md p-3 text-base transition-colors hover:bg-orange-50 dark:hover:bg-orange-100 dark:hover:text-black"
                        activeProps={{ className: "font-medium bg-orange-100 text-orange-700 rounded-md" }}
                        onClick={() => closeSheetProgrammatically()}
                    >
                        <Heart className="h-5 w-5 text-orange-500" />
                        <span>Favorites</span>
                    </Link>
                    <Link
                        to="/random"
                        className="flex items-center gap-3 rounded-md p-3 text-base transition-colors hover:bg-orange-50 dark:hover:bg-orange-100 dark:hover:text-black"
                        activeProps={{ className: "font-medium bg-orange-100 text-orange-700 rounded-md" }}
                        onClick={() => closeSheetProgrammatically()}
                    >
                        <Dices className="h-5 w-5 text-orange-500" />
                        <span>Random</span>
                    </Link>
                </nav>
            </SheetContent>
            <SheetClose ref={closeRef} className="hidden" />
        </Sheet>
    );
}