import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, FileVideo, Type, X, Copy, Check, MessageCircle, ExternalLink, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { encodeEventData } from '../utils/urlHelper';
import CustomCalendar from '../components/CustomCalendar';
import Logo from '../components/Logo';

const TEMPLATES = [
    { id: 'classic', name: 'Classic Gold', color: 'bg-[#D4AF37]', textColor: 'text-[#D4AF37]' },
    { id: 'romantic', name: 'Romantic Rose', color: 'bg-[#FFB7C5]', textColor: 'text-[#FFB7C5]' },
    { id: 'modern', name: 'Modern Minimal', color: 'bg-[#2D3436]', textColor: 'text-[#2D3436]' },
];

const GIFTS = [
    { id: 'watch', name: 'Luxury Watch', icon: '⌚', label: 'Timeless' },
    { id: 'travel', name: 'Travel Voucher', icon: '✈️', label: 'Discovery' },
    { id: 'home', name: 'Home Decor', icon: '🏠', label: 'Sanctuary' },
    { id: 'dinner', name: 'Romantic Dinner', icon: '🕯️', label: 'Exquisite' },
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
    const [showInspiration, setShowInspiration] = useState(false);

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
                className="max-w-6xl mx-auto bg-white rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden border border-premium-gold/5"
            >
                <div className="md:flex min-h-[800px]">
                    {/* Enhanced Sidebar */}
                    <div className="md:w-[35%] bg-premium-dark p-16 text-white flex flex-col justify-between relative overflow-hidden">
                        {/* Decorative Background Elements */}
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-premium-gold/15 rounded-full blur-[100px] animate-pulse" />
                        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/5 rounded-full blur-[80px]" />

                        {/* Floating Circles */}
                        <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-premium-gold/20 animate-float translate-x-4 opacity-40" />
                        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-white/20 animate-float delay-700 opacity-30" />

                        <div className="z-10 relative">
                            <Logo dark className="mb-12" />

                            <h2 className="text-4xl lg:text-5xl font-serif mb-6 leading-[1.1] tracking-tight">
                                Your Special <br />
                                <span className="text-premium-gold italic">Lumiere</span> Moment
                            </h2>

                            <div className="w-12 h-1 bg-premium-gold/30 mb-8 rounded-full" />

                            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-[280px]">
                                Design a personalized experience for your guests with a custom video intro and elegant gift registry.
                            </p>
                        </div>

                        <div className="z-10 pt-12">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowInspiration(true)}
                                className="w-full text-left"
                            >
                                <div className="glass-dark p-6 rounded-4xl border-white/10 hover:border-premium-gold/30 transition-colors cursor-pointer group/trust">
                                    <div className="flex -space-x-3 mb-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-premium-dark bg-premium-gold/20 backdrop-blur-sm" />
                                        ))}
                                        <div className="w-10 h-10 rounded-full border-2 border-premium-dark bg-white/10 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold">
                                            +50
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-premium-gold/80">Trusted by modern couples</p>
                                        <ExternalLink className="w-3 h-3 text-premium-gold opacity-0 group-hover/trust:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </motion.button>
                        </div>
                    </div>

                    {/* Main Form Section */}
                    <div className="md:w-[65%] p-10 md:p-20 bg-gray-50/30">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-10">
                                <header className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-premium-gold/10 flex items-center justify-center">
                                        <Type className="w-5 h-5 text-premium-gold" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-premium-dark">Event Basics</h3>
                                </header>

                                <div className="space-y-8">
                                    <div className="group">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1 transition-colors group-focus-within:text-premium-gold">Event Name</label>
                                        <input
                                            type="text"
                                            value={eventName}
                                            onChange={(e) => setEventName(e.target.value)}
                                            placeholder="Rahul & Priya's Wedding"
                                            className="w-full px-6 py-5 rounded-2xl bg-white border border-gray-100 shadow-sm focus:border-premium-gold/50 focus:ring-8 focus:ring-premium-gold/5 outline-none transition-all text-gray-800 font-medium placeholder:text-gray-300"
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1 transition-colors group-focus-within:text-premium-gold">Event Hoster</label>
                                        <input
                                            type="text"
                                            value={hostName}
                                            onChange={(e) => setHostName(e.target.value)}
                                            placeholder="Your Name"
                                            className="w-full px-6 py-5 rounded-2xl bg-white border border-gray-100 shadow-sm focus:border-premium-gold/50 focus:ring-8 focus:ring-premium-gold/5 outline-none transition-all text-gray-800 font-medium placeholder:text-gray-300"
                                        />
                                    </div>
                                    <div className="md:col-span-2 relative group">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1 transition-colors group-focus-within:text-premium-gold">Pick Your Date</label>
                                        <div
                                            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                            className="w-full px-6 py-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-premium-gold/30 cursor-pointer transition-all flex items-center justify-between"
                                        >
                                            <span className={`font-medium ${date ? 'text-gray-800' : 'text-gray-300'}`}>
                                                {date ? new Date(date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) : 'Select Date'}
                                            </span>
                                            <div className={`p-2 rounded-lg transition-colors ${date ? 'bg-premium-gold/10 text-premium-gold' : 'bg-gray-50 text-gray-300'}`}>
                                                <Heart className="w-4 h-4 fill-current" />
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {isCalendarOpen && (
                                                <motion.div
                                                    ref={calendarRef}
                                                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 15, scale: 0.98 }}
                                                    className="absolute z-50 left-0 right-0 mt-4 filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
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

                            <div className="space-y-10">
                                <header className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-premium-gold/10 flex items-center justify-center">
                                        <FileVideo className="w-5 h-5 text-premium-gold" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-premium-dark">Media & Story</h3>
                                </header>

                                <div className="space-y-8">
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`group relative w-full aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${videoFile ? 'border-premium-gold/50 bg-white' : 'border-gray-200 hover:border-premium-gold/40 hover:bg-white'
                                            }`}
                                    >
                                        <div className="absolute inset-0 bg-premium-gold/0 group-hover:bg-premium-gold/2 transition-colors" />
                                        {videoFile ? (
                                            <div className="relative z-10 p-6 text-center">
                                                <div className="w-16 h-16 bg-premium-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-premium-gold/20">
                                                    <FileVideo className="w-8 h-8 text-premium-gold" />
                                                </div>
                                                <p className="text-sm font-bold text-premium-dark line-clamp-1 mb-1">
                                                    {videoFile.name}
                                                </p>
                                                <div className="flex items-center justify-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                    <span className="text-[10px] text-green-600 uppercase tracking-widest font-bold">Ready to upload</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center group-hover:scale-105 transition-transform duration-500">
                                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 group-hover:border-premium-gold/20 group-hover:bg-premium-gold/5 transition-colors">
                                                    <FileVideo className="w-8 h-8 text-gray-200 group-hover:text-premium-gold/50" />
                                                </div>
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Upload Video</span>
                                                <span className="text-[10px] text-gray-300 font-medium">MP4, MOV up to 50MB</span>
                                            </div>
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
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Personal Message</label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Write a warm note for your guests..."
                                            rows={4}
                                            className="w-full px-6 py-5 rounded-2xl bg-white border border-gray-100 shadow-sm focus:border-premium-gold/50 focus:ring-8 focus:ring-premium-gold/5 outline-none transition-all text-gray-800 font-medium resize-none placeholder:text-gray-300"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Theme Aesthetic Refinement */}
                        <div className="mt-16 pt-12 border-t border-gray-100">
                            <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
                                <div className="text-center md:text-left">
                                    <h4 className="text-sm font-bold text-premium-dark uppercase tracking-widest mb-1">Theme Aesthetic</h4>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Choose a color palette</p>
                                </div>
                                <div className="flex items-center gap-8">
                                    {TEMPLATES.map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => setTemplateId(t.id)}
                                            className="group flex flex-col items-center gap-3"
                                        >
                                            <div className={`relative p-1.5 rounded-full border-2 transition-all duration-500 scale-100 ${templateId === t.id ? 'border-premium-gold shadow-lg shadow-premium-gold/10' : 'border-transparent'
                                                }`}>
                                                <div className={`w-12 h-12 rounded-full ${t.color} shadow-inner transition-transform group-hover:scale-95`} />
                                                {templateId === t.id && (
                                                    <motion.div layoutId="active" className="absolute -top-1 -right-1 w-4 h-4 bg-premium-gold rounded-full border-2 border-white flex items-center justify-center">
                                                        <Check className="w-2 h-2 text-white" />
                                                    </motion.div>
                                                )}
                                            </div>
                                            <span className={`text-[8px] font-bold uppercase tracking-widest transition-colors ${templateId === t.id ? 'text-premium-gold' : 'text-gray-300'}`}>{t.name.split(' ')[0]}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Gift Registry Section */}
                        <div className="mt-20 pt-12 border-t border-gray-100">
                            <header className="flex flex-col md:flex-row items-center gap-6 justify-between mb-12">
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl font-serif text-premium-dark mb-2">Gift Registry</h3>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Suggestions for your celebration</p>
                                </div>
                                <div className="px-4 py-2 bg-premium-gold/5 rounded-full border border-premium-gold/10">
                                    <span className="text-[10px] text-premium-gold font-black uppercase tracking-widest">{selectedGifts.length} selected</span>
                                </div>
                            </header>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                {GIFTS.map(gift => (
                                    <motion.button
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        key={gift.id}
                                        onClick={() => toggleGift(gift.id)}
                                        className={`relative group p-10 rounded-[2.5rem] border-2 transition-all duration-500 text-center flex flex-col items-center justify-center min-h-[220px] ${selectedGifts.includes(gift.id)
                                            ? 'border-premium-gold bg-white shadow-xl shadow-premium-gold/10'
                                            : 'border-premium-gold/20 bg-white hover:border-premium-gold/50 shadow-sm hover:shadow-lg'
                                            }`}
                                    >
                                        <div className="mb-6">
                                            <span className={`text-5xl block transition-transform duration-500 ${selectedGifts.includes(gift.id) ? 'scale-110' : 'scale-100 group-hover:scale-110'}`}>
                                                {gift.icon}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className={`text-[11px] font-black uppercase tracking-[0.3em] block leading-tight max-w-[120px] mx-auto ${selectedGifts.includes(gift.id) ? 'text-premium-gold' : 'text-premium-dark'}`}>
                                                {gift.name}
                                            </span>
                                            <span className={`text-[9px] uppercase tracking-widest font-bold opacity-30 block`}>
                                                {gift.label}
                                            </span>
                                        </div>

                                        {selectedGifts.includes(gift.id) && (
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="absolute top-6 right-8 text-premium-gold"
                                            >
                                                <div className="w-6 h-6 rounded-full bg-premium-gold/10 flex items-center justify-center border border-premium-gold/20">
                                                    <Check className="w-3.5 h-3.5" />
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            <div className="mt-20">
                                <button
                                    disabled={isSharing || !eventName || !hostName || !date}
                                    onClick={handleShare}
                                    className="w-full md:w-auto min-w-[300px] h-[72px] bg-premium-dark text-white rounded-4xl font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-2xl disabled:opacity-30 disabled:hover:scale-100 flex items-center justify-center mx-auto"
                                >
                                    <div className="flex items-center justify-center gap-4 relative z-10 font-serif tracking-[0.2em] uppercase">
                                        {isSharing ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                <span>Processing...</span>
                                            </div>
                                        ) : 'Generate & Share'}
                                    </div>
                                </button>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-6 text-center opacity-60">Ready to create a lifetime memory</p>
                            </div>
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

            <AnimatePresence>
                {showInspiration && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowInspiration(false)}
                            className="absolute inset-0 bg-premium-dark/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.9 }}
                            className="relative w-full max-w-2xl bg-white rounded-[3rem] overflow-hidden shadow-2xl"
                        >
                            <div className="absolute top-6 right-6 z-10">
                                <button
                                    onClick={() => setShowInspiration(false)}
                                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="p-12">
                                <header className="text-center mb-12">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-premium-gold/10 rounded-full mb-6">
                                        <div className="w-1 h-1 rounded-full bg-premium-gold animate-pulse" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-premium-gold">Featured Stories</span>
                                    </div>
                                    <h3 className="text-4xl font-serif text-premium-dark mb-4">Modern Inspirations</h3>
                                    <p className="text-gray-400 font-light max-w-md mx-auto">See how other couples are using Lumière & Lace to craft their perfect moments.</p>
                                </header>

                                <div className="grid gap-6">
                                    {[
                                        { names: "Arjun & Sneha", type: "Wedding", location: "Royal Palace, Jaipur" },
                                        { names: "Rohan & Meera", type: "Engagement", location: "Coastal Villa, Goa" }
                                    ].map((story, i) => (
                                        <div key={i} className="group p-6 rounded-3xl border border-gray-100 hover:border-premium-gold/30 hover:bg-premium-gold/5 transition-all flex items-center justify-between">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center font-serif text-2xl text-premium-gold">
                                                    {story.names[0]}
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-serif text-premium-dark mb-1">{story.names}</h4>
                                                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                                                        <span>{story.type}</span>
                                                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                        <span>{story.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const demoData = encodeEventData({
                                                        names: story.names,
                                                        hostName: "Lumière Team",
                                                        date: new Date().toISOString(),
                                                        templateId: 'classic',
                                                        gifts: ['watch', 'travel'],
                                                        description: `A beautiful ${story.type.toLowerCase()} celebration at ${story.location}.`
                                                    });
                                                    navigate(`/intro/${demoData}`);
                                                }}
                                                className="p-4 rounded-2xl bg-premium-dark text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 bg-gray-50 rounded-4xl p-8 flex items-center justify-around border border-gray-100">
                                    <div className="text-center">
                                        <div className="text-2xl font-serif text-premium-dark mb-1">5,000+</div>
                                        <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Events Created</div>
                                    </div>
                                    <div className="w-px h-10 bg-gray-200" />
                                    <div className="text-center">
                                        <div className="text-2xl font-serif text-premium-dark mb-1">98%</div>
                                        <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Happy Couples</div>
                                    </div>
                                    <div className="w-px h-10 bg-gray-200" />
                                    <div className="text-center">
                                        <div className="text-2xl font-serif text-premium-dark mb-1">24/7</div>
                                        <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Luxury Support</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
