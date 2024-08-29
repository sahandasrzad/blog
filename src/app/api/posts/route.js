import { connectMongoDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { logError } from '@/lib/logger';

// Handle GET request to fetch all posts
export async function GET(req) {
  try {
    await connectMongoDB();
    const posts = await Post.find({});
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    logError(500, error, req.url);
    console.error('Error retrieving posts:', error);
    return new Response(JSON.stringify({ error: 'Could not retrieve posts' }), { status: 500 });
  }
}

// Handle POST request to create a new post
export async function POST(req) {
  try {
    const data = await req.json();
    if (!data.title || !data.content) {
      logError(400, new Error('Title and content are required'), req.url);
      return new Response(JSON.stringify({ error: 'Title and content are required' }), { status: 400 });
    }

    await connectMongoDB();
    const post = new Post(data);
    await post.save();
    return new Response(JSON.stringify(post), { status: 201 });
  } catch (error) {
    logError(500, error, req.url);
    console.error('Error creating post:', error);
    return new Response(JSON.stringify({ error: 'Could not create post' }), { status: 500 });
  }
}
