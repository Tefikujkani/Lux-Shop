'use client';

import { useEffect, useRef } from 'react';

export default function SplineViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.98/build/spline-viewer.js';
    document.head.appendChild(script);

    // Create and append the viewer after script loads
    script.onload = () => {
      if (containerRef.current) {
        const viewer = document.createElement('spline-viewer');
        viewer.setAttribute('url', 'https://prod.spline.design/Ngcu8yXUlZ2LVG1l/scene.splinecode');
        viewer.style.width = '100%';
        viewer.style.height = '100%';
        
        // Add styles to hide the watermark
        viewer.style.setProperty('--spline-viewer-watermark', 'none');
        viewer.setAttribute('style', `
          width: 100%;
          height: 100%;
          --spline-viewer-watermark: none;
        `);
        
        containerRef.current.appendChild(viewer);

        // Additional attempt to hide watermark after a short delay
        setTimeout(() => {
          const watermark = containerRef.current?.querySelector('a[href*="spline"]') as HTMLElement | null;
          if (watermark) {
            watermark.style.display = 'none';
          }
        }, 1000);
      }
    };

    // Cleanup
    return () => {
      script.remove();
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full rounded-xl overflow-hidden"
      style={{ '--spline-viewer-watermark': 'none' } as any}
    />
  );
} 