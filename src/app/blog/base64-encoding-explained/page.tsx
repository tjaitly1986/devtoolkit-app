import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Base64 Encoding Explained — When and How to Use It - DevToolkit Blog',
  description:
    'Understand Base64 encoding, its use cases, and when to use it in your projects. Complete guide with examples.',
  openGraph: {
    type: 'article',
    title: 'Base64 Encoding Explained — When and How to Use It',
    description:
      'Understand Base64 encoding, its use cases, and when to use it.',
    url: 'https://devtoolskitapp.vercel.app/blog/base64-encoding-explained',
  },
};

export default function Base64EncodingGuide() {
  return (
    <article className="prose prose-lg max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'Base64 Encoding Explained — When and How to Use It',
            image: 'https://devtoolskitapp.vercel.app/og-image.png',
            datePublished: '2026-04-07',
            dateModified: '2026-04-07',
            author: {
              '@type': 'Organization',
              name: 'DevToolkit',
              url: 'https://devtoolskitapp.vercel.app',
            },
            description: 'Complete guide to Base64 encoding.',
          }),
        }}
      />

      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Base64 Encoding Explained — When and How to Use It
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
          <span>April 7, 2026</span>
          <span>•</span>
          <span>6 min read</span>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
        <p className="text-gray-700 mb-4">
          Base64 is one of the most commonly used encoding schemes in web
          development and data transmission. Whether you're working with file
          uploads, data URIs, authentication tokens, or APIs, understanding Base64
          encoding is essential.
        </p>
        <p className="text-gray-700 mb-4">
          In this guide, we'll explore what Base64 is, why it exists, when you
          should use it, and how to work with it in your projects.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What is Base64 Encoding?
        </h2>
        <p className="text-gray-700 mb-4">
          Base64 is a binary-to-text encoding scheme that represents binary data in
          an ASCII string format. It uses 64 printable ASCII characters to represent
          any binary data, making it safe for transmission across systems that may
          not handle binary data well.
        </p>
        <p className="text-gray-700 mb-4">
          The name "Base64" comes from the fact that the encoding uses 64 different
          characters: A-Z (26), a-z (26), 0-9 (10), and two additional characters
          (typically + and /, with = used for padding).
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">How It Works</h3>
        <p className="text-gray-700 mb-4">
          Base64 works by taking 3 bytes (24 bits) of binary data and converting
          them into 4 Base64 characters (6 bits each). Here's the process:
        </p>
        <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">
          <li>Take 24 bits (3 bytes) of binary data</li>
          <li>Split them into 4 groups of 6 bits</li>
          <li>Convert each 6-bit group to its Base64 character equivalent</li>
          <li>
            Add padding with "=" characters if the input length isn't divisible by 3
          </li>
        </ol>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Example</h3>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm">
          <code className="text-gray-900">
            {`Original text: "Hello"
Binary: 01001000 01100101 01101100 01101100 01101111
Base64: SGVsbG8=`}
          </code>
        </pre>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          When Should You Use Base64?
        </h2>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Email Attachments</h3>
        <p className="text-gray-700 mb-4">
          MIME (Multipurpose Internet Mail Extensions) uses Base64 to encode binary
          attachments in emails because SMTP was originally designed for text-only
          messages.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Data URIs</h3>
        <p className="text-gray-700 mb-4">
          Embedding images or other binary data directly in HTML or CSS as data URIs
          requires Base64 encoding. This allows you to avoid additional HTTP
          requests:
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm">
          <code className="text-gray-900">{`<img src="data:image/png;base64,iVBORw0KGgo...SUVORK5CYII=" />`}</code>
        </pre>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Basic Authentication
        </h3>
        <p className="text-gray-700 mb-4">
          HTTP Basic Authentication encodes username and password in Base64 format.
          For example, "user:password" becomes "dXNlcjpwYXNzd29yZA==".
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">API Data Transmission</h3>
        <p className="text-gray-700 mb-4">
          When sending binary data through JSON APIs, Base64 encoding is often used
          since JSON is text-based. However, be aware this increases the payload size
          by approximately 33%.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">JWT Tokens</h3>
        <p className="text-gray-700 mb-4">
          JSON Web Tokens use Base64URL encoding (a variant of Base64) to encode
          their header and payload components.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Base64 vs. Encryption
        </h2>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Important: Base64 is NOT Encryption
        </h3>
        <p className="text-gray-700 mb-4">
          A common misconception is that Base64 provides security through encoding.
          It doesn't. Base64 is easily reversible and provides no security
          whatsoever. Anyone can decode a Base64 string back to its original form.
        </p>
        <p className="text-gray-700 mb-4">
          Base64 is purely for data encoding and transmission, not for security. If
          you need to protect sensitive data, use proper encryption algorithms like
          AES, RSA, or modern cryptographic libraries.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">When You See</h3>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm">
          <code className="text-gray-900">{`Authorization: Basic dXNlcjpwYXNzd29yZA==`}</code>
        </pre>
        <p className="text-gray-700 mb-4">
          Always use HTTPS! The "Basic" authentication method transmits credentials
          in Base64, which is easily decoded. Without HTTPS, anyone can intercept
          these credentials.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Working with Base64 in Code
        </h2>

        <h3 className="text-xl font-bold text-gray-900 mb-3">JavaScript</h3>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm">
          <code className="text-gray-900">{`// Encoding
const encoded = btoa('Hello World');
console.log(encoded); // "SGVsbG8gV29ybGQ="

// Decoding
const decoded = atob('SGVsbG8gV29ybGQ=');
console.log(decoded); // "Hello World"`}</code>
        </pre>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Python</h3>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm">
          <code className="text-gray-900">{`import base64

# Encoding
encoded = base64.b64encode(b'Hello World')
print(encoded)  # b'SGVsbG8gV29ybGQ='

# Decoding
decoded = base64.b64decode(b'SGVsbG8gV29ybGQ=')
print(decoded)  # b'Hello World'`}</code>
        </pre>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Command Line</h3>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm">
          <code className="text-gray-900">{`# Encoding
echo -n "Hello World" | base64
# Output: SGVsbG8gV29ybGQ=

# Decoding
echo "SGVsbG8gV29ybGQ=" | base64 -d
# Output: Hello World`}</code>
        </pre>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Using the Base64 Encode/Decode Tool
        </h2>

        <p className="text-gray-700 mb-4">
          The Base64 tool at DevToolkit makes encoding and decoding easy:
        </p>

        <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">
          <li>Paste your text or Base64 string into the input field</li>
          <li>Select Encode to convert text to Base64</li>
          <li>Select Decode to convert Base64 back to text</li>
          <li>The tool automatically detects if input looks like Base64</li>
          <li>Copy the result with one click</li>
        </ol>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          File Mode Support
        </h3>
        <p className="text-gray-700 mb-4">
          You can also encode files directly using the Base64 tool, making it easy
          to create data URIs for images or convert binary files for API
          transmission.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Use Cases
        </h2>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Embedding SVG in CSS
        </h3>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm">
          <code className="text-gray-900">{`.background {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0...');
}`}</code>
        </pre>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          API Request with Binary Data
        </h3>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm">
          <code className="text-gray-900">{`{
  "image": "data:image/png;base64,iVBORw0KGgo...",
  "format": "base64"
}`}</code>
        </pre>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Configuration Files
        </h3>
        <p className="text-gray-700 mb-4">
          Sometimes Base64 is used in configuration files or Docker images to encode
          sensitive data or binary configurations.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Performance Considerations
        </h2>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Size Increase</h3>
        <p className="text-gray-700 mb-4">
          Base64 encoding increases data size by approximately 33%. This is because
          3 bytes (24 bits) of binary data become 4 Base64 characters. Consider this
          when deciding whether to use Base64, especially for large files or images.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Alternatives to Consider
        </h3>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
          <li>
            <strong>For images:</strong> Serve images as separate files with separate
            HTTP requests
          </li>
          <li>
            <strong>For APIs:</strong> Use multipart/form-data for file uploads
          </li>
          <li>
            <strong>For authentication:</strong> Use tokens (JWT) instead of Basic
            Auth
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
        <p className="text-gray-700 mb-4">
          Base64 encoding is a fundamental technology that every developer should
          understand. While it's not encryption and doesn't provide security, it
          solves the important problem of transmitting binary data through text-based
          systems.
        </p>
        <p className="text-gray-700 mb-4">
          Remember: use HTTPS when transmitting Base64-encoded sensitive data, and
          always use proper encryption if you need security. For quick encoding and
          decoding tasks, the Base64 tool at DevToolkit provides a convenient
          client-side solution.
        </p>
        <p className="text-gray-700">
          With this understanding, you're ready to work with Base64 confidently in
          your projects. Happy encoding!
        </p>
      </section>
    </article>
  );
}
