import connectMongoDB from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET() {
  try {
    await connectMongoDB();
    const posts = await Post.find({});
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error('Error retrieving posts:', error);
    return new Response(JSON.stringify({ error: 'Could not retrieve posts' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectMongoDB();
    const data = await req.json();
    const post = new Post(data);

    // Validate data if needed (e.g., ensure title and content are provided)
    if (!data.title || !data.content) {
      return new Response(JSON.stringify({ error: 'Title and content are required' }), { status: 400 });
    }

    await post.save();
    return new Response(JSON.stringify(post), { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return new Response(JSON.stringify({ error: 'Could not create post' }), { status: 500 });
  }
}
