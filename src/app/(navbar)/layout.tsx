import NavMenu from "../_components/navigation-menu";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <NavMenu />
      {children}
    </main>
  );
}
