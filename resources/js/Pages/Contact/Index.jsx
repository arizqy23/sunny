import { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../../Layouts/MainLayout';
import { useScrollReveal } from '../../hooks/useScrollReveal';
// Import Ikon Lucide
import {
    Mail, Phone, MapPin, MessageCircle,
    ShoppingCart, RefreshCw, HelpCircle,
    MessageSquare, AlertTriangle, Image,
    Handshake, CheckCircle2, Send
} from 'lucide-react';

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

// Update TOPICS dengan komponen ikon
const TOPICS = [
    { label: 'Pembelian Produk', icon: <ShoppingCart size={14} className="mr-1.5" /> },
    { label: 'Distributor / Kerjasama', icon: <RefreshCw size={14} className="mr-1.5" /> },
    { label: 'Pertanyaan Produk', icon: <HelpCircle size={14} className="mr-1.5" /> },
    { label: 'Saran & Masukan', icon: <MessageSquare size={14} className="mr-1.5" /> },
    { label: 'Keluhan', icon: <AlertTriangle size={14} className="mr-1.5" /> },
    { label: 'Testimoni', icon: <Image size={14} className="mr-1.5" /> },
];

// Update INFO_CARDS dengan komponen ikon
const INFO_CARDS = [
    { icon: <Mail className="text-lime-600" />, label: 'Email', value: 'ptbaradachemicalindo@gmail.com', sub: 'Balas dalam 24 jam' },
    { icon: <Phone className="text-lime-600" />, label: 'Telepon', value: '0800-SUNNY-88', sub: 'Senin–Jumat, 08–17 WIB' },
    { icon: <MapPin className="text-lime-600" />, label: 'Kantor', value: 'Bojonegoro', sub: 'Jawa Timur, 62193' },
    { icon: <MessageCircle className="text-lime-600" />, label: 'WhatsApp', value: '+62 852-3140-2724', sub: 'Respon cepat via WA' },
];

export default function Contact() {
    const { flash } = usePage().props;
    const [selectedTopic, setSelectedTopic] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        topic: '',
        message: '',
    });

    const handleTopicSelect = (t) => {
        setSelectedTopic(t);
        setData('topic', t);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/hubungi-kami', {
            onSuccess: () => {
                setSubmitted(true);
                reset();
                setSelectedTopic('');
            },
        });
    };

    return (
        <MainLayout>
            <Head title="Hubungi Kami" />

            {/* ── Hero ──────────────────────────────────────────── */}
            <section className="py-14 sm:py-20 px-5 bg-gradient-to-br from-lime-50 to-fresh-cream relative overflow-hidden">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }}
                    className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-sunny-200 blur-3xl opacity-30" />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <div className="section-tag mx-auto mb-4">Get in Touch</div>
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-700 leading-tight text-gray-900 mb-4">
                        Hubungi <span className="text-gradient-lime italic">Tim Sunny</span>
                    </h1>
                    <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
                        Ada pertanyaan, saran, atau ingin bekerjasama? Kami siap membantu Anda kapan saja.
                    </p>
                </div>
            </section>

            {/* ── Info Cards ────────────────────────────────────── */}
            <section className="py-10 sm:py-12 px-5 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                        {INFO_CARDS.map((c, i) => (
                            <Reveal key={c.label} delay={i * 0.08}>
                                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}
                                    className="bg-gradient-to-br from-lime-50 to-fresh-cream rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-center border border-lime-100 h-full flex flex-col items-center">
                                    <div className="mb-3 p-3 bg-white rounded-2xl shadow-sm">{c.icon}</div>
                                    <div className="text-[10px] sm:text-xs font-accent font-600 text-lime-700 uppercase tracking-widest mb-1">{c.label}</div>
                                    <div className="font-700 text-gray-900 text-xs sm:text-sm break-all">{c.value}</div>
                                    <div className="text-gray-400 text-[10px] sm:text-xs mt-0.5">{c.sub}</div>
                                </motion.div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Form Section ──────────────────────────────────── */}
            <section className="py-12 sm:py-16 px-5 bg-fresh-cream">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

                    {/* Sidebar */}
                    <Reveal className="lg:col-span-2 space-y-5 sm:space-y-6">
                        <div>
                            <h2 className="font-display text-2xl sm:text-3xl font-700 text-gray-900 mb-2 sm:mb-3">
                                Kirim Pesan
                            </h2>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Isi formulir di bawah dan tim kami akan menghubungi Anda dalam 1x24 jam kerja.
                            </p>
                        </div>

                        {/* Topic quick select */}
                        <div>
                            <p className="text-sm font-accent font-600 text-gray-700 mb-3">Pilih Topik:</p>
                            <div className="flex flex-wrap gap-2">
                                {TOPICS.map(t => (
                                    <button key={t.label} onClick={() => handleTopicSelect(t.label)}
                                        className={`text-xs px-3 py-1.5 rounded-full font-accent font-600 transition-all flex items-center ${
                                            selectedTopic === t.label
                                                ? 'bg-lime-400 text-gray-900'
                                                : 'bg-white text-gray-600 hover:bg-lime-50 border border-gray-100'
                                        }`}>
                                        {t.icon}
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Decorative */}
                        <div className="p-4 sm:p-5 bg-gradient-to-br from-sunny-300/30 to-lime-300/20 rounded-2xl sm:rounded-3xl border border-lime-100">
                            <div className="flex items-center gap-2 mb-1">
                                <p className="font-display text-base sm:text-lg font-700 text-gray-900">
                                    Distributor?
                                </p>
                                <Handshake size={20} className="text-lime-600" />
                            </div>
                            <p className="text-gray-500 text-sm">
                                Bergabunglah dengan jaringan distributor Sunny di seluruh Indonesia.
                                Hubungi kami via email kerjasama@sunnydishwash.com
                            </p>
                        </div>
                    </Reveal>

                    {/* Form */}
                    <Reveal delay={0.1} className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-white rounded-3xl sm:rounded-4xl p-8 sm:p-10 shadow-glass text-center flex flex-col items-center justify-center min-h-[360px] sm:min-h-[400px]"
                                >
                                    <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.5 }}
                                        className="mb-4 text-lime-500">
                                        <CheckCircle2 size={64} />
                                    </motion.div>
                                    <h3 className="font-display text-xl sm:text-2xl font-700 text-gray-900 mb-2">
                                        Pesan Terkirim!
                                    </h3>
                                    <p className="text-gray-500 text-sm sm:text-base mb-6">
                                        Terima kasih telah menghubungi Sunny. Tim kami akan membalas dalam 1x24 jam kerja.
                                    </p>
                                    <button onClick={() => setSubmitted(false)} className="btn-primary">
                                        Kirim Pesan Lagi
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form key="form" onSubmit={handleSubmit}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-8 shadow-glass space-y-4 sm:space-y-5"
                                >
                                    {/* Flash success */}
                                    {flash?.success && (
                                        <div className="p-4 bg-lime-50 border border-lime-200 rounded-2xl text-lime-700 text-sm flex items-center gap-2">
                                            <CheckCircle2 size={16} /> {flash.success}
                                        </div>
                                    )}

                                    {/* Form Fields - Same as before */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="form-label">Nama Lengkap *</label>
                                            <motion.input whileFocus={{ scale: 1.01 }}
                                                type="text" value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                placeholder="Budi Santoso"
                                                className={`form-input ${errors.name ? 'border-red-300 ring-1 ring-red-200' : ''}`}
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="form-label">Email *</label>
                                            <motion.input whileFocus={{ scale: 1.01 }}
                                                type="email" value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                placeholder="budi@email.com"
                                                className={`form-input ${errors.email ? 'border-red-300 ring-1 ring-red-200' : ''}`}
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="form-label">Nomor Telepon</label>
                                        <motion.input whileFocus={{ scale: 1.01 }}
                                            type="tel" value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            placeholder="+62 812 3456 7890"
                                            className="form-input"
                                        />
                                    </div>

                                    <div>
                                        <label className="form-label">Topik Pesan *</label>
                                        <motion.input whileFocus={{ scale: 1.01 }}
                                            type="text" value={data.topic}
                                            onChange={e => { setData('topic', e.target.value); setSelectedTopic(e.target.value); }}
                                            placeholder="Misal: Pertanyaan tentang produk Sunny Lemon"
                                            className={`form-input ${errors.topic ? 'border-red-300 ring-1 ring-red-200' : ''}`}
                                        />
                                        {errors.topic && <p className="text-red-500 text-xs mt-1">{errors.topic}</p>}
                                    </div>

                                    <div>
                                        <label className="form-label">Pesan *</label>
                                        <motion.textarea whileFocus={{ scale: 1.01 }}
                                            rows={5} value={data.message}
                                            onChange={e => setData('message', e.target.value)}
                                            placeholder="Tulis pesan Anda di sini..."
                                            className={`form-input resize-none ${errors.message ? 'border-red-300 ring-1 ring-red-200' : ''}`}
                                        />
                                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                                        <p className="text-gray-400 text-xs mt-1">{data.message.length}/1000 karakter</p>
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={processing}
                                        whileHover={!processing ? { scale: 1.02, y: -2 } : {}}
                                        whileTap={!processing ? { scale: 0.98 } : {}}
                                        className={`w-full btn-primary justify-center py-3.5 sm:py-4 text-sm sm:text-base ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                                </svg>
                                                Mengirim...
                                            </>
                                        ) : (
                                            <>
                                                Kirim Pesan
                                                <Send size={16} className="ml-2" />
                                            </>
                                        )}
                                    </motion.button>

                                    <p className="text-center text-xs text-gray-400">
                                        Dengan mengirim pesan, Anda menyetujui Kebijakan Privasi Sunny.
                                    </p>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </Reveal>
                </div>
            </section>

            {/* ── Google Maps ───────────────────────────────────── */}
            <section className="py-12 sm:py-16 px-5 bg-white">
                <div className="max-w-5xl mx-auto">
                    <Reveal className="text-center mb-6 sm:mb-8">
                        <div className="section-tag mx-auto mb-3 sm:mb-4">Lokasi Kami</div>
                        <h2 className="font-display text-2xl sm:text-3xl font-700 text-gray-900">
                            Temukan <span className="text-gradient-lime italic">Mitra Sunny</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="rounded-3xl sm:rounded-4xl overflow-hidden shadow-glass border border-lime-100">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d7918.417267562557!2d112.06180100000002!3d-7.101802!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMDYnMDYuNSJTIDExMsKwMDMnNTEuOCJF!5e0!3m2!1sid!2sid!4v1777857722200!5m2!1sid!2sid"
                                width="100%"
                                height="300"
                                style={{ border: 0, display: 'block' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Lokasi Kantor Sunny"
                                className="sm:h-[420px]"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mt-4 px-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <MapPin size={18} className="text-lime-600" />
                                <span>Kabupaten Bojonegoro, Jawa Timur 62193</span>
                            </div>
                            <a
                                href="https://www.google.com/maps/dir/?api=1&destination=-7.101802,112.061801"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary text-sm w-full sm:w-auto justify-center"
                            >
                                Petunjuk Arah
                                <Send size={16} className="ml-2" />
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>
        </MainLayout>
    );
}
