
import Post from '@/models/Post';
import { logError } from '@/lib/logger';
export async function GET(req, { params }) {
  try {
    const post = await Post.findById(params.id); // Find the post by ID

    if (!post) {
      logError(404, new Error('Post not found'), req.url);
      return new Response('Not Found', { status: 404 });
    }

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    logError(500, error, req.url);
    console.error('Error fetching post:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json(); // Parse the request body
    const updatedPost = await Post.findByIdAndUpdate(params.id, data, { new: true }); // Update the post

    if (!updatedPost) {
      logError(404, new Error('Post not found'), req.url);
      return new Response('Not Found', { status: 404 });
    }

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    logError(500, error, req.url);
    console.error('Error updating post:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const deletedPost = await Post.findByIdAndDelete(params.id); // Delete the post

    if (!deletedPost) {
      logError(404, new Error('Post not found'), req.url);
      return new Response('Not Found', { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    logError(500, error, req.url);
    console.error('Error deleting post:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
