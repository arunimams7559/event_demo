import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface CustomCalendarProps {
    selectedDate: string;
    onDateSelect: (date: string) => void;
}

export default function CustomCalendar({ selectedDate, onDateSelect }: CustomCalendarProps) {
    const [viewDate, setViewDate] = useState(selectedDate ? new Date(selectedDate) : new Date());
    const [direction, setDirection] = useState(0);

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const handlePrevMonth = () => {
        setDirection(-1);
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setDirection(1);
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const days = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);

    const prevMonthDays = daysInMonth(year, month - 1);
    const daysArray = [];

    // Previous month padding
    for (let i = firstDay - 1; i >= 0; i--) {
        daysArray.push({ day: prevMonthDays - i, currentMonth: false, monthOffset: -1 });
    }

    // Current month days
    for (let i = 1; i <= days; i++) {
        daysArray.push({ day: i, currentMonth: true, monthOffset: 0 });
    }

    // Next month padding
    const remainingSlots = 42 - daysArray.length;
    for (let i = 1; i <= remainingSlots; i++) {
        daysArray.push({ day: i, currentMonth: false, monthOffset: 1 });
    }

    const isSelected = (day: number, monthOffset: number) => {
        if (!selectedDate) return false;
        const cur = new Date(year, month + monthOffset, day);
        const [selY, selM, selD] = selectedDate.split('-').map(Number);
        return cur.getFullYear() === selY &&
            (cur.getMonth() + 1) === selM &&
            cur.getDate() === selD;
    };

    const handleDateClick = (day: number, monthOffset: number) => {
        const newDate = new Date(year, month + monthOffset, day);
        const y = newDate.getFullYear();
        const m = String(newDate.getMonth() + 1).padStart(2, '0');
        const d = String(newDate.getDate()).padStart(2, '0');
        const formatted = `${y}-${m}-${d}`;

        onDateSelect(formatted);

        if (monthOffset !== 0) {
            setDirection(monthOffset);
            setViewDate(new Date(y, newDate.getMonth(), 1));
        }
    };

    const calendarVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 20 : -20,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 20 : -20,
            opacity: 0
        })
    };

    return (
        <div className="w-full bg-white rounded-3xl p-6 shadow-xl border border-premium-gold/10 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-50 rounded-full transition-colors text-premium-gold"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h4 className="text-xl font-serif font-bold text-premium-dark tracking-wide">
                    {monthNames[month]} {year}
                </h4>
                <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-50 rounded-full transition-colors text-premium-gold"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-7 mb-4">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                    <div key={d} className="text-center text-[10px] uppercase font-bold text-gray-400 tracking-widest py-2">
                        {d}
                    </div>
                ))}
            </div>

            <div className="relative">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={`${year}-${month}`}
                        custom={direction}
                        variants={calendarVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="grid grid-cols-7"
                    >
                        {daysArray.map((item, idx) => {
                            const selected = isSelected(item.day, item.monthOffset);
                            return (
                                <div
                                    key={idx}
                                    onClick={() => handleDateClick(item.day, item.monthOffset)}
                                    className={`
                                        relative aspect-square flex items-center justify-center cursor-pointer
                                        text-sm font-medium transition-all group p-1
                                        ${item.currentMonth ? 'text-premium-dark' : 'text-gray-300'}
                                        ${selected ? 'scale-110' : 'hover:scale-105'}
                                    `}
                                >
                                    <div className={`
                                        absolute inset-0 rounded-full transition-all duration-300
                                        ${selected ? 'bg-premium-gold shadow-lg scale-90' : 'group-hover:bg-gray-50'}
                                    `} />

                                    <span className={`relative z-10 ${selected ? 'text-white font-bold' : ''}`}>
                                        {item.day}
                                    </span>

                                    {selected && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-1 -right-1 z-20"
                                        >
                                            <Heart className="w-4 h-4 text-premium-gold fill-current drop-shadow-md filter brightness-110" />
                                        </motion.div>
                                    )}
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
