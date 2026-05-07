<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Product;
use App\Models\Article;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedAdmin();
        $this->seedProducts();
        $this->seedArticles();
    }

    private function seedAdmin(): void
    {
        Admin::updateOrCreate(
            ['email' => 'admin@sunnydishwash.com'],
            [
                'name'     => 'Super Admin',
                'password' => Hash::make('sunny123'),
                'role'     => 'superadmin',
            ]
        );
        $this->command->info('Admin: admin@sunnydishwash.com / sunny123');
    }

    private function seedProducts(): void
    {
        $products = [
            ['name'=>'Sunny Jeruk Nipis','slug'=>'jeruk-nipis','tagline'=>'Kesegaran Citrus Alami','description'=>'Diformulasikan dengan ekstrak jeruk nipis asli Indonesia.','emoji'=>'🍈','color_config'=>['bg'=>'from-lime-50 to-green-50','badge'=>'bg-lime-100 text-lime-700','card'=>'from-lime-200 to-green-200','accent'=>'text-lime-600','btn'=>'from-lime-400 to-green-400','ring'=>'ring-lime-300'],'price_min'=>12500,'price_max'=>38000,'sizes'=>['250ml','500ml','800ml','1 Liter'],'benefits'=>['Memotong lemak 3x lebih cepat','Aroma citrus tahan lama','Kulit tangan tetap lembut'],'specs'=>[['label'=>'pH Level','value'=>'6.8–7.2'],['label'=>'Aroma','value'=>'Jeruk Nipis']],'is_active'=>true,'is_featured'=>true,'sort_order'=>1],
            ['name'=>'Sunny Lemon Segar','slug'=>'lemon-segar','tagline'=>'Aroma Lemon Premium','description'=>'Minyak esensial lemon impor berkualitas tinggi.','emoji'=>'🍋','color_config'=>['bg'=>'from-sunny-50 to-lime-50','badge'=>'bg-sunny-100 text-yellow-700','card'=>'from-sunny-200 to-lime-200','accent'=>'text-yellow-600','btn'=>'from-sunny-400 to-lime-400','ring'=>'ring-sunny-300'],'price_min'=>14000,'price_max'=>42000,'sizes'=>['250ml','500ml','800ml','1 Liter'],'benefits'=>['Brightening formula','Aroma lemon tahan lama','Hypoallergenic'],'specs'=>[['label'=>'pH Level','value'=>'6.5–7.0'],['label'=>'Aroma','value'=>'Lemon Premium']],'is_active'=>true,'is_featured'=>true,'sort_order'=>2],
            ['name'=>'Sunny Mint Herbal','slug'=>'mint-herbal','tagline'=>'Kesegaran Herbal Alami','description'=>'Mint segar dan ekstrak herbal pilihan.','emoji'=>'🌿','color_config'=>['bg'=>'from-cyan-50 to-teal-50','badge'=>'bg-cyan-100 text-teal-700','card'=>'from-cyan-200 to-teal-200','accent'=>'text-teal-600','btn'=>'from-cyan-400 to-teal-400','ring'=>'ring-teal-300'],'price_min'=>13500,'price_max'=>35000,'sizes'=>['250ml','500ml','800ml'],'benefits'=>['Sensasi mint mendinginkan','Anti-bakteri maksimal'],'specs'=>[['label'=>'pH Level','value'=>'7.0–7.5'],['label'=>'Aroma','value'=>'Mint Herbal']],'is_active'=>true,'is_featured'=>false,'sort_order'=>3],
        ];
        foreach ($products as $p) Product::updateOrCreate(['slug'=>$p['slug']], $p);
    }

    private function seedArticles(): void
    {
        $articles = [
            ['title'=>'7 Cara Mencuci Piring yang Benar','slug'=>'cara-mencuci-piring-yang-benar','excerpt'=>'Ikuti panduan lengkap ini untuk hasil terbaik.','content'=>'<p>Mencuci piring adalah rutinitas harian...</p><h2>1. Rendam Terlebih Dahulu</h2><p>Rendam dengan air hangat 5–10 menit.</p>','category'=>'Tips Bersih','emoji'=>'🍽️','color'=>'from-lime-100 to-green-100','read_time'=>'4 menit','author'=>'Tim Sunny','is_published'=>true,'is_featured'=>true,'published_at'=>Carbon::now()->subDays(3),'views'=>1248],
            ['title'=>'Manfaat Lemon untuk Dapur','slug'=>'manfaat-lemon-untuk-dapur','excerpt'=>'Temukan 12 manfaat luar biasa lemon untuk dapur.','content'=>'<p>Lemon memiliki kandungan asam sitrat tinggi...</p>','category'=>'Tips Bersih','emoji'=>'🍋','color'=>'from-sunny-100 to-lime-100','read_time'=>'5 menit','author'=>'Dr. Sari','is_published'=>true,'is_featured'=>true,'published_at'=>Carbon::now()->subDays(11),'views'=>867],
            ['title'=>'Tips Dapur Bersih Setiap Hari','slug'=>'tips-dapur-bersih-setiap-hari','excerpt'=>'Rutinitas sederhana untuk dapur selalu rapi.','content'=>'<p>Dapur yang bersih adalah dambaan setiap keluarga...</p>','category'=>'Tips Bersih','emoji'=>'✨','color'=>'from-cyan-50 to-teal-50','read_time'=>'3 menit','author'=>'Tim Sunny','is_published'=>true,'is_featured'=>false,'published_at'=>Carbon::now()->subDays(16),'views'=>542],
            ['title'=>'Bahaya Piring Tidak Dicuci Bersih','slug'=>'bahaya-cuci-piring-tidak-bersih','excerpt'=>'Sisa lemak bisa menjadi sarang bakteri.','content'=>'<p>Bakteri dapat berkembang biak cepat...</p>','category'=>'Kesehatan','emoji'=>'🦠','color'=>'from-red-50 to-orange-50','read_time'=>'6 menit','author'=>'Dr. Andi','is_published'=>true,'is_featured'=>false,'published_at'=>Carbon::now()->subDays(21),'views'=>389],
            ['title'=>'Sabun Cuci Ramah Lingkungan','slug'=>'sabun-cuci-ramah-lingkungan','excerpt'=>'Cara memilih sabun yang aman untuk keluarga dan bumi.','content'=>'<p>Pemilihan sabun sangat penting...</p>','category'=>'Lingkungan','emoji'=>'🌍','color'=>'from-green-50 to-emerald-50','read_time'=>'4 menit','author'=>'Tim Sunny','is_published'=>true,'is_featured'=>false,'published_at'=>Carbon::now()->subDays(26),'views'=>231],
            ['title'=>'Resep Masakan Sehat untuk Dapur Bersih','slug'=>'resep-dapur-sehat','excerpt'=>'Dapur bersih adalah awal masakan sehat.','content'=>'<p>Kebersihan dapur mempengaruhi kualitas masakan...</p>','category'=>'Resep','emoji'=>'🥗','color'=>'from-lime-50 to-sunny-50','read_time'=>'8 menit','author'=>'Chef Rahayu','is_published'=>false,'is_featured'=>false,'published_at'=>null,'views'=>0],
        ];
        foreach ($articles as $a) Article::updateOrCreate(['slug'=>$a['slug']], $a);
    }
}
