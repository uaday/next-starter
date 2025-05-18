import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <h1 className="text-2xl font-bold">Next.js App</h1>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container px-4 py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Welcome to Next.js App
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              A complete setup with Next.js App Router, React Query, Zustand, and shadcn/ui
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="https://github.com" target="_blank">
                <Button variant="outline" size="lg">
                  GitHub
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex items-center justify-center h-16 px-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Next.js App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
