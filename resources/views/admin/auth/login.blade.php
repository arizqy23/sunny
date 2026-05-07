<!DOCTYPE html>
<html lang="id" class="h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login — Sunny Admin</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@1,700&display=swap" rel="stylesheet">
    @vite(['resources/css/admin.css'])
</head>
<body class="h-full bg-gray-950 font-jakarta antialiased flex items-center justify-center p-4">

{{-- Background pattern --}}
<div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute -top-40 -right-40 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-sunny-400/10 rounded-full blur-3xl"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-400/5 rounded-full blur-3xl"></div>
</div>

<div class="relative z-10 w-full max-w-md">
    {{-- Logo --}}
    <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sunny-400 to-lime-500 rounded-2xl shadow-2xl shadow-lime-500/30 mb-4">
            <span class="text-3xl">☀️</span>
        </div>
        <h1 class="text-white font-bold text-2xl">Sunny Admin</h1>
        <p class="text-gray-500 text-sm mt-1">Masuk ke panel manajemen</p>
    </div>

    {{-- Card --}}
    <div class="bg-gray-900/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 shadow-2xl">

        @if($errors->any())
        <div class="mb-5 flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <span class="text-red-400 text-lg flex-shrink-0">⚠️</span>
            <p class="text-red-400 text-sm">{{ $errors->first() }}</p>
        </div>
        @endif

        <form method="POST" action="{{ route('admin.login.post') }}" class="space-y-5">
            @csrf

            {{-- Email --}}
            <div>
                <label class="block text-gray-300 text-sm font-semibold mb-2">Email</label>
                <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">✉️</span>
                    <input type="email" name="email" value="{{ old('email') }}" required autofocus
                        placeholder="admin@sunnydishwash.com"
                        class="w-full pl-10 pr-4 py-3.5 bg-gray-800/60 border border-white/[0.08] rounded-2xl text-white placeholder-gray-600 text-sm
                            focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500/50 transition-all duration-200">
                </div>
            </div>

            {{-- Password --}}
            <div>
                <label class="block text-gray-300 text-sm font-semibold mb-2">Password</label>
                <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔒</span>
                    <input type="password" name="password" required
                        placeholder="••••••••"
                        class="w-full pl-10 pr-4 py-3.5 bg-gray-800/60 border border-white/[0.08] rounded-2xl text-white placeholder-gray-600 text-sm
                            focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500/50 transition-all duration-200">
                </div>
            </div>

            {{-- Remember --}}
            <div class="flex items-center justify-between">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="remember"
                        class="w-4 h-4 rounded border-gray-600 bg-gray-800 text-lime-500 focus:ring-lime-500/30 focus:ring-offset-0">
                    <span class="text-gray-400 text-sm">Ingat saya</span>
                </label>
            </div>

            {{-- Submit --}}
            <button type="submit"
                class="w-full py-3.5 bg-gradient-to-r from-lime-500 to-lime-400 text-gray-900 font-bold text-sm rounded-2xl
                    hover:from-lime-400 hover:to-sunny-400 transition-all duration-300 shadow-lg shadow-lime-500/25
                    hover:shadow-lime-500/40 hover:-translate-y-0.5 active:translate-y-0">
                Masuk ke Dashboard →
            </button>
        </form>
    </div>

    {{-- Footer --}}
    <p class="text-center text-gray-700 text-xs mt-6">
        © {{ date('Y') }} PT Sunny Nusantara. Hak cipta dilindungi.
    </p>
</div>
</body>
</html>
