import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Complete Guide to Testing Regular Expressions - DevToolkit Blog',
  description:
    'Master regex patterns with our comprehensive guide. Learn how to test, debug, and optimize your regular expressions.',
  openGraph: {
    type: 'article',
    title: 'The Complete Guide to Testing Regular Expressions',
    description:
      'Master regex patterns with our comprehensive guide. Learn how to test, debug, and optimize.',
    url: 'https://devtoolskitapp.vercel.app/blog/regex-testing-guide',
  },
};

export default function RegexTestingGuide() {
  return (
    <article className="prose prose-lg max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'The Complete Guide to Testing Regular Expressions',
            image: 'https://devtoolskitapp.vercel.app/og-image.png',
            datePublished: '2026-04-07',
            dateModified: '2026-04-07',
            author: {
              '@type': 'Organization',
              name: 'DevToolkit',
              url: 'https://devtoolskitapp.vercel.app',
            },
            description: 'Master regex patterns with comprehensive guide.',
          }),
        }}
      />

      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          The Complete Guide to Testing Regular Expressions
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
          <span>April 7, 2026</span>
          <span>•</span>
          <span>10 min read</span>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
        <p className="text-gray-700 mb-4">
          Regular expressions (regex or regexp) are one of the most powerful tools
          in a developer's toolkit. They allow you to search, match, and manipulate
          text with precision and flexibility. However, regex patterns can be
          complex and difficult to debug, which is why testing and validation are
          crucial.
        </p>
        <p className="text-gray-700 mb-4">
          This comprehensive guide will take you through everything you need to know
          about testing regular expressions, from basic patterns to advanced
          techniques, with practical examples you can use immediately.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Regex Fundamentals
        </h2>
        <p className="text-gray-700 mb-4">
          Before diving into testing, let's review the basics of regular expressions.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Character Classes</h3>
        <p className="text-gray-700 mb-4">
          Character classes match any single character within the brackets:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
          <li>[abc] matches a, b, or c</li>
          <li>[a-z] matches any lowercase letter</li>
          <li>[0-9] matches any digit</li>
          <li>\d matches any digit (shorthand)</li>
          <li>\w matches any word character (letter, digit, underscore)</li>
          <li>\s matches any whitespace character</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Quantifiers</h3>
        <p className="text-gray-700 mb-4">
          Quantifiers specify how many times a pattern should match:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
          <li>* matches 0 or more times</li>
          <li>+ matches 1 or more times</li>
          <li>? matches 0 or 1 times</li>
          <li>{'{n}'} matches exactly n times</li>
          <li>{'{n,m}'} matches between n and m times</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Anchors</h3>
        <p className="text-gray-700 mb-4">
          Anchors match positions rather than characters:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
          <li>^ matches the start of a string or line</li>
          <li>$ matches the end of a string or line</li>
          <li>\b matches a word boundary</li>
          <li>\B matches a non-word boundary</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Regex Patterns
        </h2>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Email Validation</h3>
        <p className="text-gray-700 mb-4">
          A commonly used (though not perfect) email pattern:
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm">
          <code className="text-gray-900">{`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`}</code>
        </pre>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Phone Number Validation
        </h3>
        <p className="text-gray-700 mb-4">Pattern for US phone numbers:</p>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm">
          <code className="text-gray-900">{`^\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$`}</code>
        </pre>

        <h3 className="text-xl font-bold text-gray-900 mb-3">URL Validation</h3>
        <p className="text-gray-700 mb-4">Pattern for matching URLs:</p>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm">
          <code className="text-gray-900">{`^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$`}</code>
        </pre>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Hexadecimal Color Code
        </h3>
        <p className="text-gray-700 mb-4">Match hex color codes like #FFFFFF:</p>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm">
          <code className="text-gray-900">{`^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$`}</code>
        </pre>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Using the Regex Tester
        </h2>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Step-by-Step Testing
        </h3>
        <p className="text-gray-700 mb-4">
          The Regex Tester tool at DevToolkit makes it easy to validate and debug
          patterns. Here's how to use it effectively:
        </p>

        <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">
          <li>Enter your regex pattern in the pattern field</li>
          <li>
            Select flags based on your needs (g for global, i for case-insensitive,
            m for multiline, s for dotall)
          </li>
          <li>Enter test strings in the test string field</li>
          <li>Click Test to execute the pattern</li>
          <li>View all matches, groups, and capture groups</li>
        </ol>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Understanding Flags</h3>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
          <li>
            <strong>g (Global):</strong> Find all matches instead of just the first
          </li>
          <li>
            <strong>i (Case-insensitive):</strong> Match both uppercase and lowercase
            letters
          </li>
          <li>
            <strong>m (Multiline):</strong> Treat ^ and $ as line boundaries, not just
            string boundaries
          </li>
          <li>
            <strong>s (Dotall):</strong> Make . match newline characters
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Working with Capture Groups
        </h2>

        <p className="text-gray-700 mb-4">
          Parentheses in regex create capture groups that allow you to extract
          specific parts of a match.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Basic Example</h3>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm">
          <code className="text-gray-900">{`^([a-z]+)@([a-z]+\\.com)$`}</code>
        </pre>
        <p className="text-gray-700 mb-4">
          When applied to "john@example.com", this creates two capture groups:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
          <li>Group 1: "john" (the local part)</li>
          <li>Group 2: "example.com" (the domain)</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Named Groups</h3>
        <p className="text-gray-700 mb-4">
          Some regex engines support named capture groups for better readability:
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm">
          <code className="text-gray-900">{`^(?<username>[a-z]+)@(?<domain>[a-z]+\\.com)$`}</code>
        </pre>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Advanced Testing Strategies
        </h2>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Test Case Development
        </h3>
        <p className="text-gray-700 mb-4">
          Create comprehensive test cases covering edge cases and expected patterns:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
          <li>Valid cases that should match</li>
          <li>Invalid cases that should not match</li>
          <li>Edge cases (empty strings, very long strings, special characters)</li>
          <li>Boundary conditions</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Performance</h3>
        <p className="text-gray-700 mb-4">
          Be mindful of regex performance, especially with complex patterns. Some
          patterns can cause catastrophic backtracking, making them extremely slow on
          certain inputs. Use the Regex Tester to check performance with various
          input lengths.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Documentation
        </h3>
        <p className="text-gray-700 mb-4">
          Always document complex regex patterns. Use comments and explain what each
          part does. This helps future developers (including yourself!) understand
          the pattern's intent.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Debugging Tips
        </h2>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Pattern Not Matching
        </h3>
        <p className="text-gray-700 mb-4">
          If your pattern doesn't match as expected, try these steps:
        </p>
        <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">
          <li>Use the Regex Tester with simple test cases first</li>
          <li>Check if you need to escape special characters</li>
          <li>Verify you're using the correct flags (case-sensitive, multiline)</li>
          <li>Test individual components in isolation</li>
          <li>Check for whitespace or hidden characters in test strings</li>
        </ol>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Matching Too Much
        </h3>
        <p className="text-gray-700 mb-4">
          If your pattern matches too much, it might be too greedy. Use non-greedy
          quantifiers (?, *?, +?, {'{n,m}?'}) to match as little as possible
          instead of as much as possible.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Unwanted Captures
        </h3>
        <p className="text-gray-700 mb-4">
          If you have parentheses that you don't want to capture, use non-capturing
          groups: (?:...) instead of (...).
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
        <p className="text-gray-700 mb-4">
          Regular expressions are powerful tools that require practice to master.
          Using tools like the Regex Tester at DevToolkit makes it easier to develop,
          test, and debug patterns. Remember to start simple, test thoroughly, and
          use the Tester to verify your patterns before deploying them in production.
        </p>
        <p className="text-gray-700">
          With the techniques and patterns covered in this guide, you're well-equipped
          to handle most regex challenges you'll encounter in your development work.
          Happy regex testing!
        </p>
      </section>
    </article>
  );
}
