import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import { getPublishedPosts, prisma } from '@/lib/db';
import AdminHeader from '@/components/admin/AdminHeader';
import DashboardStats from '@/components/admin/DashboardStats';

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

export default async function AdminDashboard() {
  await checkAdminAuth();

  // Get dashboard stats
  const [posts, totalComments, pendingComments] = await Promise.all([
    getPublishedPosts(),
    prisma.comment.count(),
    prisma.comment.count({ where: { approved: false } }),
  ]);

  const stats = {
    totalPosts: posts.length,
    totalComments,
    pendingComments,
    publishedPosts: posts.filter(p => p.published).length,
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFBF8' }}>
      <AdminHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2" style={{ color: '#14221C' }}>
            Admin Dashboard
          </h1>
          <h2 className="font-urdu text-xl md:text-2xl rtl" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
            ایڈمن ڈیش بورڈ
          </h2>
          <p className="text-lg mt-2" style={{ color: 'rgba(20, 34, 28, 0.6)' }}>
            Welcome back! Here's an overview of your blog.
          </p>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats stats={stats} />

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ActionCard
            title="New Post"
            titleUr="نیا مضمون"
            description="Create a new blog post"
            href="/admin/posts/new"
            icon="✍️"
            color="#0B5D1E"
          />
          
          <ActionCard
            title="Manage Posts"
            titleUr="مضامین کا انتظام"
            description="Edit existing posts"
            href="/admin/posts"
            icon="📝"
            color="#F4C430"
          />
          
          <ActionCard
            title="Comments"
            titleUr="تبصرے"
            description="Moderate comments"
            href="/admin/comments"
            icon="💬"
            color="#0B5D1E"
            badge={pendingComments > 0 ? pendingComments : undefined}
          />
          
          <ActionCard
            title="Settings"
            titleUr="ترتیبات"
            description="Site settings & about"
            href="/admin/settings"
            icon="⚙️"
            color="#F4C430"
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Posts */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-playfair text-xl font-semibold mb-4" style={{ color: '#14221C' }}>
              Recent Posts
            </h3>
            <div className="space-y-4">
              {posts.slice(0, 5).map((post) => (
                <div key={post.id} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium" style={{ color: '#14221C' }}>
                      {post.titleEn}
                    </h4>
                    <p className="text-sm" style={{ color: 'rgba(20, 34, 28, 0.6)' }}>
                      {post.published ? 'Published' : 'Draft'}
                    </p>
                  </div>
                  <a
                    href={`/admin/posts/${post.id}/edit`}
                    className="px-3 py-1 text-sm rounded-lg hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: '#0B5D1E', color: '#FAFBF8' }}
                  >
                    Edit
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Help & Quick Tips */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-playfair text-xl font-semibold mb-4" style={{ color: '#14221C' }}>
              Quick Help
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(11, 93, 30, 0.05)' }}>
                <h4 className="font-medium mb-2" style={{ color: '#0B5D1E' }}>
                  📝 Creating Posts
                </h4>
                <p className="text-sm" style={{ color: 'rgba(20, 34, 28, 0.7)' }}>
                  Click "New Post" to create bilingual content with rich text editing.
                </p>
              </div>
              
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(244, 196, 48, 0.05)' }}>
                <h4 className="font-medium mb-2" style={{ color: '#F4C430' }}>
                  💬 Managing Comments
                </h4>
                <p className="text-sm" style={{ color: 'rgba(20, 34, 28, 0.7)' }}>
                  Review and approve comments to maintain quality discussions.
                </p>
              </div>
              
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(11, 93, 30, 0.05)' }}>
                <h4 className="font-medium mb-2" style={{ color: '#0B5D1E' }}>
                  🌐 Site Settings
                </h4>
                <p className="text-sm" style={{ color: 'rgba(20, 34, 28, 0.7)' }}>
                  Update your about page and social media links in Settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface ActionCardProps {
  title: string;
  titleUr: string;
  description: string;
  href: string;
  icon: string;
  color: string;
  badge?: number;
}

function ActionCard({ title, titleUr, description, href, icon, color, badge }: ActionCardProps) {
  return (
    <a
      href={href}
      className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative"
    >
      {badge && (
        <div 
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ backgroundColor: '#dc3545' }}
        >
          {badge}
        </div>
      )}
      
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-3">{icon}</span>
        <div style={{ color }} className="text-lg font-semibold">
          <div className="font-playfair">{title}</div>
          <div className="font-urdu text-sm rtl" style={{ color: 'rgba(20, 34, 28, 0.7)' }}>
            {titleUr}
          </div>
        </div>
      </div>
      
      <p className="text-sm" style={{ color: 'rgba(20, 34, 28, 0.6)' }}>
        {description}
      </p>
    </a>
  );
}
