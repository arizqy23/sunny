import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../../Layouts/MainLayout';
import { useScrollReveal } from '../../hooks/useScrollReveal';

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = '' }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}>
            {children}
        </motion.div>
    );
};

// ─── Format harga IDR ────────────────────────────────────────────────────────
const formatIDR = (val) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
    }).format(val || 0);

// ─────────────────────────────────────────────────────────────────────────────
export default function ProductShow({ product, related = [] }) {

    // Guard: jika product null (tidak seharusnya terjadi tapi untuk keamanan)
    if (!product) {
        return (
            <MainLayout>
                <Head title="Produk Tidak Ditemukan" />
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-6xl mb-4">🧴</p>
                        <h2 className="font-display text-2xl font-700 text-gray-900 mb-2">Produk tidak ditemukan</h2>
                        <Link href="/produk" className="btn-primary mt-4">Lihat Semua Produk</Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    // ── Ambil dari DB props ───────────────────────────────────────────────────
    const cfg = product.color_config || {};

    const [selectedSize, setSelectedSize] = useState(
        product.sizes?.[1] || product.sizes?.[0] || null
    );
    const [activeTab, setActiveTab] = useState('manfaat');
    const [qty, setQty] = useState(1);

    const priceMin = formatIDR(product.price_min);
    const priceMax = formatIDR(product.price_max);

    const tabs = [
        { id: 'manfaat',      label: '✅ Manfaat' },
        { id: 'spesifikasi',  label: '📋 Spesifikasi' },
        { id: 'komposisi',    label: '🔬 Komposisi' },
        { id: 'cara-pakai',   label: '📖 Cara Pakai' },
    ];

    // Cara pakai di-split per titik jadi step-by-step
    const howToUseSteps = product.how_to_use
        ? product.how_to_use.split('.').map(s => s.trim()).filter(Boolean)
        : ['Teteskan 1–2 tetes ke spons basah', 'Gosok peralatan hingga berbusa', 'Bilas dengan air bersih sampai tidak ada sisa sabun'];

    return (
        <MainLayout>
            <Head title={product.name} />

            {/* ── Breadcrumb ────────────────────────────────────────────────── */}
            <div className={`py-4 px-4 bg-gradient-to-r ${cfg.bg || 'from-lime-50 to-green-50'} border-b border-white/50`}>
                <div className="max-w-7xl mx-auto">
                    <nav className="flex items-center gap-2 text-sm text-gray-500 font-accent">
                        <Link href="/" className="hover:text-lime-600 transition-colors">Beranda</Link>
                        <span>/</span>
                        <Link href="/produk" className="hover:text-lime-600 transition-colors">Produk</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-semibold">{product.name}</span>
                    </nav>
                </div>
            </div>

            {/* ── Main Section ──────────────────────────────────────────────── */}
            <section className={`py-16 px-4 bg-gradient-to-br ${cfg.bg || 'from-lime-50 to-green-50'} relative overflow-hidden`}>
                {/* Dekorasi blob */}
                <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${cfg.blob1 || '#AADF28'}, transparent)` }} />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${cfg.blob2 || '#00C896'}, transparent)` }} />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* ── Visual Produk ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="flex justify-center relative"
                    >
                        {/* Orbit rings */}
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                            className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-lime-300/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="absolute w-[280px] h-[280px] rounded-full border border-lime-200/40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                        {/* Lingkaran produk */}
                        <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                            <div className={`w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br ${cfg.card || 'from-lime-200 to-green-200'} flex items-center justify-center shadow-float relative overflow-hidden`}>
                                {/* Jika ada gambar dari DB, tampilkan. Jika tidak, tampilkan emoji */}
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <span className="text-9xl drop-shadow-xl relative z-10 select-none">
                                        {product.emoji || '🧴'}
                                    </span>
                                )}
                                {/* Efek shine */}
                                <div className="absolute top-4 left-6 w-14 h-28 bg-white/35 rounded-full blur-xl -rotate-12 pointer-events-none" />
                                <div className="absolute bottom-8 right-4 w-8 h-16 bg-white/20 rounded-full blur-lg rotate-12 pointer-events-none" />
                            </div>
                        </motion.div>

                        {/* Badge rating */}
                        <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 3.5, delay: 0.5, repeat: Infinity }}
                            className="absolute top-0 right-0 sm:right-4 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2">
                            <span className="text-lg">⭐</span>
                            <div>
                                <div className="font-bold text-xs text-gray-900">4.9 / 5.0</div>
                                <div className="text-gray-400 text-[10px]">2.4K ulasan</div>
                            </div>
                        </motion.div>

                        {/* Badge eco */}
                        <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 4, delay: 1, repeat: Infinity }}
                            className="absolute bottom-4 left-0 sm:left-4 bg-lime-400 rounded-2xl shadow-lg px-3 py-1.5">
                            <div className="text-xs font-bold text-gray-900">🌿 Eco-Certified</div>
                        </motion.div>
                    </motion.div>

                    {/* ── Info Produk (dari DB) ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Badge tagline */}
                        <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-4 ${cfg.badge || 'bg-lime-100 text-lime-700'}`}>
                            {product.tagline}
                        </span>

                        {/* Nama */}
                        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                            {product.name}
                        </h1>

                        {/* Deskripsi dari DB */}
                        <p className="text-gray-600 leading-relaxed text-base mb-6">
                            {product.description || '—'}
                        </p>

                        {/* Harga dari DB */}
                        {(product.price_min > 0 || product.price_max > 0) && (
                            <div className="flex items-baseline gap-3 mb-6">
                                <span className={`font-display text-3xl font-bold ${cfg.accent || 'text-lime-600'}`}>
                                    {priceMin}
                                </span>
                                {product.price_max > 0 && product.price_max !== product.price_min && (
                                    <>
                                        <span className="text-gray-400 text-sm">– {priceMax}</span>
                                        <span className="text-xs text-gray-400">/ botol</span>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Pilih ukuran dari DB */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-6">
                                <p className="text-sm font-semibold text-gray-700 mb-3">
                                    Pilih Ukuran:{' '}
                                    <span className={`font-bold ${cfg.accent || 'text-lime-600'}`}>
                                        {selectedSize}
                                    </span>
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map(sz => (
                                        <motion.button key={sz}
                                            onClick={() => setSelectedSize(sz)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                                                selectedSize === sz
                                                    ? 'border-lime-400 bg-lime-400 text-gray-900 shadow-sm'
                                                    : 'border-gray-200 bg-white text-gray-600 hover:border-lime-300'
                                            }`}>
                                            {sz}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Jumlah */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-sm font-semibold text-gray-700">Jumlah:</span>
                            <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
                                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                                    className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors font-bold text-lg">−</button>
                                <span className="w-10 text-center font-bold text-gray-900 text-sm">{qty}</span>
                                <button onClick={() => setQty(q => q + 1)}
                                    className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors font-bold text-lg">+</button>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                                className={`btn-primary bg-gradient-to-r ${cfg.btn || 'from-lime-400 to-green-400'}`}>
                                🛒 Tambah ke Keranjang
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                className="btn-outline">
                                ❤️ Wishlist
                            </motion.button>
                        </div>

                        {/* Trust badges */}
                        <div className="flex flex-wrap gap-3">
                            {['🏆 BPOM Terdaftar', '🌿 Halal MUI', '♻️ Eco-Friendly', '🧪 Dermatology Tested'].map(b => (
                                <span key={b} className="text-xs bg-white border border-gray-100 rounded-full px-3 py-1.5 text-gray-600">
                                    {b}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Tabs: Manfaat / Spesifikasi / Komposisi / Cara Pakai ─────── */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    {/* Tab nav */}
                    <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-100 pb-4">
                        {tabs.map(t => (
                            <button key={t.id} onClick={() => setActiveTab(t.id)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                                    activeTab === t.id
                                        ? 'bg-lime-400 text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                }`}>
                                {t.label}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}>

                            {/* ── Tab: Manfaat (dari DB) ── */}
                            {activeTab === 'manfaat' && (
                                <>
                                    {product.benefits && product.benefits.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {product.benefits.map((b, i) => (
                                                <motion.div key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.06 }}
                                                    className="flex items-center gap-3 p-4 bg-lime-50 rounded-2xl border border-lime-100">
                                                    <span className="w-6 h-6 rounded-full bg-lime-400 flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                                        </svg>
                                                    </span>
                                                    <span className="text-gray-700 text-sm">{b}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 text-sm text-center py-8">Belum ada data manfaat.</p>
                                    )}
                                </>
                            )}

                            {/* ── Tab: Spesifikasi (dari DB) ── */}
                            {activeTab === 'spesifikasi' && (
                                <>
                                    {product.specs && product.specs.length > 0 ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {product.specs.map((s, i) => (
                                                <motion.div key={i}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.06 }}
                                                    className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                                    <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{s.label}</div>
                                                    <div className="font-bold text-gray-900 text-sm">{s.value}</div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 text-sm text-center py-8">Belum ada data spesifikasi.</p>
                                    )}
                                </>
                            )}

                            {/* ── Tab: Komposisi (dari DB) ── */}
                            {activeTab === 'komposisi' && (
                                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                                    <h3 className="font-display text-lg font-bold text-gray-900 mb-3">Kandungan Bahan</h3>
                                    {product.ingredients ? (
                                        <p className="text-gray-600 text-sm leading-relaxed">{product.ingredients}</p>
                                    ) : (
                                        <p className="text-gray-400 text-sm italic">Informasi komposisi belum tersedia.</p>
                                    )}
                                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-xl">
                                        <p className="text-yellow-700 text-xs">
                                            ⚠️ Hindari kontak dengan mata. Jika terjadi, segera bilas dengan air bersih. Jauhkan dari jangkauan anak-anak.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* ── Tab: Cara Pakai (dari DB) ── */}
                            {activeTab === 'cara-pakai' && (
                                <div className="space-y-4">
                                    {howToUseSteps.map((step, i) => (
                                        <motion.div key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start gap-4 p-4 bg-lime-50 rounded-2xl border border-lime-100">
                                            <span className="w-7 h-7 rounded-full bg-lime-400 text-gray-900 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                                {i + 1}
                                            </span>
                                            <p className="text-gray-700 text-sm leading-relaxed">{step}.</p>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* ── Produk Terkait (dari DB) ──────────────────────────────────── */}
            {related.length > 0 && (
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <Reveal className="text-center mb-10">
                            <h2 className="font-display text-3xl font-bold text-gray-900">Produk Lainnya</h2>
                            <p className="text-gray-500 text-sm mt-2">Varian Sunny lain yang mungkin kamu suka</p>
                        </Reveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            {related.map((p, i) => (
                                <Reveal key={p.id} delay={i * 0.1}>
                                    <Link href={`/produk/${p.slug}`}>
                                        <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}
                                            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-50 group">
                                            {/* Gambar atau emoji */}
                                            <div className={`h-36 bg-gradient-to-br ${p.color_config?.card || 'from-lime-200 to-green-200'} flex items-center justify-center relative overflow-hidden`}>
                                                {p.image ? (
                                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-5xl select-none">{p.emoji || '🧴'}</span>
                                                )}
                                            </div>
                                            <div className="p-4 flex items-center justify-between">
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">{p.name}</p>
                                                    <p className="text-gray-500 text-xs mt-0.5">{p.tagline}</p>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-lime-50 group-hover:bg-lime-500 flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                                                    <svg className="w-3.5 h-3.5 text-lime-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}
