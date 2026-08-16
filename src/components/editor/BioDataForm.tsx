import React from 'react';
import { BioDataDetails, PersonalInfo } from '../../types/cv';
import { User, Calendar, MapPin, Heart, Shield, Flag, FileText } from 'lucide-react';

interface BioDataFormProps {
  data?: BioDataDetails;
  personalInfo?: PersonalInfo;
  onChange: (data: BioDataDetails) => void;
  onUpdatePersonalInfo?: (data: PersonalInfo) => void;
}

export const BioDataForm: React.FC<BioDataFormProps> = ({
  data = {},
  onChange,
}) => {
  const bio: BioDataDetails = data || {};

  const handleChange = (field: keyof BioDataDetails, value: string) => {
    onChange({
      ...bio,
      [field]: value
    });
  };

  return (
    <div className="space-y-5">
      {/* Header info */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <User className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              Bio Data Details
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Personal, family, and demographic fields for standard Job Bio Data format.
            </p>
          </div>
          <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
            Conditional Auto-Hide
          </span>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg mt-2.5 border border-slate-200 dark:border-slate-700/60 leading-relaxed">
          💡 <strong>Notice:</strong> Any unfulfilled field will be automatically omitted from the final PDF output and preview. Only populated details are neatly presented.
        </p>
      </div>

      {/* Basic Family & Identity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Father's Name */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Father's Name (পিতার নাম)
          </label>
          <input
            type="text"
            value={bio.fatherName || ''}
            onChange={(e) => handleChange('fatherName', e.target.value)}
            placeholder="Md. Rafiqul Islam"
            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
          />
        </div>

        {/* Mother's Name */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Mother's Name (মাতার নাম)
          </label>
          <input
            type="text"
            value={bio.motherName || ''}
            onChange={(e) => handleChange('motherName', e.target.value)}
            placeholder="Salma Begum"
            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Date of Birth (জন্ম তারিখ)
          </label>
          <div className="relative">
            <input
              type="text"
              value={bio.dateOfBirth || ''}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              placeholder="15 October 1999"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
            />
            <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Gender (লিঙ্গ)
          </label>
          <select
            value={bio.gender || ''}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
          >
            <option value="">-- Select Gender (or keep empty) --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Marital Status (বৈবাহিক অবস্থা)
          </label>
          <select
            value={bio.maritalStatus || ''}
            onChange={(e) => handleChange('maritalStatus', e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
          >
            <option value="">-- Select Status (or keep empty) --</option>
            <option value="Unmarried / Single">Unmarried / Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </select>
        </div>

        {/* Religion */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Religion (ধর্ম)
          </label>
          <input
            type="text"
            value={bio.religion || ''}
            onChange={(e) => handleChange('religion', e.target.value)}
            placeholder="Islam / Hinduism / Christianity / Buddhism"
            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
          />
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Nationality (জাতীয়তা)
          </label>
          <div className="relative">
            <input
              type="text"
              value={bio.nationality || ''}
              onChange={(e) => handleChange('nationality', e.target.value)}
              placeholder="Bangladeshi (By Birth)"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
            />
            <Flag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Blood Group (রক্তের গ্রুপ)
          </label>
          <div className="relative">
            <input
              type="text"
              value={bio.bloodGroup || ''}
              onChange={(e) => handleChange('bloodGroup', e.target.value)}
              placeholder="B+ (ve) / A+ / O+"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
            />
            <Heart className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* National ID / NID */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            National ID / Passport No (জাতীয় পরিচয়পত্র / পাসপোর্ট)
          </label>
          <div className="relative">
            <input
              type="text"
              value={bio.nationalId || ''}
              onChange={(e) => handleChange('nationalId', e.target.value)}
              placeholder="1999261234567890"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
            />
            <Shield className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Height / Weight (Optional) */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Height & Weight (উচ্চতা ও ওজন)
          </label>
          <input
            type="text"
            value={bio.height || ''}
            onChange={(e) => handleChange('height', e.target.value)}
            placeholder="5 ft 8 inch, 68 kg"
            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
          />
        </div>
      </div>

      {/* Address Details */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <h4 className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
          Address Details (ঠিকানা)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Present Address (বর্তমান ঠিকানা)
            </label>
            <textarea
              rows={2}
              value={bio.presentAddress || ''}
              onChange={(e) => handleChange('presentAddress', e.target.value)}
              placeholder="House #12, Road #4, Dhanmondi, Dhaka-1209"
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Permanent Address (স্থায়ী ঠিকানা)
            </label>
            <textarea
              rows={2}
              value={bio.permanentAddress || ''}
              onChange={(e) => handleChange('permanentAddress', e.target.value)}
              placeholder="Village: Joypur, P.O: Chandpur, District: Cumilla"
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
            />
          </div>
        </div>
      </div>

      {/* Place & Date for Footer */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <h4 className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
          Place, Date & Declaration (স্থান ও তারিখ)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Place (স্থান)
            </label>
            <input
              type="text"
              value={bio.place || ''}
              onChange={(e) => handleChange('place', e.target.value)}
              placeholder="Dhaka"
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Submission Date (তারিখ)
            </label>
            <input
              type="text"
              value={bio.submissionDate || ''}
              onChange={(e) => handleChange('submissionDate', e.target.value)}
              placeholder={new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Declaration (ঘোষণাপত্র - Optional)
          </label>
          <textarea
            rows={2}
            value={bio.declaration || ''}
            onChange={(e) => handleChange('declaration', e.target.value)}
            placeholder="I hereby declare that all the information provided above is true and correct to the best of my knowledge."
            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
          />
        </div>
      </div>
    </div>
  );
};

