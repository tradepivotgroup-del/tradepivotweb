'use client';
import { motion } from "framer-motion";

const SlideInText = ({ text = "Simplicity is the ultimate sophistication.", className = "text-2xl md:text-5xl font-bold text-center" }: { text?: string; className?: string }) => {
    return (
        <h2 className={className}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.03, ease: "easeOut" }}
                    className="inline-block"
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </h2>
    );
};

export default SlideInText;
