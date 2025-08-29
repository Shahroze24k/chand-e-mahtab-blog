'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TestEditPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/admin/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts || []);
        } else {
          setError(`Failed to fetch posts: ${response.status}`);
        }
      } catch (err) {
        setError(`Network error: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Edit Functionality</h1>
      
      <p className="mb-4">Available posts to test edit:</p>
      
      {posts.length === 0 ? (
        <div>
          <p>No posts found. Create a post first to test edit functionality.</p>
          <Link href="/admin/posts/new" className="text-blue-600 underline">
            Create New Post
          </Link>
        </div>
      ) : (
        <ul className="space-y-2">
          {posts.map((post: any) => (
            <li key={post.id} className="border p-4 rounded">
              <h3 className="font-semibold">{post.titleEn}</h3>
              <p className="text-sm text-gray-600">ID: {post.id}</p>
              <div className="mt-2 space-x-2">
                <Link 
                  href={`/admin/posts/${post.id}/edit`}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  Test Edit
                </Link>
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch(`/api/admin/posts/${post.id}`);
                      console.log('API Response Status:', response.status);
                      if (response.ok) {
                        const data = await response.json();
                        console.log('API Response Data:', data);
                        alert('API call successful! Check console for details.');
                      } else {
                        const error = await response.text();
                        console.log('API Error:', error);
                        alert(`API call failed: ${response.status}`);
                      }
                    } catch (err) {
                      console.error('Network error:', err);
                      alert('Network error occurred');
                    }
                  }}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                >
                  Test API
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      <div className="mt-8">
        <Link href="/admin/posts" className="text-blue-600 underline">
          Back to Posts
        </Link>
      </div>
    </div>
  );
}
