export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='min-h-screen items-center justify-center p-4'>
      {children}
    </div>
  );
}
