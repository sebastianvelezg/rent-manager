import { RenterSidebar } from "@/components/renter/renter-sidebar";
import { RenterHeader } from "@/components/renter/renter-header";

export default function RenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <RenterSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <RenterHeader />
        <main className="flex-1 overflow-y-auto bg-muted/40 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
