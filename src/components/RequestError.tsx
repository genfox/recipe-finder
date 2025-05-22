
import { Link } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"

export function RequestError() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="max-w-md mx-auto mb-8">
        <img src="/images/error.svg" alt="Request error" width={200} height={200} className="mx-auto" />
      </div>

      <h2 className="text-2xl font-bold mb-2">Request error</h2>
      <p className="text-muted-foreground max-w-md">Sorry, there was an error during the request</p>

      <Button className="mt-3" asChild>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  )
}
