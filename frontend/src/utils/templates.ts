export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  slides: any[];
  settings: {
    backgroundColor: string;
    transition: string;
    transitionDuration: number;
  };
}

export const templates: Template[] = [
  {
    id: 'blank',
    name: 'Blank',
    description: 'Start from scratch with a blank canvas',
    thumbnail: '/templates/blank.png',
    slides: [],
    settings: {
      backgroundColor: '#ffffff',
      transition: 'slide',
      transitionDuration: 800
    }
  },
  {
    id: 'business',
    name: 'Business Presentation',
    description: 'Professional template for business presentations',
    thumbnail: '/templates/business.png',
    slides: [
      {
        id: '1',
        type: 'text',
        content: 'Your Company Name',
        position: { x: 0, y: -200, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 2,
        style: { fontSize: '48px', color: '#2c3e50', fontWeight: 'bold' }
      },
      {
        id: '2',
        type: 'text',
        content: 'Subtitle or tagline',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1,
        style: { fontSize: '24px', color: '#7f8c8d' }
      },
      {
        id: '3',
        type: 'text',
        content: 'Problem Statement',
        position: { x: 800, y: -200, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1.5,
        style: { fontSize: '36px', color: '#e74c3c', fontWeight: 'bold' }
      },
      {
        id: '4',
        type: 'text',
        content: 'What problem are we solving?',
        position: { x: 800, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1,
        style: { fontSize: '20px', color: '#34495e' }
      },
      {
        id: '5',
        type: 'text',
        content: 'Solution',
        position: { x: 1600, y: -200, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1.5,
        style: { fontSize: '36px', color: '#27ae60', fontWeight: 'bold' }
      },
      {
        id: '6',
        type: 'text',
        content: 'How we solve it',
        position: { x: 1600, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1,
        style: { fontSize: '20px', color: '#34495e' }
      },
      {
        id: '7',
        type: 'text',
        content: 'Thank You',
        position: { x: 2400, y: -100, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 2,
        style: { fontSize: '48px', color: '#3498db', fontWeight: 'bold' }
      }
    ],
    settings: {
      backgroundColor: '#ecf0f1',
      transition: 'slide',
      transitionDuration: 1000
    }
  },
  {
    id: 'education',
    name: 'Educational',
    description: 'Perfect for lectures and educational content',
    thumbnail: '/templates/education.png',
    slides: [
      {
        id: '1',
        type: 'text',
        content: 'Lesson Title',
        position: { x: 0, y: -150, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 2,
        style: { fontSize: '48px', color: '#2c3e50', fontWeight: 'bold' }
      },
      {
        id: '2',
        type: 'text',
        content: 'Introduction',
        position: { x: 0, y: 100, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1,
        style: { fontSize: '24px', color: '#7f8c8d' }
      },
      {
        id: '3',
        type: 'text',
        content: 'Key Concept 1',
        position: { x: 700, y: -200, z: 100 },
        rotation: { x: 0, y: 10, z: 0 },
        scale: 1.3,
        style: { fontSize: '32px', color: '#3498db', fontWeight: 'bold' }
      },
      {
        id: '4',
        type: 'text',
        content: 'Key Concept 2',
        position: { x: 700, y: 100, z: 100 },
        rotation: { x: 0, y: 10, z: 0 },
        scale: 1.3,
        style: { fontSize: '32px', color: '#9b59b6', fontWeight: 'bold' }
      },
      {
        id: '5',
        type: 'text',
        content: 'Examples',
        position: { x: 1400, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1.5,
        style: { fontSize: '36px', color: '#e67e22', fontWeight: 'bold' }
      },
      {
        id: '6',
        type: 'text',
        content: 'Summary',
        position: { x: 2100, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1.5,
        style: { fontSize: '36px', color: '#16a085', fontWeight: 'bold' }
      }
    ],
    settings: {
      backgroundColor: '#f8f9fa',
      transition: 'slide',
      transitionDuration: 900
    }
  },
  {
    id: 'pitch',
    name: 'Pitch Deck',
    description: 'Impress investors with this pitch deck template',
    thumbnail: '/templates/pitch.png',
    slides: [
      {
        id: '1',
        type: 'text',
        content: 'Startup Name',
        position: { x: 0, y: -100, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 2.5,
        style: { fontSize: '56px', color: '#ffffff', fontWeight: 'bold' }
      },
      {
        id: '2',
        type: 'text',
        content: 'The Problem',
        position: { x: 900, y: -150, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1.5,
        style: { fontSize: '40px', color: '#e74c3c', fontWeight: 'bold' }
      },
      {
        id: '3',
        type: 'text',
        content: 'Market Size',
        position: { x: 1800, y: -150, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1.5,
        style: { fontSize: '40px', color: '#3498db', fontWeight: 'bold' }
      },
      {
        id: '4',
        type: 'text',
        content: 'Our Solution',
        position: { x: 2700, y: -150, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1.5,
        style: { fontSize: '40px', color: '#27ae60', fontWeight: 'bold' }
      },
      {
        id: '5',
        type: 'text',
        content: 'Business Model',
        position: { x: 3600, y: -150, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1.5,
        style: { fontSize: '40px', color: '#f39c12', fontWeight: 'bold' }
      },
      {
        id: '6',
        type: 'text',
        content: 'The Ask',
        position: { x: 4500, y: -150, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1.5,
        style: { fontSize: '40px', color: '#9b59b6', fontWeight: 'bold' }
      }
    ],
    settings: {
      backgroundColor: '#2c3e50',
      transition: 'slide',
      transitionDuration: 1200
    }
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Express your creativity with dynamic 3D effects',
    thumbnail: '/templates/creative.png',
    slides: [
      {
        id: '1',
        type: 'text',
        content: 'Creative Title',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 15 },
        scale: 2,
        style: { fontSize: '48px', color: '#e74c3c', fontWeight: 'bold' }
      },
      {
        id: '2',
        type: 'shape',
        content: { width: 200, height: 200, fill: '#3498db', borderRadius: 100 },
        position: { x: 600, y: -300, z: 100 },
        rotation: { x: 20, y: 20, z: 0 },
        scale: 1,
        style: {}
      },
      {
        id: '3',
        type: 'text',
        content: 'Idea 1',
        position: { x: 600, y: -100, z: 50 },
        rotation: { x: 0, y: -10, z: 0 },
        scale: 1.2,
        style: { fontSize: '32px', color: '#2c3e50' }
      },
      {
        id: '4',
        type: 'shape',
        content: { width: 200, height: 200, fill: '#27ae60', borderRadius: 20 },
        position: { x: 1200, y: 0, z: -50 },
        rotation: { x: -20, y: 20, z: 45 },
        scale: 1,
        style: {}
      },
      {
        id: '5',
        type: 'text',
        content: 'Idea 2',
        position: { x: 1200, y: 200, z: 0 },
        rotation: { x: 0, y: 10, z: 0 },
        scale: 1.2,
        style: { fontSize: '32px', color: '#2c3e50' }
      },
      {
        id: '6',
        type: 'shape',
        content: { width: 200, height: 200, fill: '#f39c12', borderRadius: 0 },
        position: { x: 1800, y: -200, z: 100 },
        rotation: { x: 30, y: -30, z: 30 },
        scale: 1,
        style: {}
      },
      {
        id: '7',
        type: 'text',
        content: 'Conclusion',
        position: { x: 2400, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: -10 },
        scale: 2,
        style: { fontSize: '48px', color: '#9b59b6', fontWeight: 'bold' }
      }
    ],
    settings: {
      backgroundColor: '#ecf0f1',
      transition: 'slide',
      transitionDuration: 1000
    }
  }
];

export const getTemplate = (id: string): Template | undefined => {
  return templates.find(t => t.id === id);
};

export const getDefaultTemplate = (): Template => {
  return templates[0];
};
