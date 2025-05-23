import { getPopularSearches, getSanitizedSearchQuery } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useAppStore from "@/store/appStore";
import { Badge } from "./ui/badge";

interface SearchFormProps {
    showImFeelingHungry?: boolean
    showPopularSearches?: boolean
    showLastSearch?: boolean
    autofocusSearchBar?: boolean
    onSearchCompleted?: () => void
}

export default function SearchForm({
    showImFeelingHungry = true,
    showPopularSearches = true,
    showLastSearch = true,
    autofocusSearchBar = false,
    onSearchCompleted
}: SearchFormProps) {
    const navigate = useNavigate();

    const { lastSearch } = useAppStore();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const searchTerm = formData.get("searchTerm") as string;
        const sanitizedTerm = getSanitizedSearchQuery(searchTerm);

        if (!sanitizedTerm) return

        navigate({ to: "/search/$query", params: { query: sanitizedTerm } })

        if (onSearchCompleted) {
            onSearchCompleted();
        }
    }

    return (
        <div>
            <form onSubmit={handleSearch} className="w-full">
                <div className="relative mb-6">
                    <label htmlFor="searchTerm" className="sr-only">
                        Search for recipes...
                    </label>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="searchTerm"
                        name="searchTerm"
                        type="search"
                        placeholder="Search for recipes..."
                        className="pl-10 py-6 text-lg"
                        required
                        autoFocus={autofocusSearchBar}
                    />
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button type="submit" size="lg" className="px-8 cursor-pointer">
                        Search Recipes
                    </Button>
                    {
                        showImFeelingHungry && (
                            <Link to="/random">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    className="px-8 cursor-pointer w-full"
                                    onClick={onSearchCompleted}
                                    onKeyUp={(e: React.KeyboardEvent<HTMLButtonElement>) => {
                                        if (e.key === "Enter" && onSearchCompleted) {
                                            onSearchCompleted();
                                        }
                                    }}
                                >
                                    I'm Feeling Hungry
                                </Button>
                            </Link>
                        )
                    }
                </div>
            </form>

            {/* Last search */}
            {
                showLastSearch && lastSearch.query && (
                    <div className="flex items-center gap-2 mt-5">
                        <span className="text-sm font-medium text-muted-foreground">Last search:</span>
                        <Link to="/search/$query" params={{ query: lastSearch.query }}>
                            <Badge
                                variant="outline"
                                className="rounded-full px-3 py-1 hover:bg-gray-100 cursor-pointer transition-colors"
                                onClick={onSearchCompleted}
                                onKeyUp={(e: React.KeyboardEvent<HTMLButtonElement>) => {
                                    if (e.key === "Enter" && onSearchCompleted) {
                                        onSearchCompleted();
                                    }
                                }}
                            >
                                {decodeURIComponent(lastSearch.query)}
                            </Badge>
                        </Link>
                    </div>
                )
            }

            {/* Popular searches */}
            {
                showPopularSearches && (
                    <div className="space-y-2 border-t pt-3 mt-5">
                        <p className="text-sm font-medium text-muted-foreground">Popular searches:</p>
                        <div className="flex flex-wrap gap-2">
                            {getPopularSearches().map((item) => (
                                <Link key={item} to="/search/$query" params={{ query: item }}>
                                    <Badge
                                        variant="outline"
                                        className="rounded-full px-3 py-1 hover:bg-gray-100 cursor-pointer transition-colors"
                                        onClick={onSearchCompleted}
                                        onKeyUp={(e: React.KeyboardEvent<HTMLButtonElement>) => {
                                            if (e.key === "Enter" && onSearchCompleted) {
                                                onSearchCompleted();
                                            }
                                        }}
                                    >
                                        {item}
                                    </Badge>
                                </Link>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>

    );
}