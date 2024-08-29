
import Post from '@/models/Post';
import { logError } from '@/lib/logger';
export async function GET() {
  try {
    const posts = await Post.find({});
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    logError(500, error, req.url);
    console.error('Error retrieving posts:', error);
    return new Response(JSON.stringify({ error: 'Could not retrieve posts' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const post = new Post(data);
    if (!data.title || !data.content) {
      logError(400, new Error('Title and content are required'), req.url);
      return new Response(JSON.stringify({ error: 'Title and content are required' }), { status: 400 });
    }

    await post.save();
    return new Response(JSON.stringify(post), { status: 201 });
  } catch (error) {
    logError(500, error, req.url);
    console.error('Error creating post:', error);
    return new Response(JSON.stringify({ error: 'Could not create post' }), { status: 500 });
  }
}
