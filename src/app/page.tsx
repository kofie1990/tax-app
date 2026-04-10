import { Navbar } from "@/components/layout/Navbar";
import { TaxDashboard } from "@/components/tax-calculator/TaxDashboard";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-start pb-32">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-20">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-atelier-accent/5 rounded-full blur-[120px] mix-blend-screen opacity-50 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[1000px] h-[1000px] bg-white/5 rounded-full blur-[150px] mix-blend-screen opacity-30 -translate-x-1/4 translate-y-1/3" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-48 pb-32 flex flex-col items-center text-center relative z-10" id="hero">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-atelier-light/10 text-xs font-medium tracking-wide uppercase text-atelier-light/80">
          <span className="w-2 h-2 rounded-full bg-atelier-accent animate-pulse" />
          Updated for 2025 GRA Regulations
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-[7rem] leading-[1.05] font-light tracking-tighter mb-8 max-w-5xl">
          Ghana <span className="text-atelier-accent italic pr-2 font-serif">Tax Calculator.</span><br />
          Plan with <span className="text-atelier-light/50">confidence.</span>
        </h1>

        <p className="text-lg md:text-xl text-atelier-light/60 max-w-2xl font-light mb-16 leading-relaxed">
          A comprehensive and accurate salary calculator for employees.
          Discover your exact net income, PAYE tax, and SSNIT contributions instantly.
        </p>
      </section>

      {/* Calculator Section */}
      <section className="w-full px-6 relative z-10" id="calculator">
        <TaxDashboard />
      </section>

      {/* Details Section */}
      <section className="w-full max-w-6xl mx-auto px-6 pt-40 pb-20 grid grid-cols-1 md:grid-cols-2 gap-16 text-left relative z-10" id="bands">
        <div className="space-y-6">
          <h3 className="text-3xl font-light tracking-tight mb-4 text-atelier-accent font-serif italic">How the system works</h3>
          <p className="text-atelier-light/60 font-light leading-relaxed">
            Ghana operates a progressive tax system where higher earners pay higher rates.
            The system incorporates mandatory deductions including Tier 1 (SSNIT) and Tier 2 occupational pensions.
            Our calculator applies the newly approved 2025 GRA bands to provide exact figures.
          </p>
          <ul className="space-y-3 pt-4 border-t border-atelier-light/10 list-inside text-sm font-light text-atelier-light/70">
            <li><span className="text-atelier-light font-medium mr-2">First GH₵ 494:</span> 0% Tax Free</li>
            <li><span className="text-atelier-light font-medium mr-2">Next GH₵ 110:</span> 5%</li>
            <li><span className="text-atelier-light font-medium mr-2">Next GH₵ 130:</span> 10%</li>
            <li><span className="text-atelier-light font-medium mr-2">Next GH₵ 3,167:</span> 17.5%</li>
            <li><span className="text-atelier-light font-medium mr-2">Next GH₵ 356:</span> 25%</li>
            <li><span className="text-atelier-light font-medium mr-2">Exceeding GH₵ 4,257:</span> 30%</li>
          </ul>
        </div>

        <div className="space-y-6 glass-card p-10 rounded-3xl h-fit">
          <h3 className="text-xl font-medium tracking-tight mb-2">Maximize your take-home</h3>
          <p className="text-atelier-light/60 font-light text-sm leading-relaxed mb-6">
            Optimise your tax efficiency by claiming eligible reliefs such as child education,
            dependent spouse, and life insurance premiums. Voluntary Tier 3 contributions
            also provide substantial tax benefits.
          </p>
          <div className="w-full h-[1px] bg-atelier-light/10 mb-6" />
          <p className="text-xs text-atelier-light/40 uppercase tracking-widest font-medium">100% Secure & Local Calculation</p>
        </div>
      </section>
    </main>
  );
}
