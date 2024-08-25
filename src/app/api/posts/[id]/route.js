import connectMongoDB from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET(req, { params }) {
  try {
    await connectMongoDB(); // Connect to the database
    const post = await Post.findById(params.id); // Find the post by ID
    
    // Return the post or a 404 response if not found
    return post
      ? new Response(JSON.stringify(post), {
          status: 200,
          headers: {
            'Cache-Control': 'no-store',
          },
        })
      : new Response('Not Found', { status: 404 });
  } catch (error) {
    console.error('Error fetching post:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectMongoDB(); // Connect to the database
    const data = await req.json(); // Parse the request body

    const updatedPost = await Post.findByIdAndUpdate(params.id, data, { new: true }); // Update the post

    // Return the updated post or a 404 response if not found
    return updatedPost
      ? new Response(JSON.stringify(updatedPost), { status: 200 })
      : new Response('Not Found', { status: 404 });
  } catch (error) {
    console.error('Error updating post:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectMongoDB(); // Connect to the database
    const deletedPost = await Post.findByIdAndDelete(params.id); // Delete the post

    // Return a 204 response if deletion is successful or a 404 response if not found
    return deletedPost
      ? new Response(null, { status: 204 })
      : new Response('Not Found', { status: 404 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
