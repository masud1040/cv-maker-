import React from 'react';
import { CVData } from '../../types/cv';

interface TemplateProps {
  data: CVData;
}

export const ATSStudentTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, education, experience, projects, skills, certifications, extracurricular, languages, awards, references, customSections, sectionOrder } = data;

  const renderSection = (sectionKey: string) => {
    switch (sectionKey) {
      case 'summary':
        if (!summary?.trim()) return null;
        return (
          <section key="summary" className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-[10pt] leading-relaxed text-slate-800 text-justify">
              {summary}
            </p>
          </section>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <section key="education" className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="text-[10pt]">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</span>
                    <span className="text-[9.5pt] font-normal text-slate-700">{edu.startDate} – {edu.isCurrent ? 'Present' : edu.endDate}</span>
                  </div>
                  <div className="flex justify-between items-baseline italic text-slate-800">
                    <span>{edu.degree} in {edu.fieldOfStudy}</span>
                    {edu.gpa && <span className="font-semibold text-slate-900 text-[9.5pt]">GPA: {edu.gpa}</span>}
                  </div>
                  {edu.description && (
                    <p className="mt-1 text-[9.5pt] text-slate-700 leading-normal">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case 'skills':
        const hasTech = skills?.technical && skills.technical.length > 0;
        const hasSoft = skills?.soft && skills.soft.length > 0;
        const hasTools = skills?.tools && skills.tools.length > 0;
        if (!hasTech && !hasSoft && !hasTools) return null;

        return (
          <section key="skills" className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Technical & Soft Skills
            </h2>
            <div className="text-[10pt] space-y-1 text-slate-800">
              {hasTech && (
                <div>
                  <span className="font-bold text-slate-900">Technical Skills: </span>
                  <span>{skills.technical.join(', ')}</span>
                </div>
              )}
              {hasTools && (
                <div>
                  <span className="font-bold text-slate-900">Developer Tools & Platforms: </span>
                  <span>{skills.tools.join(', ')}</span>
                </div>
              )}
              {hasSoft && (
                <div>
                  <span className="font-bold text-slate-900">Soft Skills & Competencies: </span>
                  <span>{skills.soft.join(', ')}</span>
                </div>
              )}
            </div>
          </section>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <section key="projects" className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Academic & Technical Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="text-[10pt]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">
                      {proj.name}
                      {proj.link && (
                        <span className="font-normal text-slate-600 text-[9pt] ml-2">[{proj.link}]</span>
                      )}
                    </span>
                    {proj.date && <span className="text-[9.5pt] text-slate-700">{proj.date}</span>}
                  </div>
                  {proj.technologies && (
                    <div className="text-[9.5pt] italic text-slate-700">
                      Technologies: {proj.technologies}
                    </div>
                  )}
                  {proj.description && (
                    <p className="mt-0.5 text-[9.5pt] text-slate-800">{proj.description}</p>
                  )}
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-[9.5pt] text-slate-800 pl-1">
                      {proj.bullets.filter(b => b.trim()).map((bullet, idx) => (
                        <li key={idx} className="leading-tight">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <section key="experience" className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Work & Internship Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="text-[10pt]">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{exp.jobTitle} – <span className="font-semibold text-slate-800">{exp.company}</span></span>
                    <span className="text-[9.5pt] font-normal text-slate-700">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                  </div>
                  {exp.location && <div className="text-[9.5pt] italic text-slate-600">{exp.location}</div>}
                  {exp.description && <p className="mt-0.5 text-[9.5pt] text-slate-800">{exp.description}</p>}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-[9.5pt] text-slate-800 pl-1">
                      {exp.bullets.filter(b => b.trim()).map((bullet, idx) => (
                        <li key={idx} className="leading-tight">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case 'extracurricular':
        if (!extracurricular || extracurricular.length === 0) return null;
        return (
          <section key="extracurricular" className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Leadership & Extracurricular Activities
            </h2>
            <div className="space-y-2">
              {extracurricular.map((extra) => (
                <div key={extra.id} className="text-[10pt]">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{extra.role}, <span className="font-semibold text-slate-800">{extra.organization}</span></span>
                    <span className="text-[9.5pt] font-normal text-slate-700">{extra.date}</span>
                  </div>
                  {extra.description && <p className="text-[9.5pt] text-slate-800 mt-0.5">{extra.description}</p>}
                </div>
              ))}
            </div>
          </section>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <section key="certifications" className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Certifications & Training
            </h2>
            <ul className="list-disc list-inside space-y-1 text-[10pt] text-slate-800">
              {certifications.map((cert) => (
                <li key={cert.id}>
                  <span className="font-semibold text-slate-900">{cert.name}</span> – {cert.organization} ({cert.year})
                  {cert.link && <span className="text-[9pt] text-slate-600 ml-1">[{cert.link}]</span>}
                </li>
              ))}
            </ul>
          </section>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <section key="languages" className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Languages
            </h2>
            <p className="text-[10pt] text-slate-800">
              {languages.map(l => `${l.name} (${l.proficiency})`).join(' • ')}
            </p>
          </section>
        );

      case 'awards':
        if (!awards || awards.length === 0) return null;
        return (
          <section key="awards" className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Honors & Awards
            </h2>
            <div className="space-y-1.5 text-[10pt]">
              {awards.map((award) => (
                <div key={award.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-slate-900">{award.title}</span> – <span className="text-slate-800">{award.issuer}</span>
                    {award.description && <p className="text-[9.5pt] text-slate-700 mt-0.5">{award.description}</p>}
                  </div>
                  <span className="text-[9.5pt] text-slate-700 font-medium shrink-0 ml-2">{award.date}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'references':
        if (references?.availableOnRequest) {
          return (
            <section key="references" className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1">
                References
              </h2>
              <p className="text-[10pt] italic text-slate-700">Professional references available upon request.</p>
            </section>
          );
        }
        if (references?.items && references.items.length > 0) {
          return (
            <section key="references" className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                References
              </h2>
              <div className="grid grid-cols-2 gap-3 text-[10pt]">
                {references.items.map((ref) => (
                  <div key={ref.id} className="text-slate-800">
                    <p className="font-bold text-slate-900">{ref.name}</p>
                    <p className="text-[9.5pt] text-slate-700">{ref.title}, {ref.company}</p>
                    {ref.email && <p className="text-[9pt] text-slate-600">{ref.email}</p>}
                    {ref.phone && <p className="text-[9pt] text-slate-600">{ref.phone}</p>}
                  </div>
                ))}
              </div>
            </section>
          );
        }
        return null;

      default:
        // Handle custom sections
        const customSec = customSections?.find(cs => cs.id === sectionKey || cs.title.toLowerCase() === sectionKey.toLowerCase());
        if (!customSec || !customSec.items || customSec.items.length === 0) return null;
        return (
          <section key={customSec.id} className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              {customSec.title}
            </h2>
            <div className="space-y-2 text-[10pt]">
              {customSec.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{item.title} {item.subtitle ? `– ${item.subtitle}` : ''}</span>
                    {item.date && <span className="text-[9.5pt] font-normal text-slate-700">{item.date}</span>}
                  </div>
                  {item.description && <p className="text-[9.5pt] text-slate-800 mt-0.5">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        );
    }
  };

  // Contact line elements array
  const contactParts: string[] = [];
  if (personalInfo.phone) contactParts.push(personalInfo.phone);
  if (personalInfo.email) contactParts.push(personalInfo.email);
  if (personalInfo.location) contactParts.push(personalInfo.location);
  if (personalInfo.linkedin) contactParts.push(personalInfo.linkedin);
  if (personalInfo.github) contactParts.push(personalInfo.github);
  if (personalInfo.website) contactParts.push(personalInfo.website);

  return (
    <div className="w-full h-full bg-white text-slate-900 p-8 sm:p-10 font-sans leading-normal">
      {/* Centered ATS Header */}
      <header className="text-center pb-4 mb-4 border-b-2 border-slate-900">
        <h1 className="text-2xl font-bold uppercase tracking-tight text-slate-950">
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        {personalInfo.professionalTitle && (
          <p className="text-xs uppercase tracking-widest font-semibold text-slate-700 mt-1">
            {personalInfo.professionalTitle}
          </p>
        )}
        {contactParts.length > 0 && (
          <div className="text-[9.5pt] text-slate-700 mt-2 flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
            {contactParts.map((item, idx) => (
              <React.Fragment key={idx}>
                <span>{item}</span>
                {idx < contactParts.length - 1 && <span className="text-slate-400">•</span>}
              </React.Fragment>
            ))}
          </div>
        )}
      </header>

      {/* Render sections according to sectionOrder */}
      <main>
        {sectionOrder.map((secKey) => renderSection(secKey))}
      </main>
    </div>
  );
};
