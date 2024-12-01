export default function HomePage() {
  return (
    <div className="container mx-auto p-6 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Chatty
      </h2>
      <p className="text-gray-600 text-lg">
        A modern social media app to connect with friends and share your
        thoughts.
      </p>
      <div className="mt-8">
        <a
          href="/posts"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md shadow hover:bg-blue-600 transition"
        >
          View Posts
        </a>
      </div>
    </div>
  );
}
