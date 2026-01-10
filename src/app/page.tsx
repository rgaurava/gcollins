'use client'

import Link from 'next/link'
import { Diamond, Watch, Gem, Wrench, Users, ShoppingBag } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f5]">
      {/* Navigation */}
      <nav className="bg-[#435060] text-white">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm tracking-widest uppercase">
              Fine Jewellers Since 1985
            </div>
            <Link
              href="/login"
              className="text-sm tracking-widest uppercase hover:text-[#9f8762] transition-colors"
            >
              Staff Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          {/* Logo */}
          <div className="mb-12">
            <img
              src="/gcs/images/gcollins-logo.png"
              alt="G. Collins & Sons"
              className="mx-auto h-32 w-auto"
            />
          </div>

          {/* Tagline */}
          <h1 className="font-serif text-4xl md:text-5xl text-[#435060] mb-6 tracking-wide">
            Smart Platform
          </h1>
          <p className="text-xl text-[#666] max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            The complete business management solution for luxury jewellery retail.
            CRM, Inventory, Supply Chain & E-Commerce in one elegant platform.
          </p>

          {/* CTA Button */}
          <Link
            href="/login"
            className="inline-block bg-[#435060] text-white px-12 py-4 text-sm tracking-widest uppercase hover:bg-[#2d3a47] transition-colors"
          >
            Access Platform
          </Link>
        </div>

        {/* Decorative gold line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#9f8762] to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#f8f7f5]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-serif text-3xl text-[#435060] text-center mb-4 tracking-wide">
            Crafted for Excellence
          </h2>
          <p className="text-center text-[#666] mb-16 max-w-xl mx-auto">
            Every feature designed with the precision and care befitting the world&apos;s finest jewellers.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Customer Management */}
            <div className="bg-white p-10 text-center group hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-[#9f8762] rounded-full group-hover:bg-[#9f8762] transition-colors">
                <Users className="w-8 h-8 text-[#9f8762] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif text-xl text-[#435060] mb-3">Customer Relations</h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Build lasting relationships with detailed client profiles, purchase history, and personalised communications.
              </p>
            </div>

            {/* Inventory */}
            <div className="bg-white p-10 text-center group hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-[#9f8762] rounded-full group-hover:bg-[#9f8762] transition-colors">
                <Diamond className="w-8 h-8 text-[#9f8762] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif text-xl text-[#435060] mb-3">Inventory Management</h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Track every piece from loose stones to finished jewellery with complete provenance and certification.
              </p>
            </div>

            {/* Watches */}
            <div className="bg-white p-10 text-center group hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-[#9f8762] rounded-full group-hover:bg-[#9f8762] transition-colors">
                <Watch className="w-8 h-8 text-[#9f8762] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif text-xl text-[#435060] mb-3">Watch Collections</h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Dedicated management for prestigious timepieces including Patek Philippe and other fine watch brands.
              </p>
            </div>

            {/* Repairs */}
            <div className="bg-white p-10 text-center group hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-[#9f8762] rounded-full group-hover:bg-[#9f8762] transition-colors">
                <Wrench className="w-8 h-8 text-[#9f8762] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif text-xl text-[#435060] mb-3">Workshop & Repairs</h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Manage bespoke commissions, repairs, and servicing with full workflow tracking and client updates.
              </p>
            </div>

            {/* Supply Chain */}
            <div className="bg-white p-10 text-center group hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-[#9f8762] rounded-full group-hover:bg-[#9f8762] transition-colors">
                <Gem className="w-8 h-8 text-[#9f8762] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif text-xl text-[#435060] mb-3">Supply Chain</h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Vendor management, purchase orders, and sourcing for diamonds, gemstones, and precious metals.
              </p>
            </div>

            {/* E-Commerce */}
            <div className="bg-white p-10 text-center group hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-[#9f8762] rounded-full group-hover:bg-[#9f8762] transition-colors">
                <ShoppingBag className="w-8 h-8 text-[#9f8762] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif text-xl text-[#435060] mb-3">Orders & Sales</h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Seamless order processing, invoicing, and sales analytics for in-store and online transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl text-[#435060] mb-6 tracking-wide">
              A Heritage of Excellence
            </h2>
            <p className="text-[#666] leading-relaxed mb-8">
              G. Collins &amp; Sons has been synonymous with exceptional jewellery and timepieces since 1985.
              Our Tunbridge Wells showroom showcases the finest diamonds, coloured gemstones, and
              prestigious watch brands including Patek Philippe.
            </p>
            <p className="text-[#666] leading-relaxed mb-8">
              This Smart Platform brings the same commitment to excellence to our business operations,
              ensuring every client interaction, every piece of inventory, and every transaction
              receives the attention it deserves.
            </p>
            <div className="flex items-center justify-center gap-8 text-[#9f8762]">
              <div className="text-center">
                <div className="text-4xl font-serif">40+</div>
                <div className="text-xs uppercase tracking-widest text-[#666]">Years of Excellence</div>
              </div>
              <div className="w-px h-12 bg-[#9f8762]/30"></div>
              <div className="text-center">
                <div className="text-4xl font-serif">GIA</div>
                <div className="text-xs uppercase tracking-widest text-[#666]">Certified Diamonds</div>
              </div>
              <div className="w-px h-12 bg-[#9f8762]/30"></div>
              <div className="text-center">
                <div className="text-4xl font-serif">PP</div>
                <div className="text-xs uppercase tracking-widest text-[#666]">Authorised Retailer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Banner */}
      <section className="py-12 bg-[#435060]">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h3 className="text-white font-serif text-2xl mb-4">Demo Access</h3>
          <p className="text-white/80 mb-6">
            Experience the full platform with pre-configured demo credentials
          </p>
          <Link
            href="/login"
            className="inline-block bg-[#9f8762] text-white px-10 py-3 text-sm tracking-widest uppercase hover:bg-[#8a7555] transition-colors"
          >
            Enter Demo
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2d3a47] text-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src="/gcs/images/gc-griffin.png"
                alt="G. Collins & Sons"
                className="h-12 w-auto invert opacity-80"
              />
              <div>
                <div className="font-serif text-lg">G. Collins &amp; Sons</div>
                <div className="text-xs text-white/60 tracking-widest uppercase">Fine Jewellers</div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-sm text-white/60">
                Smart Platform v1.0
              </div>
              <div className="text-xs text-white/40 mt-1">
                Built by Justransform
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-xs text-white/40">
            2-3 London Road, Tunbridge Wells, Kent TN1 1DA | +44 (0)1892 522 602
          </div>
        </div>
      </footer>
    </div>
  )
}
