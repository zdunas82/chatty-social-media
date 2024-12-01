import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import "../styles/global.css";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-100 min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center p-4">
              <h1 className="text-3xl font-extrabold tracking-wide">Chatty</h1>
              <nav className="hidden md:flex space-x-6">
                <Link
                  href="/"
                  className="text-lg font-medium hover:text-indigo-200 transition"
                >
                  Home
                </Link>
                <Link
                  href="/posts"
                  className="text-lg font-medium hover:text-indigo-200 transition"
                >
                  Posts
                </Link>
                <Link
                  href="/user"
                  className="text-lg font-medium hover:text-indigo-200 transition"
                >
                  User
                </Link>
              </nav>
              <div>
                <SignedOut>
                  <SignInButton mode="modal" />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 container mx-auto p-6 bg-white shadow-md rounded-lg mt-4">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-gray-300 py-4">
            <div className="container mx-auto text-center text-sm">
              Made with ❤️ by Chatty Team &copy; {new Date().getFullYear()}
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
