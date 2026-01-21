import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';
import Link from 'next/link';

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

export default function Editor() {
  const router = useRouter();
  const { id } = router.query;
  const { user, loading } = useAuth();
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [selectedSlide, setSelectedSlide] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (id && user) {
      loadPresentation();
    }
  }, [id, user]);

  const loadPresentation = async () => {
    try {
      const response = await api.get(`/presentations/${id}`);
      setPresentation(response.data);
    } catch (error) {
      console.error('Failed to load presentation:', error);
      router.push('/dashboard');
    }
  };

  const savePresentation = async () => {
    if (!presentation) return;
    
    try {
      await api.put(`/presentations/${id}`, presentation);
      alert('Presentation saved!');
    } catch (error) {
      console.error('Failed to save presentation:', error);
      alert('Failed to save presentation');
    }
  };

  const addSlide = (type: 'text' | 'image' | 'shape') => {
    if (!presentation) return;

    const newSlide: Slide = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? 'Double-click to edit' : type === 'shape' ? { width: 100, height: 100, fill: '#3498db' } : '',
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1,
      style: type === 'text' ? { fontSize: '24px', color: '#000000' } : {}
    };

    setPresentation({
      ...presentation,
      slides: [...presentation.slides, newSlide]
    });
  };

  const updateSlide = (slideId: string, updates: Partial<Slide>) => {
    if (!presentation) return;

    setPresentation({
      ...presentation,
      slides: presentation.slides.map(slide =>
        slide.id === slideId ? { ...slide, ...updates } : slide
      )
    });
  };

  const deleteSlide = (slideId: string) => {
    if (!presentation) return;

    setPresentation({
      ...presentation,
      slides: presentation.slides.filter(slide => slide.id !== slideId)
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(prev => Math.max(0.1, Math.min(5, prev * delta)));
  };

  if (loading || !presentation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="editor">
      <header className="editor-header">
        <div className="header-left">
          <Link href="/dashboard" className="btn-link">← Back</Link>
          <input
            type="text"
            value={presentation.title}
            onChange={(e) => setPresentation({ ...presentation, title: e.target.value })}
            className="title-input"
          />
        </div>
        <div className="header-center">
          <div className="toolbar">
            <button onClick={() => addSlide('text')} className="tool-btn" title="Add Text">
              T
            </button>
            <button onClick={() => addSlide('shape')} className="tool-btn" title="Add Shape">
              ◻
            </button>
            <button onClick={() => addSlide('image')} className="tool-btn" title="Add Image">
              🖼
            </button>
            <div className="separator"></div>
            <button onClick={() => setScale(s => s * 1.2)} className="tool-btn" title="Zoom In">
              +
            </button>
            <span className="zoom-level">{Math.round(scale * 100)}%</span>
            <button onClick={() => setScale(s => s / 1.2)} className="tool-btn" title="Zoom Out">
              -
            </button>
          </div>
        </div>
        <div className="header-right">
          <button onClick={savePresentation} className="btn-primary">Save</button>
          <Link href={`/present/${id}`} className="btn-secondary">Present</Link>
        </div>
      </header>

      <div className="editor-main">
        <div
          ref={canvasRef}
          className="canvas"
          style={{ backgroundColor: presentation.settings.backgroundColor }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <div
            className="canvas-content"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${scale})`
            }}
          >
            {presentation.slides.map((slide) => (
              <div
                key={slide.id}
                className={`slide-element ${selectedSlide === slide.id ? 'selected' : ''}`}
                style={{
                  position: 'absolute',
                  left: `${slide.position.x}px`,
                  top: `${slide.position.y}px`,
                  transform: `
                    rotateX(${slide.rotation.x}deg)
                    rotateY(${slide.rotation.y}deg)
                    rotateZ(${slide.rotation.z}deg)
                    scale(${slide.scale})
                  `,
                  transformStyle: 'preserve-3d'
                }}
                onClick={() => setSelectedSlide(slide.id)}
              >
                {slide.type === 'text' && (
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    style={{
                      fontSize: slide.style?.fontSize || '24px',
                      color: slide.style?.color || '#000000',
                      padding: '10px',
                      minWidth: '100px',
                      outline: 'none'
                    }}
                    onBlur={(e) => updateSlide(slide.id, { content: e.currentTarget.textContent || '' })}
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
                  <img src={slide.content} alt="Slide" style={{ maxWidth: '400px', maxHeight: '300px' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {selectedSlide && (
          <div className="properties-panel">
            <h3>Properties</h3>
            {(() => {
              const slide = presentation.slides.find(s => s.id === selectedSlide);
              if (!slide) return null;

              return (
                <div className="properties">
                  <div className="property-group">
                    <label>Position X</label>
                    <input
                      type="number"
                      value={slide.position.x}
                      onChange={(e) => updateSlide(slide.id, {
                        position: { ...slide.position, x: Number(e.target.value) }
                      })}
                    />
                  </div>
                  <div className="property-group">
                    <label>Position Y</label>
                    <input
                      type="number"
                      value={slide.position.y}
                      onChange={(e) => updateSlide(slide.id, {
                        position: { ...slide.position, y: Number(e.target.value) }
                      })}
                    />
                  </div>
                  <div className="property-group">
                    <label>Scale</label>
                    <input
                      type="number"
                      step="0.1"
                      value={slide.scale}
                      onChange={(e) => updateSlide(slide.id, { scale: Number(e.target.value) })}
                    />
                  </div>
                  <div className="property-group">
                    <label>Rotation Z</label>
                    <input
                      type="number"
                      value={slide.rotation.z}
                      onChange={(e) => updateSlide(slide.id, {
                        rotation: { ...slide.rotation, z: Number(e.target.value) }
                      })}
                    />
                  </div>
                  <button
                    onClick={() => {
                      deleteSlide(slide.id);
                      setSelectedSlide(null);
                    }}
                    className="btn-danger btn-full"
                  >
                    Delete Element
                  </button>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
