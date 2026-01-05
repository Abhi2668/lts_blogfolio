'use client';

import { HiOutlineCalendar, HiOutlineFilter, HiOutlineChartBar, HiOutlineViewList, HiOutlineSearch } from "react-icons/hi";
import { useState, useEffect } from "react";

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

function getDaysInYear(year: number): Date[] {
  const days: Date[] = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  
  return days;
}

const COLOR_LABELS: { [key: string]: string } = {
  '#22c55e': 'Excellent',
  '#3b82f6': 'Good',
  '#a855f7': 'Neutral',
  '#f97316': 'Poor',
  '#ef4444': 'Terrible',
};

const COLORS = ['#22c55e', '#3b82f6', '#a855f7', '#f97316', '#ef4444'];

interface YearPixelsClientProps {
  initialLogs: DayLog[];
  currentYear: number;
}

export default function YearPixelsClient({ initialLogs, currentYear }: YearPixelsClientProps) {
  const [dayLogs] = useState<DayLog[]>(initialLogs);
  const [filteredLogs, setFilteredLogs] = useState<DayLog[]>(initialLogs);
  const [selectedColors, setSelectedColors] = useState<string[]>(COLORS);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [viewMode, setViewMode] = useState<'calendar' | 'heatmap' | 'list'>('calendar');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyWithNotes, setShowOnlyWithNotes] = useState(false);
  const [showOnlyWithImages, setShowOnlyWithImages] = useState(false);

  useEffect(() => {
    let filtered = dayLogs.filter(log => selectedColors.includes(log.color));
    
    if (selectedTag) {
      filtered = filtered.filter(log => log.tags?.includes(selectedTag));
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(log => 
        log.note?.toLowerCase().includes(query) ||
        log.mood?.toLowerCase().includes(query) ||
        log.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (showOnlyWithNotes) {
      filtered = filtered.filter(log => log.note && log.note.length > 0);
    }
    
    if (showOnlyWithImages) {
      filtered = filtered.filter(log => log.image);
    }
    
    setFilteredLogs(filtered);
  }, [selectedColors, selectedTag, searchQuery, showOnlyWithNotes, showOnlyWithImages, dayLogs]);

  const logsByDate = new Map(filteredLogs.map(log => [log.date, log]));
  const allLogsByDate = new Map(dayLogs.map(log => [log.date, log]));
  const daysInYear = getDaysInYear(currentYear);
  
  // Group days by month
  const daysByMonth: { [key: number]: Date[] } = {};
  daysInYear.forEach(day => {
    const month = day.getMonth();
    if (!daysByMonth[month]) {
      daysByMonth[month] = [];
    }
    daysByMonth[month].push(day);
  });

  // Get all unique tags
  const allTags = Array.from(new Set(dayLogs.flatMap(log => log.tags || [])));

  // Calculate statistics
  const colorCounts = COLORS.reduce((acc, color) => {
    acc[color] = dayLogs.filter(log => log.color === color).length;
    return acc;
  }, {} as { [key: string]: number });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayAbbr = ["S", "M", "T", "W", "T", "F", "S"];

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const resetFilters = () => {
    setSelectedColors(COLORS);
    setSelectedTag('');
    setSearchQuery('');
    setShowOnlyWithNotes(false);
    setShowOnlyWithImages(false);
  };

  // Generate month labels for heatmap
  const generateMonthLabels = () => {
    const labels: React.ReactNode[] = [];
    let currentMonth = -1;
    
    const yearStart = new Date(currentYear, 0, 1);
    const firstSunday = new Date(yearStart);
    firstSunday.setDate(yearStart.getDate() - yearStart.getDay());
    
    for (let weekIdx = 0; weekIdx < 53; weekIdx++) {
      const weekDate = new Date(firstSunday);
      weekDate.setDate(firstSunday.getDate() + weekIdx * 7);
      
      const month = weekDate.getMonth();
      const year = weekDate.getFullYear();
      
      if (year === currentYear && month !== currentMonth) {
        labels.push(
          <div key={weekIdx} className="text-xs font-medium text-[#5c5c4a]" style={{ width: '13px' }}>
            {monthNames[month].substring(0, 3)}
          </div>
        );
        currentMonth = month;
      } else {
        labels.push(<div key={weekIdx} style={{ width: '13px' }}></div>);
      }
    }
    
    return labels;
  };

  // Generate heatmap weeks
  const generateHeatmapWeeks = () => {
    const weeks: React.ReactNode[] = [];
    const yearStart = new Date(currentYear, 0, 1);
    const firstSunday = new Date(yearStart);
    firstSunday.setDate(yearStart.getDate() - yearStart.getDay());
    
    for (let weekIdx = 0; weekIdx < 53; weekIdx++) {
      const days: React.ReactNode[] = [];
      
      for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
        const date = new Date(firstSunday);
        date.setDate(firstSunday.getDate() + weekIdx * 7 + dayIdx);
        
        // Skip if not in current year
        if (date.getFullYear() !== currentYear) {
          days.push(<div key={dayIdx} className="w-3 h-3"></div>);
          continue;
        }
        
        const dateStr = formatLocalDate(date);
        const log = allLogsByDate.get(dateStr);
        const isInFiltered = logsByDate.has(dateStr);
        const bgColor = log?.color || '#e5e7eb';
        const isFiltered = log && !isInFiltered;
        const dayNum = date.getDate();
        const monthName = monthNames[date.getMonth()];
        
        days.push(
          <div key={dayIdx} className="group relative">
            <div
              className={`w-3 h-3 rounded-sm cursor-pointer transition-all ${
                isFiltered 
                  ? 'opacity-20' 
                  : log 
                  ? 'hover:ring-2 hover:ring-[#6b8e4e] hover:scale-125 hover:z-20' 
                  : 'border border-[#d8c4a6] hover:border-[#b8a890]'
              }`}
              style={{ backgroundColor: bgColor }}
            ></div>
            
            {/* Tooltip */}
            {!isFiltered && (
              <div className="invisible group-hover:visible absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-[#3e3e2d] text-white text-xs rounded-lg shadow-xl whitespace-nowrap pointer-events-none">
                <div className="font-bold">{monthName} {dayNum}, {currentYear}</div>
                {log ? (
                  <>
                    <div className="font-semibold mt-1" style={{ color: log.color }}>
                      {COLOR_LABELS[log.color]}
                    </div>
                    {log.mood && <div className="text-gray-300 mt-1 italic">&quot;{log.mood}&quot;</div>}
                    {log.tags && log.tags.length > 0 && (
                      <div className="mt-1 text-gray-300 text-[10px]">
                        {log.tags.map(tag => `#${tag}`).join(' ')}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-gray-400 mt-1">No entry</div>
                )}
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                  <div className="w-2 h-2 bg-[#3e3e2d] rotate-45"></div>
                </div>
              </div>
            )}
          </div>
        );
      }
      
      weeks.push(
        <div key={weekIdx} className="flex flex-col gap-1">
          {days}
        </div>
      );
    }
    
    return weeks;
  };

  function parseLocalDate(dateStr: string): Date {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  function formatLocalDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="mb-12 text-center">
          <HiOutlineCalendar className="w-12 h-12 text-[#6b8e4e] mx-auto mb-4" />
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-[#3e3e2d]">
            Year in Pixels
          </h1>
          <p className="text-xl sm:text-2xl font-light text-[#6b8e4e] mb-2">{currentYear}</p>
          <p className="text-base text-[#5c5c4a] max-w-2xl mx-auto">
            A visual journal of every day
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-[#f4efe7] rounded-lg p-4 border border-[#d8c4a6] text-center">
            <div className="text-2xl font-bold text-[#3e3e2d]">{dayLogs.length}</div>
            <div className="text-xs text-[#5c5c4a] uppercase tracking-wide">Days Logged</div>
          </div>
          <div className="bg-[#f4efe7] rounded-lg p-4 border border-[#d8c4a6] text-center">
            <div className="text-2xl font-bold text-[#3e3e2d]">{Math.round((dayLogs.length / daysInYear.length) * 100)}%</div>
            <div className="text-xs text-[#5c5c4a] uppercase tracking-wide">Complete</div>
          </div>
          <div className="bg-[#f4efe7] rounded-lg p-4 border border-[#d8c4a6] text-center">
            <div className="text-2xl font-bold text-[#3e3e2d]">{dayLogs.filter(log => log.note).length}</div>
            <div className="text-xs text-[#5c5c4a] uppercase tracking-wide">With Notes</div>
          </div>
          <div className="bg-[#f4efe7] rounded-lg p-4 border border-[#d8c4a6] text-center">
            <div className="text-2xl font-bold text-[#3e3e2d]">{dayLogs.filter(log => log.image).length}</div>
            <div className="text-xs text-[#5c5c4a] uppercase tracking-wide">With Images</div>
          </div>
          <div className="bg-[#f4efe7] rounded-lg p-4 border border-[#d8c4a6] text-center">
            <div className="text-2xl font-bold text-[#3e3e2d]">{filteredLogs.length}</div>
            <div className="text-xs text-[#5c5c4a] uppercase tracking-wide">Filtered</div>
          </div>
        </div>

        {/* Filters and View Controls */}
        <div className="mb-8 space-y-4">
          {/* View Mode Toggle */}
          <div className="flex justify-center gap-2 flex-wrap">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'calendar'
                  ? 'bg-[#6b8e4e] text-white shadow-md'
                  : 'bg-[#f4efe7] text-[#5c5c4a] hover:bg-[#d8c4a6]'
              }`}
            >
              <HiOutlineCalendar className="inline w-4 h-4 mr-2" />
              Calendar
            </button>
            <button
              onClick={() => setViewMode('heatmap')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'heatmap'
                  ? 'bg-[#6b8e4e] text-white shadow-md'
                  : 'bg-[#f4efe7] text-[#5c5c4a] hover:bg-[#d8c4a6]'
              }`}
            >
              <HiOutlineChartBar className="inline w-4 h-4 mr-2" />
              Heatmap
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-[#6b8e4e] text-white shadow-md'
                  : 'bg-[#f4efe7] text-[#5c5c4a] hover:bg-[#d8c4a6]'
              }`}
            >
              <HiOutlineViewList className="inline w-4 h-4 mr-2" />
              List
            </button>
          </div>

          {/* Search and Quick Filters */}
          <div className="bg-[#f4efe7] rounded-xl p-4 border border-[#d8c4a6]">
            <div className="flex items-center gap-3 mb-4">
              <HiOutlineSearch className="w-5 h-5 text-[#6b8e4e]" />
              <input
                type="text"
                placeholder="Search notes, moods, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-[#d8c4a6] focus:border-[#6b8e4e] focus:outline-none bg-white text-[#3e3e2d] placeholder-[#b8a890]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowOnlyWithNotes(!showOnlyWithNotes)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  showOnlyWithNotes
                    ? 'bg-[#6b8e4e] text-white'
                    : 'bg-white text-[#5c5c4a] border border-[#d8c4a6] hover:border-[#6b8e4e]'
                }`}
              >
                📝 Only with Notes
              </button>
              <button
                onClick={() => setShowOnlyWithImages(!showOnlyWithImages)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  showOnlyWithImages
                    ? 'bg-[#6b8e4e] text-white'
                    : 'bg-white text-[#5c5c4a] border border-[#d8c4a6] hover:border-[#6b8e4e]'
                }`}
              >
                🖼️ Only with Images
              </button>
              <button
                onClick={resetFilters}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-[#5c5c4a] border border-[#d8c4a6] hover:border-[#ef4444] hover:text-[#ef4444] transition-all"
              >
                ✕ Clear All
              </button>
            </div>
          </div>

          {/* Color Filter */}
          <div className="bg-[#f4efe7] rounded-xl p-6 border border-[#d8c4a6]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HiOutlineFilter className="w-5 h-5 text-[#6b8e4e]" />
                <h2 className="text-sm font-semibold text-[#3e3e2d] uppercase tracking-wide">
                  Filter by Mood
                </h2>
              </div>
              <span className="text-xs text-[#5c5c4a]">
                {selectedColors.length}/{COLORS.length} selected
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => toggleColor(color)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedColors.includes(color)
                      ? 'border-[#6b8e4e] bg-white shadow-md'
                      : 'border-transparent bg-white opacity-40 hover:opacity-70'
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded-md shadow-sm"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="text-sm font-medium text-[#5c5c4a]">
                    {COLOR_LABELS[color]} ({colorCounts[color] || 0})
                  </span>
                </button>
              ))}
            </div>

            {/* Tag Filter */}
            {allTags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#d8c4a6]">
                <h3 className="text-xs font-semibold text-[#3e3e2d] uppercase tracking-wide mb-3">
                  Filter by Tag
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag('')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedTag === ''
                        ? 'bg-[#6b8e4e] text-white'
                        : 'bg-white text-[#5c5c4a] border border-[#d8c4a6] hover:border-[#6b8e4e]'
                    }`}
                  >
                    All
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        selectedTag === tag
                          ? 'bg-[#6b8e4e] text-white'
                          : 'bg-white text-[#5c5c4a] border border-[#d8c4a6] hover:border-[#6b8e4e]'
                      }`}
                    >
                      {tag} ({dayLogs.filter(log => log.tags?.includes(tag)).length})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Calendar/Heatmap/List Grid */}
        {viewMode === 'calendar' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(daysByMonth).map((monthKey) => {
              const month = parseInt(monthKey);
              const days = daysByMonth[month];
              const firstDay = days[0];
              const startingDayOfWeek = firstDay.getDay();

              return (
                <div key={month} className="bg-[#f4efe7] rounded-xl p-5 border border-[#d8c4a6]">
                  <h3 className="text-lg font-bold text-[#3e3e2d] mb-4">
                    {monthNames[month]}
                  </h3>
                  
                  {/* Day headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayAbbr.map((day, idx) => (
                      <div key={idx} className="text-center text-xs font-medium text-[#5c5c4a] h-6 flex items-center justify-center">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Days grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
                      <div key={`empty-${idx}`} className="aspect-square"></div>
                    ))}
                    
                    {days.map((day) => {
                      const dateStr = formatLocalDate(day);
                      const log = allLogsByDate.get(dateStr);
                      const isInFiltered = logsByDate.has(dateStr);
                      const bgColor = log?.color || '#ffffff';
                      const hasLog = !!log;
                      const dayOfMonth = day.getDate();
                      const isFiltered = hasLog && !isInFiltered;

                      return (
                        <div
                          key={dateStr}
                          className="group relative aspect-square"
                        >
                          <div
                            className={`w-full h-full rounded-md transition-all duration-200 cursor-pointer flex items-center justify-center relative ${
                              isFiltered
                                ? 'opacity-20'
                                : hasLog 
                                ? 'hover:scale-110 hover:shadow-lg hover:z-10 shadow-sm' 
                                : 'border-2 border-dashed border-[#d8c4a6] hover:border-[#b8a890]'
                            }`}
                            style={{ backgroundColor: bgColor }}
                            title={`${dateStr}${log?.note ? `: ${log.note}` : ''}`}
                          >
                            <span className={`text-xs font-medium ${hasLog ? 'text-white drop-shadow-sm' : 'text-[#8b7f72]'}`}>
                              {dayOfMonth}
                            </span>
                          </div>
                          
                          {/* Hover Card */}
                          {hasLog && (
                            <div className="invisible group-hover:visible absolute z-30 left-full ml-3 top-0 w-72 bg-white rounded-xl shadow-2xl border border-[#d8c4a6] p-4 pointer-events-none">
                              <div className="space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <div className="font-bold text-[#3e3e2d] text-base">
                                      {monthNames[month]} {dayOfMonth}
                                    </div>
                                    <div className="text-xs text-[#8b7f72] mt-0.5">
                                      {parseLocalDate(dateStr).toLocaleDateString('en-US', { weekday: 'long' })}
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-1">
                                    <div className="w-10 h-10 rounded-lg shadow-sm flex-shrink-0" style={{ backgroundColor: bgColor }}></div>
                                    <span className="text-xs font-bold text-[#6b8e4e]">{COLOR_LABELS[log.color]}</span>
                                  </div>
                                </div>
                                
                                {log.tags && log.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {log.tags.map(tag => (
                                      <span key={tag} className="px-2 py-0.5 bg-[#f4efe7] text-[#6b8e4e] text-xs rounded-full">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                
                                {log.mood && (
                                  <div className="pt-2 border-t border-[#f4efe7]">
                                    <div className="text-xs font-semibold text-[#6b8e4e] uppercase tracking-wide mb-1">Mood</div>
                                    <p className="text-sm text-[#3e3e2d] font-medium">{log.mood}</p>
                                  </div>
                                )}
                                
                                {log.note && (
                                  <div className="pt-2 border-t border-[#f4efe7]">
                                    <div className="text-xs font-semibold text-[#6b8e4e] uppercase tracking-wide mb-1">Note</div>
                                    <p className="text-sm text-[#5c5c4a] leading-relaxed">{log.note}</p>
                                  </div>
                                )}
                                
                                {log.image?.asset?.url && (
                                  <div className="pt-2 border-t border-[#f4efe7]">
                                    <img
                                      src={log.image.asset.url}
                                      alt=""
                                      className="w-full h-40 object-cover rounded-lg"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : viewMode === 'heatmap' ? (
          // Heatmap View - GitHub-style
          <div className="bg-[#f4efe7] rounded-xl p-8 border border-[#d8c4a6]">
            <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-lg font-bold text-[#3e3e2d]">Year Heatmap</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#5c5c4a]">Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-[#e5e7eb] border border-[#d8c4a6]"></div>
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#ef4444' }}></div>
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#f97316' }}></div>
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#a855f7' }}></div>
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#3b82f6' }}></div>
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#22c55e' }}></div>
                </div>
                <span className="text-xs text-[#5c5c4a]">More</span>
              </div>
            </div>
            
            <div className="overflow-x-auto pb-4">
              <div className="inline-block">
                <div className="flex">
                  {/* Day of week labels */}
                  <div className="mr-2 pt-6">
                    <div className="flex flex-col gap-1">
                      {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, idx) => (
                        <div key={idx} className="h-3 w-8 text-xs text-[#5c5c4a] flex items-center justify-end pr-1">
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Calendar grid */}
                  <div>
                    {/* Month labels */}
                    <div className="flex mb-1 h-5">
                      {generateMonthLabels()}
                    </div>
                    
                    {/* Day grid */}
                    <div className="flex gap-1">
                      {generateHeatmapWeeks()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly breakdown */}
            <div className="mt-8 pt-6 border-t border-[#d8c4a6]">
              <h3 className="text-sm font-semibold text-[#3e3e2d] uppercase tracking-wide mb-4">Monthly Breakdown</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {monthNames.map((month, idx) => {
                  const monthLogs = dayLogs.filter(log => {
                    const logDate = parseLocalDate(log.date);
                    return logDate.getMonth() === idx;
                  });
                  const daysInMonth = new Date(currentYear, idx + 1, 0).getDate();
                  const completionRate = Math.round((monthLogs.length / daysInMonth) * 100);
                  
                  return (
                    <div key={month} className="bg-white rounded-lg p-3 border border-[#d8c4a6] hover:shadow-md transition-shadow">
                      <div className="text-xs font-semibold text-[#5c5c4a] mb-1">{month.substring(0, 3)}</div>
                      <div className="text-lg font-bold text-[#3e3e2d]">{monthLogs.length}<span className="text-sm text-[#8b7f72]">/{daysInMonth}</span></div>
                      <div className="text-xs text-[#6b8e4e] font-medium">{completionRate}%</div>
                      {/* Mini color distribution */}
                      {monthLogs.length > 0 && (
                        <div className="flex gap-0.5 mt-2 h-1.5 rounded-full overflow-hidden">
                          {COLORS.map(color => {
                            const count = monthLogs.filter(log => log.color === color).length;
                            if (count === 0) return null;
                            return (
                              <div 
                                key={color}
                                className="h-full"
                                style={{ 
                                  backgroundColor: color,
                                  flex: count,
                                }}
                                title={`${COLOR_LABELS[color]}: ${count}`}
                              ></div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-12 bg-[#f4efe7] rounded-xl border border-[#d8c4a6]">
                <p className="text-[#5c5c4a] mb-2">No entries match your filters</p>
                <button
                  onClick={resetFilters}
                  className="text-sm text-[#6b8e4e] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              [...filteredLogs]
                .sort((a, b) => parseLocalDate(b.date).getTime() - parseLocalDate(a.date).getTime())
                .map((log) => (
                  <div key={log._id} className="bg-[#f4efe7] rounded-xl p-6 border border-[#d8c4a6] hover:shadow-lg transition-all">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-20 h-20 rounded-lg flex-shrink-0 shadow-md flex items-center justify-center"
                        style={{ backgroundColor: log.color }}
                      >
                        <span className="text-white text-2xl font-bold drop-shadow">
                          {parseLocalDate(log.date).getDate()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-bold text-[#3e3e2d]">
                            {parseLocalDate(log.date).toLocaleDateString('en-US', { 
                              weekday: 'long',
                              month: 'long', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </h3>
                          <span className="text-sm font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: log.color }}>
                            {COLOR_LABELS[log.color]}
                          </span>
                        </div>
                        
                        {log.mood && (
                          <p className="text-[#3e3e2d] font-medium mb-2 italic">&quot;{log.mood}&quot;</p>
                        )}
                        
                        {log.note && (
                          <p className="text-[#5c5c4a] mb-3 leading-relaxed">{log.note}</p>
                        )}
                        
                        {log.tags && log.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {log.tags.map(tag => (
                              <span key={tag} className="px-3 py-1 bg-white border border-[#d8c4a6] text-[#6b8e4e] rounded-full text-xs font-medium">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {log.image?.asset?.url && (
                          <img
                            src={log.image.asset.url}
                            alt=""
                            className="w-full max-w-md h-48 object-cover rounded-lg mt-3 shadow-md"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}
      </section>
    </div>
  );
}