import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-[70vh] grid place-items-center">
            <div className="card max-w-lg w-full p-8 text-center space-y-6">
                <div className="text-6xl font-extrabold tracking-tight text-primary">404</div>
                <p className="text-muted">Aradığın sayfayı bulamadık.</p>

                <div className="flex items-center justify-center gap-3">
                    <Link href="/" className="btn-primary px-5 py-3 rounded-lg border border-border hover:bg-surface transition">
                        Anasayfaya dön
                    </Link>
                    <Link href="/#projects" className="px-5 py-3 rounded-lg border border-border hover:bg-surface transition">
                        Projelere git
                    </Link>
                </div>
            </div>
        </main>
    );
}
