import React from "react";
import {
  AllLatestblogsCard,
  FeaturedBlog,
  RecentBlogs,
} from "../../components";

// Main Blog Page Component
const BlogGrid = () => {
  const articles = [
    {
      id: 1,
      title: "7 common mistakes everyone makes while traveling",
      category: "History",
      createAt: "Joan Wallace",
      image:
        "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    },
    {
      id: 2,
      title:
        "Ten unconventional tips about startups that you can't learn from books",
      category: "Research",
      createAt: "Louis Crawford",
      image:
        "https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.jpg",
    },
    {
      id: 3,
      title: "Best Twitter accounts for learning about investment",
      category: "Business",
      createAt: "Carolyn Ortiz",
      image:
        "https://cdn.pixabay.com/photo/2021/11/13/23/06/tree-6792528_1280.jpg",
    },
    {
      id: 4,
      title: "10 things you need to know about Booking",
      category: "Technology",
      createAt: "Amanda Reed",
      image:
        "https://cdn.pixabay.com/photo/2021/11/13/23/06/tree-6792528_1280.jpg",
    },
    {
      id: 5,
      title: "Never underestimate the influence of social media",
      category: "Adventure",
      createAt: "Bryan Knight",
      image:
        "https://cdn.pixabay.com/photo/2021/11/13/23/06/tree-6792528_1280.jpg",
    },
    {
      id: 6,
      title: "This is why this year will be the year of startups",
      category: "Hotel Service",
      createAt: "Carolyn Ortiz",
      image:
        "https://cdn.pixabay.com/photo/2021/11/13/23/06/tree-6792528_1280.jpg",
    },
  ];
  return (
    <section className="min-h-screen  py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-white text-center mb-12">
          The Blog
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <FeaturedBlog />
          </div>
          <div className="md:col-span-1">
            <RecentBlogs />
          </div>
        </div>
      </div>
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Latest Article
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id}>
                <AllLatestblogsCard post={article} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
