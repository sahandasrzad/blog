import { GET, POST } from '@/app/api/posts/route';
import connectMongoDB from '@/lib/mongodb';
import Post from '@/models/Post';

// Mock the database connection and Post model
jest.mock('@/lib/mongodb');
jest.mock('@/models/Post');

describe('API Route /api/posts', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
      });
      afterAll(() => {
        console.error.mockRestore();
      });  
  // Tests for GET
  describe('GET /api/posts', () => {
    it('should return all posts successfully', async () => {
      const mockPosts = [
        { title: 'Post 1', content: 'Content 1' },
        { title: 'Post 2', content: 'Content 2' },
      ];
      // Mock Post.find to resolve with mockPosts
      Post.find.mockResolvedValue(mockPosts);

      // Call the GET handler
      const response = await GET();
      
      // Assertions
      expect(connectMongoDB).toHaveBeenCalled();
      expect(Post.find).toHaveBeenCalledWith({});
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual(mockPosts);
    });

    it('should return 500 if there is an error retrieving posts', async () => {
      // Mock Post.find to reject with an error
      Post.find.mockRejectedValue(new Error('Database error'));

      // Call the GET handler
      const response = await GET();

      // Assertions
      expect(connectMongoDB).toHaveBeenCalled();
      expect(Post.find).toHaveBeenCalledWith({});
      expect(response.status).toBe(500);
      expect(await response.json()).toEqual({ error: 'Could not retrieve posts' });
    });
  });

  // Tests for POST
  describe('POST /api/posts', () => {
    it('should create and return a new post successfully', async () => {
      const mockPostData = { title: 'New Post', content: 'This is a new post.' };
      const mockPost = { ...mockPostData, _id: 'some-id' };

      // Mock Post.prototype.save to resolve with mockPost
      Post.prototype.save = jest.fn().mockResolvedValue(mockPost);

      // Mock the request object
      const req = {
        json: jest.fn().mockResolvedValue(mockPostData),
      };

      // Call the POST handler
      const response = await POST(req);

      // Assertions
      expect(connectMongoDB).toHaveBeenCalled();
      expect(req.json).toHaveBeenCalled();
      expect(Post.prototype.save).toHaveBeenCalled();
      expect(response.status).toBe(201);
    //   expect(await response.json()).toEqual(mockPost);
    });

    it('should return 400 if title or content is missing', async () => {
      const incompletePostData = { title: 'Incomplete Post' };

      // Mock the request object
      const req = {
        json: jest.fn().mockResolvedValue(incompletePostData),
      };

      // Call the POST handler
      const response = await POST(req);

      // Assertions
      expect(connectMongoDB).toHaveBeenCalled();
      expect(req.json).toHaveBeenCalled();
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ error: 'Title and content are required' });
    });

    it('should return 500 if there is an error creating a post', async () => {
      const mockPostData = { title: 'New Post', content: 'This is a new post.' };

      // Mock the request object
      const req = {
        json: jest.fn().mockResolvedValue(mockPostData),
      };

      // Mock Post.prototype.save to reject with an error
      Post.prototype.save = jest.fn().mockRejectedValue(new Error('Save error'));

      // Call the POST handler
      const response = await POST(req);

      // Assertions
      expect(connectMongoDB).toHaveBeenCalled();
      expect(req.json).toHaveBeenCalled();
      expect(Post.prototype.save).toHaveBeenCalled();
      expect(response.status).toBe(500);
      expect(await response.json()).toEqual({ error: 'Could not create post' });
    });
  });
});
