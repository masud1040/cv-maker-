import React from 'react';
import { CVData } from '../../types/cv';

interface TemplateProps {
  data: CVData;
}

export const JobBioDataTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    bioData,
    education,
    experience,
    projects,
    skills,
    certifications,
    extracurricular,
    languages,
    awards,
    references,
    customSections = [],
    sectionVisibility = {},
    signature
  } = data;

  const isVisible = (secKey: string): boolean => {
    if (sectionVisibility[secKey] === false) return false;
    return true;
  };

  // Helper to check if a string has non-empty text
  const hasText = (val?: string | null): boolean => {
    return Boolean(val && val.trim() !== '');
  };

  // Build the list of key-value rows
  // STRICT RULE: If a field is empty, DO NOT render it at all!
  interface BioRow {
    id: string;
    label: string;
    value: React.ReactNode;
    condition: boolean;
  }

  const bioRows: BioRow[] = [
    {
      id: 'name',
      label: 'Name',
      value: personalInfo.fullName,
      condition: hasText(personalInfo.fullName)
    },
    {
      id: 'mobile',
      label: 'Mobile',
      value: personalInfo.phone,
      condition: hasText(personalInfo.phone)
    },
    {
      id: 'email',
      label: 'Email id',
      value: personalInfo.email,
      condition: hasText(personalInfo.email)
    },
    {
      id: 'fatherName',
      label: "Father’s Name",
      value: bioData?.fatherName,
      condition: isVisible('biodata') && hasText(bioData?.fatherName)
    },
    {
      id: 'motherName',
      label: "Mother’s Name",
      value: bioData?.motherName,
      condition: isVisible('biodata') && hasText(bioData?.motherName)
    },
    {
      id: 'dateOfBirth',
      label: 'Date of Birth',
      value: bioData?.dateOfBirth,
      condition: isVisible('biodata') && hasText(bioData?.dateOfBirth)
    },
    {
      id: 'gender',
      label: 'Gender',
      value: bioData?.gender,
      condition: isVisible('biodata') && hasText(bioData?.gender)
    },
    {
      id: 'maritalStatus',
      label: 'Marital Status',
      value: bioData?.maritalStatus,
      condition: isVisible('biodata') && hasText(bioData?.maritalStatus)
    },
    {
      id: 'religion',
      label: 'Religion',
      value: bioData?.religion,
      condition: isVisible('biodata') && hasText(bioData?.religion)
    },
    {
      id: 'nationality',
      label: 'Nationality',
      value: bioData?.nationality,
      condition: isVisible('biodata') && hasText(bioData?.nationality)
    },
    {
      id: 'nationalId',
      label: 'National ID / NID',
      value: bioData?.nationalId,
      condition: isVisible('biodata') && hasText(bioData?.nationalId)
    },
    {
      id: 'bloodGroup',
      label: 'Blood Group',
      value: bioData?.bloodGroup,
      condition: isVisible('biodata') && hasText(bioData?.bloodGroup)
    },
    {
      id: 'weight',
      label: 'Weight',
      value: bioData?.weight,
      condition: isVisible('biodata') && hasText(bioData?.weight)
    },
    {
      id: 'height',
      label: 'Height',
      value: bioData?.height,
      condition: isVisible('biodata') && hasText(bioData?.height)
    },
    {
      id: 'languages',
      label: 'Languages Known',
      value: languages && languages.length > 0
        ? languages.map(l => `${l.name} (${l.proficiency})`).join(', ')
        : '',
      condition: isVisible('languages') && Boolean(languages && languages.length > 0)
    },
    {
      id: 'skills',
      label: 'Skills',
      value: (
        <div className="space-y-0.5">
          {skills?.technical && skills.technical.length > 0 && (
            <div>{skills.technical.join(', ')}</div>
          )}
          {skills?.tools && skills.tools.length > 0 && (
            <div>{skills.tools.join(', ')}</div>
          )}
          {skills?.soft && skills.soft.length > 0 && (
            <div>{skills.soft.join(', ')}</div>
          )}
        </div>
      ),
      condition: isVisible('skills') && Boolean(
        (skills?.technical && skills.technical.length > 0) ||
        (skills?.tools && skills.tools.length > 0) ||
        (skills?.soft && skills.soft.length > 0)
      )
    },
    {
      id: 'qualification',
      label: 'Qualification',
      value: (
        <div className="space-y-1.5 w-full">
          {education
            ?.filter(edu => hasText(edu.degree) || hasText(edu.institution))
            .map((edu, idx) => (
              <div key={edu.id || idx} className="leading-snug">
                <span className="font-semibold text-black">
                  {edu.degree}{edu.fieldOfStudy ? ` (${edu.fieldOfStudy})` : ''}
                </span>
                {edu.institution ? ` – ${edu.institution}` : ''}
                {edu.endDate || edu.startDate ? ` [${edu.startDate ? edu.startDate + ' - ' : ''}${edu.endDate}]` : ''}
                {edu.gpa ? ` (Result / GPA: ${edu.gpa})` : ''}
              </div>
            ))}
        </div>
      ),
      condition: isVisible('education') && Boolean(education && education.some(e => hasText(e.degree) || hasText(e.institution)))
    },
    {
      id: 'experience',
      label: 'Experience',
      value: (
        <div className="space-y-1.5 w-full">
          {experience
            ?.filter(exp => hasText(exp.jobTitle) || hasText(exp.company))
            .map((exp, idx) => (
              <div key={exp.id || idx} className="leading-snug">
                <span className="font-semibold text-black">{exp.jobTitle}</span>
                {exp.company ? ` at ${exp.company}` : ''}
                {exp.startDate ? ` (${exp.startDate} – ${exp.isCurrent ? 'Present' : exp.endDate})` : ''}
                {exp.description && <p className="text-[9pt] text-zinc-700 mt-0.5">{exp.description}</p>}
              </div>
            ))}
        </div>
      ),
      condition: isVisible('experience') && Boolean(experience && experience.some(e => hasText(e.jobTitle) || hasText(e.company)))
    },
    {
      id: 'projects',
      label: 'Key Projects',
      value: (
        <div className="space-y-1 w-full">
          {projects
            ?.filter(proj => hasText(proj.name))
            .map((proj, idx) => (
              <div key={proj.id || idx} className="leading-snug">
                <span className="font-semibold text-black">{proj.name}</span>
                {proj.technologies ? ` (${proj.technologies})` : ''}
                {proj.description ? `: ${proj.description}` : ''}
              </div>
            ))}
        </div>
      ),
      condition: isVisible('projects') && Boolean(projects && projects.some(p => hasText(p.name)))
    },
    {
      id: 'presentAddress',
      label: 'Present Address',
      value: bioData?.presentAddress,
      condition: isVisible('biodata') && hasText(bioData?.presentAddress)
    },
    {
      id: 'permanentAddress',
      label: 'Permanent Address',
      value: bioData?.permanentAddress,
      condition: isVisible('biodata') && hasText(bioData?.permanentAddress)
    },
    {
      id: 'generalAddress',
      label: 'Address',
      value: personalInfo.location,
      condition: !hasText(bioData?.presentAddress) && !hasText(bioData?.permanentAddress) && hasText(personalInfo.location)
    },
    {
      id: 'certifications',
      label: 'Certifications',
      value: certifications?.filter(c => hasText(c.name)).map(c => `${c.name}${c.organization ? ' (' + c.organization + ')' : ''}`).join(', '),
      condition: isVisible('certifications') && Boolean(certifications && certifications.some(c => hasText(c.name)))
    },
    {
      id: 'awards',
      label: 'Awards & Honors',
      value: awards?.filter(a => hasText(a.title)).map(a => `${a.title}${a.issuer ? ' (' + a.issuer + ')' : ''}`).join(', '),
      condition: isVisible('awards') && Boolean(awards && awards.some(a => hasText(a.title)))
    },
    {
      id: 'activities',
      label: 'Extra Activities',
      value: extracurricular?.filter(e => hasText(e.role) || hasText(e.organization)).map(e => `${e.role}${e.organization ? ' – ' + e.organization : ''}`).join(', '),
      condition: isVisible('extracurricular') && Boolean(extracurricular && extracurricular.length > 0)
    },
    {
      id: 'references',
      label: 'References',
      value: references?.availableOnRequest
        ? 'Available upon request'
        : references?.items?.map(r => `${r.name} (${r.title}, ${r.company})`).join('; '),
      condition: isVisible('references') && Boolean(references?.availableOnRequest || (references?.items && references.items.length > 0))
    }
  ];

  // Also append any custom section items to bioRows so custom fields appear in the Bio Data format
  if (customSections && customSections.length > 0) {
    customSections.forEach((cs) => {
      if (!isVisible(cs.id)) return;
      cs.items?.forEach((item) => {
        if (!hasText(item.title) && !hasText(item.value) && !hasText(item.description)) return;
        bioRows.push({
          id: `custom-${cs.id}-${item.id}`,
          label: item.title || cs.title,
          value: (
            <div>
              {item.value ? (
                <span>{item.value}</span>
              ) : (
                <div>
                  {item.subtitle && <span className="font-semibold">{item.subtitle} </span>}
                  {item.date && <span className="text-zinc-600">({item.date}) </span>}
                  {item.description && <span>{item.description}</span>}
                </div>
              )}
            </div>
          ),
          condition: true
        });
      });
    });
  }

  // Filter out any rows that do not meet condition
  const visibleRows = bioRows.filter(row => row.condition);

  // Check if declaration, signature, or place/date exists
  const isSignatureEnabled = Boolean(signature?.enabled);
  const hasPlace = hasText(bioData?.place);
  const hasDate = hasText(bioData?.submissionDate) || (isSignatureEnabled && hasText(signature?.date));
  const dateValue = bioData?.submissionDate || (isSignatureEnabled ? signature?.date : '') || '';
  const hasDeclaration = hasText(bioData?.declaration);
  const showFooter = hasPlace || hasDate || isSignatureEnabled;
  const showPhotoBox = Boolean(personalInfo.photoUrl && personalInfo.showPhoto !== false);

  return (
    <div className="w-[794px] min-h-[1123px] bg-white text-black px-12 py-10 font-sans leading-normal box-border flex flex-col justify-between selection:bg-zinc-200">
      <div>
        {/* Top Header & Photo Grid */}
        <div className="relative mb-6">
          {/* Centered Heading */}
          <div className="text-center pt-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-widest uppercase text-black">
              BIO DATA
            </h1>
            <div className="w-24 h-0.5 bg-black mx-auto mt-1"></div>
          </div>

          {/* Photo Frame on Top Right (Optional toggle) */}
          {showPhotoBox && (
            <div className="absolute top-0 right-0 w-28 h-32 border-2 border-black flex items-center justify-center bg-zinc-50 overflow-hidden">
              {personalInfo.photoUrl ? (
                <img
                  src={personalInfo.photoUrl}
                  alt="Passport Photo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider text-center px-1">
                  Affix Passport Size Photo
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content Table / Rows with Colon Alignment */}
        <div className={`space-y-2.5 mt-8 ${showPhotoBox ? 'pr-32' : 'pr-0'}`}>
          {visibleRows.map((row) => (
            <div key={row.id} className="flex items-start text-[9.5pt] sm:text-[10pt] leading-relaxed">
              {/* Field Label */}
              <div className="w-40 sm:w-44 font-bold text-black shrink-0">
                {row.label}
              </div>
              {/* Colon Separator */}
              <div className="w-6 font-bold text-black text-center shrink-0">
                :
              </div>
              {/* Field Value */}
              <div className="flex-1 text-zinc-900 font-normal text-justify">
                {row.value}
              </div>
            </div>
          ))}
        </div>

        {/* Declaration if present */}
        {hasDeclaration && (
          <div className="mt-8 pt-4 border-t border-zinc-200 text-[9pt] text-zinc-800 italic leading-relaxed">
            <p>{bioData?.declaration}</p>
          </div>
        )}
      </div>

      {/* Footer Section: Place, Date on Left & Signature on Right */}
      {showFooter && (
        <div className="mt-12 pt-6 flex justify-between items-end break-inside-avoid">
          {/* Left Side: Place & Date */}
          <div className="space-y-1.5 text-[9.5pt] font-medium text-black">
            {hasPlace && (
              <div className="flex items-center gap-2">
                <span className="font-bold w-16">Place :</span>
                <span>{bioData?.place}</span>
              </div>
            )}
            {hasDate && (
              <div className="flex items-center gap-2">
                <span className="font-bold w-16">Date :</span>
                <span>{dateValue}</span>
              </div>
            )}
          </div>

          {/* Right Side: Signature Block */}
          {isSignatureEnabled && (
            <div className="text-center min-w-[180px]">
              {signature?.signatureImage && (
                <div className="h-10 mb-1 flex items-center justify-center">
                  <img
                    src={signature.signatureImage}
                    alt="Signature"
                    className="max-h-10 max-w-full object-contain"
                  />
                </div>
              )}
              <div className="w-44 border-t-2 border-black mx-auto mb-1"></div>
              <p className="text-[10pt] font-bold text-black">
                {signature?.signerName || personalInfo.fullName || 'Signature'}
              </p>
              {signature?.signerTitle && (
                <p className="text-[8.5pt] text-zinc-700">
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
