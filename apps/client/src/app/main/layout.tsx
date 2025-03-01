// src/app/dashboard/layout.tsx
import { CustomSidebar } from "@/components/CustomSidebar";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${poppins.variable} font-sans min-h-screen flex`}>
      {/* Sidebar */}
      <CustomSidebar />

      {/* Contenido principal */}
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}