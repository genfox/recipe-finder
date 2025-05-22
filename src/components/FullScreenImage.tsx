import { useState } from "react"
import { ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"

interface ImageDialogProps {
    imageUrl: string
    imageAlt?: string
    buttonText?: string
}

export function FullScreenImage({ imageUrl, imageAlt = "Full size image", buttonText = "Show picture" }: ImageDialogProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 cursor-pointer">
                    <ImageIcon className="h-4 w-4 text-orange-500" />
                    {buttonText}
                </Button>
            </DialogTrigger>
            <DialogHeader>
                <DialogTitle className="sr-only">Full screen recipe image</DialogTitle>
            </DialogHeader>
            <DialogContent className="max-w-3xl p-0 h-auto flex items-center justify-center overflow-hidden">
                <div className="w-full h-full aspect-auto">
                    <img src={imageUrl || "/placeholder.svg"} alt={imageAlt} className="w-full h-full object-contain" />
                </div>
            </DialogContent>
        </Dialog>
    )
}
