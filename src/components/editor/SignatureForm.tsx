import React, { useRef } from 'react';
import { SignatureData } from '../../types/cv';
import { PenTool, User, FileSignature, Upload, Trash2 } from 'lucide-react';

interface SignatureFormProps {
  signature?: SignatureData;
  defaultName: string;
  defaultTitle: string;
  onChange: (updated: SignatureData) => void;
}

export const SignatureForm: React.FC<SignatureFormProps> = ({
  signature,
  defaultName,
  defaultTitle,
  onChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const enabled = Boolean(signature?.enabled);
  const signerName = signature?.signerName ?? defaultName;
  const signerTitle = signature?.signerTitle ?? (defaultTitle || 'Applicant Signature');
  const signatureImage = signature?.signatureImage || '';

  const handleToggle = (checked: boolean) => {
    onChange({
      ...(signature || {}),
      enabled: checked,
      signerName: signerName || defaultName,
      signerTitle: signerTitle || 'Applicant Signature',
      signatureImage
    });
  };

  const handleFieldChange = (field: keyof SignatureData, value: any) => {
    onChange({
      ...(signature || {}),
      enabled,
      signerName,
      signerTitle,
      signatureImage,
      [field]: value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert('File size exceeds 3MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        handleFieldChange('signatureImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    handleFieldChange('signatureImage', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">
              <PenTool className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Bottom Signature Block</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Adds a formal signature line with title & date at the bottom of your CV.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => handleToggle(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-slate-900 dark:peer-checked:bg-white dark:peer-checked:after:bg-slate-900"></div>
          </label>
        </div>

        {enabled ? (
          <div className="space-y-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" /> Signer Name
                </label>
                <input
                  type="text"
                  value={signerName}
                  onChange={(e) => handleFieldChange('signerName', e.target.value)}
                  placeholder="e.g. Saiful Alam Masud"
                  className="w-full text-xs px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <FileSignature className="w-3.5 h-3.5 text-slate-400" /> Title / Designation
                </label>
                <input
                  type="text"
                  value={signerTitle}
                  onChange={(e) => handleFieldChange('signerTitle', e.target.value)}
                  placeholder="e.g. Applicant Signature"
                  className="w-full text-xs px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Optional Signature Image
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              {signatureImage ? (
                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div className="h-12 w-32 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded flex items-center justify-center p-1">
                    <img src={signatureImage} alt="Uploaded Signature" className="max-h-full max-w-full object-contain" />
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-lg transition flex items-center gap-1.5 font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove Image
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:border-slate-900 dark:hover:border-white hover:text-slate-900 dark:hover:text-white transition flex items-center justify-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5" /> Upload Signature PNG/JPEG (Transparent background recommended)
                </button>
              )}
            </div>

            {/* Signature Preview */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl mt-4">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
                Signature Live Preview
              </span>
              <div className="flex justify-end pt-2">
                <div className="text-center min-w-[180px] max-w-[220px]">
                  {signatureImage && (
                    <div className="h-10 mb-1 flex items-center justify-center">
                      <img src={signatureImage} alt="Signature" className="max-h-10 max-w-full object-contain" />
                    </div>
                  )}
                  {/* Small line above signature */}
                  <div className="w-36 border-t border-slate-900 dark:border-white mx-auto mb-1.5"></div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                    {signerName || 'Signature Name'}
                  </p>
                  {signerTitle && (
                    <p className="text-[10px] font-normal text-slate-500 dark:text-slate-400 leading-tight">
                      {signerTitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400 dark:text-slate-500 italic pt-1">
            Signature section is currently disabled. Toggle the switch above to display a signature block at the bottom of your PDF.
          </p>
        )}
      </div>
    </div>
  );
};

