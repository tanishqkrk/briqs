import { ModeToggle } from "@/components/ThemeSwitcher";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      {/* <div className="fixed top-3 right-3">
        <ModeToggle></ModeToggle>
      </div>{" "} */}
      {children}
    </main>
  );
}
