import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - DevToolkit',
  description:
    'Learn about developer tools, best practices, and tutorials for JWT decoding, regex testing, Base64 encoding, and more.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Nav */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <nav className="flex items-center gap-8 mb-6">
            <Link href="/" className="text-lg font-bold text-slate-900 hover:text-blue-600 transition">
              DevToolkit
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-slate-700 hover:text-blue-600 transition">
                Tools
              </Link>
              <Link href="/blog" className="text-slate-700 hover:text-blue-600 transition font-medium">
                Blog
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Tools</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <Link href="/" className="hover:text-blue-600 transition">
                    All Tools
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-blue-600 transition">
                    Utilities
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <Link href="/blog" className="hover:text-blue-600 transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/blog/jwt-decoder-guide" className="hover:text-blue-600 transition">
                    Guides
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">About</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <a href="https://github.com/tjaitly1986/devtoolkit" className="hover:text-blue-600 transition">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
            <p>© 2026 DevToolkit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
