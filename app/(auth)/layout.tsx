export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex h-screen  items-center justify-center">
      <div className="w-2/5 h-full p-3">{children}</div>
      {/* <div className="w-2/5 h-full flex justify-center items-center">
        <img
          className="h-[95%] object-cover w-[95%] rounded-xl"
          src="/auth.webp"
          alt=""
        />
      </div> */}
    </main>
  );
}
