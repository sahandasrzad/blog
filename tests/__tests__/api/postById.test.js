import { GET, PUT, DELETE } from '@/app/api/posts/[id]/route';
import connectMongoDB from '@/lib/mongodb';
import Post from '@/models/Post';

jest.mock('@/lib/mongodb');
jest.mock('@/models/Post');

describe('API Route /api/posts/[id]', () => {

  // Tests for GET
  describe('GET /api/posts/[id]', () => {
    it('should return a post when found', async () => {
      const mockPost = { title: 'Test Post', content: 'This is a test post.' };
      Post.findById.mockResolvedValue(mockPost);

      const req = {};  // Mock request object
      const params = { id: 'valid-id' };

      const response = await GET(req, { params });

      expect(connectMongoDB).toHaveBeenCalled();
      expect(Post.findById).toHaveBeenCalledWith(params.id);
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual(mockPost);
      expect(response.headers.get('Cache-Control')).toBe('no-store');
    });

    it('should return 404 when post is not found', async () => {
      Post.findById.mockResolvedValue(null);

      const req = {};
      const params = { id: 'invalid-id' };

      const response = await GET(req, { params });

      expect(connectMongoDB).toHaveBeenCalled();
      expect(Post.findById).toHaveBeenCalledWith(params.id);
      expect(response.status).toBe(404);
      expect(await response.text()).toBe('Not Found');
    });
  });

  // Tests for PUT
  describe('PUT /api/posts/[id]', () => {
    it('should update and return the post when found', async () => {
      const mockPost = { title: 'Updated Post', content: 'This post has been updated.' };
      Post.findByIdAndUpdate.mockResolvedValue(mockPost);

      const req = {
        json: jest.fn().mockResolvedValue({ title: 'Updated Post', content: 'This post has been updated.' })
      };  // Mock request object
      const params = { id: 'valid-id' };

      const response = await PUT(req, { params });

      expect(connectMongoDB).toHaveBeenCalled();
      expect(Post.findByIdAndUpdate).toHaveBeenCalledWith(params.id, { title: 'Updated Post', content: 'This post has been updated.' }, { new: true });
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual(mockPost);
    });

    it('should handle errors during update', async () => {
      Post.findByIdAndUpdate.mockRejectedValue(new Error('Update failed'));

      const req = {
        json: jest.fn().mockResolvedValue({ title: 'Updated Post', content: 'This post has been updated.' })
      };
      const params = { id: 'valid-id' };

      try {
        await PUT(req, { params });
      } catch (error) {
        expect(connectMongoDB).toHaveBeenCalled();
        expect(Post.findByIdAndUpdate).toHaveBeenCalledWith(params.id, { title: 'Updated Post', content: 'This post has been updated.' }, { new: true });
        expect(error.message).toBe('Update failed');
      }
    });
  });

  // Tests for DELETE
  describe('DELETE /api/posts/[id]', () => {
    it('should delete the post when found', async () => {
      Post.findByIdAndDelete.mockResolvedValue({});

      const req = {};  // Mock request object
      const params = { id: 'valid-id' };

      const response = await DELETE(req, { params });

      expect(connectMongoDB).toHaveBeenCalled();
      expect(Post.findByIdAndDelete).toHaveBeenCalledWith(params.id);
      expect(response.status).toBe(204);
      expect(response.body).toBeNull();
    });

    it('should handle errors during deletion', async () => {
      Post.findByIdAndDelete.mockRejectedValue(new Error('Delete failed'));

      const req = {};
      const params = { id: 'valid-id' };

      try {
        await DELETE(req, { params });
      } catch (error) {
        expect(connectMongoDB).toHaveBeenCalled();
        expect(Post.findByIdAndDelete).toHaveBeenCalledWith(params.id);
        expect(error.message).toBe('Delete failed');
      }
    });
  });
});
