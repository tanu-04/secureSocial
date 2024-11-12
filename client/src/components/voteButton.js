import { useState } from "react";
import axios from "axios";

const VoteButton = ({ postId }) => {
  const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 });

  const handleVote = async (type) => {
    try {
      await axios.post(`/api/posts/${postId}/${type}`);
      // Update the votes locally after vote
      setVotes((prev) => ({
        upvotes: type === "upvote" ? prev.upvotes + 1 : prev.upvotes,
        downvotes: type === "downvote" ? prev.downvotes + 1 : prev.downvotes,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => handleVote("upvote")}
        className="bg-green-600 p-2 rounded"
      >
        Upvote
      </button>
      <button
        onClick={() => handleVote("downvote")}
        className="bg-red-600 p-2 rounded"
      >
        Downvote
      </button>
      <p>
        Upvotes: {votes.upvotes} | Downvotes: {votes.downvotes}
      </p>
    </div>
  );
};

export default VoteButton;
