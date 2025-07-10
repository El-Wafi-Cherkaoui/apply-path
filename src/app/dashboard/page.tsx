import { auth } from "@/auth"
import { AppSidebar, AppUser } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export const iframeHeight = "800px"

export const description = "A sidebar with a header and a search form."

export default async function Page() {
  const session = await auth()

  if (!session || !session?.user) return null
const currentUser: AppUser = {
  id: Number(session.user.id),
  email: session.user.email ?? "",
  name: session.user.name ?? null,
  // avatar: session.user.avatar ?? null,
}
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar className="border-none" currentUser={currentUser} />
          <SidebarInset className="bg-[#0a0a0a]">
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-primary aspect-video rounded-xl" />
                <div className="bg-primary aspect-video rounded-xl" />
                <div className="bg-primary aspect-video rounded-xl" />
              </div>
              <div className="bg-primary min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
