import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../utils/api';

interface Slide {
  id: string;
  type: 'text' | 'image' | 'shape';
  content: any;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: number;
  style: any;
}

interface Presentation {
  _id: string;
  title: string;
  slides: Slide[];
  settings: {
    backgroundColor: string;
    transition: string;
    transitionDuration: number;
  };
}

export default function Present() {
  const router = useRouter();
  const { id } = router.query;
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (id) {
      loadPresentation();
    }
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        previousSlide();
      } else if (e.key === 'Escape') {
        router.push(`/editor/${id}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, presentation]);

  const loadPresentation = async () => {
    try {
      const response = await api.get(`/presentations/${id}`);
      setPresentation(response.data);
    } catch (error) {
      console.error('Failed to load presentation:', error);
      router.push('/dashboard');
    }
  };

  const nextSlide = () => {
    if (presentation && currentSlide < presentation.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const exportToPDF = async () => {
    try {
      const response = await api.get(`/export/presentations/${id}/pdf`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${presentation?.title || 'presentation'}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to export PDF:', error);
      alert('Failed to export PDF');
    }
  };

  if (!presentation) {
    return <div>Loading...</div>;
  }

  const slide = presentation.slides[currentSlide];

  return (
    <div className="presentation-mode" style={{ backgroundColor: presentation.settings.backgroundColor }}>
      <div className="presentation-controls">
        <button onClick={() => router.push(`/editor/${id}`)} className="control-btn">
          Exit
        </button>
        <span className="slide-counter">
          {currentSlide + 1} / {presentation.slides.length}
        </span>
        <button onClick={exportToPDF} className="control-btn">
          Export PDF
        </button>
      </div>

      {presentation.slides.length === 0 ? (
        <div className="empty-presentation">
          <h2>No slides in this presentation</h2>
          <button onClick={() => router.push(`/editor/${id}`)} className="btn-primary">
            Add Slides
          </button>
        </div>
      ) : (
        <div className="presentation-canvas">
          {slide && (
            <div
              className="slide-display"
              style={{
                transform: `
                  translate3d(${slide.position.x}px, ${slide.position.y}px, ${slide.position.z}px)
                  rotateX(${slide.rotation.x}deg)
                  rotateY(${slide.rotation.y}deg)
                  rotateZ(${slide.rotation.z}deg)
                  scale(${slide.scale})
                `,
                transformStyle: 'preserve-3d',
                transition: `transform ${presentation.settings.transitionDuration}ms ${presentation.settings.transition}`
              }}
            >
              {slide.type === 'text' && (
                <div
                  style={{
                    fontSize: slide.style?.fontSize || '24px',
                    color: slide.style?.color || '#000000',
                    padding: '20px'
                  }}
                >
                  {slide.content}
                </div>
              )}
              {slide.type === 'shape' && (
                <div
                  style={{
                    width: `${slide.content.width}px`,
                    height: `${slide.content.height}px`,
                    backgroundColor: slide.content.fill,
                    borderRadius: `${slide.content.borderRadius || 0}px`
                  }}
                />
              )}
              {slide.type === 'image' && slide.content && (
                <img src={slide.content} alt="Slide" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              )}
            </div>
          )}
        </div>
      )}

      <div className="navigation-controls">
        <button
          onClick={previousSlide}
          className="nav-btn"
          disabled={currentSlide === 0}
        >
          ← Previous
        </button>
        <button
          onClick={nextSlide}
          className="nav-btn"
          disabled={currentSlide === presentation.slides.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
