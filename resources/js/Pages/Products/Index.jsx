import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../../Layouts/MainLayout';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Reveal = ({ children, delay = 0, className = '' }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
            {children}
        </motion.div>
    );
};

// ─── Format harga IDR — selaras dengan Show.jsx ───────────────────────────────
const formatIDR = (val) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
    }).format(val || 0);

// ─── Normalise satu produk dari DB → shape yang dipakai komponen ─────────────
// FIX #1: Mendukung field `image` (Show.jsx) DAN `image_path` (raw DB)
//         sehingga ProductController.index() tidak perlu format ulang di backend.
function normalise(p) {
    const cfg = p.color_config || {};

    // Resolve URL gambar:
    //   • p.image      → sudah diformat controller Show (URL penuh atau path storage)
    //   • p.image_path → data mentah dari index controller (relatif atau URL penuh)
    const rawImage = p.image || p.image_path || null;
    let imageUrl = null;
    if (rawImage) {
        imageUrl = rawImage.startsWith('http')
            ? rawImage
            : `/storage/${rawImage}`;
    }

    // Format harga — selaras dengan Show.jsx (formatIDR)
    const priceMin = p.price_min ? formatIDR(p.price_min) : null;
    const priceMax = p.price_max ? formatIDR(p.price_max) : null;
    let price = '–';
    if (priceMin && priceMax && p.price_min !== p.price_max) {
        price = `${priceMin} – ${priceMax}`;
    } else if (priceMin) {
        price = priceMin;
    }

    return {
        ...p,
        imageUrl,
        color: {
            bg:     cfg.bg     || 'from-lime-50 to-green-50',
            badge:  cfg.badge  || 'bg-lime-100 text-lime-700',
            btn:    cfg.btn    || 'from-lime-400 to-green-400',
            card:   cfg.card   || 'from-lime-200 to-green-200',
            accent: cfg.accent || 'text-lime-600',
            ring:   cfg.ring   || 'ring-lime-300',
            blob1:  cfg.blob1  || '#AADF2830',
            blob2:  cfg.blob2  || '#00C89620',
        },
        // FIX #2: Pastikan array — tidak pernah null → tidak ada crash saat .map()
        sizes:    Array.isArray(p.sizes)    ? p.sizes    : [],
        benefits: Array.isArray(p.benefits) ? p.benefits : [],
        specs:    Array.isArray(p.specs)    ? p.specs    : [],
        price,
    };
}

// ─── Skeleton card saat variants belum tersedia ───────────────────────────────
// FIX #3: Tampilkan skeleton daripada layar kosong saat loading
const SkeletonCard = ({ i }) => (
    <div className="animate-pulse rounded-3xl overflow-hidden border-2 border-transparent bg-white shadow-sm">
        <div className="h-52 bg-gray-100" style={{ animationDelay: `${i * 0.1}s` }} />
        <div className="p-5 space-y-2">
            <div className="h-4 bg-gray-100 rounded-full w-1/3" />
            <div className="h-5 bg-gray-100 rounded-full w-2/3" />
            <div className="h-4 bg-gray-100 rounded-full w-1/4" />
        </div>
    </div>
);

// ─── ProductImage: tampil foto atau fallback emoji ────────────────────────────
const ProductImage = ({ variant, size = 'card' }) => {
    const [imgError, setImgError] = useState(false);
    const showImg = variant.imageUrl && !imgError;

    if (size === 'card') {
        return showImg ? (
            <img
                src={variant.imageUrl}
                alt={variant.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover absolute inset-0"
            />
        ) : (
            <span className="text-7xl relative z-10 drop-shadow-md">{variant.emoji || '🧴'}</span>
        );
    }

    // size === 'detail' — full cover dalam lingkaran, selaras dengan Show.jsx
    return showImg ? (
        <img
            src={variant.imageUrl}
            alt={variant.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover rounded-full"
        />
    ) : (
        <motion.span
            key={variant.emoji}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="text-9xl drop-shadow-xl"
        >
            {variant.emoji || '🧴'}
        </motion.span>
    );
};

// ─── ProductCard (catalog) ────────────────────────────────────────────────────
const ProductCard = ({ variant, isActive, onClick, i }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}>
            <motion.div
                whileHover={{ y: -8 }}
                onClick={() => onClick(variant)}
                className={`card-product cursor-pointer border-2 transition-all duration-300 ${
                    isActive ? `border-lime-400 ring-4 ${variant.color.ring}` : 'border-transparent'
                }`}
            >
                {/* Visual */}
                <div className={`h-52 bg-gradient-to-br ${variant.color.card} flex items-center justify-center relative overflow-hidden`}>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="absolute w-40 h-40 rounded-full border border-white/30" />

                    <ProductImage variant={variant} size="card" />

                    {isActive && (
                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-lime-400 flex items-center justify-center z-20">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                        </div>
                    )}
                </div>
                <div className="p-5">
                    <span className={`text-xs font-accent font-600 px-2.5 py-1 rounded-full ${variant.color.badge}`}>
                        {variant.tagline}
                    </span>
                    <h3 className="font-display text-lg font-700 text-gray-900 mt-2">{variant.name}</h3>
                    <p className={`text-sm font-600 mt-1 ${variant.color.accent}`}>{variant.price}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ─── Hitung kelas grid berdasarkan jumlah produk ──────────────────────────────
// FIX #4: Grid dinamis — tidak memaksa 3 kolom saat produk hanya 1 atau 2
function gridColsClass(count) {
    if (count === 1) return 'grid-cols-1 max-w-sm';
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2 max-w-2xl';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl';
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Products({ products: dbProducts = [], loading = false }) {
    const variants = dbProducts.map(normalise);

    const [active, setActive] = useState(variants[0] || null);
    const [selectedSize, setSelectedSize] = useState(variants[0]?.sizes?.[1] || variants[0]?.sizes?.[0] || '');

    const handleSelect = (v) => {
        setActive(v);
        setSelectedSize(v.sizes?.[1] || v.sizes?.[0] || '');
    };

    // FIX #3: Tampilkan skeleton saat loading (prop opsional dari Inertia)
    if (loading) {
        return (
            <MainLayout>
                <Head title="Produk" />
                <section className="py-20 px-4 bg-gradient-to-br from-lime-50 to-green-50">
                    <div className="max-w-7xl mx-auto text-center mb-12">
                        <div className="h-6 w-32 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
                        <div className="h-10 w-64 bg-gray-200 rounded-full mx-auto animate-pulse" />
                    </div>
                </section>
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[0, 1, 2].map(i => <SkeletonCard key={i} i={i} />)}
                        </div>
                    </div>
                </section>
            </MainLayout>
        );
    }

    if (!active) {
        return (
            <MainLayout>
                <Head title="Produk" />
                <section className="py-32 px-4 text-center">
                    <p className="text-6xl mb-4">🧴</p>
                    <h2 className="font-display text-2xl font-700 text-gray-900 mb-2">Belum ada produk</h2>
                    <p className="text-gray-500">Produk akan segera hadir.</p>
                </section>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Head title="Produk" />

            {/* ── Hero ──────────────────────────────────────────────── */}
            <section className={`py-20 px-4 bg-gradient-to-br ${active.color.bg} transition-all duration-700 relative overflow-hidden`}>
                <motion.div className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
                    animate={{ background: active.color.blob1 }} transition={{ duration: 0.8 }} />
                <motion.div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-3xl pointer-events-none"
                    animate={{ background: active.color.blob2 }} transition={{ duration: 0.8 }} />

                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-4">
                        <div className="section-tag mx-auto">Koleksi Produk</div>
                    </div>
                    <h1 className="section-title text-center mb-4">Varian <span className="text-gradient-lime italic">Sunny</span></h1>
                    <p className="section-subtitle text-center mx-auto">
                        Pilih varian favorit Anda — setiap formula dirancang khusus untuk memenuhi kebutuhan dapur yang berbeda.
                    </p>
                </div>
            </section>

            {/* ── Product Detail ────────────────────────────────────── */}
            <section className={`py-16 px-4 bg-gradient-to-br ${active.color.bg} transition-all duration-700`}>
                <div className="max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                        >
                            {/* Visual */}
                            <div className="flex justify-center">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex justify-center relative"
                                >
                                    {/* Orbit rings — selaras Show.jsx */}
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                        className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-lime-300/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                        className="absolute w-[280px] h-[280px] rounded-full border border-lime-200/40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                                    {/* Lingkaran produk */}
                                    <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                                        <div className={`w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br ${active.color.card} flex items-center justify-center shadow-float relative overflow-hidden`}>
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={active.id + '-img'}
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0.8, opacity: 0 }}
                                                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                                                    className="absolute inset-0 flex items-center justify-center"
                                                >
                                                    <ProductImage variant={active} size="detail" />
                                                </motion.div>
                                            </AnimatePresence>
                                            <div className="absolute top-6 left-8 w-12 h-24 bg-white/30 rounded-full blur-xl -rotate-12 pointer-events-none" />
                                            <div className="absolute bottom-8 right-4 w-8 h-16 bg-white/20 rounded-full blur-lg rotate-12 pointer-events-none" />
                                        </div>
                                    </motion.div>

                                    {/* Badge rating — selaras Show.jsx */}
                                    <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 3.5, delay: 0.5, repeat: Infinity }}
                                        className="absolute top-0 right-0 sm:right-4 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2">
                                        <span className="text-lg">⭐</span>
                                        <div>
                                            <div className="font-bold text-xs text-gray-900">4.9 / 5.0</div>
                                            <div className="text-gray-400 text-[10px]">2.4K ulasan</div>
                                        </div>
                                    </motion.div>

                                    {/* Badge eco — selaras Show.jsx */}
                                    <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 4, delay: 1, repeat: Infinity }}
                                        className="absolute bottom-4 left-0 sm:left-4 bg-lime-400 rounded-2xl shadow-lg px-3 py-1.5">
                                        <div className="text-xs font-bold text-gray-900">🌿 Eco-Certified</div>
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* Info */}
                            <div>
                                <span className={`inline-block text-xs font-accent font-600 px-3 py-1 rounded-full mb-4 ${active.color.badge}`}>
                                    {active.tagline}
                                </span>
                                <h2 className="font-display text-4xl md:text-5xl font-700 text-gray-900 mb-4">{active.name}</h2>
                                <p className="text-gray-600 leading-relaxed mb-6">{active.description || '—'}</p>

                                {/* FIX #2: Render benefits hanya jika ada data (selaras dengan Show.jsx) */}
                                {active.benefits.length > 0 && (
                                    <ul className="space-y-2 mb-6">
                                        {active.benefits.map((b, i) => (
                                            <li key={i} className="flex items-center gap-3 text-gray-700 text-sm">
                                                <span className="w-5 h-5 rounded-full bg-lime-400 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                                    </svg>
                                                </span>
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {active.sizes.length > 0 && (
                                    <div className="mb-6">
                                        <p className="text-sm font-accent font-600 text-gray-700 mb-3">
                                            Pilih Ukuran:{' '}
                                            <span className={`font-700 ${active.color.accent}`}>{selectedSize}</span>
                                        </p>
                                        <div className="flex gap-2 flex-wrap">
                                            {active.sizes.map(sz => (
                                                <motion.button
                                                    key={sz}
                                                    onClick={() => setSelectedSize(sz)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`px-4 py-2 rounded-xl text-sm font-600 font-accent border-2 transition-all ${
                                                        selectedSize === sz
                                                            ? 'border-lime-400 bg-lime-400 text-gray-900'
                                                            : 'border-gray-200 text-gray-600 hover:border-lime-300'
                                                    }`}
                                                >{sz}</motion.button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Harga — format selaras dengan Show.jsx */}
                                {(active.price_min > 0 || active.price_max > 0) && (
                                    <div className="flex items-baseline gap-3 mb-6">
                                        <span className={`font-display text-2xl font-700 ${active.color.accent}`}>
                                            {active.price}
                                        </span>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.03, y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                        className={`btn-primary bg-gradient-to-r ${active.color.btn}`}
                                    >
                                        🛒 Beli Sekarang
                                    </motion.button>
                                    <Link href="/hubungi-kami" className="btn-outline">Tanya Produk</Link>
                                </div>

                                {active.specs.length > 0 && (
                                    <div className="mt-8 grid grid-cols-2 gap-3">
                                        {active.specs.map((s, i) => (
                                            <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-white">
                                                <div className="text-xs text-gray-400 font-accent">{s.label}</div>
                                                <div className="text-sm font-700 text-gray-900 mt-0.5">{s.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* ── Variant Selector ───────────────────────────────────── */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <Reveal className="text-center mb-10">
                        <h2 className="font-display text-3xl font-700 text-gray-900">Pilih Varian</h2>
                        <p className="text-gray-500 mt-2">Klik produk untuk melihat detail & transisi warna</p>
                    </Reveal>

                    {/* FIX #4: Grid kolom menyesuaikan jumlah produk */}
                    <div className={`grid ${gridColsClass(variants.length)} gap-6 mx-auto`}>
                        {variants.map((v, i) => (
                            <ProductCard key={v.id} variant={v} isActive={active.id === v.id} onClick={handleSelect} i={i} />
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
