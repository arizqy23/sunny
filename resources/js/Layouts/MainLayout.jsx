import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '../hooks/useLenis';
import WhatsAppButton from '../Components/WhatsAppButton';

// 1. Komponen SunnyLogo (Tanpa 'export default' agar tidak bentrok)
const SunnyLogo = ({ dark = false }) => (
  <div className="flex items-center gap-3 h-10 w-auto">
    {/* Mengambil logo dari public/logo.png */}
    <img
      src="/snny.png"
      alt="Sunny Logo"
      className="h-full w-auto object-contain"
    />
    <span
      className="text-[22px] font-[800] leading-none"
      style={{
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        color: dark ? '#ffffff' : '#1a1a1a'
      }}
    >
      Sunny
    </span>
    <div className="w-[7px] h-[7px] bg-[#AADF28] rounded-full mt-2" />
  </div>
);

const navLinks = [
    { href: '/',             label: 'Beranda' },
    { href: '/produk',       label: 'Produk' },
    { href: '/artikel',      label: 'Artikel' },
    { href: '/hubungi-kami', label: 'Hubungi Kami' },
];

function Navbar() {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (href) => href === '/' ? url === '/' : url.startsWith(href);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    useEffect(() => { setMobileOpen(false); }, [url]);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled ? 'bg-white/92 backdrop-blur-xl shadow-sm border-b border-lime-100/50' : 'bg-transparent'
                }`}
                style={{ height: 'var(--navbar-height)' }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                    <Link href="/" className="flex-shrink-0">
                        <SunnyLogo />
                    </Link>

                    <nav className="hidden md:flex items-center gap-7">
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href}
                                className={`nav-link py-1 ${isActive(link.href) ? 'active' : ''}`}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* ── Hamburger button (mobile only) ── */}
                    <motion.button
                        onClick={() => setMobileOpen(prev => !prev)}
                        whileTap={{ scale: 0.92 }}
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-2xl bg-lime-50 hover:bg-lime-100 transition-colors gap-[5px]"
                        aria-label="Buka menu navigasi"
                    >
                        <motion.span animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="block w-5 h-[2px] bg-gray-800 rounded-full origin-center" />
                        <motion.span animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.2 }}
                            className="block w-5 h-[2px] bg-gray-800 rounded-full" />
                        <motion.span animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="block w-5 h-[2px] bg-gray-800 rounded-full origin-center" />
                    </motion.button>

                </div>
            </motion.header>

            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" />
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 md:hidden shadow-2xl">
                            <div className="flex items-center justify-between p-5 border-b border-gray-100">
                                <SunnyLogo />
                                <button onClick={() => setMobileOpen(false)}
                                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">✕</button>
                            </div>
                            <nav className="p-5 space-y-1">
                                {navLinks.map((link, i) => (
                                    <motion.div key={link.href} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.07 }}>
                                        <Link href={link.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-accent font-600 text-sm transition-all ${
                                                isActive(link.href) ? 'bg-lime-50 text-lime-700' : 'text-gray-700 hover:bg-gray-50'
                                            }`}>
                                            {isActive(link.href) && <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />}
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

function Footer() {
    return (
        <footer className="bg-gray-950 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-400/60 to-transparent" />
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-lime-400/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-sunny-400/5 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div className="sm:col-span-2 lg:col-span-2">
                        <SunnyLogo dark />
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mt-4">
                            Sunny – sabun cuci piring terpercaya dengan formula lemon & jeruk nipis aktif.
                            Bersih sempurna, aroma segar sepanjang hari untuk keluarga Indonesia.
                        </p>
                        <div className="flex gap-2.5 mt-6">
                            {['📸','👥','🎵','▶️'].map((icon, i) => (
                                <motion.a key={i} href="#" whileHover={{ scale: 1.1 }}
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-lime-400 flex items-center justify-center text-sm transition-colors">
                                    {icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-accent font-700 tracking-[0.15em] text-lime-400 uppercase mb-5">Halaman</h4>
                        <ul className="space-y-3">
                            {navLinks.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-gray-400 text-sm hover:text-white transition-colors">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-accent font-700 tracking-[0.15em] text-lime-400 uppercase mb-5">Kontak</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>ptbaradachemicalindo@gmail.com</li>
                            <li>+62 852-3140-2724</li>
                            <li>Kabupaten Bojonegoro, Jawa Timur 62193</li>
                        </ul>
                        <div className="mt-5 inline-flex items-center gap-2 px-3 py-2 bg-lime-400/10 border border-lime-400/20 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                            <span className="text-[11px] text-lime-300 font-accent">Halal & Tersertifikasi BPOM</span>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
                    <p>© {new Date().getFullYear()} PT Barada Chemical Indo. Hak cipta dilindungi undang-undang.</p>
                    <div className="flex gap-5">
                        <a href="#" className="hover:text-gray-300 transition-colors">Privasi</a>
                        <a href="#" className="hover:text-gray-300 transition-colors">Syarat & Ketentuan</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// 2. Export default utama (Hanya boleh ada SATU di file ini)
export default function MainLayout({ children }) {
    useLenis();
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-[var(--navbar-height)]">{children}</main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
}
