import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Presentation from '../models/Presentation';
import puppeteer from 'puppeteer';

export const exportToPDF = async (req: AuthRequest, res: Response) => {
  try {
    const presentation = await Presentation.findById(req.params.id);

    if (!presentation) {
      return res.status(404).json({ message: 'Presentation not found' });
    }

    // Check access
    const hasAccess = 
      presentation.owner.toString() === req.user._id.toString() ||
      presentation.collaborators.some(c => c.toString() === req.user._id.toString()) ||
      presentation.isPublic;

    if (!hasAccess) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Generate HTML content for the presentation
    const html = generatePresentationHTML(presentation);

    // Launch puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true
    });

    await browser.close();

    res.contentType('application/pdf');
    res.send(pdf);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

function generatePresentationHTML(presentation: any): string {
  const slides = presentation.slides.map((slide: any, index: number) => {
    return `
      <div class="slide" style="
        position: absolute;
        transform: translate3d(${slide.position.x}px, ${slide.position.y}px, ${slide.position.z}px)
                   rotateX(${slide.rotation.x}deg) rotateY(${slide.rotation.y}deg) rotateZ(${slide.rotation.z}deg)
                   scale(${slide.scale});
      ">
        <div class="content">${renderSlideContent(slide)}</div>
      </div>
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${presentation.title}</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background: ${presentation.settings.backgroundColor};
          font-family: Arial, sans-serif;
        }
        .slide {
          width: 800px;
          height: 600px;
          page-break-after: always;
        }
        .content {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      </style>
    </head>
    <body>
      ${slides}
    </body>
    </html>
  `;
}

function renderSlideContent(slide: any): string {
  switch (slide.type) {
    case 'text':
      return `<div style="font-size: ${slide.style?.fontSize || '24px'}; color: ${slide.style?.color || '#000'};">${slide.content}</div>`;
    case 'image':
      return `<img src="${slide.content}" style="max-width: 100%; max-height: 100%;" />`;
    case 'shape':
      return `<div style="width: ${slide.content.width}px; height: ${slide.content.height}px; background: ${slide.content.fill}; border-radius: ${slide.content.borderRadius || 0}px;"></div>`;
    default:
      return '';
  }
}
