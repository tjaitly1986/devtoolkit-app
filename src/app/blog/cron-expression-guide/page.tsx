import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cron Expression Cheat Sheet - Syntax, Examples & Common Schedules',
  description:
    'Master cron expressions with our comprehensive cheat sheet. Learn 5-field syntax, wildcards, and 15+ practical examples for scheduling tasks.',
  openGraph: {
    type: 'article',
    title: 'Cron Expression Cheat Sheet - Syntax, Examples & Common Schedules',
    description:
      'Master cron expressions with our comprehensive cheat sheet. Learn 5-field syntax, wildcards, and 15+ practical examples for scheduling tasks.',
    url: 'https://devtoolkit.app/blog/cron-expression-guide',
  },
};

export default function CronExpressionGuide() {
  return (
    <article className="max-w-4xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'Cron Expression Cheat Sheet — Syntax, Examples, and Common Schedules',
            image: 'https://devtoolkit.app/og-image.png',
            datePublished: '2026-04-07',
            dateModified: '2026-04-07',
            author: {
              '@type': 'Organization',
              name: 'DevToolkit',
              url: 'https://devtoolkit.app',
            },
            description:
              'Master cron expressions with our comprehensive cheat sheet. Learn 5-field syntax, wildcards, and 15+ practical examples for scheduling tasks.',
          }),
        }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-blue-600 transition">
          Home
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-blue-600 transition">
          Blog
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Cron Expression Cheat Sheet</span>
      </nav>

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Cron Expression Cheat Sheet — Syntax, Examples, and Common Schedules
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
          <span>April 7, 2026</span>
          <span>•</span>
          <span>12 min read</span>
        </div>
      </header>

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
        <p className="text-gray-700 mb-4">
          Cron expressions are the standard way to schedule recurring tasks in Unix-like systems,
          cloud platforms, and modern applications. Whether you're managing scheduled backups,
          sending automated reports, or triggering periodic jobs, understanding cron syntax is essential.
        </p>
        <p className="text-gray-700 mb-4">
          This comprehensive cheat sheet covers everything you need to know about cron expressions:
          the 5-field syntax, wildcard operators, and over 15 practical examples that you can use
          immediately in your projects. If you're new to cron or need a quick reference, this guide
          has you covered.
        </p>
      </section>

      {/* 5-Field Syntax */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding the 5-Field Cron Syntax</h2>

        <p className="text-gray-700 mb-6">
          A cron expression consists of five fields separated by spaces. Each field represents a
          unit of time and defines when a task should execute:
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <pre className="text-gray-900 text-sm font-mono overflow-x-auto">
{`┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of week (0 - 6, where 0 = Sunday)
│ │ │ │ │
│ │ │ │ │
* * * * *`}
          </pre>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Field Breakdown</h3>
        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-gray-900">Minute</h4>
            <p className="text-gray-700">Values: 0-59. Specifies the minute of the hour.</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-gray-900">Hour</h4>
            <p className="text-gray-700">Values: 0-23 (24-hour format). Specifies the hour of the day.</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-gray-900">Day of Month</h4>
            <p className="text-gray-700">Values: 1-31. Specifies which day of the month to run the task.</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-gray-900">Month</h4>
            <p className="text-gray-700">Values: 1-12 (or JAN-DEC). Specifies which month to run the task.</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-gray-900">Day of Week</h4>
            <p className="text-gray-700">Values: 0-6 (or SUN-SAT, where 0 = Sunday). Specifies which day of the week.</p>
          </div>
        </div>
      </section>

      {/* Wildcard Operators */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wildcard Operators Explained</h2>

        <p className="text-gray-700 mb-6">
          Cron uses special operators to make expressions flexible and powerful. Understanding
          these operators is key to writing effective cron jobs.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">The Asterisk (*)</h3>
        <p className="text-gray-700 mb-6">
          The asterisk means "every" value in that field. For example, `* * * * *` means
          run every minute of every hour of every day.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">The Slash (/)</h3>
        <p className="text-gray-700 mb-6">
          The slash denotes intervals or steps. For example, `*/5` in the minute field means
          every 5 minutes (0, 5, 10, 15, ... 55). `0-23/2` in the hour field means every 2 hours
          starting from 0 (0, 2, 4, ... 22).
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">The Hyphen (-)</h3>
        <p className="text-gray-700 mb-6">
          The hyphen specifies a range of values. For example, `1-5` in the day of week field
          means Monday through Friday (1 = Monday, 5 = Friday).
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-3">The Comma (,)</h3>
        <p className="text-gray-700 mb-6">
          The comma lists specific values. For example, `1,3,5` in the day of week field means
          Monday, Wednesday, and Friday. `9,12,15,18` in the hour field means 9am, 12pm, 3pm, and 6pm.
        </p>
      </section>

      {/* Common Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">15+ Common Cron Expression Examples</h2>

        <p className="text-gray-700 mb-8">
          Here are practical examples you can use directly in your projects. Copy and customize
          them for your specific needs:
        </p>

        <div className="space-y-6">
          {/* Example 1 */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2 text-gray-900 font-bold">
              * * * * *
            </div>
            <p className="text-gray-700"><strong>Every minute</strong> - Task runs 60 times per hour</p>
          </div>

          {/* Example 2 */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2 text-gray-900 font-bold">
              */5 * * * *
            </div>
            <p className="text-gray-700"><strong>Every 5 minutes</strong> - Runs at 0, 5, 10, 15, ... 55</p>
          </div>

          {/* Example 3 */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2 text-gray-900 font-bold">
              0 * * * *
            </div>
            <p className="text-gray-700"><strong>Every hour</strong> - Runs at the start of each hour (e.g., 1:00, 2:00, 3:00)</p>
          </div>

          {/* Example 4 */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2 text-gray-900 font-bold">
              0 0 * * *
            </div>
            <p className="text-gray-700"><strong>Daily at midnight</strong> - Perfect for nightly backups or cleanup jobs</p>
          </div>

          {/* Example 5 */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2 text-gray-900 font-bold">
              0 9 * * *
            </div>
            <p className="text-gray-700"><strong>Daily at 9 AM</strong> - Great for morning reports or status checks</p>
          </div>

          {/* Example 6 */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2 text-gray-900 font-bold">
              0 9 * * 1
            </div>
            <p className="text-gray-700"><strong>Every Monday at 9 AM</strong> - Weekly task (1 = Monday)</p>
          </div>

          {/* Example 7 */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2 text-gray-900 font-bold">
              0 9 * * 1-5
            </div>
            <p className="text-gray-700"><strong>Weekdays at 9 AM</strong> - Runs Monday through Friday (business days)</p>
          </div>

          {/* Example 8 */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2 text-gray-900 font-bold">
              0 0 1 * *
            </div>
            <p className="text-gray-700"><strong>First day of month at midnight</strong> - Monthly tasks on the 1st</p>
          </div>

          {/* Example 9 */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2 text-gray-900 font-bold">
              0 0 1 1 *
            </div>
            <p className="text-gray-700"><strong>Yearly on January 1st at midnight</strong> - Annual jobs</p>
          </div>

          {/* Example 10 */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2 text-gray-900 font-bold">
              30 2 * * *
            </div>
            <p className="text-gray-700"><strong>Daily at 2:30 AM</strong> - Common time for resource-heavy operations</p>
          </div>

          {/* Example 11 */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2 text-gray-900 font-bold">
              0 */6 * * *
            </div>
            <p className="text-gray-700"><strong>Every 6 hours</strong> - Runs at 0:00, 6:00, 12:00, 18:00</p>
          </div>

          {/* Example 12 */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2 text-gray-900 font-bold">
              0 9,12,18 * * *
            </div>
            <p className="text-gray-700"><strong>Three times daily</strong> - At 9 AM, 12 PM (noon), and 6 PM</p>
          </div>

          {/* Example 13 */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2 text-gray-900 font-bold">
              0 0 * * 0
            </div>
            <p className="text-gray-700"><strong>Every Sunday at midnight</strong> - Weekly maintenance (0 = Sunday)</p>
          </div>

          {/* Example 14 */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2 text-gray-900 font-bold">
              15 10 * * *
            </div>
            <p className="text-gray-700"><strong>Daily at 10:15 AM</strong> - Precise scheduling for specific times</p>
          </div>

          {/* Example 15 */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2 text-gray-900 font-bold">
              */15 * * * *
            </div>
            <p className="text-gray-700"><strong>Every 15 minutes</strong> - Runs at 0, 15, 30, and 45 minutes past each hour</p>
          </div>

          {/* Example 16 */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2 text-gray-900 font-bold">
              0 */2 * * *
            </div>
            <p className="text-gray-700"><strong>Every 2 hours</strong> - Runs at 0:00, 2:00, 4:00, etc.</p>
          </div>
        </div>
      </section>

      {/* Quick Reference Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Reference Table</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-bold">Expression</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-bold">Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900">*</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">Any value (every)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900">*/5</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">Every 5 units</td>
              </tr>
              <tr className="bg-white">
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900">1-5</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">Range from 1 to 5</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900">1,3,5</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">Specific values (1 OR 3 OR 5)</td>
              </tr>
              <tr className="bg-white">
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900">0-23/2</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">Every 2 units in range 0-23</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Testing Cron Expressions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Test Your Cron Expressions</h2>

        <p className="text-gray-700 mb-6">
          Writing cron expressions can be tricky, and a small mistake can cause your job to run
          at the wrong time or not at all. That's why testing is crucial before deploying to production.
        </p>

        <p className="text-gray-700 mb-6">
          Use the <Link href="https://devtoolkit.app" className="text-blue-600 hover:text-blue-700 font-medium">
            DevToolkit Cron Parser
          </Link> to validate your expressions and see exactly when they will execute. This tool
          shows you the next 10 scheduled run times, helping you catch mistakes before they impact
          your systems.
        </p>

        <p className="text-gray-700">
          Simply paste your cron expression, and the parser will immediately tell you if it's
          valid and display the schedule in a human-readable format.
        </p>
      </section>

      {/* Common Mistakes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h2>

        <div className="space-y-6">
          <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Off-by-One Errors in Ranges</h3>
            <p className="text-gray-700 mb-2">
              Remember that months are 1-12, but days of the week are 0-6. Sunday is 0, not 1.
              This is a common source of confusion.
            </p>
            <p className="text-gray-700 text-sm">
              <strong>Wrong:</strong> `0 9 * * 1-6` (this would exclude Sunday)<br/>
              <strong>Right:</strong> `0 9 * * 0-5` (for Monday-Saturday)
            </p>
          </div>

          <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Using Both Day-of-Month and Day-of-Week</h3>
            <p className="text-gray-700">
              When both day-of-month and day-of-week are specified (neither is *), the task
              runs when EITHER condition matches, not both.
            </p>
          </div>

          <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Forgetting the Minute Field</h3>
            <p className="text-gray-700">
              You must always include all 5 fields. Omitting any field (even if you use *)
              will cause an error.
            </p>
          </div>

          <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Using 24-Hour Format Incorrectly</h3>
            <p className="text-gray-700">
              Hours are 0-23. Midnight is 0, not 24. 3 PM is 15, not 3. Always use 24-hour format.
            </p>
          </div>
        </div>
      </section>

      {/* Cron in Different Systems */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cron Across Different Systems</h2>

        <p className="text-gray-700 mb-6">
          While the basic 5-field cron syntax is standard, different systems and platforms
          may have slight variations or extensions:
        </p>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold text-gray-900 mb-2">Unix/Linux Crontab</h3>
            <p className="text-gray-700">The standard 5-field format discussed in this guide.</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold text-gray-900 mb-2">AWS EventBridge (CloudWatch Events)</h3>
            <p className="text-gray-700">Uses a 6-field format (adds year), with slightly different syntax.</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold text-gray-900 mb-2">GitHub Actions</h3>
            <p className="text-gray-700">Uses standard 5-field cron format for scheduling workflows.</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold text-gray-900 mb-2">Docker & Kubernetes</h3>
            <p className="text-gray-700">Use standard 5-field cron format for CronJobs.</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold text-gray-900 mb-2">Node.js & Python Libraries</h3>
            <p className="text-gray-700">Libraries like node-cron and Python's schedule use 5-field format.</p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices for Cron Jobs</h2>

        <ul className="space-y-4 text-gray-700">
          <li className="flex gap-3">
            <span className="text-blue-600 font-bold">✓</span>
            <span><strong>Test first:</strong> Always validate cron expressions before deployment using a cron parser or test environment.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600 font-bold">✓</span>
            <span><strong>Document thoroughly:</strong> Add comments explaining what each job does and when it runs.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600 font-bold">✓</span>
            <span><strong>Monitor execution:</strong> Set up logging and alerts for job failures and unexpected behavior.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600 font-bold">✓</span>
            <span><strong>Avoid resource conflicts:</strong> Stagger jobs to prevent multiple heavy operations running simultaneously.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600 font-bold">✓</span>
            <span><strong>Use descriptive names:</strong> Name your jobs clearly so it's obvious what they do.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600 font-bold">✓</span>
            <span><strong>Plan for timezones:</strong> Be aware of timezone differences, especially for globally distributed systems.</span>
          </li>
        </ul>
      </section>

      {/* Conclusion */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>

        <p className="text-gray-700 mb-4">
          Cron expressions are a powerful tool for automating tasks in any system that supports
          them. With just five fields and a handful of special operators, you can schedule tasks
          with incredible precision and flexibility.
        </p>

        <p className="text-gray-700 mb-4">
          Remember the key points: understand the 5-field structure, master the wildcard operators
          (*, /, -, and comma), and always test your expressions before deploying to production.
          When in doubt, use the <Link href="https://devtoolkit.app" className="text-blue-600 hover:text-blue-700 font-medium">
            DevToolkit Cron Parser
          </Link> to validate and visualize your cron jobs.
        </p>

        <p className="text-gray-700">
          With this cheat sheet as your reference, you'll be confident in writing cron expressions
          for any scheduling need. Happy scheduling!
        </p>
      </section>
    </article>
  );
}
