import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import Link from 'next/link';

interface Presentation {
  _id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  updatedAt: string;
}

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadPresentations();
    }
  }, [user]);

  const loadPresentations = async () => {
    try {
      const response = await api.get('/presentations');
      setPresentations(response.data);
    } catch (error) {
      console.error('Failed to load presentations:', error);
    }
  };

  const createPresentation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/presentations', { title: newTitle });
      router.push(`/editor/${response.data._id}`);
    } catch (error) {
      console.error('Failed to create presentation:', error);
    }
  };

  const deletePresentation = async (id: string) => {
    if (confirm('Are you sure you want to delete this presentation?')) {
      try {
        await api.delete(`/presentations/${id}`);
        loadPresentations();
      } catch (error) {
        console.error('Failed to delete presentation:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container">
          <h1 className="logo">TuxPresent</h1>
          <div className="header-actions">
            <span>Welcome, {user.name}</span>
            <button onClick={logout} className="btn-secondary">Logout</button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-toolbar">
            <h2>My Presentations</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
            >
              + New Presentation
            </button>
          </div>

          <div className="presentations-grid">
            {presentations.length === 0 ? (
              <div className="empty-state">
                <p>No presentations yet. Create your first one!</p>
              </div>
            ) : (
              presentations.map((presentation) => (
                <div key={presentation._id} className="presentation-card">
                  <div className="presentation-thumbnail">
                    {presentation.thumbnail ? (
                      <img src={presentation.thumbnail} alt={presentation.title} />
                    ) : (
                      <div className="placeholder-thumbnail">
                        {presentation.title.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="presentation-info">
                    <h3>{presentation.title}</h3>
                    <p className="presentation-date">
                      Updated {new Date(presentation.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="presentation-actions">
                    <Link
                      href={`/editor/${presentation._id}`}
                      className="btn-link"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/present/${presentation._id}`}
                      className="btn-link"
                    >
                      Present
                    </Link>
                    <button
                      onClick={() => deletePresentation(presentation._id)}
                      className="btn-link danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Create New Presentation</h3>
            <form onSubmit={createPresentation}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
