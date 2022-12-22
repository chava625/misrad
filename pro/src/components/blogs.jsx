import axios from "axios";
import React, { Component } from "react";

class Blogs extends Component {
  state = { posts: [], commentsByPost: [], isOpen: false };
  componentDidMount = () => {
    axios("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log("posts", res.data);
        this.setState({ posts: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleClick = (id) => {
    !this.state.isOpen
      ? this.setState({ isOpen: true })
      : this.setState({ isOpen: false });
    console.log(this.state.isOpen);
    axios(`https://jsonplaceholder.typicode.com/comments/?postId=${id}`)
      .then((res) => {
        console.log("commets", res.data);
        this.setState({ commentsByPost: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { posts, commentsByPost, isOpen } = this.state;
    if (!posts) return [];
    if (!commentsByPost) return [];
    return (
      <>
        <h1 className="text-center text-success m-4">Blogs</h1>
        <div>
          <div className="posts p-3 d-flex m-4">
            <div>
            {posts.map((post) => {
              return (
                <div className="border border-success rounded m-2 p-2">
                  <p>{post.title}</p>
                  <p className="btn btn-danger btn-sm" onClick={() => this.handleClick(post.id)}>To See Commets</p>
                </div>
              );
            })}
            </div>
                <div className="comments">
                {isOpen &&
                  commentsByPost.map((comment) => {
                    return <p className="text-danger">{comment.name}</p>;
                  })}
              </div>
          </div>
        </div>
      </>
    );
  }
}

export default Blogs;
