import React, { useState } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X } from 'lucide-react';

export const ImageInput = ({ label = 'Image', value = '', onChange, placeholder = 'https://...' }) => {
  const [mode, setMode] = useState('url'); // 'url' | 'upload'
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result); // Base64 data URL
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700">{label}</label>
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors ${
              mode === 'url' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>URL Link</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors ${
              mode === 'upload' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload File</span>
          </button>
        </div>
      </div>

      {mode === 'url' ? (
        <div className="space-y-2">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
          />
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
            dragActive ? 'border-emerald-600 bg-emerald-50/50' : 'border-slate-300 hover:border-emerald-600 bg-slate-50'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
            className="hidden"
          />
          <label htmlFor={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`} className="cursor-pointer space-y-1.5 block">
            <Upload className="w-6 h-6 text-slate-400 mx-auto" />
            <div className="text-xs font-bold text-slate-700">Click to choose image or drag & drop</div>
            <div className="text-[10px] text-slate-400">Supports PNG, JPG, JPEG, WEBP (Max 5MB)</div>
          </label>
        </div>
      )}

      {/* Live Thumbnail Preview */}
      {value && (
        <div className="flex items-center justify-between bg-slate-100 p-2 rounded-xl text-xs border border-slate-200">
          <div className="flex items-center gap-2 overflow-hidden">
            <img src={value} alt="Preview" className="w-10 h-10 object-cover rounded-lg shrink-0 border border-slate-300" />
            <span className="text-[11px] text-slate-600 font-mono truncate max-w-[200px]">
              {value.startsWith('data:') ? 'Uploaded Image File' : value}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1 text-slate-400 hover:text-red-600 hover:bg-slate-200 rounded-lg shrink-0"
            title="Remove Image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
