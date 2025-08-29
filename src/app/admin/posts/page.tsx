import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import { getPublishedPosts, prisma } from '@/lib/db';
import AdminHeader from '@/components/admin/AdminHeader';
import Link from 'next/link';

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

export default async function AdminPostsPage() {
  await checkAdminAuth();

  // Get all posts (published and unpublished)
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { comments: true }
      }
    }
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFBF8' }}>
      <AdminHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2" style={{ color: '#14221C' }}>
              Manage Posts
            </h1>
            <h2 className="font-urdu text-xl md:text-2xl rtl" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
              مضامین کا انتظام
            </h2>
          </div>
          
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white shadow-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#0B5D1E' }}
          >
            ✍️ New Post
          </Link>
        </div>

        {/* Posts List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">All Posts ({posts.length})</h3>
          </div>
          
          {posts.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-500 mb-6">Get started by creating your first blog post.</p>
              <Link
                href="/admin/posts/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white"
                style={{ backgroundColor: '#0B5D1E' }}
              >
                Create your first post
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {posts.map((post) => (
                <li key={post.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3">
                        <div className={`flex-shrink-0 w-3 h-3 rounded-full ${post.published ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-medium text-gray-900 truncate">
                            {post.titleEn}
                          </h4>
                          {post.titleUr && (
                            <p className="text-sm text-gray-500 rtl font-urdu">
                              {post.titleUr}
                            </p>
                          )}
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-500">
                              {post.published ? 'Published' : 'Draft'}
                            </span>
                            <span className="text-sm text-gray-500">
                              {post._count.comments} comments
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/posts/${post.slug}`}
                        target="_blank"
                        className="text-sm text-blue-600 hover:text-blue-500"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8">
          <Link
            href="/admin"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}

