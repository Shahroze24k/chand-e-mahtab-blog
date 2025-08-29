import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import { prisma } from '@/lib/db';
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

export default async function AdminCommentsPage() {
  await checkAdminAuth();

  // Get all comments with post information
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      post: {
        select: {
          titleEn: true,
          slug: true
        }
      }
    }
  });

  const pendingComments = comments.filter(c => !c.approved);
  const approvedComments = comments.filter(c => c.approved);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFBF8' }}>
      <AdminHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2" style={{ color: '#14221C' }}>
            Manage Comments
          </h1>
          <h2 className="font-urdu text-xl md:text-2xl rtl" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
            تبصروں کا انتظام
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-sm font-medium">⏳</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{pendingComments.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-medium">✓</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{approvedComments.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">💬</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Comments</p>
                <p className="text-2xl font-bold text-gray-900">{comments.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Comments Section */}
        {pendingComments.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#14221C' }}>
              Pending Review ({pendingComments.length})
            </h3>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {pendingComments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} isPending={true} />
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* All Comments Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#14221C' }}>
            All Comments ({comments.length})
          </h3>
          
          {comments.length === 0 ? (
            <div className="bg-white shadow rounded-lg px-6 py-12 text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
              <p className="text-gray-500">Comments will appear here as readers engage with your posts.</p>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} isPending={false} />
                ))}
              </ul>
            </div>
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

function CommentItem({ comment, isPending }: { comment: any; isPending: boolean }) {
  return (
    <li className={`px-6 py-4 ${isPending ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`flex-shrink-0 w-3 h-3 rounded-full ${comment.approved ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
            <div>
              <p className="text-sm font-medium text-gray-900">{comment.name}</p>
              {comment.email && (
                <p className="text-sm text-gray-500">{comment.email}</p>
              )}
            </div>
          </div>
          
          <p className="text-gray-700 mb-2">{comment.content}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>On: {comment.post.titleEn}</span>
            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${comment.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {comment.approved ? 'Approved' : 'Pending'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Link
            href={`/posts/${comment.post.slug}#comment-${comment.id}`}
            target="_blank"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            View
          </Link>
          
          {!comment.approved && (
            <form action={`/api/admin/comments/${comment.id}/approve`} method="POST" className="inline">
              <button
                type="submit"
                className="text-sm text-green-600 hover:text-green-500"
              >
                Approve
              </button>
            </form>
          )}
          
          <form action={`/api/admin/comments/${comment.id}/delete`} method="POST" className="inline">
            <button
              type="submit"
              className="text-sm text-red-600 hover:text-red-500"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </li>
  );
}
