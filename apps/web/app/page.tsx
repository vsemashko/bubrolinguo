import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-beaver-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Column - Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center bg-brand-accent/10 rounded-full px-4 py-2 mb-6">
              <span className="text-2xl mr-2">🦫</span>
              <span className="text-sm font-semibold text-brand-accent">
                Meet Bubr the Beaver!
              </span>
            </div>

            <h1 className="font-display text-5xl lg:text-7xl font-bold mb-6 text-balance">
              Learn Polish from{' '}
              <span className="text-brand-primary">A1 to C1</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-2xl text-balance">
              Master Polish with AI-powered lessons, 10,000 vocabulary words, and engaging
              characters. Unlike Duolingo, we take you all the way to fluency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/signup" className="btn-primary text-center">
                Start Learning Free →
              </Link>
              <Link
                href="/about"
                className="bg-white hover:bg-gray-50 text-brand-secondary font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md border-2 border-brand-secondary text-center"
              >
                How It Works
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-lg">
              <div>
                <div className="text-3xl font-bold text-brand-primary">250+</div>
                <div className="text-sm text-gray-600">Lessons</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-primary">10K</div>
                <div className="text-sm text-gray-600">Words</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-primary">C1</div>
                <div className="text-sm text-gray-600">Max Level</div>
              </div>
            </div>
          </div>

          {/* Right Column - Illustration/Mascot */}
          <div className="flex-1 relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Bubr the Beaver Placeholder - will add illustration */}
              <div className="aspect-square bg-gradient-to-br from-beaver-400 to-beaver-600 rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-9xl mb-4">🦫</div>
                  <p className="text-2xl font-bold">Bubr the Beaver</p>
                  <p className="text-lg opacity-90">"Let's build your Polish!"</p>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-bounce">
                <div className="text-3xl">🇵🇱</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4">
                <div className="text-2xl">📚</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-display font-bold text-center mb-12">
          Why Bubrolinguo?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">A1 to C1 Path</h3>
            <p className="text-gray-600">
              Unlike Duolingo's A2 limit, we take you to true fluency with C1 level content.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">AI-Powered Learning</h3>
            <p className="text-gray-600">
              Get personalized explanations and practice conversations with AI tutors.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">10,000 Vocabulary Words</h3>
            <p className="text-gray-600">
              Master words with images, audio, examples, and smart spaced repetition.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="card hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🎭</div>
            <h3 className="text-xl font-bold mb-2">6 Unique Characters</h3>
            <p className="text-gray-600">
              Learn with Bubr the Beaver, Crazy Cat Lady Irina, and more memorable friends!
            </p>
          </div>

          {/* Feature 5 */}
          <div className="card hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">Exam Preparation</h3>
            <p className="text-gray-600">
              Prepare for official Polish B1, B2, and C1 certification exams.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="card hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-bold mb-2">Russian & English</h3>
            <p className="text-gray-600">
              Interface and explanations in your language: Russian or English.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Characters Section */}
      <section className="bg-gradient-to-r from-beaver-100 to-blue-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold text-center mb-12">
            Meet Your Learning Companions
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CharacterCard
              emoji="🦫"
              name="Bubr the Beaver"
              role="The Motivated Builder"
              quote="Building my new life, one word at a time!"
            />
            <CharacterCard
              emoji="🐱"
              name="Crazy Cat Lady Irina"
              role="The Perfectionist"
              quote="If I can't say it perfectly, I won't say it!"
            />
            <CharacterCard
              emoji="🐻"
              name="Wojtek the Party Bear"
              role="The Heritage Learner"
              quote="My babcia says I'm an embarrassment... in Polish!"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="card max-w-4xl mx-auto text-center bg-gradient-to-br from-brand-primary to-brand-accent text-white">
          <h2 className="text-4xl font-display font-bold mb-4">
            Ready to Build Your Polish?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of learners mastering Polish from A1 to C1
          </p>
          <Link href="/signup" className="inline-block bg-white text-brand-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg">
            Start Free Today →
          </Link>
        </div>
      </section>
    </main>
  );
}

function CharacterCard({ emoji, name, role, quote }: { emoji: string; name: string; role: string; quote: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
      <div className="text-6xl mb-3">{emoji}</div>
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-sm text-brand-secondary font-semibold mb-3">{role}</p>
      <p className="text-gray-600 text-sm italic">"{quote}"</p>
    </div>
  );
}
