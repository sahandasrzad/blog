import UpdatePost from '@/components/UpdatePost';
import { fetchPostById } from '@/lib/postApi'
export default async function Page({ params }) {
  const post = await fetchPostById(params.id)
  return (
    <div>
      <UpdatePost post={post} />
    </div>
  );
}