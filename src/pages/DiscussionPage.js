import React, { useState, useEffect } from "react";
import { DiscussionService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./DiscussionPage.css";
import { useNavigate } from "react-router-dom";

// Component definition
const DiscussionPage = () => {
  // Authentication context
  const { state } = useAuth();
  const navigate = useNavigate();

  // State variables
  const [discussionPosts, setDiscussionPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  // Fetch discussion posts on component mount
  useEffect(() => {
    fetchDiscussionPosts();
  }, []);

  // Function to fetch discussion posts
  const fetchDiscussionPosts = async () => {
    try {
      const response = await DiscussionService.getAllDiscussionPosts();
      setDiscussionPosts(response || []);
    } catch (error) {
      console.error("Error fetching discussion posts:", error);
    }
  };

  // Handle form submission to create a new discussion post
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const postDataWithUID = { ...newPost, uid: state.user.uid };
      await DiscussionService.createDiscussionPost(
        postDataWithUID,
        state.user.uid
      ); // Pass uid
      fetchDiscussionPosts();
      setNewPost({ title: "", content: "" });
    } catch (error) {
      console.error("Error creating discussion post:", error);
    }
  };

  // Handle input change for new post form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPost({ ...newPost, [name]: value });
  };

  // Check if user is authenticated, redirect to login if not
  if (!state.isAuthenticated) {
    navigate("/"); // Redirect to login page
    // Or display a message
    return <p>Please log in to view this page</p>;
  }

  // JSX return
  return (
    <div className="discussion-page">
      <div className="discussion-page__posts-container">
        <h2 className="discussion-page__title">Discussion Page</h2>
        {discussionPosts.length === 0 ? (
          <p className="discussion-page__no-posts">
            No discussion posts available
          </p>
        ) : (
          <ul className="discussion-page__post-list">
            {discussionPosts.map((post) => (
              <li key={post.id} className="discussion-page__post">
                <h3 className="discussion-page__post-title">{post.title}</h3>
                <p className="discussion-page__post-content">{post.content}</p>
                <p className="discussion-page__post-author">
                  Posted by: {post.user.firstName} {post.user.lastName}
                </p>
                <p className="discussion-page__post-time">
                  Posted at: {new Date(post.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="discussion-page__add-post-container">
        <form className="discussion-page__form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="discussion-page__form-input"
          />
          <textarea
            name="content"
            value={newPost.content}
            onChange={handleChange}
            placeholder="Content"
            required
            className="discussion-page__form-textarea"
          />
          <button type="submit" className="discussion-page__form-button">
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiscussionPage;
