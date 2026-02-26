import { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Heart } from 'lucide-react';

export default function VideoIntro() {
    const { data } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [hasStarted, setHasStarted] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);
    const [videoSrc, setVideoSrc] = useState("https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-walking-in-a-field-34246-large.mp4");

    useEffect(() => {
        const storedVideo = sessionStorage.getItem('pending_video');
        if (storedVideo) {
            setVideoSrc(storedVideo);
        }
    }, []);

    const handleStart = () => {
        setHasStarted(true);
        setShowOverlay(false);
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.error("Playback failed:", e));
            videoRef.current.muted = false;
            setIsMuted(false);
        }
    };

    const handleVideoEnd = () => {
        navigate(`/event/${data}`);
    };

    return (
        <div className="relative h-screen w-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center font-sans">
            <video
                ref={videoRef}
                src={videoSrc}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${hasStarted ? 'opacity-100' : 'opacity-0'}`}
                onEnded={handleVideoEnd}
                playsInline
                muted={isMuted}
            />

            {/* Decorative Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] pointer-events-none" />

            <AnimatePresence>
                {showOverlay && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="z-50 text-center px-6 max-w-xl"
                    >
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                opacity: [0.8, 1, 0.8]
                            }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="mb-12"
                        >
                            <div className="w-20 h-20 border border-premium-gold/30 rounded-full flex items-center justify-center mx-auto mb-6 bg-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(212,175,55,0.15)] relative">
                                <div className="absolute inset-0 rounded-full border border-premium-gold/10 animate-ping opacity-20" />
                                <Heart className="w-8 h-8 text-premium-gold fill-premium-gold/10" />
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-[0.2em] uppercase leading-tight"
                        >
                            A Special <br />
                            <span className="text-premium-gold">Invitation</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: 0.6 }}
                            className="text-white text-sm tracking-[0.4em] uppercase mb-12 font-medium"
                        >
                            Scroll down to begin
                        </motion.p>

                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            onClick={handleStart}
                            className="group relative px-16 py-6 border border-premium-gold/50 text-white rounded-full font-bold overflow-hidden transition-all hover:bg-premium-gold hover:text-premium-dark hover:border-premium-gold active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                        >
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-premium-dark/10 transition-colors">
                                    <Play className="w-5 h-5 fill-current" />
                                </div>
                                <span className="text-lg font-serif tracking-widest uppercase">Watch Story</span>
                            </div>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {hasStarted && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-12 flex items-center gap-4 z-50 px-8 w-full justify-between max-w-7xl"
                >
                    <button
                        onClick={handleVideoEnd}
                        className="px-8 py-3 bg-white/5 backdrop-blur-xl rounded-full text-white/50 text-xs tracking-widest uppercase border border-white/10 hover:bg-white/10 hover:text-white transition-all underline-offset-4 hover:underline"
                    >
                        Skip to Details
                    </button>

                    <button
                        onClick={() => {
                            if (videoRef.current) {
                                videoRef.current.muted = !isMuted;
                                setIsMuted(!isMuted);
                            }
                        }}
                        className="p-4 bg-premium-gold/20 backdrop-blur-xl rounded-full text-white border border-premium-gold/30 hover:bg-premium-gold transition-colors hover:text-premium-dark group"
                    >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 animate-pulse" />}
                    </button>
                </motion.div>
            )}

            {/* Modern Video Progress Bar */}
            {hasStarted && videoRef.current && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-50">
                    <motion.div
                        className="h-full bg-premium-gold shadow-[0_0_10px_rgba(212,175,55,1)]"
                        animate={{ width: "100%" }}
                        transition={{ duration: 15, ease: "linear" }}
                    />
                </div>
            )}
        </div>
    );
}
