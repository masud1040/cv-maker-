import React from 'react';
import { CVData } from '../../types/cv';
import { Phone, Mail, Linkedin, MapPin, Github, Globe } from 'lucide-react';

interface ModernTwoColumnTemplateProps {
  data: CVData;
}

export const ModernTwoColumnTemplate: React.FC<ModernTwoColumnTemplateProps> = ({ data }) => {
  const {
    personalInfo,
    bioData,
    summary,
    education,
    experience,
    projects,
    skills,
    certifications,
    languages,
    awards,
    references,
    customSections = [],
    sectionOrder = [],
    sectionVisibility = {}
  } = data;

  const isVisible = (secKey: string): boolean => {
    if (sectionVisibility[secKey] === false) return false;
    return true;
  };

  const hasText = (val?: string | null): boolean => {
    return Boolean(val && val.trim() !== '');
  };

  const hasContactInfo = Boolean(
    personalInfo.phone ||
    personalInfo.email ||
    personalInfo.linkedin ||
    personalInfo.location ||
    personalInfo.github ||
    personalInfo.website
  );

  const hasTechnicalSkills = skills?.technical && skills.technical.length > 0;
  const hasSoftSkills = skills?.soft && skills.soft.length > 0;
  const hasCerts = Boolean(certifications && certifications.filter(c => c.name && c.name.trim() !== '').length > 0);
  const hasLanguages = languages && languages.length > 0;
  const hasReferences = references && (references.availableOnRequest || (references.items && references.items.length > 0));

  const hasBioData = Boolean(
    hasText(bioData?.fatherName) ||
    hasText(bioData?.motherName) ||
    hasText(bioData?.dateOfBirth) ||
    hasText(bioData?.gender) ||
    hasText(bioData?.maritalStatus) ||
    hasText(bioData?.religion) ||
    hasText(bioData?.nationality) ||
    hasText(bioData?.bloodGroup) ||
    hasText(bioData?.nationalId) ||
    hasText(bioData?.presentAddress) ||
    hasText(bioData?.permanentAddress)
  );

  const bioItems = [
    { label: "Father's Name", value: bioData?.fatherName },
    { label: "Mother's Name", value: bioData?.motherName },
    { label: 'Date of Birth', value: bioData?.dateOfBirth },
    { label: 'Gender', value: bioData?.gender },
    { label: 'Marital Status', value: bioData?.maritalStatus },
    { label: 'Religion', value: bioData?.religion },
    { label: 'Nationality', value: bioData?.nationality },
    { label: 'Blood Group', value: bioData?.bloodGroup },
    { label: 'National ID', value: bioData?.nationalId },
    { label: 'Present Address', value: bioData?.presentAddress },
    { label: 'Permanent Address', value: bioData?.permanentAddress }
  ].filter(item => hasText(item.value));

  // Default section order if missing
  const defaultOrder = ['education', 'experience', 'projects', 'biodata', 'awards', 'custom'];
  const baseOrder = sectionOrder.length > 0 ? sectionOrder : defaultOrder;
  const rightSectionsToRender = [...baseOrder];
  if (customSections && customSections.length > 0) {
    customSections.forEach(cs => {
      if (!rightSectionsToRender.includes(cs.id) && !rightSectionsToRender.includes(cs.title)) {
        rightSectionsToRender.push(cs.id);
      }
    });
  }

  return (
    <div className="w-[794px] min-h-[1123px] bg-white text-slate-800 px-8 py-6 font-sans leading-relaxed box-border flex flex-col justify-between">
      <div>
        {/* Top Header Box (Soft Light-Blue Card) */}
        <header className="bg-[#eef4ff] rounded-xl p-4 mb-4 border border-blue-100 flex items-start justify-between gap-5">
          <div className="flex-1 space-y-1.5">
            {personalInfo.fullName && (
              <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">
                {personalInfo.fullName}
              </h1>
            )}

            {personalInfo.professionalTitle && (
              <p className="text-[8.5pt] font-bold text-slate-700 tracking-wider uppercase border-b border-blue-200/80 pb-1 inline-block">
                {personalInfo.professionalTitle}
              </p>
            )}

            {isVisible('summary') && summary && (
              <p className="text-[8.5pt] text-slate-700 leading-snug mt-1">
                {summary}
              </p>
            )}
          </div>

          {personalInfo.photoUrl && (
            <div className="shrink-0">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName || 'Profile'}
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
              />
            </div>
          )}
        </header>

        {/* 2-Column Body Grid */}
        <div className="grid grid-cols-12 gap-5 items-start">
          {/* Left Column (Light Gray/Blue Card) */}
          <aside className="col-span-4 bg-[#f1f5f9] p-3.5 rounded-xl space-y-3.5 border border-slate-200/60">
            {/* Contact Information */}
            {hasContactInfo && (
              <div>
                <h3 className="text-[9pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Contact Information
                </h3>
                <ul className="space-y-1.5 text-[8.5pt] text-slate-700">
                  {personalInfo.phone && (
                    <li className="flex items-center gap-1.5 break-all">
                      <Phone className="w-3 h-3 text-slate-600 shrink-0" />
                      <span>{personalInfo.phone}</span>
                    </li>
                  )}
                  {personalInfo.email && (
                    <li className="flex items-center gap-1.5 break-all">
                      <Mail className="w-3 h-3 text-slate-600 shrink-0" />
                      <span>{personalInfo.email}</span>
                    </li>
                  )}
                  {personalInfo.linkedin && (
                    <li className="flex items-center gap-1.5 break-all">
                      <Linkedin className="w-3 h-3 text-slate-600 shrink-0" />
                      <span>{personalInfo.linkedin}</span>
                    </li>
                  )}
                  {personalInfo.location && (
                    <li className="flex items-center gap-1.5 break-all">
                      <MapPin className="w-3 h-3 text-slate-600 shrink-0" />
                      <span>{personalInfo.location}</span>
                    </li>
                  )}
                  {personalInfo.github && (
                    <li className="flex items-center gap-1.5 break-all">
                      <Github className="w-3 h-3 text-slate-600 shrink-0" />
                      <span>{personalInfo.github}</span>
                    </li>
                  )}
                  {personalInfo.website && (
                    <li className="flex items-center gap-1.5 break-all">
                      <Globe className="w-3 h-3 text-slate-600 shrink-0" />
                      <span>{personalInfo.website}</span>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Technical & Soft Skills */}
            {isVisible('skills') && (hasTechnicalSkills || hasSoftSkills) && (
              <div>
                <h3 className="text-[9pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Skills
                </h3>
                <ul className="space-y-1 text-[8.5pt] text-slate-700 list-disc list-inside">
                  {skills.technical?.map((skill, idx) => (
                    <li key={`tech-${idx}`} className="leading-snug">{skill}</li>
                  ))}
                  {skills.soft?.map((skill, idx) => (
                    <li key={`soft-${idx}`} className="leading-snug">{skill}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Training & Certification */}
            {isVisible('certifications') && hasCerts && (
              <div>
                <h3 className="text-[9pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Training & Certification
                </h3>
                <ul className="space-y-1.5 text-[8pt] text-slate-700">
                  {certifications.map((cert) => (
                    <li key={cert.id} className="leading-tight">
                      <p className="font-bold text-slate-900">{cert.name}</p>
                      <p className="text-slate-600">
                        {cert.organization} {cert.year ? `(${cert.year})` : ''}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Languages */}
            {isVisible('languages') && hasLanguages && (
              <div>
                <h3 className="text-[9pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Languages
                </h3>
                <ul className="space-y-1 text-[8.5pt] text-slate-700">
                  {languages.map((lang) => (
                    <li key={lang.id} className="flex justify-between items-center">
                      <span className="font-medium text-slate-800">{lang.name}</span>
                      <span className="text-slate-500 text-[7.5pt]">({lang.proficiency})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* References */}
            {isVisible('references') && hasReferences && (
              <div>
                <h3 className="text-[9pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  References
                </h3>
                {references.availableOnRequest ? (
                  <p className="text-[8pt] text-slate-600 italic">Available upon request.</p>
                ) : (
                  <div className="space-y-1.5 text-[8pt] text-slate-700">
                    {references.items?.map((ref) => (
                      <div key={ref.id}>
                        <p className="font-bold text-slate-900">{ref.name}</p>
                        {ref.title && <p className="text-slate-600">{ref.title}</p>}
                        {ref.company && <p className="text-slate-600">{ref.company}</p>}
                        {ref.email && <p className="text-slate-500 text-[7.5pt] break-all">{ref.email}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </aside>

          {/* Right Main Column */}
          <main className="col-span-8 space-y-3.5">
            {rightSectionsToRender.map((secKey) => {
              if (!isVisible(secKey)) return null;

              if (secKey === 'biodata' && hasBioData) {
                return (
                  <section key="biodata" className="break-inside-avoid">
                    <h2 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-0.5 mb-2">
                      Personal Details
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[8.5pt]">
                      {bioItems.map((item, idx) => (
                        <div key={idx} className={`flex items-baseline ${item.label.includes('Address') ? 'sm:col-span-2' : ''}`}>
                          <span className="font-bold text-slate-900 w-32 shrink-0">{item.label}</span>
                          <span className="font-bold text-slate-700 mx-1">:</span>
                          <span className="text-slate-800 flex-1">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }

              if (secKey === 'education' && education && education.length > 0) {
                return (
                  <section key="education" className="break-inside-avoid">
                    <h2 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-0.5 mb-2">
                      Education
                    </h2>
                    <div className="space-y-2">
                      {education.map((edu) => (
                        <div key={edu.id} className="space-y-0.5">
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-[9pt] font-bold text-slate-900">{edu.institution}</h3>
                            <span className="text-[8pt] font-semibold text-slate-600">
                              {edu.startDate} {edu.endDate ? `– ${edu.endDate}` : ''}
                            </span>
                          </div>
                          <p className="text-[8.5pt] font-medium text-slate-700">
                            {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                          </p>
                          {(edu.gpa || edu.location) && (
                            <div className="flex justify-between text-[8pt] text-slate-600">
                              {edu.location && <span>{edu.location}</span>}
                              {edu.gpa && <span className="font-semibold text-slate-800">CGPA: {edu.gpa}</span>}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }

              if (secKey === 'experience' && experience && experience.length > 0) {
                return (
                  <section key="experience" className="break-inside-avoid">
                    <h2 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-0.5 mb-2">
                      Work Experience
                    </h2>
                    <div className="space-y-2.5">
                      {experience.map((exp) => (
                        <div key={exp.id} className="space-y-0.5">
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-[9pt] font-bold text-slate-900">{exp.jobTitle}</h3>
                            <span className="text-[8pt] font-semibold text-slate-600">
                              {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                            </span>
                          </div>
                          <p className="text-[8.5pt] font-semibold text-slate-700">
                            {exp.company} {exp.location ? `, ${exp.location}` : ''}
                          </p>
                          {exp.bullets && exp.bullets.length > 0 ? (
                            <ul className="list-disc list-outside ml-3.5 text-[8pt] text-slate-700 space-y-0.5 mt-0.5">
                              {exp.bullets.map((bullet, idx) => (
                                <li key={idx} className="leading-snug">{bullet}</li>
                              ))}
                            </ul>
                          ) : exp.description ? (
                            <p className="text-[8pt] text-slate-700 leading-snug mt-0.5">{exp.description}</p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }

              if (secKey === 'projects' && projects && projects.length > 0) {
                return (
                  <section key="projects" className="break-inside-avoid">
                    <h2 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-0.5 mb-2">
                      Projects
                    </h2>
                    <div className="space-y-2.5">
                      {projects.map((proj) => (
                        <div key={proj.id} className="space-y-0.5">
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-[9pt] font-bold text-slate-900">{proj.name}</h3>
                            {proj.date && (
                              <span className="text-[8pt] font-semibold text-slate-600">{proj.date}</span>
                            )}
                          </div>
                          {proj.technologies && (
                            <p className="text-[8pt] font-semibold text-slate-700">
                              <span className="font-bold text-slate-900">Technologies: </span>
                              {proj.technologies}
                            </p>
                          )}
                          {proj.bullets && proj.bullets.length > 0 ? (
                            <ul className="list-disc list-outside ml-3.5 text-[8pt] text-slate-700 space-y-0.5 mt-0.5">
                              {proj.bullets.map((b, idx) => (
                                <li key={idx} className="leading-snug">{b}</li>
                              ))}
                            </ul>
                          ) : proj.description ? (
                            <p className="text-[8pt] text-slate-700 leading-snug mt-0.5">{proj.description}</p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }

              if (secKey === 'awards' && awards && awards.length > 0) {
                return (
                  <section key="awards" className="break-inside-avoid">
                    <h2 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-0.5 mb-2">
                      Awards and Accolades
                    </h2>
                    <ul className="list-disc list-outside ml-3.5 text-[8pt] text-slate-700 space-y-1">
                      {awards.map((award) => (
                        <li key={award.id} className="leading-snug">
                          <span className="font-bold text-slate-900">{award.title}</span>
                          {award.issuer && ` – ${award.issuer}`}
                          {award.date && ` (${award.date})`}
                          {award.description && <p className="text-[7.5pt] text-slate-600 mt-0.5">{award.description}</p>}
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              }

              // Custom Sections
              const customSec = customSections.find(c => c.id === secKey || c.title.toLowerCase() === secKey.toLowerCase());
              if (customSec && customSec.items && customSec.items.length > 0) {
                const hasInline = customSec.items.some(it => it.layout === 'inline' || Boolean(it.value));

                return (
                  <section key={customSec.id} className="break-inside-avoid">
                    <h2 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-0.5 mb-2">
                      {customSec.title}
                    </h2>
                    {hasInline ? (
                      <div className="space-y-1 text-[8.5pt]">
                        {customSec.items.map((item) => {
                          if (item.layout === 'inline' || item.value) {
                            return (
                              <div key={item.id} className="flex items-baseline">
                                <span className="font-bold text-slate-900 w-32 shrink-0">{item.title}</span>
                                <span className="font-bold text-slate-700 mx-1">:</span>
                                <span className="text-slate-800 flex-1">{item.value || item.description}</span>
                              </div>
                            );
                          }
                          return (
                            <div key={item.id} className="space-y-0.5 py-0.5">
                              <div className="flex justify-between items-baseline">
                                <h3 className="text-[9pt] font-bold text-slate-900">{item.title}</h3>
                                {item.date && <span className="text-[8pt] font-semibold text-slate-600">{item.date}</span>}
                              </div>
                              {item.subtitle && <p className="text-[8pt] font-medium text-slate-700">{item.subtitle}</p>}
                              {item.description && <p className="text-[8pt] text-slate-700 leading-snug">{item.description}</p>}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {customSec.items.map((item) => (
                          <div key={item.id} className="space-y-0.5">
                            <div className="flex justify-between items-baseline">
                              <h3 className="text-[9pt] font-bold text-slate-900">{item.title}</h3>
                              {item.date && <span className="text-[8pt] font-semibold text-slate-600">{item.date}</span>}
                            </div>
                            {item.subtitle && <p className="text-[8pt] font-medium text-slate-700">{item.subtitle}</p>}
                            {item.description && <p className="text-[8pt] text-slate-700 leading-snug">{item.description}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                );
              }

              return null;
            })}
          </main>
        </div>
      </div>

      {/* Signature Block at Bottom (No Date) */}
      {Boolean(data.signature?.enabled) && (
        <div className="mt-3 pt-2 flex justify-end break-inside-avoid">
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
              {data.signature?.signerName || personalInfo.fullName || 'Authorized Signature'}
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
