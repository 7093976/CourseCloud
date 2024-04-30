// DiscussionPost.js
import React from "react";
import "./DiscussionPost.css";

function DiscussionPost({ post }) {
  return (
    <div className="discussion-post">
      <p>{new Date(post.createdAt).toLocaleString()}</p>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Posted by: {post.user.email}</p>
      {/* Add comment and reaction components if needed */}
    </div>
  );
}

export default DiscussionPost;
