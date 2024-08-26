// src/lib/postApi.js

// Fetch a single post by ID
export async function fetchPostById(postId) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
   const res = await fetch(`${baseUrl}/api/posts/${postId}`, { cache: 'no-store' });
    // const res = await fetch(`/api/posts/${postId}`, { cache: 'no-store' });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `Failed to fetch post with ID ${postId}`);
    }
    
    return res.json();
  }
  
  // Fetch all posts
  export async function fetchPosts() {
    const res = await fetch('/api/posts');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  }
  
  // Create a new post
  export async function createPost(data) {
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'خطا در ارسال نوشته');
      }
  
      return res.json(); // Return the response data
    } catch (error) {
      throw new Error(error.message || 'خطا در ارسال درخواست');
    }
  }
  
  // Update an existing post
  export async function updatePost(postId, data) {
    const res = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'خطا در ارسال نوشته');
    }
  
    return res.json(); 
  }
  
  // Delete a post
  export async function deletePost(postId) {
    
    const res = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'خطا در حذف نوشته');
    }
  }
  