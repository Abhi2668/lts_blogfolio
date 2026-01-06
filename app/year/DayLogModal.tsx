'use client';

import { HiX, HiCalendar, HiTag, HiPhotograph, HiDocumentText } from "react-icons/hi";
import { useEffect } from "react";

type DayLog = {
  _id: string;
  date: string;
  color: string;
  note?: string;
  mood?: string;
  tags?: string[];
  image?: {
    asset: {
      _id: string;
      url: string;
    };
  };
};

interface DayLogModalProps {
  log: DayLog | null;
  date: string;
  isOpen: boolean;
  onClose: () => void;
  colorLabel: string;
}

function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export default function DayLogModal({ log, date, isOpen, onClose, colorLabel }: DayLogModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const dateObj = parseLocalDate(date);
  const formattedDate = dateObj.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-2xl shadow-2xl border-2 border-[#d8c4a6] max-w-2xl w-full max-h-[85vh] overflow-hidden pointer-events-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#f4efe7] to-[#e8dfd0] px-6 py-4 border-b border-[#d8c4a6] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HiCalendar className="w-6 h-6 text-[#6b8e4e]" />
              <div>
                <h2 className="text-xl font-bold text-[#3e3e2d]">
                  {formattedDate}
                </h2>
                {log && (
                  <div className="flex items-center gap-2 mt-1">
                    <div 
                      className="w-4 h-4 rounded-full shadow-sm"
                      style={{ backgroundColor: log.color }}
                    />
                    <span className="text-sm font-semibold text-[#6b8e4e]">
                      {colorLabel}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-white hover:bg-red-50 text-[#5c5c4a] hover:text-red-600 transition-all flex items-center justify-center border border-[#d8c4a6] hover:border-red-300"
              aria-label="Close modal"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-6 space-y-6">
            {!log ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#f4efe7] flex items-center justify-center">
                  <HiCalendar className="w-10 h-10 text-[#b8a890]" />
                </div>
                <p className="text-lg text-[#5c5c4a] font-medium">No entry for this day</p>
                <p className="text-sm text-[#8b7f72] mt-2">This day hasn't been logged yet</p>
              </div>
            ) : (
              <>
                {/* Mood Section */}
                {log.mood && (
                  <div className="bg-[#f4efe7] rounded-xl p-5 border border-[#d8c4a6]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6b8e4e] to-[#4a6335] flex items-center justify-center">
                        <span className="text-white text-lg">💭</span>
                      </div>
                      <h3 className="text-sm font-bold text-[#3e3e2d] uppercase tracking-wide">
                        Mood
                      </h3>
                    </div>
                    <p className="text-lg text-[#3e3e2d] font-medium italic leading-relaxed">
                      "{log.mood}"
                    </p>
                  </div>
                )}

                {/* Note Section */}
                {log.note && (
                  <div className="bg-[#f4efe7] rounded-xl p-5 border border-[#d8c4a6]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6b8e4e] to-[#4a6335] flex items-center justify-center">
                        <HiDocumentText className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-sm font-bold text-[#3e3e2d] uppercase tracking-wide">
                        Notes
                      </h3>
                    </div>
                    <p className="text-base text-[#5c5c4a] leading-relaxed whitespace-pre-wrap">
                      {log.note}
                    </p>
                  </div>
                )}

                {/* Tags Section */}
                {log.tags && log.tags.length > 0 && (
                  <div className="bg-[#f4efe7] rounded-xl p-5 border border-[#d8c4a6]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6b8e4e] to-[#4a6335] flex items-center justify-center">
                        <HiTag className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-sm font-bold text-[#3e3e2d] uppercase tracking-wide">
                        Tags
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {log.tags.map(tag => (
                        <span 
                          key={tag}
                          className="px-4 py-2 bg-white border-2 border-[#6b8e4e] text-[#6b8e4e] rounded-full text-sm font-semibold hover:bg-[#6b8e4e] hover:text-white transition-all cursor-default"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Section */}
                {log.image?.asset?.url && (
                  <div className="bg-[#f4efe7] rounded-xl p-5 border border-[#d8c4a6]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6b8e4e] to-[#4a6335] flex items-center justify-center">
                        <HiPhotograph className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-sm font-bold text-[#3e3e2d] uppercase tracking-wide">
                        Image
                      </h3>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-lg border border-[#d8c4a6]">
                      <img
                        src={log.image.asset.url}
                        alt={`Memory from ${formattedDate}`}
                        className="w-full h-auto max-h-96 object-contain bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Empty state when log exists but has no content */}
                {!log.mood && !log.note && (!log.tags || log.tags.length === 0) && !log.image && (
                  <div className="text-center py-8">
                    <p className="text-[#8b7f72]">This entry only has a mood color recorded</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="bg-[#f4efe7] px-6 py-4 border-t border-[#d8c4a6] flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-[#6b8e4e] hover:bg-[#5a7a42] text-white font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}