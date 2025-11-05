import { OwnerSidebar } from "@/components/owner/owner-sidebar";
import { OwnerHeader } from "@/components/owner/owner-header";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <OwnerSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <OwnerHeader />
        <main className="flex-1 overflow-y-auto bg-muted/40 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
