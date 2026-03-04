import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Gift, ArrowLeft, User, Quote } from 'lucide-react';
import { decodeEventData, type EventData } from '../utils/urlHelper';
import Logo from '../components/Logo';

const GIFTS_MAP: Record<string, { name: string, icon: string, label: string }> = {
    watch: { name: 'Luxury Watch', icon: '⌚', label: 'Timeless' },
    travel: { name: 'Travel Voucher', icon: '✈️', label: 'Discovery' },
    home: { name: 'Home Decor', icon: '🏠', label: 'Sanctuary' },
    dinner: { name: 'Romantic Dinner', icon: '🕯️', label: 'Exquisite' },
};

const THEMES: Record<string, { bg: string, accent: string, text: string, card: string }> = {
    classic: {
        bg: 'bg-[#FFFDD0]',
        accent: 'text-[#D4AF37]',
        text: 'text-premium-dark',
        card: 'bg-white/60'
    },
    romantic: {
        bg: 'bg-[#FFF0F5]',
        accent: 'text-[#FFB7C5]',
        text: 'text-[#4A4A4A]',
        card: 'bg-white/40'
    },
    modern: {
        bg: 'bg-[#F5F5F5]',
        accent: 'text-[#2D3436]',
        text: 'text-black',
        card: 'bg-white/80'
    },
};

export default function EventPage() {
    const { data } = useParams();
    const [eventData, setEventData] = useState<EventData | null>(null);

    useEffect(() => {
        if (data) {
            setEventData(decodeEventData(data));
        }
    }, [data]);

    if (!eventData) {
        return (
            <div className="h-screen flex items-center justify-center bg-premium-cream">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-premium-gold" />
            </div>
        );
    }

    const theme = THEMES[eventData.templateId] || THEMES.classic;

    return (
        <div className={`min-h-screen ${theme.bg} ${theme.text} py-20 px-4 selection:bg-premium-gold/20`}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                <header className="text-center mb-24 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-12 inline-block relative"
                    >
                        <Logo className="scale-125" />
                    </motion.div>

                    <h2 className="text-xs uppercase tracking-[0.5em] font-bold mb-6 opacity-40">You are cordially invited to</h2>
                    <h1 className="text-6xl md:text-8xl font-serif mb-10 tracking-tight leading-none">{eventData.names}</h1>

                    <div className="flex flex-col items-center gap-6">
                        <div className="h-px w-32 bg-current opacity-20" />
                        <div className="flex items-center gap-4 text-sm uppercase tracking-[0.3em] font-bold opacity-70">
                            <User className={`w-4 h-4 ${theme.accent}`} />
                            Hosted by {eventData.hostName}
                        </div>
                        <div className="flex items-center gap-4 text-sm uppercase tracking-[0.3em] font-bold opacity-70">
                            <Calendar className={`w-4 h-4 ${theme.accent}`} />
                            {new Date(eventData.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="h-px w-32 bg-current opacity-20" />
                    </div>
                </header>

                <main className="grid gap-16">
                    {/* Story/Description Section */}
                    {eventData.description && (
                        <section className={`${theme.card} backdrop-blur-xl rounded-[4rem] p-12 md:p-20 border border-white/60 shadow-2xl relative overflow-hidden`}>
                            <Quote className={`absolute top-10 left-10 w-20 h-20 ${theme.accent} opacity-5 -scale-x-100`} />
                            <div className="relative z-10 text-center">
                                <h3 className={`text-3xl font-serif mb-10 ${theme.accent}`}>The Story</h3>
                                <p className="text-2xl md:text-3xl leading-relaxed italic font-light opacity-90 font-serif">
                                    "{eventData.description}"
                                </p>
                            </div>
                        </section>
                    )}

                    {/* Gift Registry */}
                    <section className="text-center">
                        <div className="inline-flex items-center gap-4 mb-12 border-b-2 border-premium-gold/20 pb-4 px-8">
                            <Gift className={`w-6 h-6 ${theme.accent}`} />
                            <h3 className="text-lg uppercase tracking-[0.4em] font-bold">The Registry</h3>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {eventData.gifts.map(id => {
                                const gift = GIFTS_MAP[id];
                                return (
                                    <motion.div
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        key={id}
                                        className={`${theme.card} backdrop-blur-xl p-10 rounded-[2.5rem] shadow-sm text-center border-2 transition-all duration-700 hover:shadow-xl group relative overflow-hidden ${theme.accent.replace('text', 'border')}/30 hover:${theme.accent.replace('text', 'border')}/60 min-h-[220px] flex flex-col items-center justify-center`}
                                    >
                                        <div className="mb-6">
                                            <span className="text-6xl block transition-transform duration-700 group-hover:scale-110">
                                                {gift?.icon}
                                            </span>
                                        </div>
                                        <div className="space-y-1 relative z-10">
                                            <span className={`text-base uppercase tracking-[0.3em] font-black block ${theme.text} opacity-90 leading-tight`}>
                                                {gift?.name}
                                            </span>
                                            <span className={`text-[10px] uppercase tracking-widest font-bold block ${theme.accent} opacity-40 group-hover:opacity-60 transition-opacity`}>
                                                {gift?.label}
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </section>
                </main>

                <footer className="mt-32 text-center pb-12 flex flex-col items-center gap-12">
                    <div className="opacity-30 hover:opacity-100 transition-opacity">
                        <Logo showText className="scale-75" />
                    </div>

                    <Link
                        to="/create"
                        className="group inline-flex items-center gap-3 py-4 px-8 bg-black/5 hover:bg-black/10 rounded-full transition-all"
                    >
                        <div className="p-2 bg-white rounded-full group-hover:scale-110 transition-transform shadow-sm">
                            <ArrowLeft className="w-4 h-4 text-premium-dark" />
                        </div>
                        <span className="text-xs uppercase tracking-widest font-bold opacity-60 group-hover:opacity-100">Plan your own celebration</span>
                    </Link>
                </footer>
            </motion.div>
        </div>
    );
}
