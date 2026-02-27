import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, FileVideo, Type, X, Copy, Check, MessageCircle, ExternalLink, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { encodeEventData } from '../utils/urlHelper';
import CustomCalendar from '../components/CustomCalendar';

const TEMPLATES = [
    { id: 'classic', name: 'Classic Gold', color: 'bg-[#D4AF37]', textColor: 'text-[#D4AF37]' },
    { id: 'romantic', name: 'Romantic Rose', color: 'bg-[#FFB7C5]', textColor: 'text-[#FFB7C5]' },
    { id: 'modern', name: 'Modern Minimal', color: 'bg-[#2D3436]', textColor: 'text-[#2D3436]' },
];

const GIFTS = [
    { id: 'watch', name: 'Luxury Watch', icon: '⌚' },
    { id: 'travel', name: 'Travel Voucher', icon: '✈️' },
    { id: 'home', name: 'Home Decor', icon: '🏠' },
    { id: 'dinner', name: 'Romantic Dinner', icon: '🕯️' },
];

export default function CreateEvent() {
    const navigate = useNavigate();
    const [eventName, setEventName] = useState('');
    const [hostName, setHostName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [templateId, setTemplateId] = useState(TEMPLATES[0].id);
    const [selectedGifts, setSelectedGifts] = useState<string[]>([]);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [isSharing, setIsSharing] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [copied, setCopied] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
        };

        if (isCalendarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCalendarOpen]);

    const toggleGift = (id: string) => {
        setSelectedGifts(prev =>
            prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
        );
    };

    const handleShare = async () => {
        setIsSharing(true);
        try {
            const data = {
                names: eventName,
                hostName,
                description,
                date,
                templateId,
                gifts: selectedGifts
            };

            if (videoFile) {
                const videoUrl = URL.createObjectURL(videoFile);
                sessionStorage.setItem('pending_video', videoUrl);
            }

            const encoded = encodeEventData(data);
            const url = `${window.location.origin}/intro/${encoded}`;
            setGeneratedUrl(url);

            setShowShareModal(true);
        } catch (error) {
            console.error('Error sharing:', error);
        } finally {
            setIsSharing(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-premium-cream py-12 px-4 selection:bg-premium-gold/30">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto bg-white rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] overflow-hidden border border-premium-gold/10"
            >
                <div className="md:flex">
                    <div className="md:w-1/3 bg-premium-dark p-12 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-premium-gold/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                        <div className="z-10">
                            <Heart className="w-10 h-10 text-premium-gold mb-8" />
                            <h2 className="text-3xl font-serif mb-4 leading-tight">Craft Your Special Moment</h2>
                            <p className="text-gray-400 font-light leading-relaxed">
                                Design a personalized experience for your guests with a custom video intro and elegant gift registry.
                            </p>
                        </div>
                    </div>

                    <div className="md:w-2/3 p-8 md:p-16">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="text-xl font-serif text-premium-dark flex items-center gap-2">
                                    <Type className="w-5 h-5 text-premium-gold" />
                                    Event Basics
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Event Name</label>
                                        <input
                                            type="text"
                                            value={eventName}
                                            onChange={(e) => setEventName(e.target.value)}
                                            placeholder="e.g. Rahul & Priya's Wedding"
                                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-premium-gold focus:ring-4 focus:ring-premium-gold/5 outline-none transition-all text-gray-800 font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Event Hoster</label>
                                        <input
                                            type="text"
                                            value={hostName}
                                            onChange={(e) => setHostName(e.target.value)}
                                            placeholder="Your Name"
                                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-premium-gold focus:ring-4 focus:ring-premium-gold/5 outline-none transition-all text-gray-800 font-medium"
                                        />
                                    </div>
                                    <div className="md:col-span-2 relative">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">Pick Your Date</label>
                                        <div
                                            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent hover:border-premium-gold/30 cursor-pointer transition-all flex items-center justify-between group"
                                        >
                                            <span className={`font-medium ${date ? 'text-gray-800' : 'text-gray-400'}`}>
                                                {date ? new Date(date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) : 'Select Date'}
                                            </span>
                                            <Heart className={`w-4 h-4 transition-colors ${date ? 'text-premium-gold fill-current' : 'text-gray-300 group-hover:text-premium-gold/50'}`} />
                                        </div>

                                        <AnimatePresence>
                                            {isCalendarOpen && (
                                                <motion.div
                                                    ref={calendarRef}
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    className="absolute z-50 left-0 right-0 mt-2 filter drop-shadow-2xl"
                                                >
                                                    <CustomCalendar
                                                        selectedDate={date}
                                                        onDateSelect={(newDate) => {
                                                            setDate(newDate);
                                                            setIsCalendarOpen(false);
                                                        }}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-serif text-premium-dark flex items-center gap-2">
                                    <FileVideo className="w-5 h-5 text-premium-gold" />
                                    Media & Story
                                </h3>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`relative w-full aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all p-6 text-center ${videoFile ? 'border-premium-gold bg-premium-gold/5' : 'border-gray-200 hover:border-premium-gold/40 hover:bg-gray-50'
                                        }`}
                                >
                                    {videoFile ? (
                                        <div className="w-full">
                                            <FileVideo className="w-10 h-10 text-premium-gold mx-auto mb-3" />
                                            <p className="text-sm font-bold text-premium-dark break-all line-clamp-2 px-2">
                                                {videoFile.name}
                                            </p>
                                            <p className="text-[10px] text-premium-gold/60 uppercase tracking-widest mt-2 font-bold">Ready to share</p>
                                        </div>
                                    ) : (
                                        <>
                                            <FileVideo className="w-10 h-10 text-gray-200 mb-2" />
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Upload Video</span>
                                        </>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                                        className="hidden"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Write Your Message</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Short Message..."
                                        rows={3}
                                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-premium-gold focus:ring-4 focus:ring-premium-gold/5 outline-none transition-all text-gray-800 font-medium resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-tighter mb-4 text-center">Theme Aesthetic</label>
                            <div className="flex justify-center gap-6">
                                {TEMPLATES.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => setTemplateId(t.id)}
                                        className={`group relative p-1 rounded-full border-2 transition-all duration-500 ${templateId === t.id ? 'border-premium-gold scale-110' : 'border-transparent opacity-60'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-full ${t.color}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {GIFTS.map(gift => (
                                <button
                                    key={gift.id}
                                    onClick={() => toggleGift(gift.id)}
                                    className={`p-4 rounded-3xl border-2 transition-all ${selectedGifts.includes(gift.id) ? 'border-premium-gold bg-premium-gold/5' : 'border-transparent bg-gray-50'
                                        }`}
                                >
                                    <span className="text-2xl block mb-1">{gift.icon}</span>
                                    <span className="text-[10px] font-bold uppercase">{gift.name}</span>
                                </button>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <button
                                disabled={isSharing || !eventName || !hostName || !date}
                                onClick={handleShare}
                                className="group relative px-20 py-6 bg-premium-dark text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl disabled:opacity-50"
                            >
                                <div className="flex items-center justify-center gap-3 relative z-10 font-serif tracking-widest uppercase">
                                    {isSharing ? 'Sharing...' : 'Generate & Share'}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {showShareModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowShareModal(false)}
                            className="absolute inset-0 bg-premium-dark/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative w-full max-w-lg bg-white rounded-[2.5rem] p-12 text-center"
                        >
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="absolute top-6 right-6 p-2"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                            <h3 className="text-3xl font-serif text-premium-dark mb-6">Share Your Invite</h3>
                            <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl mb-6">
                                <div className="flex-1 px-4 text-sm truncate text-gray-500">{generatedUrl}</div>
                                <button
                                    onClick={copyToClipboard}
                                    className="px-6 py-3 bg-premium-dark text-white rounded-xl font-bold text-sm"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <a
                                    href={`https://wa.me/?text=${encodeURIComponent(generatedUrl)}`}
                                    target="_blank"
                                    className="flex items-center justify-center gap-2 p-5 rounded-2xl bg-green-500/10 text-green-600 font-bold"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    WhatsApp
                                </a>
                                <button
                                    onClick={() => {
                                        const path = generatedUrl.replace(window.location.origin, '');
                                        navigate(path);
                                    }}
                                    className="flex items-center justify-center gap-2 p-5 rounded-2xl bg-premium-gold/10 text-premium-gold font-bold"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    Preview
                                </button>
                                {navigator.share && (
                                    <button
                                        onClick={async () => {
                                            try {
                                                await navigator.share({
                                                    title: eventName || 'Wedding Event',
                                                    text: `Join ${hostName}'s wedding invitation! Check out the story:`,
                                                    url: generatedUrl,
                                                });
                                            } catch (err) {
                                                console.log("Native share cancelled or failed");
                                            }
                                        }}
                                        className="col-span-2 flex items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 text-gray-500 font-bold text-sm hover:bg-gray-100 transition-colors"
                                    >
                                        <Share2 className="w-4 h-4" />
                                        Other Share Options
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
