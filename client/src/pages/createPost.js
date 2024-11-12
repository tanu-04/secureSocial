import { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    try {
      const result = await axios.post(
        "http://localhost:8080/api/posts/createPost",
        {
          title,
          author,
          tags,
          content,
        }
      );
      if (result) alert("Post created!");
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  return (
    <div className="bg-objectBg text-white p-6 rounded">
      <h2 className="text-2xl mb-4">Create New Post</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full bg-background text-white p-2 rounded mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        className="w-full bg-background text-white p-2 rounded mb-4"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="w-full bg-background text-white p-2 rounded mb-4"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <textarea
        placeholder="Content"
        className="w-full bg-background text-white p-2 rounded mb-4"
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};
export default CreatePost;
