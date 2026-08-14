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

  const handleSetToday = () => {
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    handleFieldChange('date', today);
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
      <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">Bottom Signature Option</h3>
              <p className="text-xs text-zinc-500">
                Adds a signature line with title & date at the bottom of your CV.
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
            <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {enabled ? (
          <div className="space-y-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-zinc-500" /> Signer Name
                </label>
                <input
                  type="text"
                  value={signerName}
                  onChange={(e) => handleFieldChange('signerName', e.target.value)}
                  placeholder="e.g. Saiful Alam Masud"
                  className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1 flex items-center gap-1.5">
                  <FileSignature className="w-3.5 h-3.5 text-zinc-500" /> Title / Designation
                </label>
                <input
                  type="text"
                  value={signerTitle}
                  onChange={(e) => handleFieldChange('signerTitle', e.target.value)}
                  placeholder="e.g. Applicant Signature"
                  className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
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
                <div className="flex items-center gap-4 p-3 bg-zinc-50 border border-zinc-200 rounded-lg">
                  <div className="h-12 w-32 bg-white border border-zinc-200 rounded flex items-center justify-center p-1">
                    <img src={signatureImage} alt="Uploaded Signature" className="max-h-full max-w-full object-contain" />
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 border border-red-200 rounded-md transition flex items-center gap-1.5 font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove Image
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-4 border border-dashed border-zinc-300 rounded-lg text-xs font-medium text-zinc-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 transition flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" /> Upload Signature PNG/JPEG (Transparent background recommended)
                </button>
              )}
            </div>

            {/* Signature Preview */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl mt-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
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
                  <div className="w-36 border-t-2 border-slate-900 mx-auto mb-1.5"></div>
                  <p className="text-xs font-bold text-slate-900 leading-snug">
                    {signerName || 'Signature Name'}
                  </p>
                  {signerTitle && (
                    <p className="text-[10px] font-medium text-slate-600 leading-tight">
                      {signerTitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-zinc-400 italic pt-1">
            Signature section is currently disabled. Toggle the switch above to display a signature block at the bottom of your PDF.
          </p>
        )}
      </div>
    </div>
  );
};
