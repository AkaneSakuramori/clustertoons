import Link from "next/link";
import posts from "../data/posts.json";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Anime Vault</h1>

      <div className="grid md:grid-cols-4 gap-6">
        {posts.map((post: any) => (
          <Link key={post.slug} href={`/${post.slug}`}>
            <div className="bg-card rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer">
              <img src={post.poster} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-400">{post.quality}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
