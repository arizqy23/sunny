import { useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import MainLayout from '../Layouts/MainLayout';
import { useScrollReveal } from '../hooks/useScrollReveal';
// Import Ikon Lucide
import {
    Check, Settings, Star, Citrus, Leaf, Sparkles,
    Container, Droplets, ShieldCheck, Trophy,
    ArrowRight, MousePointer2, ShoppingBag
} from 'lucide-react';

// ── Reveal wrapper ───────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = '' }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// ── Trust Badge ─────────────────
const TrustBadge = ({ icon, title, desc, delay }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4"
        >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-lime-400 flex items-center justify-center text-white font-bold shadow-md">
                {icon}
            </div>
            <div>
                <p className="font-bold text-gray-900 text-sm leading-tight">{title}</p>
                <p className="text-gray-500 text-xs leading-snug">{desc}</p>
            </div>
        </motion.div>
    );
};

// ── Feature Card ─────────────────────────────────────────────────────────────
const FeatureCard = ({ icon, title, desc, color, delay }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300"
        >
            <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <h3 className="font-semibold text-gray-900 text-base mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
        </motion.div>
    );
};

// ── Stat ─────────────────────────────────────────────────────────────────────
const Stat = ({ value, label, delay }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay, type: 'spring', stiffness: 200 }}
            className="text-center px-4"
        >
            <div className="text-3xl sm:text-4xl font-extrabold text-lime-400 mb-1 leading-tight">{value}</div>
            <div className="text-gray-400 text-xs uppercase tracking-widest">{label}</div>
        </motion.div>
    );
};

// ── Ecommerce Pill ───────────────────────────────────────────────────────────
const EcommercePill = ({ label, href, icon, delay }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, delay }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-5 py-3 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
        >
            <span className="text-xl">{icon}</span>
            <span className="font-semibold text-gray-800 text-sm">{label}</span>
        </motion.a>
    );
};

// ── DATA ─────────────────────────────────────────────────────────────────────
const trustBadges = [
    { icon: <Check size={20} />, title: 'Pioneer', desc: 'Pertama di Indonesia', delay: 0 },
    { icon: <Settings size={20} />, title: 'Teknologi', desc: 'Berstandar Internasional', delay: 0.1 },
    { icon: <Star size={20} />, title: 'Inovasi', desc: 'Power Formula Terbaru', delay: 0.2 },
];

const features = [
    { icon: <Citrus className="text-yellow-600" />, title: 'Formula Lemon Aktif', desc: 'Mengandung ekstrak lemon alami yang memotong lemak 3x lebih cepat tanpa merusak kulit tangan.', color: 'bg-yellow-50', delay: 0 },
    { icon: <Leaf className="text-lime-600" />, title: 'Ramah Lingkungan', desc: 'Formula biodegradable 98% terurai secara alami, aman untuk lingkungan dan ekosistem perairan.', color: 'bg-lime-50', delay: 0.1 },
    { icon: <Sparkles className="text-cyan-600" />, title: 'Kilap Sempurna', desc: 'Meninggalkan peralatan dapur berkilau bersih tanpa bekas air atau noda sabun membandel.', color: 'bg-cyan-50', delay: 0.2 },
    { icon: <Container className="text-orange-600" />, title: 'Ekonomis & Hemat', desc: 'Satu tetes Sunny setara 3 tetes sabun biasa. Formula pekat, lebih hemat, hasil lebih bersih.', color: 'bg-orange-50', delay: 0.3 },
    { icon: <Droplets className="text-green-600" />, title: 'pH Seimbang', desc: 'Diformulasikan dengan pH 6.5–7.5, aman untuk kulit sensitif dan penggunaan sehari-hari.', color: 'bg-green-50', delay: 0.4 },
    { icon: <ShieldCheck className="text-blue-600" />, title: 'Anti-Bakteri', desc: 'Membunuh 99.9% kuman dan bakteri berbahaya, menjaga dapur Anda tetap higienis dan aman.', color: 'bg-blue-50', delay: 0.5 },
];

// products diambil dari DB via Inertia props — lihat export default

const ecommerces = [
    { label: 'Tokopedia', href: 'https://tokopedia.com', icon: <ShoppingBag size={18} className="text-green-500" />, delay: 0 },
    { label: 'Shopee', href: 'https://shopee.co.id', icon: <ShoppingBag size={18} className="text-orange-500" />, delay: 0.05 },
    { label: 'Blibli', href: 'https://blibli.com', icon: <ShoppingBag size={18} className="text-blue-500" />, delay: 0.1 },
    { label: 'Lazada', href: 'https://lazada.co.id', icon: <ShoppingBag size={18} className="text-purple-500" />, delay: 0.15 },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function Home({ stats = {}, featuredProducts = [], heroImage = null, aboutImage = null }) {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
    const smoothY = useSpring(heroY, { stiffness: 100, damping: 30 });

    return (
        <MainLayout>
            <Head title="Beranda" />

            {/* ══ HERO ══════════════════════════════════════════════════════ */}
            <section
                ref={heroRef}
                className="relative min-h-[calc(100vh-var(--navbar-height))] flex items-center overflow-hidden bg-white"
            >
                {/* Decorative shapes — disembunyikan di mobile agar tidak crowded */}
                <div className="absolute top-0 right-0 w-full sm:w-[55%] h-[45%] sm:h-full bg-lime-50 rounded-bl-[60px] sm:rounded-bl-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-28 h-28 sm:w-40 sm:h-40 border-4 border-lime-100 rounded-tr-[60px] pointer-events-none" />
                <div className="absolute top-16 left-[45%] w-4 h-4 sm:w-6 sm:h-6 bg-lime-400 rounded-full opacity-40 pointer-events-none hidden sm:block" />
                <div className="absolute bottom-24 right-12 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full opacity-50 pointer-events-none hidden sm:block" />
                <div className="absolute top-1/2 left-8 w-3 h-3 bg-lime-300 rotate-45 pointer-events-none hidden sm:block" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full py-10 sm:py-16 lg:py-20">
                    {/* Mobile: stack vertikal dengan gambar di atas, text di bawah */}
                    <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 items-center gap-8">

                        {/* ── Hero Image — tampil PERTAMA di mobile ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className="relative flex items-center justify-center w-full order-first lg:order-last"
                            style={{ y: smoothY }}
                        >
                            <div className="relative w-full max-w-[320px] sm:max-w-md rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl mx-auto">
                                <img
                                    src={heroImage || "/images/model2.jpeg"}
                                    alt="Hero"
                                    className="aspect-[4/3] sm:aspect-[4/5] w-full object-cover"
                                />

                                <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-md px-3 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-lime-500 flex-shrink-0" />
                                    <div>
                                        <p className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight">Anti-Bakteri</p>
                                        <p className="text-[9px] sm:text-[10px] text-gray-500">99.9% Terbukti</p>
                                    </div>
                                </div>

                                <div className="absolute top-3 right-3 sm:top-5 sm:right-5 bg-lime-500 text-white rounded-xl sm:rounded-2xl shadow-md px-3 py-2 sm:px-4 sm:py-2.5">
                                    <p className="text-[11px] sm:text-xs font-bold leading-tight">5 Juta+</p>
                                    <p className="text-[9px] sm:text-[10px] opacity-80">Keluarga Percaya</p>
                                </div>
                            </div>
                            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-full max-w-[320px] sm:max-w-md h-full rounded-2xl sm:rounded-3xl border-2 border-lime-200 -z-10 mx-auto" />
                        </motion.div>

                        {/* ── Left: Text ── */}
                        <motion.div
                            className="order-last lg:order-first w-full"
                            style={{ y: smoothY, opacity: heroOpacity }}
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.55 }}
                                className="inline-flex items-center gap-2 bg-lime-100 text-lime-700 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-6 border border-lime-200"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse flex-shrink-0" />
                                Pioneer Pencuci Piring Pertama di Indonesia
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 35 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.08] text-gray-900 mb-4 sm:mb-5"
                            >
                                Kepercayaan<br />
                                <span className="text-lime-500">Mama</span>{' '}
                                <span className="text-gray-900">Indonesia</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg"
                            >
                                Sejak 1985, dipercaya jutaan keluarga Indonesia. Formula terbaik untuk dapur bersih, higienis, dan segar setiap hari.
                            </motion.p>

                            {/* Trust badges — di mobile pakai 2 kolom agar compact */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.65, delay: 0.3 }}
                                className="grid grid-cols-1 sm:flex sm:flex-col gap-3 sm:gap-4 mb-6 sm:mb-10"
                            >
                                {trustBadges.map(b => (
                                    <TrustBadge key={b.title} {...b} />
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, delay: 0.45 }}
                                className="flex flex-col sm:flex-row gap-3"
                            >
                                <Link
                                    href="/produk"
                                    className="inline-flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-600 text-white font-semibold px-6 sm:px-7 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm"
                                >
                                    Lihat Produk Kami
                                    <ArrowRight size={16} />
                                </Link>
                                <Link
                                    href="/tentang-kami"
                                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold px-6 sm:px-7 py-3.5 rounded-full border border-gray-200 transition-all duration-300 shadow-sm hover:shadow-md text-sm"
                                >
                                    Tentang Kami
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll indicator — sembunyikan di mobile */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden sm:flex"
                >
                    <span className="text-[10px] font-semibold text-gray-400 tracking-[0.2em] uppercase">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                        className="w-5 h-8 rounded-full border-2 border-gray-300 flex items-start justify-center pt-1.5"
                    >
                        <div className="w-1 h-2 bg-lime-400 rounded-full" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ══ STATS BAND ════════════════════════════════════════════════ */}
            <section className="py-10 sm:py-14 bg-gray-950 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                        {[
                            { value: '5 Juta+', label: 'Keluarga Percaya', delay: 0 },
                            { value: '38 Tahun', label: 'Berpengalaman', delay: 0.1 },
                            { value: '99.9%', label: 'Anti-Bakteri', delay: 0.2 },
                            { value: '3 Varian', label: 'Pilihan Aroma', delay: 0.3 },
                        ].map((s, i) => (
                            <div key={s.label} className={`relative ${
                                i % 2 === 1 ? 'border-l border-gray-800' : ''
                            } ${
                                i < 2 ? 'border-b border-gray-800 pb-6 pt-2 md:border-b-0 md:pb-0' : 'pt-6 md:pt-0'
                            } md:border-l md:first:border-l-0`}>
                                <Stat value={s.value} label={s.label} delay={s.delay} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ ABOUT SECTION ════════════ */}
            <section className="py-14 sm:py-24 px-4 sm:px-5 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
                    <Reveal className="relative px-2 sm:px-0">
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3]">
                            <img
                                src={aboutImage || "/images/model3.jpeg"}
                                alt="About Us"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none rounded-2xl sm:rounded-3xl" />
                        </div>

                        {/* Floating badge — posisi disesuaikan agar tidak clip di mobile */}
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute -bottom-4 right-2 sm:-bottom-5 sm:-right-8 bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border border-gray-100"
                        >
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-lime-400 rounded-lg sm:rounded-xl flex items-center justify-center text-white flex-shrink-0">
                                <Trophy size={16} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-900">Pioneer #1</p>
                                <p className="text-[10px] text-gray-500">Sejak 1985 di Indonesia</p>
                            </div>
                        </motion.div>
                    </Reveal>

                    <Reveal delay={0.15} className="mt-6 sm:mt-0">
                        <div className="inline-flex items-center gap-2 bg-lime-50 text-lime-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 sm:mb-5 border border-lime-100">
                            Tentang Kami
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4 sm:mb-5">
                            Sahabat Terpercaya<br />
                            <span className="text-lime-500">Mama Indonesia</span>
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">
                            Sejak 1985, kami dipercaya menjadi pilihan terbaik cairan pencuci piring oleh jutaan keluarga Indonesia. Berbagai pilihan varian membantu Mama membersihkan peralatan dapur agar bisa menyajikan yang terbaik untuk keluarga.
                        </p>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                            Dengan semangat berinovasi, kami terus menghadirkan formula terbaik yang aman, efektif, dan ramah lingkungan untuk setiap dapur Indonesia.
                        </p>
                        <Link
                            href="/tentang-kami"
                            className="inline-flex items-center gap-2 text-lime-600 font-semibold hover:text-lime-700 transition-colors text-sm"
                        >
                            Lihat Selengkapnya
                            <ArrowRight size={16} />
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* ══ FEATURES ════════════════════════════════════════════════ */}
            <section className="py-14 sm:py-24 px-4 sm:px-5 bg-gray-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <Reveal className="text-center mb-10 sm:mb-14">
                        <div className="inline-flex items-center gap-2 bg-lime-50 text-lime-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-lime-100">
                            Keunggulan Produk
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">
                            Mengapa Memilih <span className="text-lime-500">Sunny</span>?
                        </h2>
                        <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                            Diformulasikan oleh ahli kimia terbaik, teruji secara klinis, dan dipercaya jutaan keluarga Indonesia.
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {features.map(f => (
                            <FeatureCard key={f.title} {...f} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ PRODUCT PREVIEW ═════════════════════════════════════════ */}
            <section className="py-14 sm:py-24 px-4 sm:px-5 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <Reveal className="text-center mb-10 sm:mb-14">
                        <div className="inline-flex items-center gap-2 bg-lime-50 text-lime-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-lime-100">
                            Produk Kami
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">
                            Pilihan <span className="text-lime-500">Varian</span>
                        </h2>
                        <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
                            Temukan varian yang cocok untuk kebutuhan dapur Anda.
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
                        {featuredProducts.length > 0 ? featuredProducts.map((p, i) => (
                            <Reveal key={p.slug} delay={i * 0.12}>
                                <Link href={`/produk/${p.slug}`}>
                                    <motion.div
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        transition={{ duration: 0.25 }}
                                        className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 cursor-pointer"
                                    >
                                        <div className={`h-44 sm:h-52 bg-gradient-to-br ${p.color} flex items-center justify-center relative overflow-hidden`}>
                                            {p.image ? (
                                                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <span className="text-7xl sm:text-8xl relative z-10 drop-shadow-lg select-none">{p.emoji}</span>
                                            )}
                                            <div className="absolute top-3 left-6 w-10 h-24 bg-white/20 rounded-full blur-xl -rotate-12 pointer-events-none" />
                                        </div>
                                        <div className="p-4 sm:p-5 flex items-center justify-between">
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-sm sm:text-base">{p.name}</h3>
                                                <p className="text-gray-500 text-xs mt-0.5">{p.tagline}</p>
                                            </div>
                                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-lime-50 group-hover:bg-lime-500 flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                                                <ArrowRight size={14} className="text-lime-500 group-hover:text-white transition-colors" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </Reveal>
                        )) : (
                            [0, 1].map(i => (
                                <div key={i} className="bg-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden animate-pulse">
                                    <div className="h-44 sm:h-52 bg-gray-200" />
                                    <div className="p-4 sm:p-5 flex items-center justify-between">
                                        <div className="space-y-2">
                                            <div className="h-4 w-32 bg-gray-200 rounded-full" />
                                            <div className="h-3 w-24 bg-gray-100 rounded-full" />
                                        </div>
                                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-200" />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <Reveal className="text-center mt-8 sm:mt-10">
                        <Link
                            href="/produk"
                            className="inline-flex items-center gap-2 border border-lime-500 text-lime-600 hover:bg-lime-500 hover:text-white font-semibold px-6 sm:px-8 py-3 rounded-full transition-all duration-300 text-sm"
                        >
                            Lihat Semua Produk
                            <ArrowRight size={16} />
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* ══ E-COMMERCE ═══════════════════════ */}
            <section className="py-12 sm:py-20 px-4 sm:px-5 bg-gray-50">
                <div className="max-w-5xl mx-auto text-center">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 bg-lime-50 text-lime-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-lime-100">
                            Beli Online
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
                            Temukan Kami di <span className="text-lime-500">E-Commerce</span>
                        </h2>
                        <p className="text-gray-500 text-sm sm:text-base mb-8 sm:mb-10 max-w-lg mx-auto">
                            Dapatkan produk kami di official store pilihan Anda dengan mudah dan aman.
                        </p>
                    </Reveal>

                    <Reveal delay={0.1}>
                        {/* Mobile: 2x2 grid, desktop: flex row */}
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3 sm:gap-4">
                            {ecommerces.map(e => (
                                <EcommercePill key={e.label} {...e} />
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ══ CTA BANNER ═══════════════════════════════════════════════ */}
            <section className="py-14 sm:py-24 px-4 sm:px-5 relative overflow-hidden bg-lime-500">
                <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-lime-400 rounded-br-[60px] sm:rounded-br-[80px] opacity-40 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-36 h-36 sm:w-48 sm:h-48 bg-lime-600 rounded-tl-[60px] sm:rounded-tl-[80px] opacity-30 pointer-events-none" />
                <div className="absolute top-8 right-16 sm:right-24 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full opacity-20 pointer-events-none" />
                <div className="absolute bottom-10 left-12 sm:left-20 w-3 h-3 bg-white rotate-45 opacity-20 pointer-events-none" />

                <Reveal className="max-w-3xl mx-auto text-center relative z-10">
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 sm:mb-5">
                        Rasakan Perbedaan{' '}
                        <span className="text-lime-900">Sunny</span>{' '}
                        Sekarang
                    </h2>
                    <p className="text-lime-100 text-sm sm:text-base lg:text-lg leading-relaxed mb-7 sm:mb-10 max-w-xl mx-auto">
                        Bergabung dengan 5 juta keluarga yang sudah merasakan dapur bersih, higienis, dan segar setiap hari.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <Link
                            href="/produk"
                            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-lime-600 font-bold px-7 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
                        >
                            Beli Sekarang
                            <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/hubungi-kami"
                            className="inline-flex items-center justify-center gap-2 border-2 border-white/60 hover:border-white text-white font-semibold px-7 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 text-sm"
                        >
                            Hubungi Kami
                        </Link>
                    </div>
                </Reveal>
            </section>
        </MainLayout>
    );
}
