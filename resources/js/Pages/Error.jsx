import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import MainLayout from '../Layouts/MainLayout';

export default function Error({ status = 404 }) {
    const messages = {
        404: { title: 'Halaman Tidak Ditemukan', desc: 'Oops! Sepertinya halaman yang Anda cari sudah pergi mencuci piring. 🍽️', emoji: '🔍' },
        403: { title: 'Akses Ditolak', desc: 'Anda tidak memiliki izin untuk mengakses halaman ini.', emoji: '🚫' },
        500: { title: 'Kesalahan Server', desc: 'Ada yang tidak beres di server kami. Tim kami sedang memperbaikinya!', emoji: '⚙️' },
        503: { title: 'Sedang Dalam Pemeliharaan', desc: 'Kami sedang melakukan pembaruan. Segera kembali!', emoji: '🛠️' },
    };

    const { title, desc, emoji } = messages[status] || messages[404];

    return (
        <MainLayout>
            <Head title={`${status} – ${title}`} />
            <section className="min-h-[70vh] flex items-center justify-center px-4 bg-gradient-to-br from-lime-50 to-fresh-cream">
                <div className="text-center max-w-lg">
                    <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="text-8xl mb-6">{emoji}
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}>
                        <h1 className="font-display text-7xl font-800 text-gradient-lime mb-2">{status}</h1>
                        <h2 className="font-display text-2xl font-700 text-gray-900 mb-4">{title}</h2>
                        <p className="text-gray-500 mb-8">{desc}</p>
                        <div className="flex gap-3 justify-center">
                            <Link href="/" className="btn-primary">Kembali ke Beranda</Link>
                            <Link href="/produk" className="btn-outline">Lihat Produk</Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </MainLayout>
    );
}
