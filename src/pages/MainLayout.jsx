import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";

export default function MainLayout({ children }) {
  return (
    <div className="w-screen min-h-screen flex justify-center bg-gray-100">
      <div className="w-full max-w-[390px] h-full flex flex-col bg-white shadow-md">
        <TopNav />
        <main className="flex-grow overflow-y-auto">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
