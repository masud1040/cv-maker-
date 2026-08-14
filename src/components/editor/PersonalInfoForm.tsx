import React from 'react';
import { PersonalInfo, TemplateId } from '../../types/cv';
import { User, Briefcase, Mail, Phone, MapPin, Linkedin, Github, Globe, Upload, Trash2, Info } from 'lucide-react';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  templateId: TemplateId;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, templateId, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
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
          onChange({ ...data, photoUrl: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    onChange({ ...data, photoUrl: '' });
  };

  const supportsPhoto = templateId === 'hr-professional' || templateId === 'modern-two-column' || templateId === 'job-biodata';

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="border-b border-slate-200 pb-2">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" />
          Personal Information
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Contact details and basic applicant identification.</p>
      </div>

      {/* Profile Photo Block */}
      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
        <label className="block text-xs font-semibold text-slate-700 mb-1">Profile / Passport Photo</label>
        
        {!supportsPhoto ? (
          <div className="flex items-start gap-2.5 text-amber-800 bg-amber-50 p-2.5 rounded-md border border-amber-200 text-xs">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">ATS Notice:</span> Standard single-column ATS templates omit photos for maximum machine-readability. Switch to <strong>Job Bio Data</strong>, <strong>HR Professional</strong>, or <strong>Modern Two-Column</strong> if you need a photo.
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {data.photoUrl ? (
              <div className="relative group">
                <img
                  src={data.photoUrl}
                  alt="Profile Preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-600 shadow-sm"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute -top-1 -right-1 p-1 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition"
                  title="Remove photo"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 border border-slate-300">
                <User className="w-8 h-8" />
              </div>
            )}

            <div className="flex-1 space-y-1">
              <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer shadow-sm transition">
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                {data.photoUrl ? 'Change Photo' : 'Upload Photo'}
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              <p className="text-[11px] text-slate-500">Supported formats: JPG, PNG, WEBP (Max 3MB).</p>
            </div>
          </div>
        )}
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Saiful Alam Masud"
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Professional Title */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Professional Title / Major
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.professionalTitle}
              onChange={(e) => handleChange('professionalTitle', e.target.value)}
              placeholder="Software Engineer / CS Senior"
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="saiful.masud@example.com"
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+880 1712 345678"
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Location (City, Country)
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Dhaka, Bangladesh"
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            LinkedIn Profile
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/saifulmasud"
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Linkedin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            GitHub Profile
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.github}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="github.com/saifulmasud"
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Github className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Portfolio Website */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Portfolio / Website
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="saifulmasud.dev"
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
