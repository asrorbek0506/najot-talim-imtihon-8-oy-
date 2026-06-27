import { BlogHeader } from "../components/Blog/BlogHeader";
import { FeaturedPost } from "../components/Blog/FeaturedPost";
import { BlogListGrid } from "../components/Blog/BlogListGrid";

export const Blog = () => {
  return (
    <div className="bg-[#f9fafb] min-h-screen">
      {/* 1. Header qismi: Breadcrumb va sarlavha */}
      <BlogHeader />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 2. Eng tepadagi katta asosiy maqola */}
        <FeaturedPost />
        
        {/* 3. Ikki bo'lakli qism: Chapda Maqolalar, O'ngda Sidebar */}
        <div className="mt-8">
          <BlogListGrid />
        </div>
      </div>
    </div>
  );
};