import React from 'react';
import { CVData } from '../../types/cv';

interface TemplateProps {
  data: CVData;
}

export const GeneralCVTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    bioData,
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
    sectionOrder,
    sectionVisibility = {},
    signature
  } = data;

  // Helper to check if a section is visible
  const isVisible = (secKey: string): boolean => {
    if (sectionVisibility[secKey] === false) return false;
    return true;
  };

  // Helper for non-empty text
  const hasText = (val?: string | null): boolean => {
    return Boolean(val && val.trim() !== '');
  };

  const renderSection = (sectionKey: string) => {
    if (!isVisible(sectionKey)) return null;

    switch (sectionKey) {
      case 'summary':
        if (!summary?.trim()) return null;
        return (
          <section key="summary" className="mb-4 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-1 mb-2">
              Career Objective / Summary
            </h2>
            <p className="text-[10pt] leading-relaxed text-slate-800 text-justify">
              {summary}
            </p>
          </section>
        );

      case 'biodata':
        // Check if any biodata field is populated
        const hasBioData = Boolean(
          hasText(bioData?.fatherName) ||
          hasText(bioData?.motherName) ||
          hasText(bioData?.spouseName) ||
          hasText(bioData?.dateOfBirth) ||
          hasText(bioData?.gender) ||
          hasText(bioData?.maritalStatus) ||
          hasText(bioData?.religion) ||
          hasText(bioData?.nationality) ||
          hasText(bioData?.bloodGroup) ||
          hasText(bioData?.nationalId) ||
          hasText(bioData?.height) ||
          hasText(bioData?.presentAddress) ||
          hasText(bioData?.permanentAddress)
        );

        if (!hasBioData) return null;

        const bioItems: { label: string; value?: string }[] = [
          { label: "Father's Name", value: bioData?.fatherName },
          { label: "Mother's Name", value: bioData?.motherName },
          { label: 'Date of Birth', value: bioData?.dateOfBirth },
          { label: 'Gender', value: bioData?.gender },
          { label: 'Marital Status', value: bioData?.maritalStatus },
          { label: 'Religion', value: bioData?.religion },
          { label: 'Nationality', value: bioData?.nationality },
          { label: 'Blood Group', value: bioData?.bloodGroup },
          { label: 'National ID (NID)', value: bioData?.nationalId },
          { label: 'Spouse Name', value: bioData?.spouseName },
          { label: 'Height & Weight', value: bioData?.height },
          { label: 'Present Address', value: bioData?.presentAddress },
          { label: 'Permanent Address', value: bioData?.permanentAddress }
        ].filter(item => hasText(item.value));

        return (
          <section key="biodata" className="mb-4 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-1 mb-2.5">
              Personal Information & Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[9.5pt]">
              {bioItems.map((item, idx) => (
                <div key={idx} className={`flex items-baseline ${item.label.includes('Address') ? 'sm:col-span-2' : ''}`}>
                  <span className="font-bold text-slate-900 w-36 shrink-0">{item.label}</span>
                  <span className="font-bold text-slate-700 mx-1.5">:</span>
                  <span className="text-slate-800 flex-1">{item.value}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'skills':
        const allSkills = [
          ...(skills?.technical || []),
          ...(skills?.tools || []),
          ...(skills?.soft || [])
        ].filter(Boolean);
        if (allSkills.length === 0) return null;

        return (
          <section key="skills" className="mb-4 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-1 mb-2">
              Skills & Competencies
            </h2>
            <div className="text-[9.5pt] text-slate-850 flex flex-wrap items-center gap-x-2 gap-y-1.5">
              {allSkills.map((skill, idx) => (
                <span key={idx} className="inline-flex items-center text-slate-900">
                  <span className="font-medium">{skill}</span>
                  {idx < allSkills.length - 1 && (
                    <span className="text-slate-400 font-bold ml-2">•</span>
                  )}
                </span>
              ))}
            </div>
          </section>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <section key="education" className="mb-4 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-1 mb-2.5">
              Academic Background
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="text-[10pt]">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
                    <span className="text-[9.5pt] font-semibold text-slate-700">{edu.startDate} – {edu.isCurrent ? 'Present' : edu.endDate}</span>
                  </div>
                  <div className="flex justify-between items-baseline text-slate-800 text-[9.5pt]">
                    <span>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</span>
                    {edu.gpa && <span className="font-bold text-slate-900">Result/GPA: {edu.gpa}</span>}
                  </div>
                  {edu.description && (
                    <p className="mt-0.5 text-[9.5pt] text-slate-700 leading-normal">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <section key="experience" className="mb-4 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-1 mb-2.5">
              Work Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="text-[10pt]">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{exp.jobTitle} – <span className="font-semibold text-slate-800">{exp.company}</span></span>
                    <span className="text-[9.5pt] font-semibold text-slate-700">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                  </div>
                  {exp.location && <div className="text-[9.5pt] italic text-slate-600">{exp.location}</div>}
                  {exp.description && <p className="mt-0.5 text-[9.5pt] text-slate-800">{exp.description}</p>}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-[9.5pt] text-slate-800">
                      {exp.bullets.filter(b => b.trim()).map((bullet, idx) => (
                        <li key={idx} className="leading-snug">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <section key="projects" className="mb-4 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-1 mb-2.5">
              Key Projects & Works
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="text-[10pt]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">
                      {proj.name}
                      {proj.link && <span className="font-normal text-slate-600 text-[9pt] ml-2">[{proj.link}]</span>}
                    </span>
                    {proj.date && <span className="text-[9.5pt] text-slate-700 font-semibold">{proj.date}</span>}
                  </div>
                  {proj.technologies && (
                    <div className="text-[9.5pt] italic text-slate-700">
                      Skills/Tools: {proj.technologies}
                    </div>
                  )}
                  {proj.description && <p className="mt-0.5 text-[9.5pt] text-slate-800">{proj.description}</p>}
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-[9.5pt] text-slate-800">
                      {proj.bullets.filter(b => b.trim()).map((bullet, idx) => (
                        <li key={idx} className="leading-snug">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <section key="certifications" className="mb-4 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-1 mb-2">
              Certifications & Training
            </h2>
            <ul className="list-disc list-outside ml-4 space-y-1 text-[10pt] text-slate-800">
              {certifications.map((cert) => (
                <li key={cert.id}>
                  <span className="font-bold text-slate-900">{cert.name}</span>
                  {cert.organization ? ` – ${cert.organization}` : ''}
                  {cert.year ? ` (${cert.year})` : ''}
                  {cert.link && <span className="text-[9pt] text-slate-600 ml-1">[{cert.link}]</span>}
                </li>
              ))}
            </ul>
          </section>
        );

      case 'extracurricular':
        if (!extracurricular || extracurricular.length === 0) return null;
        return (
          <section key="extracurricular" className="mb-4 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-1 mb-2">
              Activities & Social Involvements
            </h2>
            <div className="space-y-2">
              {extracurricular.map((extra) => (
                <div key={extra.id} className="text-[10pt]">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{extra.role}{extra.organization ? `, ${extra.organization}` : ''}</span>
                    <span className="text-[9.5pt] font-semibold text-slate-700">{extra.date}</span>
                  </div>
                  {extra.description && <p className="text-[9.5pt] text-slate-800 mt-0.5">{extra.description}</p>}
                </div>
              ))}
            </div>
          </section>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <section key="languages" className="mb-4 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-1 mb-1.5">
              Language Proficiency
            </h2>
            <p className="text-[10pt] text-slate-800">
              {languages.map(l => `${l.name} (${l.proficiency})`).join(' • ')}
            </p>
          </section>
        );

      case 'awards':
        if (!awards || awards.length === 0) return null;
        return (
          <section key="awards" className="mb-4 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-1 mb-2">
              Awards, Honors & Achievements
            </h2>
            <div className="space-y-1.5 text-[10pt]">
              {awards.map((award) => (
                <div key={award.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">{award.title}</span>
                    {award.issuer ? ` – ${award.issuer}` : ''}
                    {award.description && <p className="text-[9.5pt] text-slate-700 mt-0.5">{award.description}</p>}
                  </div>
                  <span className="text-[9.5pt] text-slate-700 font-semibold shrink-0 ml-2">{award.date}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'references':
        if (references?.availableOnRequest) {
          return (
            <section key="references" className="mb-4 break-inside-avoid">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-1 mb-1">
                References
              </h2>
              <p className="text-[10pt] italic text-slate-700">Professional references available upon request.</p>
            </section>
          );
        }
        if (references?.items && references.items.length > 0) {
          return (
            <section key="references" className="mb-4 break-inside-avoid">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-1 mb-2">
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

        const hasInlineItems = customSec.items.some(it => it.layout === 'inline' || Boolean(it.value));

        return (
          <section key={customSec.id} className="mb-4 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-1 mb-2">
              {customSec.title}
            </h2>

            {hasInlineItems ? (
              <div className="space-y-1 text-[9.5pt]">
                {customSec.items.map((item) => {
                  if (item.layout === 'inline' || item.value) {
                    return (
                      <div key={item.id} className="flex items-baseline">
                        <span className="font-bold text-slate-900 w-40 shrink-0">{item.title}</span>
                        <span className="font-bold text-slate-700 mx-1.5">:</span>
                        <span className="text-slate-800 flex-1">{item.value || item.description}</span>
                      </div>
                    );
                  }
                  return (
                    <div key={item.id} className="py-1">
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span>{item.title} {item.subtitle ? `– ${item.subtitle}` : ''}</span>
                        {item.date && <span className="text-[9.5pt] font-semibold text-slate-700">{item.date}</span>}
                      </div>
                      {item.description && <p className="text-[9.5pt] text-slate-800 mt-0.5">{item.description}</p>}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2 text-[10pt]">
                {customSec.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{item.title} {item.subtitle ? `– ${item.subtitle}` : ''}</span>
                      {item.date && <span className="text-[9.5pt] font-semibold text-slate-700">{item.date}</span>}
                    </div>
                    {item.description && <p className="text-[9.5pt] text-slate-800 mt-0.5">{item.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </section>
        );
    }
  };

  const contactParts: string[] = [];
  if (personalInfo.phone) contactParts.push(personalInfo.phone);
  if (personalInfo.email) contactParts.push(personalInfo.email);
  if (personalInfo.location) contactParts.push(personalInfo.location);
  if (personalInfo.linkedin) contactParts.push(personalInfo.linkedin);
  if (personalInfo.github) contactParts.push(personalInfo.github);
  if (personalInfo.website) contactParts.push(personalInfo.website);

  // Default section sequence for General CV: Personal Details & Bio, Summary, Education, Experience, Skills, Certifications, Activities, Languages, Awards, References
  const effectiveSectionOrder = sectionOrder && sectionOrder.length > 0
    ? sectionOrder
    : ['summary', 'biodata', 'education', 'experience', 'skills', 'certifications', 'extracurricular', 'languages', 'awards', 'references'];

  // Add any custom sections not explicitly listed in sectionOrder
  const allSectionsToRender = [...effectiveSectionOrder];
  if (customSections && customSections.length > 0) {
    customSections.forEach(cs => {
      if (!allSectionsToRender.includes(cs.id) && !allSectionsToRender.includes(cs.title)) {
        allSectionsToRender.push(cs.id);
      }
    });
  }

  // Check if declaration or footer exists
  const hasDeclaration = Boolean(bioData?.declaration && bioData.declaration.trim());
  const hasPlaceDate = Boolean(bioData?.place || bioData?.submissionDate || signature?.date);
  const showPhoto = personalInfo.showPhoto !== false && Boolean(personalInfo.photoUrl);

  return (
    <div className="w-full min-h-[1123px] bg-white text-slate-900 px-12 py-10 font-sans leading-normal box-border flex flex-col justify-between">
      <div>
        {/* Top Clean Header */}
        <header className="flex justify-between items-center pb-3 mb-4 border-b-2 border-slate-900 gap-4">
          <div className={`${showPhoto ? 'text-left flex-1' : 'text-center w-full'}`}>
            <h1 className="text-2xl sm:text-[22pt] font-extrabold uppercase tracking-tight text-slate-950">
              {personalInfo.fullName || 'YOUR FULL NAME'}
            </h1>
            {personalInfo.professionalTitle && (
              <p className="text-xs uppercase tracking-widest font-bold text-slate-700 mt-1">
                {personalInfo.professionalTitle}
              </p>
            )}
            {contactParts.length > 0 && (
              <div className={`text-[9.5pt] text-slate-700 mt-2 flex flex-wrap ${showPhoto ? 'justify-start' : 'justify-center'} items-center gap-x-2.5 gap-y-1`}>
                {contactParts.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <span>{item}</span>
                    {idx < contactParts.length - 1 && <span className="text-slate-400 font-bold">•</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
          {showPhoto && (
            <div className="shrink-0">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                className="w-24 h-28 object-cover rounded border border-slate-400 shadow-xs"
              />
            </div>
          )}
        </header>

        {/* Main Content Sections */}
        <main>
          {allSectionsToRender.map((secKey) => renderSection(secKey))}
        </main>

        {/* Declaration if present */}
        {hasDeclaration && (
          <div className="mt-5 pt-3 border-t border-slate-200 text-[9pt] text-slate-700 italic leading-relaxed break-inside-avoid">
            <p>{bioData?.declaration}</p>
          </div>
        )}
      </div>

      {/* Footer: Place/Date on left & Signature on right */}
      {(hasPlaceDate || Boolean(signature?.enabled)) && (
        <div className="mt-8 pt-4 flex justify-between items-end break-inside-avoid">
          {/* Left: Place & Date */}
          <div className="space-y-1 text-[9.5pt] text-slate-800">
            {bioData?.place && (
              <p><span className="font-bold">Place:</span> {bioData.place}</p>
            )}
            {(bioData?.submissionDate || signature?.date) && (
              <p><span className="font-bold">Date:</span> {bioData?.submissionDate || signature?.date}</p>
            )}
          </div>

          {/* Right: Signature */}
          {Boolean(signature?.enabled) && (
            <div className="text-center min-w-[180px] max-w-[240px]">
              {signature?.signatureImage && (
                <div className="h-10 mb-1 flex items-center justify-center">
                  <img
                    src={signature.signatureImage}
                    alt="Signature"
                    className="max-h-10 max-w-full object-contain"
                  />
                </div>
              )}
              <div className="w-36 border-t border-slate-900 mx-auto mb-1"></div>
              <p className="text-[9.5pt] font-bold text-slate-900 leading-snug">
                {signature?.signerName || personalInfo.fullName || 'Authorized Signature'}
              </p>
              {signature?.signerTitle && (
                <p className="text-[8.5pt] font-medium text-slate-700 leading-tight">
                  {signature.signerTitle}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
