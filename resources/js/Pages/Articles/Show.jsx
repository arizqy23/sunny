import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import MainLayout from '../../Layouts/MainLayout';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Reveal = ({ children, delay = 0, className = '' }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}>
            {children}
        </motion.div>
    );
};

// ── Helper: Related article thumbnail ────────────────────────────────────────
const RelatedThumbnail = ({ article }) => {
    if (article.image) {
        return (
            <div className="h-28 overflow-hidden">
                <img
                    src={`/storage/${article.image}`}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
        );
    }
    return (
        <div className={`h-28 bg-gradient-to-br ${article.color || 'from-lime-100 to-green-100'} flex items-center justify-center text-4xl`}>
            {article.emoji || '📝'}
        </div>
    );
};

const FALLBACK_ARTICLE = {
    id: 1,
    title: '7 Cara Mencuci Piring yang Benar agar Bersih Sempurna',
    slug: 'cara-mencuci-piring-yang-benar',
    excerpt: 'Mencuci piring terlihat mudah, namun banyak yang masih salah. Ikuti panduan lengkap ini untuk hasil terbaik.',
    category: 'Tips Bersih',
    emoji: '🍽️',
    color: 'from-lime-100 to-green-100',
    read_time: '4 menit',
    author: 'Tim Sunny',
    views: 1248,
    published_at: '28 Apr 2025',
    image: null,
    content: `
        <p>Mencuci piring adalah rutinitas harian yang tampak sederhana, namun tahukah Anda bahwa ada cara yang benar dan cara yang salah dalam melakukannya? Banyak keluarga Indonesia yang tanpa sadar melakukan kebiasaan yang membuat piring tidak benar-benar bersih atau bahkan bisa membahayakan kesehatan.</p>

        <h2>1. Rendam Terlebih Dahulu</h2>
        <p>Sebelum mencuci, rendam peralatan dapur yang kotor dengan air hangat selama 5–10 menit. Ini membantu melunakkan sisa makanan yang mengering dan lemak yang menempel, sehingga proses mencuci menjadi lebih mudah dan menghemat sabun.</p>

        <h2>2. Gunakan Air Bersuhu Tepat</h2>
        <p>Air hangat (sekitar 45–55°C) adalah suhu ideal untuk mencuci piring. Air ini efektif melarutkan lemak dan membunuh bakteri, namun tidak terlalu panas yang bisa merusak kulit tangan Anda. Hindari menggunakan air dingin karena lemak tidak akan larut sempurna.</p>

        <h2>3. Takaran Sabun yang Tepat</h2>
        <p>Dengan Sunny, Anda hanya butuh 1–2 tetes untuk spons penuh busa. Formula pekat Sunny artinya satu botol bisa bertahan jauh lebih lama dibandingkan sabun cuci biasa. Sabun terlalu banyak justru membutuhkan lebih banyak air untuk pembilasan dan bisa meninggalkan residu.</p>

        <h2>4. Cuci dalam Urutan yang Benar</h2>
        <p>Mulai dari peralatan yang paling bersih ke yang paling kotor: gelas dan piring → peralatan makan → panci dan wajan. Ini mencegah kotoran dari panci yang berminyak mencemari gelas Anda.</p>

        <h2>5. Perhatikan Lipatan dan Sudut</h2>
        <p>Bakteri sering bersembunyi di bagian yang tersembunyi: lipatan tutup wadah, gagang sendok garpu, dan pinggiran piring. Pastikan spons menyentuh semua bagian ini saat mencuci.</p>

        <h2>6. Bilas dengan Sempurna</h2>
        <p>Bilas setiap peralatan di bawah air mengalir hingga tidak ada busa tersisa. Sisa sabun di peralatan makan dapat mengganggu rasa makanan dan dalam jangka panjang bisa berdampak pada kesehatan pencernaan.</p>

        <h2>7. Keringkan dengan Benar</h2>
        <p>Setelah dibilas, letakkan peralatan di rak pengering atau lap dengan kain bersih yang kering. Jangan menumpuk piring saat masih basah karena ini menciptakan lingkungan lembab yang ideal bagi pertumbuhan jamur dan bakteri.</p>

        <h2>Tips Ekstra dari Sunny</h2>
        <p>Untuk hasil maksimal, gunakan spons dengan dua sisi: sisi kasar untuk noda membandel dan sisi lembut untuk gelas dan peralatan kaca. Ganti spons Anda setiap 2–4 minggu untuk menghindari akumulasi bakteri.</p>
    `,
};

export default function ArticleShow({ article: dbArticle, related = [] }) {
    const article = dbArticle || FALLBACK_ARTICLE;

    return (
        <MainLayout>
            <Head title={article.title} />

            {/* ── Hero ──────────────────────────────────────────── */}
            <section className={`py-16 px-4 bg-gradient-to-br ${article.color || 'from-lime-50 to-green-50'} relative overflow-hidden`}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-white/30 opacity-50" />

                <div className="max-w-3xl mx-auto relative z-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-xs text-gray-500 font-accent mb-8">
                        <Link href="/" className="hover:text-lime-600 transition-colors">Beranda</Link>
                        <span>/</span>
                        <Link href="/artikel" className="hover:text-lime-600 transition-colors">Artikel</Link>
                        <span>/</span>
                        <span className="text-gray-700 truncate max-w-[200px]">{article.title}</span>
                    </nav>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="section-tag">{article.category}</span>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500 font-accent">
                            ⏱ {article.read_time} baca
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500 font-accent">
                            👁 {article.views?.toLocaleString('id-ID') || '0'} dibaca
                        </span>
                    </div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="font-display text-4xl md:text-5xl font-800 text-gray-900 leading-tight mb-6">
                        {article.title}
                    </motion.h1>

                    <p className="text-gray-600 text-lg leading-relaxed mb-8">{article.excerpt}</p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center font-700 text-gray-900 text-sm">
                            {article.author?.charAt(0) || 'S'}
                        </div>
                        <div>
                            <div className="font-600 text-gray-900 text-sm">{article.author || 'Tim Sunny'}</div>
                            <div className="text-gray-500 text-xs">{article.published_at || 'Baru-baru ini'}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Article Image / Emoji Banner ──────────────────── */}
            {article.image ? (
                // Full-width cover photo
                <div className="relative z-10 max-w-3xl mx-auto px-4 -mt-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="rounded-3xl overflow-hidden shadow-float border border-white/60">
                        <img
                            src={`/storage/${article.image}`}
                            alt={article.title}
                            className="w-full h-64 md:h-80 object-cover"
                        />
                    </motion.div>
                </div>
            ) : (
                // Fallback: floating emoji badge
                <div className="flex justify-center -mt-8 relative z-10">
                    <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        className="w-24 h-24 rounded-3xl bg-white shadow-float flex items-center justify-center text-5xl border border-gray-50">
                        {article.emoji || '📝'}
                    </motion.div>
                </div>
            )}

            {/* ── Content ───────────────────────────────────────── */}
            <section className="py-12 px-4 bg-white">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="prose prose-lg max-w-none
                            prose-headings:font-display prose-headings:font-700 prose-headings:text-gray-900
                            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
                            prose-a:text-lime-600 prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-gray-900 prose-strong:font-700"
                        dangerouslySetInnerHTML={{ __html: article.content || '<p>Konten artikel sedang dimuat...</p>' }}
                    />

                    {/* Share section */}
                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <p className="text-sm font-accent font-600 text-gray-700 mb-3">Bagikan Artikel:</p>
                        <div className="flex gap-2 flex-wrap">
                            {['📘 Facebook', '🐦 Twitter', '💬 WhatsApp', '📌 Pinterest'].map(s => (
                                <button key={s} className="text-xs px-4 py-2 bg-gray-50 hover:bg-lime-50 border border-gray-100 rounded-full text-gray-600 font-accent transition-colors">
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Related Articles ──────────────────────────────── */}
            {related.length > 0 && (
                <section className="py-16 px-4 bg-fresh-cream">
                    <div className="max-w-5xl mx-auto">
                        <Reveal className="mb-10">
                            <h2 className="font-display text-3xl font-700 text-gray-900">Artikel Terkait</h2>
                        </Reveal>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {related.map((a, i) => (
                                <Reveal key={a.id} delay={i * 0.1}>
                                    <Link href={`/artikel/${a.slug}`}>
                                        <motion.article whileHover={{ y: -5 }} transition={{ duration: 0.3 }}
                                            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-50">
                                            <RelatedThumbnail article={a} />
                                            <div className="p-4">
                                                <p className="font-display text-sm font-700 text-gray-900 leading-snug group-hover:text-lime-700 transition-colors line-clamp-2">{a.title}</p>
                                                <p className="text-gray-400 text-xs mt-2 font-accent">{a.read_time} baca</p>
                                            </div>
                                        </motion.article>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── CTA ───────────────────────────────────────────── */}
            <section className="py-16 px-4 bg-gradient-to-br from-lime-50 to-sunny-50">
                <Reveal className="max-w-2xl mx-auto text-center">
                    <div className="text-5xl mb-4">🧴</div>
                    <h2 className="font-display text-3xl font-700 text-gray-900 mb-3">
                        Coba Sunny Sekarang!
                    </h2>
                    <p className="text-gray-600 mb-6">Rasakan perbedaan bersih sempurna dengan formula lemon aktif Sunny.</p>
                    <Link href="/produk" className="btn-primary">Lihat Produk Kami</Link>
                </Reveal>
            </section>
        </MainLayout>
    );
}
