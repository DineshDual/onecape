'use client';

import { AppProvider } from './components/AppProvider';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>{children}</AppProvider>
  );
}