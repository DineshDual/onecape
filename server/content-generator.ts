// Content Generation Service
import { createCanvas, loadImage } from 'canvas';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

interface PosterConfig {
  title: string;
  subtitle?: string;
  images: string[];
  clientName: string;
  clientLogo?: string;
  primaryColor: string;
  secondaryColor: string;
}

interface VideoConfig {
  beforeImage: string;
  afterImage: string;
  duration: number; // seconds
  music?: boolean;
  text?: string;
}

export class ContentGenerator {
  private uploadDir = path.join(process.cwd(), 'uploads');

  constructor() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  // Generate branded poster
  async createPoster(config: PosterConfig): Promise<string> {
    const canvas = createCanvas(1080, 1080);
    const ctx = canvas.getContext('2d');

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 1080);
    gradient.addColorStop(0, config.primaryColor);
    gradient.addColorStop(1, config.secondaryColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1080);

    // Client name
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(config.clientName, 540, 80);

    // Title
    ctx.font = 'bold 64px Arial';
    ctx.fillText(config.title, 540, 200);

    // Subtitle
    if (config.subtitle) {
      ctx.font = '32px Arial';
      ctx.fillText(config.subtitle, 540, 260);
    }

    // Images grid
    const imageWidth = 300;
    const imageHeight = 300;
    const spacing = 40;
    const startX = (1080 - (2 * imageWidth + spacing)) / 2;

    for (let i = 0; i < config.images.length && i < 4; i++) {
      const x = startX + (i % 2) * (imageWidth + spacing);
      const y = 350 + Math.floor(i / 2) * (imageHeight + spacing);
      
      try {
        const img = await loadImage(config.images[i]);
        ctx.drawImage(img, x, y, imageWidth, imageHeight);
        
        // Add border
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, imageWidth, imageHeight);
      } catch (e) {
        console.error(`Failed to load image ${config.images[i]}:`, e);
        // Fallback: colored rectangle
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(x, y, imageWidth, imageHeight);
        ctx.fillStyle = '#666';
        ctx.font = '16px Arial';
        ctx.fillText(`Image ${i + 1}`, x + imageWidth/2, y + imageHeight/2);
      }
    }

    // Footer
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('@onecape.in', 540, 1050);

    // Save
    const filename = `poster_${Date.now()}.jpg`;
    const filepath = path.join(this.uploadDir, filename);
    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
    fs.writeFileSync(filepath, buffer);

    return `/uploads/${filename}`;
  }

  // Create before/after video
  async createVideo(config: VideoConfig): Promise<string> {
    const filename = `video_${Date.now()}.mp4`;
    const filepath = path.join(this.uploadDir, filename);

    return new Promise((resolve, reject) => {
      ffmpeg()
        .input(config.beforeImage)
        .input(config.afterImage)
        .filterComplex(
          `[0:v]scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1/1,volume=0:enable='between(t,0,${config.duration-1})'[before];` +
          `[1:v]scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1/1,volume=0:enable='between(t,${config.duration},${config.duration*2})'[after];` +
          `[before][after]concat=n=2:v=1:a=0,trim=duration=${config.duration*2}[final]`
        )
        .outputOptions([
          '-c:v libx264',
          '-preset fast',
          '-crf 23',
          '-movflags +faststart'
        ])
        .on('error', reject)
        .on('end', () => resolve(`/uploads/${filename}`))
        .save(filepath);
    });
  }

  // Create carousel
  async createCarousel(images: string[], clientName: string): Promise<string> {
    const canvas = createCanvas(1080, 1080);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, 1080, 1080);

    // Title
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(clientName, 540, 80);

    // Images
    const imageWidth = 300;
    const imageHeight = 300;
    const spacing = 30;
    const startX = (1080 - (3 * imageWidth + 2 * spacing)) / 2;

    for (let i = 0; i < images.length && i < 6; i++) {
      const x = startX + (i % 3) * (imageWidth + spacing);
      const y = 200 + Math.floor(i / 3) * (imageHeight + spacing);
      
      try {
        const img = await loadImage(images[i]);
        ctx.drawImage(img, x, y, imageWidth, imageHeight);
        
        // Add slide number
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(x, y, 40, 40);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.fillText((i + 1).toString(), x + 20, y + 30);
      } catch (e) {
        // Fallback
        ctx.fillStyle = '#333';
        ctx.fillRect(x, y, imageWidth, imageHeight);
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.fillText(`Slide ${i + 1}`, x + imageWidth/2, y + imageHeight/2);
      }
    }

    // Save
    const filename = `carousel_${Date.now()}.jpg`;
    const filepath = path.join(this.uploadDir, filename);
    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
    fs.writeFileSync(filepath, buffer);

    return `/uploads/${filename}`;
  }

  // Analyze image for content suggestions
  async analyzeImage(imagePath: string): Promise<{
    dominantColors: string[];
    aspectRatio: string;
    suggestsCarousel: boolean;
    suggestsVideo: boolean;
  }> {
    // This would use real image analysis, for now return defaults
    return {
      dominantColors: ['#FF6600', '#FFFFFF'],
      aspectRatio: '1:1',
      suggestsCarousel: true,
      suggestsVideo: true
    };
  }
}

