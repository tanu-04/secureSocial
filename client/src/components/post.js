import VoteButton from "./VoteButton";
import SaveShareButton from "./SaveShareButton";
import Comment from "./Comment";

const Post = ({ post }) => {
  return (
    <div className="bg-objectBg text-white p-6 mb-6 rounded">
      <h3 className="text-xl">{post.title}</h3>
      <p>{post.content}</p>
      <div className="flex items-center space-x-4 mt-4">
        <VoteButton postId={post._id} />
        <SaveShareButton postId={post._id} />
      </div>
      <div className="mt-4">
        {post.comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Post;
