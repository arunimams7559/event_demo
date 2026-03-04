import { motion } from 'framer-motion';

interface LogoProps {
    className?: string;
    showText?: boolean;
    dark?: boolean;
}

export default function Logo({ className = "", showText = true, dark = false }: LogoProps) {
    return (
        <div className={`flex items-center gap-6 ${className} group`}>
            {/* Artistic Intertwined Hearts Logo */}
            <div className={`relative w-16 h-16 flex items-center justify-center`}>
                {/* Decorative Background Glow */}
                <div className={`absolute inset-0 rounded-full blur-2xl opacity-10 ${dark ? 'bg-white' : 'bg-premium-gold'}`} />

                <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Shadow Layer for Depth */}
                    <path
                        d="M20 32C20 32 8 24 8 16C8 12 11 9 15 9C17 9 19 10 20 12C21 10 23 9 25 9C29 9 32 12 32 16C32 24 20 32 20 32Z"
                        fill="black"
                        fillOpacity="0.1"
                        transform="translate(1, 1)"
                    />

                    {/* Gold Intertwined Heart (Solid Line) */}
                    <motion.path
                        d="M20 33C20 33 6 24.5 6 15C6 10 10 7 14 7C16.5 7 18.5 8.5 20 11C21.5 8.5 23.5 7 26 7C30 7 34 10 34 15C34 24.5 20 33 20 33Z"
                        stroke="#D4AF37"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    {/* White Intertwined Heart (Offset Layer) */}
                    <motion.path
                        d="M22 30C22 30 11 23.5 11 16C11 12 14 10 17 10C19 10 21 11 22 13C23 11 25 10 27 10C30 10 33 12 33 16C33 23.5 22 30 22 30Z"
                        stroke={dark ? "white" : "#ffffff"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                        className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    />
                </svg>
            </div>

            {showText && (
                <div className="flex flex-col -space-y-1">
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-baseline"
                    >
                        <span className={`text-3xl font-serif tracking-[0.15em] lowercase first-letter:uppercase font-light ${dark ? 'text-white' : 'text-premium-dark'}`}>
                            Lumière
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-3 self-end pr-1"
                    >
                        <div className={`h-px w-8 ${dark ? 'bg-white/20' : 'bg-premium-gold/30'}`} />
                        <span className="text-premium-gold font-serif italic text-xl -mb-1">&</span>
                        <span className={`text-[12px] tracking-[0.4em] uppercase font-bold ${dark ? 'text-white/40' : 'text-gray-400'}`}>
                            Lace
                        </span>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
