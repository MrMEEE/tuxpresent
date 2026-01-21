import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="landing-page">
      <header className="header">
        <div className="container">
          <h1 className="logo">TuxPresent</h1>
          <nav>
            <Link href="/login" className="btn-link">Login</Link>
            <Link href="/register" className="btn-primary">Sign Up</Link>
          </nav>
        </div>
      </header>

      <main className="hero">
        <div className="container">
          <h2 className="hero-title">Create Amazing Presentations</h2>
          <p className="hero-subtitle">
            Build stunning, dynamic presentations with our intuitive WYSIWYG editor.
            Similar to Prezi, but self-hosted and open-source.
          </p>
          <div className="hero-actions">
            <Link href="/register" className="btn-primary btn-large">
              Get Started Free
            </Link>
            <Link href="/demo" className="btn-secondary btn-large">
              View Demo
            </Link>
          </div>
        </div>
      </main>

      <section className="features">
        <div className="container">
          <h3>Features</h3>
          <div className="feature-grid">
            <div className="feature-card">
              <h4>WYSIWYG Editor</h4>
              <p>Intuitive drag-and-drop interface for creating presentations</p>
            </div>
            <div className="feature-card">
              <h4>Beautiful Templates</h4>
              <p>Start with professionally designed templates</p>
            </div>
            <div className="feature-card">
              <h4>Real-time Collaboration</h4>
              <p>Work together with your team in real-time</p>
            </div>
            <div className="feature-card">
              <h4>PDF Export</h4>
              <p>Export your presentations as high-quality PDFs</p>
            </div>
            <div className="feature-card">
              <h4>Self-Hosted</h4>
              <p>Keep your data on your own servers</p>
            </div>
            <div className="feature-card">
              <h4>Open Source</h4>
              <p>Free and open-source software</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
