import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import MainLayout from '../../Layouts/MainLayout';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Reveal = ({ children, delay = 0, className = '' }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
            {children}
        </motion.div>
    );
};

// ── Helper: Article thumbnail ─────────────────────────────────────────────────
// Shows photo if available, otherwise falls back to emoji + gradient.
const ArticleThumbnail = ({ article, className = 'h-48' }) => {
    if (article.image) {
        return (
            <div className={`${className} overflow-hidden`}>
                <img
                    src={`/storage/${article.image}`}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
        );
    }
    return (
        <div className={`${className} bg-gradient-to-br ${article.color || 'from-lime-100 to-green-100'} flex items-center justify-center`}>
            <span className="text-6xl">{article.emoji || '📝'}</span>
        </div>
    );
};

const CATEGORIES = ['Semua', 'Tips Bersih', 'Resep', 'Kesehatan', 'Lingkungan'];

const DUMMY_ARTICLES = [
    {
        id: 1, slug: 'cara-mencuci-piring-yang-benar',
        title: '7 Cara Mencuci Piring yang Benar agar Bersih Sempurna',
        excerpt: 'Mencuci piring terlihat mudah, namun banyak yang masih salah. Ikuti panduan lengkap ini untuk hasil terbaik.',
        category: 'Tips Bersih', readTime: '4 menit', emoji: '🍽️',
        color: 'from-lime-100 to-green-100', date: '28 Apr 2025',
        featured: true, image: null,
    },
    {
        id: 2, slug: 'manfaat-lemon-untuk-dapur',
        title: 'Manfaat Lemon dalam Membersihkan Peralatan Dapur',
        excerpt: 'Lemon bukan hanya untuk minuman. Temukan 12 manfaat luar biasa lemon untuk kebersihan dapur Anda.',
        category: 'Tips Bersih', readTime: '5 menit', emoji: '🍋',
        color: 'from-sunny-100 to-lime-100', date: '20 Apr 2025',
        featured: true, image: null,
    },
    {
        id: 3, slug: 'tips-dapur-bersih-setiap-hari',
        title: 'Tips Menjaga Dapur Tetap Bersih Setiap Hari',
        excerpt: 'Rutinitas sederhana yang bisa membuat dapur Anda selalu rapi dan higienis tanpa usaha berlebih.',
        category: 'Tips Bersih', readTime: '3 menit', emoji: '✨',
        color: 'from-cyan-50 to-teal-50', date: '15 Apr 2025', featured: false, image: null,
    },
    {
        id: 4, slug: 'bahaya-cuci-piring-tidak-bersih',
        title: 'Bahaya Tersembunyi dari Piring yang Tidak Dicuci Bersih',
        excerpt: 'Sisa sabun atau lemak di peralatan makan bisa menjadi sarang bakteri berbahaya. Ketahui risikonya.',
        category: 'Kesehatan', readTime: '6 menit', emoji: '🦠',
        color: 'from-red-50 to-orange-50', date: '10 Apr 2025', featured: false, image: null,
    },
    {
        id: 5, slug: 'sabun-cuci-ramah-lingkungan',
        title: 'Memilih Sabun Cuci Piring yang Ramah Lingkungan',
        excerpt: 'Tidak semua sabun cuci diciptakan sama. Pelajari cara memilih yang aman untuk keluarga dan bumi.',
        category: 'Lingkungan', readTime: '4 menit', emoji: '🌍',
        color: 'from-green-50 to-emerald-50', date: '5 Apr 2025', featured: false, image: null,
    },
    {
        id: 6, slug: 'resep-dapur-sehat',
        title: 'Resep Masakan Sehat untuk Dapur Bersih',
        excerpt: 'Dapur bersih adalah awal dari masakan sehat. Temukan inspirasi resep yang mudah dan menyehatkan.',
        category: 'Resep', readTime: '8 menit', emoji: '🥗',
        color: 'from-lime-50 to-sunny-50', date: '1 Apr 2025', featured: false, image: null,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function Articles({ articles: dbArticles = [] }) {
    const [activeCategory, setActiveCategory] = useState('Semua');

    const articles = dbArticles.length > 0 ? dbArticles : DUMMY_ARTICLES;
    const featured = articles.filter(a => a.featured);
    const filtered = activeCategory === 'Semua'
        ? articles
        : articles.filter(a => a.category === activeCategory);

    return (
        <MainLayout>
            <Head title="Artikel" />

            {/* ── Hero ──────────────────────────────────────────── */}
            <section className="py-20 px-4 bg-gradient-to-br from-lime-50 via-fresh-cream to-sunny-50 relative overflow-hidden">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-lime-200 opacity-40" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="section-tag mx-auto mb-4">Tips & Inspirasi</div>
                    <h1 className="section-title mb-4">
                        Artikel <span className="text-gradient-lime italic">Dapur Sunny</span>
                    </h1>
                    <p className="section-subtitle mx-auto text-center">
                        Tips, trik, dan inspirasi untuk dapur yang selalu bersih, sehat, dan menyenangkan.
                    </p>
                </div>
            </section>

            {/* ── Featured ──────────────────────────────────────── */}
            {featured.length > 0 && (
                <section className="py-12 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <Reveal className="mb-8">
                            <h2 className="font-display text-2xl font-700 text-gray-900">Artikel Pilihan</h2>
                        </Reveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {featured.map((a, i) => (
                                <Reveal key={a.id} delay={i * 0.1}>
                                    <Link href={`/artikel/${a.slug}`}>
                                        <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.3 }}
                                            className="group card-product h-full flex flex-col overflow-hidden">
                                            {/* Thumbnail — photo or emoji */}
                                            <ArticleThumbnail article={a} className="h-48" />
                                            <div className="p-6 flex flex-col flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="section-tag text-xs">{a.category}</span>
                                                    <span className="text-gray-400 text-xs">{a.readTime} baca</span>
                                                </div>
                                                <h3 className="font-display text-xl font-700 text-gray-900 mb-2 group-hover:text-lime-700 transition-colors">
                                                    {a.title}
                                                </h3>
                                                <p className="text-gray-500 text-sm leading-relaxed flex-1">{a.excerpt}</p>
                                                <div className="mt-4 flex items-center text-lime-600 text-sm font-600">
                                                    Baca selengkapnya
                                                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </motion.article>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Grid ───────────────────────────────────────────── */}
            <section className="py-16 px-4 bg-fresh-cream">
                <div className="max-w-7xl mx-auto">
                    {/* Category filter */}
                    <Reveal className="flex flex-wrap gap-2 mb-10">
                        {CATEGORIES.map(cat => (
                            <button key={cat} onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-accent font-600 transition-all duration-200 ${
                                    activeCategory === cat
                                        ? 'bg-lime-400 text-gray-900 shadow-lime'
                                        : 'bg-white text-gray-600 hover:bg-lime-50 border border-gray-100'
                                }`}
                            >{cat}</button>
                        ))}
                    </Reveal>

                    {/* Articles grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((a, i) => (
                            <Reveal key={a.id} delay={i * 0.07}>
                                <Link href={`/artikel/${a.slug}`}>
                                    <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.3 }}
                                        className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-50">
                                        {/* Thumbnail — photo or emoji */}
                                        <ArticleThumbnail article={a} className="h-36" />
                                        <div className="p-5">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-accent font-600 text-lime-600 bg-lime-50 px-2.5 py-1 rounded-full">{a.category}</span>
                                                <span className="text-gray-400 text-xs">{a.date}</span>
                                            </div>
                                            <h3 className="font-display text-base font-700 text-gray-900 mb-2 leading-snug group-hover:text-lime-700 transition-colors line-clamp-2">
                                                {a.title}
                                            </h3>
                                            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{a.excerpt}</p>
                                            <div className="mt-4 flex items-center text-lime-600 text-xs font-600">
                                                {a.readTime} baca
                                                <svg className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </motion.article>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
