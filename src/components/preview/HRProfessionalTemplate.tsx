import React from 'react';
import { CVData } from '../../types/cv';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const HRProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, education, experience, projects, skills, certifications, extracurricular, languages, awards, references, customSections, accentColor = '#1e3a8a' } = data;

  return (
    <div className="w-full min-h-[1123px] bg-white text-slate-900 font-sans flex flex-row box-border">
      {/* Left Sidebar (approx 33% width) */}
      <aside className="w-[33%] bg-slate-50 border-r border-slate-200 px-6 py-10 flex flex-col shrink-0 space-y-5">
        {/* Profile Photo */}
        {personalInfo.photoUrl ? (
          <div className="flex justify-center mb-1">
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className="w-28 h-28 rounded-full object-cover border-2 shadow-sm"
              style={{ borderColor: accentColor }}
            />
          </div>
        ) : (
          <div className="flex justify-center mb-1">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold uppercase shadow-sm"
              style={{ backgroundColor: accentColor }}
            >
              {personalInfo.fullName ? personalInfo.fullName.split(' ').map(n => n[0]).join('').substring(0, 2) : 'CV'}
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div>
          <h3
            className="text-[10pt] font-extrabold uppercase tracking-wider pb-1 mb-2 border-b-2"
            style={{ color: accentColor, borderColor: accentColor }}
          >
            Contact
          </h3>
          <ul className="space-y-2 text-[9pt] text-slate-700">
            {personalInfo.phone && (
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                <span className="truncate">{personalInfo.phone}</span>
              </li>
            )}
            {personalInfo.email && (
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                <span className="truncate">{personalInfo.email}</span>
              </li>
            )}
            {personalInfo.location && (
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                <span className="truncate">{personalInfo.location}</span>
              </li>
            )}
            {personalInfo.linkedin && (
              <li className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                <span className="truncate">{personalInfo.linkedin}</span>
              </li>
            )}
            {personalInfo.github && (
              <li className="flex items-center gap-2">
                <Github className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                <span className="truncate">{personalInfo.github}</span>
              </li>
            )}
            {personalInfo.website && (
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                <span className="truncate">{personalInfo.website}</span>
              </li>
            )}
          </ul>
        </div>

        {/* Skills */}
        {(skills?.technical?.length > 0 || skills?.tools?.length > 0 || skills?.soft?.length > 0) && (
          <div>
            <h3
              className="text-[10pt] font-extrabold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Skills
            </h3>
            <div className="space-y-2 text-[9pt]">
              {skills.technical && skills.technical.length > 0 && (
                <div>
                  <p className="font-bold text-slate-900 mb-1">Technical:</p>
                  <div className="flex flex-wrap gap-1">
                    {skills.technical.map((st, i) => (
                      <span key={i} className="bg-white border border-slate-200 text-slate-800 px-1.5 py-0.5 rounded text-[8.5pt]">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.tools && skills.tools.length > 0 && (
                <div>
                  <p className="font-bold text-slate-900 mb-1">Tools & Platforms:</p>
                  <div className="flex flex-wrap gap-1">
                    {skills.tools.map((st, i) => (
                      <span key={i} className="bg-slate-200/70 text-slate-800 px-1.5 py-0.5 rounded text-[8.5pt]">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.soft && skills.soft.length > 0 && (
                <div>
                  <p className="font-bold text-slate-900 mb-1 font-sans">Soft Skills:</p>
                  <p className="text-slate-700 leading-snug">{skills.soft.join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div>
            <h3
              className="text-[10pt] font-extrabold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Languages
            </h3>
            <div className="space-y-1.5 text-[9pt] text-slate-800">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900">{lang.name}</span>
                  <span className="text-[8.5pt] text-slate-600 bg-slate-200/60 px-1.5 py-0.5 rounded">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div>
            <h3
              className="text-[10pt] font-extrabold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Certifications
            </h3>
            <div className="space-y-2 text-[9pt] text-slate-800">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="font-bold text-slate-900 leading-tight">{cert.name}</p>
                  <p className="text-[8.5pt] text-slate-600">{cert.organization} ({cert.year})</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {awards && awards.length > 0 && (
          <div>
            <h3
              className="text-[10pt] font-extrabold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Awards
            </h3>
            <div className="space-y-1.5 text-[9pt] text-slate-800">
              {awards.map((award) => (
                <div key={award.id}>
                  <p className="font-bold text-slate-900">{award.title}</p>
                  <p className="text-[8.5pt] text-slate-600">{award.issuer} • {award.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Right Main Content Area (approx 67% width) */}
      <main className="w-[67%] px-9 py-10 flex flex-col space-y-5">
        {/* Main Header */}
        <header className="border-b-2 border-slate-100 pb-3">
          <h1 className="text-2xl font-black uppercase tracking-tight" style={{ color: accentColor }}>
            {personalInfo.fullName || 'Your Full Name'}
          </h1>
          {personalInfo.professionalTitle && (
            <p className="text-xs uppercase tracking-wider font-bold text-slate-700 mt-1">
              {personalInfo.professionalTitle}
            </p>
          )}
        </header>

        {/* Executive Summary */}
        {summary?.trim() && (
          <section>
            <h2
              className="text-xs font-black uppercase tracking-wider mb-1.5 flex items-center gap-2"
              style={{ color: accentColor }}
            >
              <span>Profile Summary</span>
            </h2>
            <p className="text-[9.5pt] leading-relaxed text-slate-700 text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2
              className="text-xs font-black uppercase tracking-wider mb-2.5 pb-1 border-b border-slate-200"
              style={{ color: accentColor }}
            >
              Work Experience
            </h2>
            <div className="space-y-3.5">
              {experience.map((exp) => (
                <div key={exp.id} className="text-[9.5pt]">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span className="text-[10pt]">{exp.jobTitle}</span>
                    <span className="text-[9pt] font-semibold text-slate-500">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="text-[9pt] font-semibold text-slate-700 mb-1">
                    {exp.company} {exp.location ? `• ${exp.location}` : ''}
                  </div>
                  {exp.description && <p className="text-[9pt] text-slate-700 mb-1">{exp.description}</p>}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-[9pt] text-slate-700">
                      {exp.bullets.filter(b => b.trim()).map((bullet, idx) => (
                        <li key={idx} className="leading-snug">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2
              className="text-xs font-black uppercase tracking-wider mb-2.5 pb-1 border-b border-slate-200"
              style={{ color: accentColor }}
            >
              Key Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="text-[9.5pt]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{proj.name}</span>
                    {proj.date && <span className="text-[9pt] text-slate-500 font-semibold">{proj.date}</span>}
                  </div>
                  {proj.technologies && (
                    <div className="text-[8.5pt] font-medium text-slate-600">
                      Technologies: {proj.technologies}
                    </div>
                  )}
                  {proj.description && <p className="text-[9pt] text-slate-700 mt-0.5">{proj.description}</p>}
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-[9pt] text-slate-700">
                      {proj.bullets.filter(b => b.trim()).map((bullet, idx) => (
                        <li key={idx} className="leading-snug">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section>
            <h2
              className="text-xs font-black uppercase tracking-wider mb-2 pb-1 border-b border-slate-200"
              style={{ color: accentColor }}
            >
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-[9.5pt]">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{edu.degree} in {edu.fieldOfStudy}</span>
                    <span className="text-[9pt] font-semibold text-slate-500">{edu.startDate} – {edu.isCurrent ? 'Present' : edu.endDate}</span>
                  </div>
                  <div className="flex justify-between text-[9pt] text-slate-700">
                    <span>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</span>
                    {edu.gpa && <span className="font-bold text-slate-900">GPA: {edu.gpa}</span>}
                  </div>
                  {edu.description && <p className="text-[8.5pt] text-slate-600 mt-0.5">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Extracurricular */}
        {extracurricular && extracurricular.length > 0 && (
          <section>
            <h2
              className="text-xs font-black uppercase tracking-wider mb-2 pb-1 border-b border-slate-200"
              style={{ color: accentColor }}
            >
              Extracurricular & Leadership
            </h2>
            <div className="space-y-2 text-[9.5pt]">
              {extracurricular.map((extra) => (
                <div key={extra.id}>
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{extra.role} – {extra.organization}</span>
                    <span className="text-[9pt] font-semibold text-slate-500">{extra.date}</span>
                  </div>
                  {extra.description && <p className="text-[9pt] text-slate-700 mt-0.5">{extra.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections && customSections.length > 0 && customSections.map((cs) => {
          if (!cs.items || cs.items.length === 0) return null;
          return (
            <section key={cs.id}>
              <h2
                className="text-xs font-black uppercase tracking-wider mb-2 pb-1 border-b border-slate-200"
                style={{ color: accentColor }}
              >
                {cs.title}
              </h2>
              <div className="space-y-2 text-[9.5pt]">
                {cs.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{item.title} {item.subtitle ? `– ${item.subtitle}` : ''}</span>
                      {item.date && <span className="text-[9pt] text-slate-500">{item.date}</span>}
                    </div>
                    {item.description && <p className="text-[9pt] text-slate-700 mt-0.5">{item.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* References */}
        {references?.availableOnRequest ? (
          <section>
            <h2
              className="text-xs font-black uppercase tracking-wider mb-1"
              style={{ color: accentColor }}
            >
              References
            </h2>
            <p className="text-[9pt] italic text-slate-600">References available upon request.</p>
          </section>
        ) : references?.items && references.items.length > 0 ? (
          <section>
            <h2
              className="text-xs font-black uppercase tracking-wider mb-2 pb-1 border-b border-slate-200"
              style={{ color: accentColor }}
            >
              References
            </h2>
            <div className="grid grid-cols-2 gap-3 text-[9pt]">
              {references.items.map((ref) => (
                <div key={ref.id} className="text-slate-700">
                  <p className="font-bold text-slate-900">{ref.name}</p>
                  <p className="text-[8.5pt]">{ref.title}, {ref.company}</p>
                  {ref.email && <p className="text-[8.5pt] text-slate-500">{ref.email}</p>}
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      {/* Signature Block at Bottom */}
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
            {/* Small line above signature */}
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
