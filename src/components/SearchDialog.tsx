import { useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import SearchForm from "./SearchForm"

export default function SearchDialog() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
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
                <SearchForm onSearchCompleted={() => setIsSearchOpen(false)} autofocusSearchBar />
            </DialogContent>
        </Dialog>
    );
}