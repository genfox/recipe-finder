import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import Header from '@/components/Header'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/ThemeProvider'

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
      <Toaster position='top-right' />
    </ThemeProvider>
  ),
})
