import posts from "../data/posts.json";

export default function AnimePage({ post }: any) {
  const copy = (link: string) => {
    navigator.clipboard.writeText(link);
    alert("Link copied");
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <img src={post.poster} className="w-full rounded-lg mb-6" />

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

      <h2 className="text-xl font-semibold mb-3">Download Links</h2>

      {post.downloads.map((link: string, i: number) => (
        <button
          key={i}
          onClick={() => copy(link)}
          className="w-full bg-accent py-3 rounded-lg mb-3 hover:opacity-90"
        >
          Copy Link {i + 1}
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
