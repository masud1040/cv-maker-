import React from 'react';
import { CVData } from '../../types/cv';

interface TemplateProps {
  data: CVData;
}

export const DeveloperCleanTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    summary,
    education,
    experience,
    projects,
    skills,
    certifications,
    extracurricular,
    languages,
    awards,
    references,
    customSections,
    sectionOrder
  } = data;

  const renderSection = (sectionKey: string) => {
    switch (sectionKey) {
      case 'summary':
        if (!summary?.trim()) return null;
        return (
          <section key="summary" className="mb-3.5 break-inside-avoid">
            <h2 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-1.5">
              Professional Summary
            </h2>
            <p className="text-[8.5pt] leading-relaxed text-slate-800 text-justify">
              {summary}
            </p>
          </section>
        );

      case 'skills':
        const hasTech = skills?.technical && skills.technical.length > 0;
        const hasTools = skills?.tools && skills.tools.length > 0;
        const hasSoft = skills?.soft && skills.soft.length > 0;
        if (!hasTech && !hasTools && !hasSoft) return null;

        return (
          <section key="skills" className="mb-3.5 break-inside-avoid">
            <h2 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-1.5">
              Technical Skills
            </h2>
            <div className="text-[8.5pt] space-y-1 text-slate-800">
              {hasTech && (
                <div className="space-y-0.5">
                  {skills.technical.map((item, idx) => {
                    if (item.includes(':')) {
                      const [cat, val] = item.split(':');
                      return (
                        <div key={idx} className="leading-tight">
                          <span className="font-bold text-slate-900">{cat.trim()}: </span>
                          <span>{val.trim()}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                  {!skills.technical.some(i => i.includes(':')) && (
                    <div className="leading-tight">
                      <span className="font-bold text-slate-900">Technical Skills: </span>
                      <span>{skills.technical.join(', ')}</span>
                    </div>
                  )}
                </div>
              )}

              {hasTools && (
                <div className="leading-tight">
                  <span className="font-bold text-slate-900">Tools & Platforms: </span>
                  <span>{skills.tools.join(', ')}</span>
                </div>
              )}

              {hasSoft && (
                <div className="leading-tight">
                  <span className="font-bold text-slate-900">Soft Skills: </span>
                  <span>{skills.soft.join(', ')}</span>
                </div>
              )}
            </div>
          </section>
        );

      case 'projects':
        const validProjects = projects?.filter(p => p.name && p.name.trim() !== '');
        if (!validProjects || validProjects.length === 0) return null;

        return (
          <section key="projects" className="mb-3.5 break-inside-avoid">
            <h2 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
              Projects
            </h2>
            <div className="space-y-2.5">
              {validProjects.map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[9pt] font-bold text-slate-900">
                      {proj.name}
                    </h3>
                    {proj.link ? (
                      <span className="text-[8pt] font-semibold text-slate-700">
                        [{proj.link}]
                      </span>
                    ) : proj.date ? (
                      <span className="text-[8pt] font-semibold text-slate-700">{proj.date}</span>
                    ) : null}
                  </div>

                  {proj.technologies && (
                    <p className="text-[8.5pt] italic text-slate-700">
                      <span className="font-bold not-italic text-slate-900">Tech stack: </span>
                      {proj.technologies}
                    </p>
                  )}

                  {proj.bullets && proj.bullets.length > 0 ? (
                    <ul className="list-disc list-outside ml-3.5 text-[8pt] text-slate-800 space-y-0.5 mt-0.5">
                      {proj.bullets.filter(b => b && b.trim() !== '').map((bullet, idx) => (
                        <li key={idx} className="leading-snug">{bullet}</li>
                      ))}
                    </ul>
                  ) : proj.description ? (
                    <p className="text-[8pt] text-slate-800 leading-snug mt-0.5">{proj.description}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        );

      case 'experience':
        const validExp = experience?.filter(e => (e.jobTitle && e.jobTitle.trim() !== '') || (e.company && e.company.trim() !== ''));
        if (!validExp || validExp.length === 0) return null;

        return (
          <section key="experience" className="mb-3.5 break-inside-avoid">
            <h2 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
              Experience (Optional)
            </h2>
            <div className="space-y-2.5">
              {validExp.map((exp) => (
                <div key={exp.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[9pt] font-bold text-slate-900">
                      {exp.jobTitle}{exp.company ? `, ${exp.company}` : ''}
                    </h3>
                    <span className="text-[8pt] font-semibold text-slate-700">
                      {exp.startDate} {exp.endDate || exp.isCurrent ? `– ${exp.isCurrent ? 'Present' : exp.endDate}` : ''}
                    </span>
                  </div>
                  {exp.bullets && exp.bullets.length > 0 ? (
                    <ul className="list-disc list-outside ml-3.5 text-[8pt] text-slate-800 space-y-0.5 mt-0.5">
                      {exp.bullets.filter(b => b && b.trim() !== '').map((bullet, idx) => (
                        <li key={idx} className="leading-snug">{bullet}</li>
                      ))}
                    </ul>
                  ) : exp.description ? (
                    <p className="text-[8pt] text-slate-800 leading-snug mt-0.5">{exp.description}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        );

      case 'education':
        const validEdu = education?.filter(e => (e.institution && e.institution.trim() !== '') || (e.degree && e.degree.trim() !== ''));
        if (!validEdu || validEdu.length === 0) return null;

        return (
          <section key="education" className="mb-3.5 break-inside-avoid">
            <h2 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
              Education
            </h2>
            <div className="space-y-2">
              {validEdu.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[9pt] font-bold text-slate-900">
                      {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}, {edu.institution}
                    </h3>
                    <span className="text-[8pt] font-semibold text-slate-700">
                      {edu.startDate} {edu.endDate ? `– ${edu.endDate}` : ''}
                    </span>
                  </div>
                  {(edu.gpa || edu.description) && (
                    <div className="text-[8pt] text-slate-700 leading-snug">
                      {edu.gpa && <span className="font-semibold text-slate-900 mr-2">CGPA: {edu.gpa}</span>}
                      {edu.description && <span>{edu.description}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case 'certifications':
        const validCerts = certifications?.filter(c => c.name && c.name.trim() !== '');
        if (!validCerts || validCerts.length === 0) return null;

        return (
          <section key="certifications" className="mb-3.5 break-inside-avoid">
            <h2 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
              Certifications & Training
            </h2>
            <ul className="list-disc list-outside ml-3.5 text-[8pt] text-slate-800 space-y-1">
              {validCerts.map((cert) => (
                <li key={cert.id} className="leading-snug">
                  <span className="font-bold text-slate-900">{cert.name}</span>
                  {cert.organization ? ` — ${cert.organization}` : ''}
                  {cert.year ? ` (${cert.year})` : ''}
                  {cert.link ? ` [${cert.link}]` : ''}
                </li>
              ))}
            </ul>
          </section>
        );

      case 'extracurricular':
        const validExtra = extracurricular?.filter(e => e.role || e.organization);
        if (!validExtra || validExtra.length === 0) return null;

        return (
          <section key="extracurricular" className="mb-3.5 break-inside-avoid">
            <h2 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
              Achievements & Extracurricular
            </h2>
            <div className="space-y-1.5">
              {validExtra.map((extra) => (
                <div key={extra.id} className="text-[8pt] text-slate-800 space-y-0.5">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{extra.role}{extra.organization ? `, ${extra.organization}` : ''}</span>
                    {extra.date && <span className="font-semibold text-slate-700">{extra.date}</span>}
                  </div>
                  {extra.description && <p className="text-[8pt] text-slate-800 leading-snug">{extra.description}</p>}
                </div>
              ))}
            </div>
          </section>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <section key="languages" className="mb-3.5 break-inside-avoid">
            <h2 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-1.5">
              Languages
            </h2>
            <p className="text-[8.5pt] text-slate-800">
              {languages.map(l => `${l.name} (${l.proficiency})`).join(' • ')}
            </p>
          </section>
        );

      case 'awards':
        if (!awards || awards.length === 0) return null;
        return (
          <section key="awards" className="mb-3.5 break-inside-avoid">
            <h2 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
              Honors & Awards
            </h2>
            <ul className="list-disc list-outside ml-3.5 text-[8pt] text-slate-800 space-y-1">
              {awards.map((award) => (
                <li key={award.id} className="leading-snug">
                  <span className="font-bold text-slate-900">{award.title}</span>
                  {award.issuer ? ` — ${award.issuer}` : ''}
                  {award.date ? ` (${award.date})` : ''}
                  {award.description && <p className="text-[7.5pt] text-slate-600 mt-0.5">{award.description}</p>}
                </li>
              ))}
            </ul>
          </section>
        );

      case 'references':
        if (references?.availableOnRequest) {
          return (
            <section key="references" className="mb-3.5 break-inside-avoid">
              <h2 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-1">
                References
              </h2>
              <p className="text-[8pt] italic text-slate-700">Professional references available upon request.</p>
            </section>
          );
        }
        if (references?.items && references.items.length > 0) {
          return (
            <section key="references" className="mb-3.5 break-inside-avoid">
              <h2 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
                References
              </h2>
              <div className="grid grid-cols-2 gap-2 text-[8pt]">
                {references.items.map((ref) => (
                  <div key={ref.id} className="text-slate-800">
                    <p className="font-bold text-slate-900">{ref.name}</p>
                    <p className="text-slate-700">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                    {ref.email && <p className="text-[7.5pt] text-slate-600 break-all">{ref.email}</p>}
                  </div>
                ))}
              </div>
            </section>
          );
        }
        return null;

      default:
        const customSec = customSections?.find(cs => cs.id === sectionKey || cs.title.toLowerCase() === sectionKey.toLowerCase());
        if (!customSec || !customSec.items || customSec.items.length === 0) return null;
        return (
          <section key={customSec.id} className="mb-3.5 break-inside-avoid">
            <h2 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
              {customSec.title}
            </h2>
            <div className="space-y-2 text-[8pt]">
              {customSec.items.map((item) => (
                <div key={item.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{item.title} {item.subtitle ? `– ${item.subtitle}` : ''}</span>
                    {item.date && <span className="font-semibold text-slate-700">{item.date}</span>}
                  </div>
                  {item.description && <p className="text-slate-800 leading-snug">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        );
    }
  };

  // Build contact inline bar
  const contactParts: string[] = [];
  if (personalInfo.location) contactParts.push(personalInfo.location);
  if (personalInfo.phone) contactParts.push(personalInfo.phone);
  if (personalInfo.email) contactParts.push(personalInfo.email);
  if (personalInfo.linkedin) contactParts.push(personalInfo.linkedin);
  if (personalInfo.github) contactParts.push(personalInfo.github);
  if (personalInfo.website) contactParts.push(personalInfo.website);

  const defaultOrder = ['summary', 'skills', 'projects', 'experience', 'education', 'certifications', 'extracurricular', 'languages', 'awards', 'references'];
  const sectionsToRender = sectionOrder.length > 0 ? sectionOrder : defaultOrder;

  return (
    <div className="w-[794px] min-h-[1123px] bg-white text-slate-900 px-8 py-6 font-sans leading-relaxed box-border flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <header className="mb-3 pb-2 border-b-2 border-slate-900">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
            {personalInfo.fullName || 'YOUR FULL NAME'}
          </h1>

          {personalInfo.professionalTitle && (
            <p className="text-[9pt] font-bold text-slate-700 tracking-wide uppercase mt-0.5">
              {personalInfo.professionalTitle}
            </p>
          )}

          {contactParts.length > 0 && (
            <div className="text-[8.5pt] text-slate-800 flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-2">
              {contactParts.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span>{item}</span>
                  {idx < contactParts.length - 1 && <span className="text-slate-400 font-bold">|</span>}
                </React.Fragment>
              ))}
            </div>
          )}
        </header>

        {/* Main Sections */}
        <main>
          {sectionsToRender.map((secKey) => renderSection(secKey))}
        </main>
      </div>

      {/* Signature Block at Bottom */}
      {Boolean(data.signature?.enabled) && (
        <div className="mt-4 pt-2 flex justify-end break-inside-avoid">
          <div className="text-center min-w-[160px] max-w-[220px]">
            {data.signature?.signatureImage && (
              <div className="h-8 mb-1 flex items-center justify-center">
                <img
                  src={data.signature.signatureImage}
                  alt="Signature"
                  className="max-h-8 max-w-full object-contain"
                />
              </div>
            )}
            <div className="w-32 border-t border-slate-900 mx-auto mb-1"></div>
            <p className="text-[9pt] font-bold text-slate-900 leading-snug">
              {data.signature?.signerName || personalInfo.fullName || 'Applicant Signature'}
            </p>
            {data.signature?.signerTitle && (
              <p className="text-[8pt] font-medium text-slate-700 leading-tight">
                {data.signature.signerTitle}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
