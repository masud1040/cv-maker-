import React from 'react';
import { BioDataDetails, PersonalInfo } from '../../types/cv';
import { User, Calendar, MapPin, Heart, Shield, Flag, FileText, CheckSquare, Sparkles } from 'lucide-react';

interface BioDataFormProps {
  data?: BioDataDetails;
  personalInfo?: PersonalInfo;
  onChange: (data: BioDataDetails) => void;
  onUpdatePersonalInfo?: (data: PersonalInfo) => void;
}

export const BioDataForm: React.FC<BioDataFormProps> = ({
  data = {},
  personalInfo,
  onChange,
  onUpdatePersonalInfo
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
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              Bio Data Details
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Personal, family, and demographic fields for Job Bio Data format.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
            Conditional Auto-Hide
          </span>
        </div>
        <p className="text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2 rounded mt-2 border border-amber-200 dark:border-amber-800/50">
          💡 <strong>Note:</strong> কোনো ফিল্ড ফাঁকা রাখলে তা প্রিন্ট বা প্রিভিউতে সম্পূর্ণ অদৃশ্য থাকবে। শুধুমাত্র পূরণকৃত তথ্যই সুবিন্যস্তভাবে প্রদর্শিত হবে।
        </p>
      </div>

      {/* Basic Family & Identity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Father's Name */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Father's Name (পিতার নাম)
          </label>
          <input
            type="text"
            value={bio.fatherName || ''}
            onChange={(e) => handleChange('fatherName', e.target.value)}
            placeholder="Md. Rafiqul Islam"
            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Mother's Name */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Mother's Name (মাতার নাম)
          </label>
          <input
            type="text"
            value={bio.motherName || ''}
            onChange={(e) => handleChange('motherName', e.target.value)}
            placeholder="Salma Begum"
            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Date of Birth (জন্ম তারিখ)
          </label>
          <div className="relative">
            <input
              type="text"
              value={bio.dateOfBirth || ''}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              placeholder="15 October 1999 / 15-10-1999"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Calendar className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Gender (লিঙ্গ)
          </label>
          <select
            value={bio.gender || ''}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">-- Select Gender (or keep empty) --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Marital Status (বৈবাহিক অবস্থা)
          </label>
          <select
            value={bio.maritalStatus || ''}
            onChange={(e) => handleChange('maritalStatus', e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">-- Select Status (or keep empty) --</option>
            <option value="Unmarried / Single">Unmarried / Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </select>
        </div>

        {/* Religion */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Religion (ধর্ম)
          </label>
          <input
            type="text"
            value={bio.religion || ''}
            onChange={(e) => handleChange('religion', e.target.value)}
            placeholder="Islam / Hinduism / Christianity / Buddhism"
            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Nationality (জাতীয়তা)
          </label>
          <div className="relative">
            <input
              type="text"
              value={bio.nationality || ''}
              onChange={(e) => handleChange('nationality', e.target.value)}
              placeholder="Bangladeshi (By Birth)"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Flag className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Blood Group (রক্তের গ্রুপ)
          </label>
          <div className="relative">
            <input
              type="text"
              value={bio.bloodGroup || ''}
              onChange={(e) => handleChange('bloodGroup', e.target.value)}
              placeholder="B+ (ve) / A+ / O+"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Heart className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* National ID / NID */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            National ID / Passport No (জাতীয় পরিচয়পত্র / পাসপোর্ট)
          </label>
          <div className="relative">
            <input
              type="text"
              value={bio.nationalId || ''}
              onChange={(e) => handleChange('nationalId', e.target.value)}
              placeholder="1999261234567890"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Shield className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Height / Weight (Optional) */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Height & Weight (উচ্চতা ও ওজন)
          </label>
          <input
            type="text"
            value={bio.height || ''}
            onChange={(e) => handleChange('height', e.target.value)}
            placeholder="5 ft 8 inch, 68 kg"
            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Address Details */}
      <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          Address Details (ঠিকানা)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Present Address (বর্তমান ঠিকানা)
            </label>
            <textarea
              rows={2}
              value={bio.presentAddress || ''}
              onChange={(e) => handleChange('presentAddress', e.target.value)}
              placeholder="House #12, Road #4, Dhanmondi, Dhaka-1209"
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Permanent Address (স্থায়ী ঠিকানা)
            </label>
            <textarea
              rows={2}
              value={bio.permanentAddress || ''}
              onChange={(e) => handleChange('permanentAddress', e.target.value)}
              placeholder="Village: Joypur, P.O: Chandpur, District: Cumilla"
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Place & Date for Footer */}
      <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-emerald-600" />
          Place, Date & Declaration (স্থান ও তারিখ)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Place (স্থান)
            </label>
            <input
              type="text"
              value={bio.place || ''}
              onChange={(e) => handleChange('place', e.target.value)}
              placeholder="Dhaka / Chittagong"
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Submission Date (তারিখ)
            </label>
            <input
              type="text"
              value={bio.submissionDate || ''}
              onChange={(e) => handleChange('submissionDate', e.target.value)}
              placeholder={new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Declaration (ঘোষণাপত্র - Optional)
          </label>
          <textarea
            rows={2}
            value={bio.declaration || ''}
            onChange={(e) => handleChange('declaration', e.target.value)}
            placeholder="I hereby declare that all the information provided above is true and correct to the best of my knowledge."
            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>
    </div>
  );
};
