import React from 'react';
import { CVData } from '../../types/cv';
import { Phone, Mail, Linkedin, MapPin, Github, Globe } from 'lucide-react';

interface ModernTwoColumnTemplateProps {
  data: CVData;
}

export const ModernTwoColumnTemplate: React.FC<ModernTwoColumnTemplateProps> = ({ data }) => {
  const {
    personalInfo,
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
    sectionOrder = []
  } = data;

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
  const hasTools = skills?.tools && skills.tools.length > 0;
  const hasCerts = certifications && certifications.length > 0;
  const hasLanguages = languages && languages.length > 0;
  const hasReferences = references && (references.availableOnRequest || (references.items && references.items.length > 0));

  // Default section order if missing
  const defaultOrder = ['education', 'experience', 'projects', 'awards', 'custom'];
  const rightSectionsToRender = sectionOrder.length > 0 ? sectionOrder : defaultOrder;

  return (
    <div className="w-[794px] min-h-[1123px] bg-white text-slate-800 p-8 font-sans leading-relaxed box-border flex flex-col justify-between">
      <div>
        {/* Top Header Box (Soft Light-Blue Card) */}
        <header className="bg-[#eef4ff] rounded-2xl p-6 mb-6 border border-blue-100 flex items-start justify-between gap-6">
          <div className="flex-1 space-y-2">
            {personalInfo.fullName && (
              <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                {personalInfo.fullName}
              </h1>
            )}

            {personalInfo.professionalTitle && (
              <p className="text-xs font-bold text-slate-700 tracking-wider uppercase border-b border-blue-200/80 pb-2 inline-block">
                {personalInfo.professionalTitle}
              </p>
            )}

            {summary && (
              <p className="text-[9.5pt] text-slate-700 leading-snug mt-2">
                {summary}
              </p>
            )}
          </div>

          {personalInfo.photoUrl && (
            <div className="shrink-0">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName || 'Profile'}
                className="w-24 h-24 rounded-full object-cover border-3 border-white shadow-md"
              />
            </div>
          )}
        </header>

        {/* 2-Column Body Grid */}
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left Column (Light Gray/Blue Card) */}
          <aside className="col-span-4 bg-[#f1f5f9] p-5 rounded-2xl space-y-5 border border-slate-200/60">
            {/* Contact Information */}
            {hasContactInfo && (
              <div>
                <h3 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
                  Contact Information
                </h3>
                <ul className="space-y-2 text-[9pt] text-slate-700">
                  {personalInfo.phone && (
                    <li className="flex items-center gap-2 break-all">
                      <Phone className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      <span>{personalInfo.phone}</span>
                    </li>
                  )}
                  {personalInfo.email && (
                    <li className="flex items-center gap-2 break-all">
                      <Mail className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      <span>{personalInfo.email}</span>
                    </li>
                  )}
                  {personalInfo.linkedin && (
                    <li className="flex items-center gap-2 break-all">
                      <Linkedin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      <span>{personalInfo.linkedin}</span>
                    </li>
                  )}
                  {personalInfo.location && (
                    <li className="flex items-center gap-2 break-all">
                      <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      <span>{personalInfo.location}</span>
                    </li>
                  )}
                  {personalInfo.github && (
                    <li className="flex items-center gap-2 break-all">
                      <Github className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      <span>{personalInfo.github}</span>
                    </li>
                  )}
                  {personalInfo.website && (
                    <li className="flex items-center gap-2 break-all">
                      <Globe className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      <span>{personalInfo.website}</span>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Technical & Soft Skills */}
            {(hasTechnicalSkills || hasSoftSkills) && (
              <div>
                <h3 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
                  Skills
                </h3>
                <ul className="space-y-1.5 text-[9pt] text-slate-700 list-disc list-inside">
                  {skills.technical?.map((skill, idx) => (
                    <li key={`tech-${idx}`} className="leading-snug">{skill}</li>
                  ))}
                  {skills.soft?.map((skill, idx) => (
                    <li key={`soft-${idx}`} className="leading-snug">{skill}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tools Proficiency */}
            {hasTools && (
              <div>
                <h3 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
                  Tools Proficiency
                </h3>
                <ul className="space-y-1.5 text-[9pt] text-slate-700 list-disc list-inside">
                  {skills.tools?.map((tool, idx) => (
                    <li key={`tool-${idx}`} className="leading-snug">{tool}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Training & Certification */}
            {hasCerts && (
              <div>
                <h3 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
                  Training & Certification
                </h3>
                <ul className="space-y-2 text-[8.5pt] text-slate-700">
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
            {hasLanguages && (
              <div>
                <h3 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
                  Languages
                </h3>
                <ul className="space-y-1 text-[9pt] text-slate-700">
                  {languages.map((lang) => (
                    <li key={lang.id} className="flex justify-between items-center">
                      <span className="font-medium text-slate-800">{lang.name}</span>
                      <span className="text-slate-500 text-[8pt]">({lang.proficiency})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* References */}
            {hasReferences && (
              <div>
                <h3 className="text-[10pt] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
                  References
                </h3>
                {references.availableOnRequest ? (
                  <p className="text-[8.5pt] text-slate-600 italic">Available upon request.</p>
                ) : (
                  <div className="space-y-2 text-[8.5pt] text-slate-700">
                    {references.items?.map((ref) => (
                      <div key={ref.id}>
                        <p className="font-bold text-slate-900">{ref.name}</p>
                        {ref.title && <p className="text-slate-600">{ref.title}</p>}
                        {ref.company && <p className="text-slate-600">{ref.company}</p>}
                        {ref.email && <p className="text-slate-500 text-[8pt] break-all">{ref.email}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </aside>

          {/* Right Main Column */}
          <main className="col-span-8 space-y-5">
            {rightSectionsToRender.map((secKey) => {
              if (secKey === 'education' && education && education.length > 0) {
                return (
                  <section key="education" className="break-inside-avoid">
                    <h2 className="text-[10.5pt] font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-1 mb-3">
                      Education
                    </h2>
                    <div className="space-y-3">
                      {education.map((edu) => (
                        <div key={edu.id} className="space-y-0.5">
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-[9.5pt] font-bold text-slate-900">{edu.institution}</h3>
                            <span className="text-[8.5pt] font-semibold text-slate-600">
                              {edu.startDate} {edu.endDate ? `– ${edu.endDate}` : ''}
                            </span>
                          </div>
                          <p className="text-[9pt] font-medium text-slate-700">
                            {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                          </p>
                          {(edu.gpa || edu.location) && (
                            <div className="flex justify-between text-[8.5pt] text-slate-600">
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
                    <h2 className="text-[10.5pt] font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-1 mb-3">
                      Work Experience
                    </h2>
                    <div className="space-y-4">
                      {experience.map((exp) => (
                        <div key={exp.id} className="space-y-1">
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-[9.5pt] font-bold text-slate-900">{exp.jobTitle}</h3>
                            <span className="text-[8.5pt] font-semibold text-slate-600">
                              {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                            </span>
                          </div>
                          <p className="text-[9pt] font-semibold text-slate-700">
                            {exp.company} {exp.location ? `, ${exp.location}` : ''}
                          </p>
                          {exp.bullets && exp.bullets.length > 0 ? (
                            <ul className="list-disc list-outside ml-4 text-[8.5pt] text-slate-700 space-y-1 mt-1">
                              {exp.bullets.map((bullet, idx) => (
                                <li key={idx} className="leading-snug">{bullet}</li>
                              ))}
                            </ul>
                          ) : exp.description ? (
                            <p className="text-[8.5pt] text-slate-700 leading-snug mt-1">{exp.description}</p>
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
                    <h2 className="text-[10.5pt] font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-1 mb-3">
                      Projects
                    </h2>
                    <div className="space-y-3.5">
                      {projects.map((proj) => (
                        <div key={proj.id} className="space-y-1">
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-[9.5pt] font-bold text-slate-900">{proj.name}</h3>
                            {proj.date && (
                              <span className="text-[8.5pt] font-semibold text-slate-600">{proj.date}</span>
                            )}
                          </div>
                          {proj.technologies && (
                            <p className="text-[8.5pt] font-semibold text-slate-700">
                              <span className="font-bold text-slate-900">Technologies: </span>
                              {proj.technologies}
                            </p>
                          )}
                          {proj.bullets && proj.bullets.length > 0 ? (
                            <ul className="list-disc list-outside ml-4 text-[8.5pt] text-slate-700 space-y-1 mt-1">
                              {proj.bullets.map((b, idx) => (
                                <li key={idx} className="leading-snug">{b}</li>
                              ))}
                            </ul>
                          ) : proj.description ? (
                            <p className="text-[8.5pt] text-slate-700 leading-snug mt-1">{proj.description}</p>
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
                    <h2 className="text-[10.5pt] font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-1 mb-3">
                      Awards and Accolades
                    </h2>
                    <ul className="list-disc list-outside ml-4 text-[8.5pt] text-slate-700 space-y-1.5">
                      {awards.map((award) => (
                        <li key={award.id} className="leading-snug">
                          <span className="font-bold text-slate-900">{award.title}</span>
                          {award.issuer && ` – ${award.issuer}`}
                          {award.date && ` (${award.date})`}
                          {award.description && <p className="text-[8pt] text-slate-600 mt-0.5">{award.description}</p>}
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              }

              // Custom Sections
              const customSec = customSections.find(c => c.id === secKey);
              if (customSec && customSec.items && customSec.items.length > 0) {
                return (
                  <section key={customSec.id} className="break-inside-avoid">
                    <h2 className="text-[10.5pt] font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-1 mb-3">
                      {customSec.title}
                    </h2>
                    <div className="space-y-3">
                      {customSec.items.map((item) => (
                        <div key={item.id} className="space-y-0.5">
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-[9.5pt] font-bold text-slate-900">{item.title}</h3>
                            {item.date && <span className="text-[8.5pt] font-semibold text-slate-600">{item.date}</span>}
                          </div>
                          {item.subtitle && <p className="text-[8.5pt] font-medium text-slate-700">{item.subtitle}</p>}
                          {item.description && <p className="text-[8.5pt] text-slate-700 leading-snug">{item.description}</p>}
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }

              return null;
            })}
          </main>
        </div>
      </div>

      {/* Signature Block at Bottom (No Date) */}
      {data.signature?.enabled && (
        <div className="mt-8 pt-4 flex justify-end break-inside-avoid">
          <div className="text-center min-w-[180px] max-w-[240px]">
            {data.signature.signatureImage && (
              <div className="h-10 mb-1 flex items-center justify-center">
                <img
                  src={data.signature.signatureImage}
                  alt="Signature"
                  className="max-h-10 max-w-full object-contain"
                />
              </div>
            )}
            <div className="w-36 border-t border-slate-900 mx-auto mb-1"></div>
            <p className="text-[9.5pt] font-bold text-slate-900 leading-snug">
              {data.signature.signerName || personalInfo.fullName || 'Authorized Signature'}
            </p>
            {data.signature.signerTitle && (
              <p className="text-[8.5pt] font-medium text-slate-700 leading-tight">
                {data.signature.signerTitle}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
