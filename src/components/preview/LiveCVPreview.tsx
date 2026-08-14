import React, { useRef, useState, useEffect } from 'react';
import { CVData } from '../../types/cv';
import { ATSStudentTemplate } from './ATSStudentTemplate';
import { ATSProfessionalTemplate } from './ATSProfessionalTemplate';
import { HRProfessionalTemplate } from './HRProfessionalTemplate';
import { ModernTwoColumnTemplate } from './ModernTwoColumnTemplate';
import { DeveloperCleanTemplate } from './DeveloperCleanTemplate';
import { JobBioDataTemplate } from './JobBioDataTemplate';

interface LiveCVPreviewProps {
  data: CVData;
  scale?: number;
  interactive?: boolean;
}

export const LiveCVPreview: React.FC<LiveCVPreviewProps> = ({ data, scale = 1 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const [autoscale, setAutoscale] = useState<number>(scale);
  const [contentHeight, setContentHeight] = useState<number>(1123);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 16; // 16px padding clearance
        if (containerWidth > 0) {
          const baseWidth = 794;
          const targetWidth = baseWidth * scale;
          if (containerWidth < targetWidth) {
            const fittedScale = Math.max(0.35, containerWidth / baseWidth);
            setAutoscale(fittedScale);
          } else {
            setAutoscale(scale);
          }
        }
      }

      if (paperRef.current) {
        const h = paperRef.current.scrollHeight;
        if (h > 0) {
          setContentHeight(Math.max(1123, h));
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const observer = new ResizeObserver(updateDimensions);
    if (paperRef.current) {
      observer.observe(paperRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateDimensions);
      observer.disconnect();
    };
  }, [scale, data]);

  const renderTemplate = () => {
    switch (data.templateId) {
      case 'ats-student':
        return <ATSStudentTemplate data={data} />;
      case 'ats-professional':
        return <ATSProfessionalTemplate data={data} />;
      case 'hr-professional':
        return <HRProfessionalTemplate data={data} />;
      case 'modern-two-column':
        return <ModernTwoColumnTemplate data={data} />;
      case 'developer-clean':
        return <DeveloperCleanTemplate data={data} />;
      case 'job-biodata':
        return <JobBioDataTemplate data={data} />;
      default:
        return <ATSStudentTemplate data={data} />;
    }
  };

  // Font size scale class
  const getScaleClass = () => {
    switch (data.fontSize) {
      case 'compact':
        return 'text-[90%] leading-tight';
      case 'spacious':
        return 'text-[108%] leading-relaxed';
      default:
        return 'text-[100%] leading-normal';
    }
  };

  const effectiveScale = autoscale;
  const paperWidth = 794;
  const paperMinHeight = contentHeight;
  const scaledWidth = paperWidth * effectiveScale;
  const scaledHeight = paperMinHeight * effectiveScale;

  return (
    <div ref={containerRef} className="flex justify-center w-full py-2 overflow-x-hidden">
      {/* Wrapper with exact scaled dimensions so container doesn't overflow or collapse */}
      <div
        style={{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
          position: 'relative'
        }}
        className="shrink-0 transition-all duration-200"
      >
        {/* A4 Paper Canvas */}
        <div
          ref={paperRef}
          data-pdf-content="true"
          className={`bg-white shadow-xl rounded-sm border border-zinc-200 text-zinc-900 ${getScaleClass()}`}
          style={{
            width: `${paperWidth}px`,
            minHeight: '1123px',
            height: 'auto',
            boxSizing: 'border-box',
            transform: `scale(${effectiveScale})`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          {renderTemplate()}

          {/* Visual Page 1 / Page 2 boundary indicator for live editor */}
          {contentHeight > 1130 && (
            <div
              className="absolute left-0 right-0 pointer-events-none z-10 flex items-center justify-between select-none no-print"
              style={{ top: '1123px' }}
            >
              <div className="border-b-2 border-dashed border-red-400 dark:border-red-500 w-full relative">
                <span className="absolute right-3 -top-3 bg-red-600 text-white text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                  Page 1 / Page 2 Break
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

