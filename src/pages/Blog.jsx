import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import {
  Card,
  CardBody,
  CardTitle,
  CardActions,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { Fade } from "@progress/kendo-react-animation";
import { Chip } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";

const defaultPosts = [
  {
    title: "Building Scalable React Applications",
    excerpt:
      "Learn the best practices and patterns for creating maintainable React applications that scale.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Development",
  },
  {
    title: "The Future of Web Development",
    excerpt:
      "Exploring upcoming trends and technologies that will shape the future of web development.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "March 10, 2024",
    readTime: "6 min read",
    category: "Technology",
  },
  {
    title: "Mastering TypeScript",
    excerpt:
      "A comprehensive guide to using TypeScript effectively in your projects.",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "March 5, 2024",
    readTime: "10 min read",
    category: "Tutorial",
  },
];

const Blog = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [posts, setPosts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    image: "",
    date: "",
    readTime: "",
    category: "",
  });

  const categories = [
    "Development",
    "Technology",
    "Tutorial",
    "Design",
    "Business",
  ];

  useEffect(() => {
    try {
      const storedPosts = localStorage.getItem("blogPosts");

      if (storedPosts && JSON.parse(storedPosts).length > 0) {
        setPosts(JSON.parse(storedPosts));
      } else {
        setPosts(defaultPosts);
        localStorage.setItem("blogPosts", JSON.stringify(defaultPosts));
      }
    } catch (error) {
      console.error("Error loading posts from localStorage:", error);
      setPosts(defaultPosts);
      localStorage.setItem("blogPosts", JSON.stringify(defaultPosts));
    }
  }, []);

  useEffect(() => {
    if (posts && posts.length > 0) {
      try {
        localStorage.setItem("blogPosts", JSON.stringify(posts));
      } catch (error) {
        console.error("Error saving posts to localStorage:", error);
      }
    }
  }, [posts]);

  const openAddDialog = () => {
    setEditIndex(null);
    setFormData({
      title: "",
      excerpt: "",
      image: "",
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      readTime: "5 min read",
      category: "Development",
    });
    setDialogOpen(true);
  };

  const openEditDialog = (index) => {
    setEditIndex(index);
    setFormData({ ...posts[index] });
    setDialogOpen(true);
  };

  const confirmDelete = (index) => {
    setDeleteIndex(index);
    setConfirmDialogOpen(true);
  };

  const handleDelete = () => {
    const updatedPosts = [...posts];
    updatedPosts.splice(deleteIndex, 1);
    setPosts(updatedPosts);
    setConfirmDialogOpen(false);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.excerpt) {
      alert("Title and excerpt are required!");
      return;
    }

    if (!formData.image) {
      alert("Image URL is required!");
      return;
    }

    const updatedPosts = [...posts];

    if (editIndex !== null) {
      updatedPosts[editIndex] = formData;
    } else {
      updatedPosts.push(formData);
    }

    setPosts(updatedPosts);
    setDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  return (
    <section id="blog" className="blog-section">
      <div className="container mx-auto px-4">
        <div ref={ref} className="max-w-6xl mx-auto">
          <div className="blog-header">
            <div className="flex justify-between items-center mb-6">
              <h2 className="blog-title">Latest Articles</h2>
              <Button
                className="add-blog-button"
                onClick={openAddDialog}
              >
                Add New Post
              </Button>
            </div>
          </div>

          <div className="blog-grid">
            {posts && posts.length > 0 ? (
              posts.map((post, index) => (
                <Fade key={index} enter={inView} transitionEnterDuration={300}>
                  <Card className="blog-card">
                    <div className="blog-image">
                      <img src={post.image} alt={post.title} />
                      <div className="blog-chip">
                        <Chip text={post.category} className="chip-style" />
                      </div>
                    </div>

                    <CardBody className="p-5 flex flex-col">
                      <div className="blog-meta">
                        <Calendar className="icon" /> {post.date} &nbsp;
                        <Clock className="icon" /> {post.readTime}
                      </div>

                      <CardTitle className="blog-card-title">
                        {post.title}
                      </CardTitle>
                      <p className="blog-excerpt">{post.excerpt}</p>

                      <CardActions className="mt-auto flex justify-between">
                        <Button className="blog-read-more">
                          Read more{" "}
                          <span className="ml-1 font-bold text-lg">&rarr;</span>
                        </Button>

                        <div className="flex">
                          <Button
                            icon="k-icon k-i-pencil"
                            className="edit-button mr-2"
                            onClick={() => openEditDialog(index)}
                          />
                          <Button
                            icon="k-icon k-i-trash"
                            className="delete-button"
                            onClick={() => confirmDelete(index)}
                          />
                        </div>
                      </CardActions>
                    </CardBody>
                  </Card>
                </Fade>
              ))
            ) : (
              <div className="no-posts-message">
                <p>No blog posts found. Create your first post!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      {dialogOpen && (
        <Dialog
          title={editIndex !== null ? "Edit Blog Post" : "Add New Blog Post"}
          onClose={() => setDialogOpen(false)}
          width={500}
        >
          <div className="p-4">
            <div className="mb-4">
              <label className="block mb-2">Title*</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Excerpt*</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows={3}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Image URL*</label>
              <Input
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full"
                required
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Date</label>
              <Input
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                placeholder="e.g., March 24, 2025"
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Read Time</label>
              <Input
                name="readTime"
                value={formData.readTime}
                onChange={handleInputChange}
                placeholder="e.g., 8 min read"
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Category</label>
              <DropDownList
                data={categories}
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full"
              />
            </div>
            <p className="text-sm text-gray-600">* Required fields</p>
          </div>

          <DialogActionsBar>
            <Button
              onClick={() => setDialogOpen(false)}
              className="cancel-button"
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="submit-button primary">
              {editIndex !== null ? "Update" : "Add"} Post
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}

      {/* Confirm Delete Dialog */}
      {confirmDialogOpen && (
        <Dialog
          title="Confirm Delete"
          onClose={() => setConfirmDialogOpen(false)}
          width={400}
        >
          <p className="p-4">Are you sure you want to delete this blog post?</p>
          <DialogActionsBar>
            <Button
              onClick={() => setConfirmDialogOpen(false)}
              className="cancel-button"
            >
              Cancel
            </Button>
            <Button onClick={handleDelete} className="delete-button danger">
              Delete
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </section>
  );
};

export default Blog;
