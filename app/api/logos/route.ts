import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const logosDir = path.join(process.cwd(), 'public', 'logos');
  const categories = ['ai-agentic', 'backend', 'frontend', 'tools'];
  const result: Record<string, Array<{ src: string; alt: string; title: string }>> = {
    'ai-agentic': [],
    backend: [],
    frontend: [],
    tools: [],
  };

  if (!fs.existsSync(logosDir)) {
    return NextResponse.json(result);
  }

  for (const cat of categories) {
    let targetDir = path.join(logosDir, cat);
    if (!fs.existsSync(targetDir)) {
      const capitalized = cat.charAt(0).toUpperCase() + cat.slice(1);
      targetDir = path.join(logosDir, capitalized);
    }

    if (fs.existsSync(targetDir)) {
      const files = fs.readdirSync(targetDir);
      const imageFiles = files.filter((f) => /\.(png|jpe?g|svg|webp|gif|avif)$/i.test(f));
      const actualFolderName = path.basename(targetDir);

      result[cat] = imageFiles.map((file) => {
        const titleName = file
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]/g, ' ')
          .replace(/([a-z])([A-Z])/g, '$1 $2');

        return {
          src: `/logos/${actualFolderName}/${file}`,
          alt: titleName,
          title: titleName,
        };
      });
    }
  }

  return NextResponse.json(result);
}
