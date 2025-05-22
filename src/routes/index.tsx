import { createFileRoute } from '@tanstack/react-router'

import SearchForm from "@/components/SearchForm"

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="container flex flex-col items-center justify-center mx-auto min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <div className="relative h-32 w-24 mx-auto mb-4">
            <img
              src="/images/cooking.svg"
              alt="RecipeFinder Logo"
              style={{ height: 96, width: 96 }}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2">RecipeFinder</h1>
          <p className="text-muted-foreground">Find the perfect recipe for any occasion</p>
        </div>
        <SearchForm />
      </div>
    </div>
  )
}
