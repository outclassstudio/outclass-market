import TabBar from "@/components/common/tab-bar";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <TabBar />
    </div>
  );
}
