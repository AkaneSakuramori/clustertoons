import posts from "../data/posts.json";

export default function AnimePage({ post }: any) {
  if (!post) return <h1>Not Found</h1>;

  // 🔹 Build ALL links text (NO objects)
  const allLinksText = post.downloads
    .map((d: any) => `${d.episode} → ${d.url}`)
    .join("\n");

  return (
    <main className="max-w-4xl mx-auto p-6">
      <img
        src={post.poster}
        alt={post.title}
        className="w-full rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">
        {post.title} [{post.year}]
      </h1>

      <div className="bg-card p-4 rounded-lg mb-6">
        <p><b>Episodes:</b> {post.episodes}</p>
        <p><b>Quality:</b> {post.quality}</p>
        <p><b>Audio:</b> {post.audio}</p>
        <p><b>Subs:</b> {post.subs}</p>
        <p><b>Encoder:</b> {post.encoder}</p>
        <p><b>Type:</b> {post.status}</p>
      </div>

      {/* 🔥 COPY ALL LINKS PANEL */}
      <h2 className="text-xl font-semibold mb-3">All Download Links</h2>

      <div className="bg-card rounded-lg p-4 mb-6">
        <textarea
          readOnly
          value={allLinksText}
          className="w-full h-64 bg-black text-green-400 text-sm font-mono p-3 rounded resize-none"
        />

        <button
          onClick={() => navigator.clipboard.writeText(allLinksText)}
          className="mt-3 w-full bg-accent py-3 rounded-lg hover:opacity-90"
        >
          Copy All Links
        </button>
      </div>

      {/* OPTIONAL: Individual episode buttons */}
      <h2 className="text-xl font-semibold mb-3">Episode-wise Copy</h2>

      {post.downloads.map((d: any) => (
        <button
          key={d.episode}
          onClick={() => navigator.clipboard.writeText(d.url)}
          className="w-full bg-gray-800 py-3 rounded-lg mb-2 hover:bg-gray-700"
        >
          Copy {d.episode}
        </button>
      ))}
    </main>
  );
}

export async function getStaticPaths() {
  return {
    paths: posts.map((p: any) => ({ params: { slug: p.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }: any) {
  const post = posts.find((p: any) => p.slug === params.slug);
  return { props: { post } };
}
