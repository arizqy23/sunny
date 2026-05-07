import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

// ─── Reveal Wrapper ──────────────────────────────────────────────────────────
export const Reveal = ({ children, delay = 0, className = '', direction = 'up' }) => {
    const { ref, isVisible } = useScrollReveal();
    const variants = {
        up:    { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
        left:  { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
        right: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
        scale: { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
    };
    const v = variants[direction] || variants.up;
    return (
        <motion.div ref={ref}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={v}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}>
            {children}
        </motion.div>
    );
};

// ─── Section Header ──────────────────────────────────────────────────────────
export const SectionHeader = ({ tag, title, subtitle, center = true }) => (
    <Reveal className={center ? 'text-center mb-16' : 'mb-12'}>
        {tag && <div className={`section-tag mb-4 ${center ? 'mx-auto' : ''}`}>{tag}</div>}
        <h2 className="section-title mb-4">{title}</h2>
        {subtitle && (
            <p className={`section-subtitle ${center ? 'mx-auto text-center' : ''}`}>{subtitle}</p>
        )}
    </Reveal>
);

// ─── Product Card ────────────────────────────────────────────────────────────
export const ProductCard = ({ product, delay = 0 }) => {
    const { ref, isVisible } = useScrollReveal();
    const cfg = product.color_config || {};

    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
            <Link href={`/produk/${product.slug}`}>
                <motion.article
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="group card-product h-full"
                >
                    {/* Visual */}
                    <div className={`h-52 bg-gradient-to-br ${cfg.card || 'from-lime-200 to-green-200'} 
                        flex items-center justify-center relative overflow-hidden`}>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                            className="absolute w-40 h-40 rounded-full border border-white/20" />
                        <span className="text-7xl drop-shadow-md relative z-10">{product.emoji || '🧴'}</span>
                        {product.is_featured && (
                            <span className="absolute top-3 left-3 bg-sunny-400 text-gray-900 text-[10px] font-700 px-2 py-1 rounded-full font-accent">
                                ⭐ Unggulan
                            </span>
                        )}
                    </div>

                    {/* Info */}
                    <div className="p-5">
                        <span className={`text-xs font-accent font-600 px-2.5 py-1 rounded-full ${cfg.badge || 'bg-lime-100 text-lime-700'}`}>
                            {product.tagline || 'Produk Sunny'}
                        </span>
                        <h3 className="font-display text-lg font-700 text-gray-900 mt-2 mb-1 group-hover:text-lime-700 transition-colors">
                            {product.name}
                        </h3>
                        <p className={`text-sm font-600 ${cfg.accent || 'text-lime-600'}`}>
                            {product.price_range || `Rp ${Number(product.price_min || 12500).toLocaleString('id-ID')} – Rp ${Number(product.price_max || 38000).toLocaleString('id-ID')}`}
                        </p>

                        {/* Arrow */}
                        <div className="mt-3 flex items-center text-lime-600 text-xs font-600">
                            Lihat Detail
                            <svg className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                            </svg>
                        </div>
                    </div>
                </motion.article>
            </Link>
        </motion.div>
    );
};

// ─── Article Card ────────────────────────────────────────────────────────────
export const ArticleCard = ({ article, delay = 0, featured = false }) => {
    const { ref, isVisible } = useScrollReveal();

    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
            <Link href={`/artikel/${article.slug}`}>
                <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-float 
                        transition-shadow duration-300 border border-gray-50 h-full flex flex-col
                        ${featured ? 'ring-2 ring-lime-200' : ''}`}
                >
                    <div className={`${featured ? 'h-48' : 'h-36'} bg-gradient-to-br ${article.color || 'from-lime-100 to-green-100'} 
                        flex items-center justify-center text-5xl relative overflow-hidden`}>
                        {featured && (
                            <div className="absolute top-3 left-3 bg-sunny-400 text-gray-900 text-[10px] font-700 px-2 py-1 rounded-full font-accent">
                                📌 Pilihan
                            </div>
                        )}
                        <span className={featured ? 'text-6xl' : 'text-5xl'}>{article.emoji}</span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-accent font-600 text-lime-600 bg-lime-50 px-2.5 py-1 rounded-full">
                                {article.category}
                            </span>
                            <span className="text-gray-400 text-xs">{article.read_time} baca</span>
                        </div>
                        <h3 className={`font-display font-700 text-gray-900 mb-2 leading-snug group-hover:text-lime-700 transition-colors
                            ${featured ? 'text-xl' : 'text-base'} line-clamp-2`}>
                            {article.title}
                        </h3>
                        <p className="text-gray-500 text-xs leading-relaxed flex-1 line-clamp-2">{article.excerpt}</p>
                        <div className="mt-4 flex items-center text-lime-600 text-xs font-600">
                            Baca selengkapnya
                            <svg className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                            </svg>
                        </div>
                    </div>
                </motion.article>
            </Link>
        </motion.div>
    );
};

// ─── Animated Bubble ─────────────────────────────────────────────────────────
export const Bubble = ({ size, x, y, color, delay = 0, duration = 8 }) => (
    <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{ width: size, height: size, left: x, top: y, background: color, opacity: 0.25 }}
        animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.08, 1] }}
        transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
);

// ─── Loading Spinner ──────────────────────────────────────────────────────────
export const Spinner = ({ size = 'md' }) => {
    const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
    return (
        <div className={`${sizes[size]} border-2 border-lime-100 border-t-lime-400 rounded-full animate-spin`} />
    );
};

// ─── Empty State ──────────────────────────────────────────────────────────────
export const EmptyState = ({ emoji = '📭', title = 'Belum Ada Data', desc = '', action }) => (
    <div className="text-center py-16">
        <div className="text-6xl mb-4">{emoji}</div>
        <h3 className="font-display text-xl font-700 text-gray-900 mb-2">{title}</h3>
        {desc && <p className="text-gray-500 text-sm mb-6">{desc}</p>}
        {action && (
            <Link href={action.href} className="btn-primary">{action.label}</Link>
        )}
    </div>
);
