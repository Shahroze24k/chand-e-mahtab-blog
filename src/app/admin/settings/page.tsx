import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import { getSiteMeta } from '@/lib/db';
import AdminHeader from '@/components/admin/AdminHeader';
import SettingsForm from '@/components/admin/SettingsForm';

async function checkAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  
  if (!token) {
    redirect('/admin/login');
  }

  const admin = verifyAdminToken(token);
  if (!admin || !admin.isAdmin) {
    redirect('/admin/login');
  }

  return admin;
}

export default async function AdminSettingsPage() {
  await checkAdminAuth();
  
  const siteMeta = await getSiteMeta();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFBF8' }}>
      <AdminHeader />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-playfair text-3xl font-bold mb-2" style={{ color: '#14221C' }}>
            Settings
          </h1>
          <h2 className="font-urdu text-xl rtl" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
            ترتیبات
          </h2>
          <p className="text-lg mt-2" style={{ color: 'rgba(20, 34, 28, 0.6)' }}>
            Manage your site information and social media links.
          </p>
        </div>

        <SettingsForm siteMeta={siteMeta} />
      </main>
    </div>
  );
}
