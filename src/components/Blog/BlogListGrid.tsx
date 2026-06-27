import { Link } from "react-router-dom";

export const BlogListGrid = () => {
  const posts = Array(8).fill({
    title: "Docker bilan ishlashning 5 ta yaxshi amaliyoti",
    category: "DevOps",
    date: "22-aprel",
    author: "Jasur Mahmudov",
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
      {/* CHAP TOMON: Maqolalar */}
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>

              {/* Kategoriya va Sana */}
              <div className="flex justify-between text-xs text-blue-600 font-bold mb-2">
                <span className="bg-blue-50 px-2 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-gray-400 font-normal flex items-center gap-1">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  {post.date}
                </span>
              </div>

              {/* Sarlavha */}
              <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 leading-snug">
                {post.title}
              </h3>

             
              <div className="flex items-center text-xs text-gray-500 mb-4 gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                  {/* Bu yerga muallif rasmi yuklanadi */}
                </div>
                <span className="font-semibold text-gray-900">
                  {post.author}
                </span>
                <span className="text-gray-400">•</span>
                <span>{post.date}</span>
                <span className="text-gray-400">•</span>
                <span>{post.readTime}</span>
              </div>

              {/* O'qish tugmasi */}
              <Link
                to="/blog/1"
                className="text-blue-600 text-xs font-bold hover:underline"
              >
                O'qish →
              </Link>
            </div>
          ))}
        </div>

        {/* PAGINATION: Mana shu joyiga qoydik */}
        <div className="flex justify-center items-center mt-12 gap-2">
          <button className="px-4 py-2 border rounded-md hover:bg-gray-100 text-sm text-gray-600">
            &lt;
          </button>
          <button className="px-4 py-2 border rounded-md bg-blue-600 text-white text-sm">
            1
          </button>
          <button className="px-4 py-2 border rounded-md hover:bg-gray-100 text-sm text-gray-600">
            2
          </button>
          <button className="px-4 py-2 border rounded-md hover:bg-gray-100 text-sm text-gray-600">
            3
          </button>
          <span className="px-2 text-gray-500">...</span>
          <button className="px-4 py-2 border rounded-md hover:bg-gray-100 text-sm text-gray-600">
            7
          </button>
          <button className="px-4 py-2 border rounded-md hover:bg-gray-100 text-sm text-gray-600">
            &gt;
          </button>
        </div>
      </div>

      {/* O'NG TOMON: Sidebar */}
      <div className="lg:col-span-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-4">KATEGORIYALAR</h4>
          <div className="space-y-3 text-sm text-gray-600">
            {[
              "Frontend",
              "Backend",
              "Dizayn",
              "Mobil",
              "Data Science",
              "Marketing",
              "DevOps",
              "Karyera",
            ].map((cat) => (
              <div
                key={cat}
                className="flex justify-between hover:text-blue-600 cursor-pointer"
              >
                <span>{cat}</span>
                <span className="text-gray-400">14</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-4">MASHHUR MAQOLALAR</h4>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-3 items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div>
                  <p className="text-xs font-semibold text-gray-900 leading-snug">
                    JavaScript-da 5 ta keng tarqalgan xato
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">1.2k o'qildi</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-4">MASHHUR TEGLAR</h4>
          <div className="flex flex-wrap gap-2">
            {[
              "JavaScript",
              "React",
              "CSS",
              "Python",
              "Figma",
              "HTML",
              "Flutter",
              "Karyera",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-50 text-xs font-medium text-gray-600 rounded-md hover:bg-gray-100 cursor-pointer transition"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
