<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- SEO -->
    <title inertia>{{ config('app.name', 'Sunny') }} – Sabun Cuci Piring Bersih & Segar</title>
    <meta name="description" content="Sunny – sabun cuci piring formula lemon & jeruk nipis, bersih sempurna, aroma segar alami.">
    <meta property="og:title" content="Sunny – Bersih Sempurna, Segar Sepanjang Hari">
    <meta property="og:description" content="Formula lemon & jeruk nipis untuk dapur yang selalu bersih dan segar.">
    <meta property="og:type" content="website">
    <meta name="theme-color" content="#AADF28">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">

    {{-- Font: 2 saja (bukan 3), weight minimal, display=swap non-blocking --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=DM+Sans:wght@400;500;600&display=swap">
    <link rel="stylesheet" media="print" onload="this.media='all'" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=DM+Sans:wght@400;500;600&display=swap">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=DM+Sans:wght@400;500;600&display=swap"></noscript>

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="font-body bg-fresh-cream antialiased">
    @inertia
</body>
</html>
