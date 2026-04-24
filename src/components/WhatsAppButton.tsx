"use client";

import { motion } from "framer-motion";

export default function WhatsAppButton() {
  const phoneNumber = "263789366969";
  const message = "Hi TradePivot! I'm interested in your services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, translateY: -5 }}
      whileTap={{ scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1,
      }}
      className="fixed bottom-8 left-8 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366]/10 backdrop-blur-md border border-[#25D366]/30 shadow-[0_0_20px_rgba(37,211,102,0.2)] group"
      aria-label="Contact us on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#25D366]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <svg
        viewBox="0 0 24 24"
        className="w-7 h-7 fill-white group-hover:scale-110 transition-transform duration-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.301-.15-1.767-.872-2.04-.971-.272-.099-.47-.15-.669.15-.199.301-.769.971-.941 1.171-.173.199-.347.225-.648.075-.302-.15-1.272-.469-2.423-1.496-.895-.798-1.499-1.785-1.674-2.085-.175-.301-.019-.464.131-.613.135-.135.301-.35.452-.525.151-.175.201-.301.301-.501.099-.201.05-.376-.025-.526-.075-.15-.669-1.612-.916-2.207-.241-.58-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.3-.615.602-.615 1.54 0 .937.683 1.842.778 1.972.095.129 1.342 2.05 3.251 2.877.454.197.808.314 1.082.401.457.145.874.124 1.205.075.369-.054 1.132-.462 1.289-.908.158-.445.158-.827.11-1.07-.047-.243-.172-.376-.473-.527zm-5.462 8.24c-1.848 0-3.659-.497-5.234-1.439l-.376-.223-3.89 1.021 1.039-3.792-.244-.388c-.917-1.458-1.401-3.141-1.401-4.878 0-5.185 4.223-9.408 9.408-9.408 2.512 0 4.874.978 6.649 2.754 1.774 1.774 2.754 4.137 2.754 6.649 0 5.186-4.223 9.409-9.408 9.409zm9.052-18.452c-2.418-2.418-5.632-3.75-9.052-3.75-7.05 0-12.786 5.736-12.786 12.786 0 2.254.588 4.453 1.706 6.393L0 24l4.632-1.216c1.866 1.015 3.969 1.55 6.113 1.55 7.052 0 12.789-5.736 12.789-12.787 0-3.42-1.332-6.633-3.75-9.051z" />
      </svg>
      
      {/* Tooltip */}
      <div className="absolute left-16 px-3 py-1 bg-black/80 border border-white/10 rounded text-white text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
        Chat with us
      </div>
    </motion.a>
  );
}
