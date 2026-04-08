import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Decode and Debug JWT Tokens Online - DevToolkit Blog',
  description:
    'Learn how to safely decode and understand JWT tokens without exposing your secrets. Comprehensive guide with practical examples.',
  openGraph: {
    type: 'article',
    title: 'How to Decode and Debug JWT Tokens Online',
    description:
      'Learn how to safely decode and understand JWT tokens without exposing your secrets.',
    url: 'https://devtoolskitapp.vercel.app/blog/jwt-decoder-guide',
  },
};

export default function JWTDecoderGuide() {
  return (
    <article className="prose prose-lg max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'How to Decode and Debug JWT Tokens Online',
            image: 'https://devtoolskitapp.vercel.app/og-image.png',
            datePublished: '2026-04-07',
            dateModified: '2026-04-07',
            author: {
              '@type': 'Organization',
              name: 'DevToolkit',
              url: 'https://devtoolskitapp.vercel.app',
            },
            description:
              'Learn how to safely decode and understand JWT tokens without exposing your secrets.',
          }),
        }}
      />

      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How to Decode and Debug JWT Tokens Online
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
          <span>April 7, 2026</span>
          <span>•</span>
          <span>8 min read</span>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Introduction
        </h2>
        <p className="text-gray-700 mb-4">
          JSON Web Tokens (JWT) have become the standard for authentication and
          authorization in modern web applications. Whether you're developing an
          API, debugging authentication issues, or learning about token-based
          security, understanding how to decode and inspect JWT tokens is an
          essential skill.
        </p>
        <p className="text-gray-700 mb-4">
          In this comprehensive guide, we'll explore everything you need to know
          about JWT tokens, how they work, and how to safely decode them for
          debugging purposes without compromising security.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What is a JWT Token?
        </h2>
        <p className="text-gray-700 mb-4">
          A JWT (JSON Web Token) is a standard (RFC 7519) used to safely transmit
          information between parties as a JSON object. JWTs are commonly used for
          authentication and information exchange in modern web applications,
          particularly in REST APIs and single-page applications.
        </p>
        <p className="text-gray-700 mb-4">
          The token consists of three parts separated by dots:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            <strong>Header:</strong> Contains token type (JWT) and hashing algorithm
            (HS256, RS256, etc.)
          </li>
          <li>
            <strong>Payload:</strong> Contains claims (user data, expiration time,
            etc.)
          </li>
          <li>
            <strong>Signature:</strong> Ensures the token hasn't been tampered with
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Structure and Components
        </h2>
        <p className="text-gray-700 mb-4">
          Understanding the structure of a JWT is crucial for debugging. Let's break
          down each component:
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Header</h3>
        <p className="text-gray-700 mb-4">
          The header contains metadata about the token itself. It's a Base64-encoded
          JSON object that specifies the type of token and the cryptographic
          algorithm used for signing. A typical header looks like this:
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm">
          <code className="text-gray-900">{`{
  "alg": "HS256",
  "typ": "JWT"
}`}</code>
        </pre>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Payload</h3>
        <p className="text-gray-700 mb-4">
          The payload contains the claims about the authenticated principal and
          additional data. Claims are pieces of information asserted about a subject.
          Standard claims include user ID, email, roles, and expiration time.
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm">
          <code className="text-gray-900">{`{
  "sub": "1234567890",
  "name": "John Doe",
  "email": "john@example.com",
  "iat": 1516239022,
  "exp": 1516242622
}`}</code>
        </pre>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Signature</h3>
        <p className="text-gray-700 mb-4">
          The signature ensures the token's integrity. It's created by taking the
          encoded header and payload, then signing them with a secret key using the
          algorithm specified in the header.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use the JWT Decoder
        </h2>
        <p className="text-gray-700 mb-4">
          The JWT Decoder tool at DevToolkit makes it simple to decode and inspect
          your tokens. Here's how to use it:
        </p>

        <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">
          <li>Copy your JWT token from your application or API response</li>
          <li>Navigate to the JWT Decoder tool on DevToolkit</li>
          <li>Paste your token into the input field</li>
          <li>
            The tool automatically decodes and displays the header, payload, and
            signature
          </li>
          <li>View expiration time and check if the token is expired</li>
          <li>Copy any component for further analysis</li>
        </ol>

        <p className="text-gray-700 mb-4">
          The decoder shows expiration information prominently, helping you quickly
          identify if a token has expired or is about to expire.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common JWT Claims Explained
        </h2>
        <p className="text-gray-700 mb-4">
          Understanding common claims helps you interpret decoded tokens effectively:
        </p>

        <ul className="space-y-4 text-gray-700">
          <li>
            <strong>sub (Subject):</strong> The principal that is the subject of the
            JWT
          </li>
          <li>
            <strong>iss (Issuer):</strong> The principal that issued the JWT
          </li>
          <li>
            <strong>aud (Audience):</strong> The recipients that the JWT is intended
            for
          </li>
          <li>
            <strong>exp (Expiration Time):</strong> The time after which the JWT
            expires
          </li>
          <li>
            <strong>iat (Issued At):</strong> The time at which the JWT was issued
          </li>
          <li>
            <strong>nbf (Not Before):</strong> The time before which the JWT must not
            be accepted
          </li>
          <li>
            <strong>jti (JWT ID):</strong> A unique identifier for the JWT
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Security Best Practices
        </h2>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Safe Token Inspection
        </h3>
        <p className="text-gray-700 mb-4">
          When debugging JWTs, it's crucial to follow security best practices:
        </p>

        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>
            Use client-side decoders: DevToolkit runs entirely in your browser, so
            tokens never leave your device
          </li>
          <li>
            Never paste production tokens into untrusted online tools that transmit
            data to servers
          </li>
          <li>
            Be careful with token contents: while the payload is Base64-encoded, it
            is NOT encrypted
          </li>
          <li>Always transmit JWTs over HTTPS to prevent interception</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Token Validation</h3>
        <p className="text-gray-700 mb-4">
          Remember that decoding a JWT is different from validating it. Validation
          requires checking the signature with the secret key, which only your
          backend should do. Decoding is useful for inspection but doesn't guarantee
          the token is valid.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Debugging Common JWT Issues
        </h2>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Expired Tokens</h3>
        <p className="text-gray-700 mb-4">
          If you see an "expired" badge in the decoder, your token's expiration time
          has passed. You'll need to refresh or request a new token from your
          authentication server.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Invalid Claims</h3>
        <p className="text-gray-700 mb-4">
          Check that required claims are present and have expected values. Missing
          claims or unexpected data often indicates token generation issues.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Algorithm Mismatches
        </h3>
        <p className="text-gray-700 mb-4">
          Ensure the algorithm in the header matches what your application expects.
          Using an unexpected algorithm can cause validation failures.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
        <p className="text-gray-700 mb-4">
          The JWT Decoder tool at DevToolkit provides a secure, client-side way to
          inspect and debug JWT tokens. By understanding JWT structure, common
          claims, and security best practices, you can effectively troubleshoot
          authentication issues and develop more secure applications.
        </p>
        <p className="text-gray-700">
          Remember to always use client-side tools when working with tokens in
          development, and never share sensitive tokens with untrusted online
          services. Happy debugging!
        </p>
      </section>
    </article>
  );
}
