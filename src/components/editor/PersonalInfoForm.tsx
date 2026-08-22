import React, { useState } from 'react';
import { PersonalInfo, TemplateId } from '../../types/cv';
import { User, Briefcase, Mail, Phone, MapPin, Linkedin, Github, Globe, Upload, Trash2, Info, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  templateId: TemplateId;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, templateId, onChange }) => {
  const [showSocialLinks, setShowSocialLinks] = useState(Boolean(data.linkedin || data.github || data.website));

  const handleChange = (field: keyof PersonalInfo, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert('Photo size must be smaller than 3MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onChange({ ...data, photoUrl: reader.result, showPhoto: true });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    onChange({ ...data, photoUrl: '' });
  };

  const supportsPhoto = templateId === 'general-cv' || templateId === 'hr-professional' || templateId === 'modern-two-column' || templateId === 'job-biodata';
  const isPhotoVisible = data.showPhoto !== false;

  return (
    <div className="space-y-4">
      {/* Profile Photo Block */}
      <div className="p-3 bg-slate-50/70 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-700/70 space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            Profile Photo
          </label>
          {supportsPhoto && (
            <button
              type="button"
              onClick={() => handleChange('showPhoto', !isPhotoVisible)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium transition cursor-pointer ${
                isPhotoVisible
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {isPhotoVisible ? (
                <>
                  <Eye className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  Photo Visible
                </>
              ) : (
                <>
                  <EyeOff className="w-3 h-3 text-slate-400" />
                  Photo Hidden
                </>
              )}
            </button>
          )}
        </div>
        
        {!supportsPhoto ? (
          <div className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300 bg-slate-100/70 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              Single-column pure ATS templates omit photos for automated parsing. If you want a photo, switch to <strong>General CV</strong>, <strong>Job Bio Data</strong>, or <strong>Modern Two-Column</strong>.
            </div>
          </div>
        ) : (
          <div className={`flex items-center gap-3.5 ${!isPhotoVisible ? 'opacity-50' : ''}`}>
            {data.photoUrl ? (
              <div className="relative group shrink-0">
                <img
                  src={data.photoUrl}
                  alt="Profile Preview"
                  className="w-14 h-14 rounded-lg object-cover border border-slate-300 dark:border-slate-600 shadow-2xs"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute -top-1.5 -right-1.5 p-1 bg-red-600 text-white rounded-full shadow-xs hover:bg-red-700 transition cursor-pointer"
                  title="Remove photo"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="w-14 h-14 rounded-lg bg-slate-200/80 dark:bg-slate-700/80 flex items-center justify-center text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-600 shrink-0">
                <User className="w-6 h-6" />
              </div>
            )}

            <div className="flex-1 space-y-1">
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer shadow-2xs transition">
                <Upload className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                {data.photoUrl ? 'Change Photo' : 'Upload Photo'}
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              <p className="text-[11px] text-slate-400">
                {!isPhotoVisible ? 'Photo display is currently hidden.' : 'JPG, PNG, WEBP (Max 3MB).'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 select-text">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Md. Saiful Alam"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white focus:border-slate-900 dark:focus:border-white transition"
              required
            />
            <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Professional Title */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Designation / Professional Title
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.professionalTitle}
              onChange={(e) => handleChange('professionalTitle', e.target.value)}
              placeholder="Executive Officer / Office Assistant"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white focus:border-slate-900 dark:focus:border-white transition"
            />
            <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Mobile / Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+880 1712-345678"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white focus:border-slate-900 dark:focus:border-white transition"
              required
            />
            <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="saiful.alam@example.com"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white focus:border-slate-900 dark:focus:border-white transition"
            />
            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Location / City */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Location / Address (City, Country)
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Dhaka, Bangladesh"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white focus:border-slate-900 dark:focus:border-white transition"
            />
            <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* Collapsible Online / Social Links for IT / Tech / Developer Profiles */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setShowSocialLinks(!showSocialLinks)}
          className="flex items-center justify-between w-full p-2.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 transition"
        >
          <span className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>Online & Social Links (Optional / For Tech & IT Profiles)</span>
          </span>
          {showSocialLinks ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showSocialLinks && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            {/* LinkedIn */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                LinkedIn (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={data.linkedin || ''}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                />
                <Linkedin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* GitHub */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                GitHub (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={data.github || ''}
                  onChange={(e) => handleChange('github', e.target.value)}
                  placeholder="github.com/..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                />
                <Github className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Portfolio Website */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Website (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={data.website || ''}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="mywebsite.com"
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                />
                <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

