"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateTax, TaxCalculationResult } from "@/lib/tax-calculator";

export function TaxDashboard() {
  const [basicIncome, setBasicIncome] = useState<string>("");
  const [allowances, setAllowances] = useState<string>("");
  const [reliefs, setReliefs] = useState<string>("");
  const [bonus, setBonus] = useState<string>("");
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false);

  const hasSSNIT = true;

  const numBasic = parseFloat(basicIncome) || 0;
  const numAllowances = parseFloat(allowances) || 0;
  const numReliefs = parseFloat(reliefs) || 0;
  const numBonus = parseFloat(bonus) || 0;

  const results: TaxCalculationResult = calculateTax(
    numBasic, // gross is just the basic part, allowances are added automatically within calculateTax
    numBasic,
    numAllowances,
    numReliefs,
    hasSSNIT,
    numBonus
  );

  const totalGross = numBasic + numAllowances + numBonus;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(val);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center relative z-10 text-left">
      <div className="w-full mb-12 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4 text-atelier-accent font-serif italic">Calculate Your Net Income and Tax Deductions</h2>
        <p className="text-atelier-light/60 font-light text-lg">
          Enter your salary details to see your take-home income, PAYE tax, and SSNIT contributions.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Input Form Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-3xl p-8"
        >
          <h3 className="text-xl font-medium tracking-tight mb-6">Salary Information</h3>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-atelier-light/80">Monthly basic income</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-atelier-light/50 font-mono">GH₵</span>
                <input
                  type="number"
                  value={basicIncome}
                  onChange={(e) => setBasicIncome(e.target.value)}
                  placeholder="0"
                  className="w-full bg-atelier-dark/50 border border-atelier-light/10 rounded-xl pl-14 pr-4 py-3 text-atelier-light placeholder:text-atelier-light/30 focus:outline-none focus:ring-2 focus:ring-atelier-accent/50 transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-atelier-light/80 flex items-center gap-1">
                Monthly allowances*
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-atelier-light/50 font-mono">GH₵</span>
                <input
                  type="number"
                  value={allowances}
                  onChange={(e) => setAllowances(e.target.value)}
                  placeholder="0"
                  className="w-full bg-atelier-dark/50 border border-atelier-light/10 rounded-xl pl-14 pr-4 py-3 text-atelier-light placeholder:text-atelier-light/30 focus:outline-none focus:ring-2 focus:ring-atelier-accent/50 transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-atelier-light/80">Bonus</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-atelier-light/50 font-mono">GH₵</span>
                <input
                  type="number"
                  value={bonus}
                  onChange={(e) => setBonus(e.target.value)}
                  placeholder="0"
                  className="w-full bg-atelier-dark/50 border border-atelier-light/10 rounded-xl pl-14 pr-4 py-3 text-atelier-light placeholder:text-atelier-light/30 focus:outline-none focus:ring-2 focus:ring-atelier-accent/50 transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-atelier-light/80">Tax relief</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-atelier-light/50 font-mono">GH₵</span>
                <input
                  type="number"
                  value={reliefs}
                  onChange={(e) => setReliefs(e.target.value)}
                  placeholder="0"
                  className="w-full bg-atelier-dark/50 border border-atelier-light/10 rounded-xl pl-14 pr-4 py-3 text-atelier-light placeholder:text-atelier-light/30 focus:outline-none focus:ring-2 focus:ring-atelier-accent/50 transition-all font-mono"
                />
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs text-atelier-light/50">* Allowances are also taxed</p>
            </div>
          </div>
        </motion.div>

        {/* Results Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-atelier-accent/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>

            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-medium text-atelier-light/60 uppercase tracking-widest mb-2">Net Income (take home after SSNIT and tax)</h3>
                <div className="text-4xl md:text-5xl font-light tracking-tight text-atelier-accent">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={results.netSalary}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="inline-block"
                    >
                      {formatCurrency(results.netSalary)}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              <div className="w-full h-[1px] bg-atelier-light/10" />

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-atelier-light/80">Income Tax</p>
                  <p className="text-lg font-medium text-red-400/80">{formatCurrency(results.payeTax)}</p>
                </div>
                {results.bonusTax > 0 && (
                  <div className="flex justify-between items-center">
                    <p className="text-atelier-light/80">Bonus Tax</p>
                    <p className="text-lg font-medium text-red-400/80">{formatCurrency(results.bonusTax)}</p>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <p className="text-atelier-light/80">SSNIT (Tier 1, (5.5%))</p>
                  <p className="text-lg font-medium text-red-400/80">{formatCurrency(results.employeeSSNIT)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-atelier-light/80">Pension (Tier 2, (13%))</p>
                    <p className="text-xs text-atelier-light/50">(not deducted from take home)</p>
                  </div>
                  <p className="text-lg font-medium">{formatCurrency(results.tier2Employer)}</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full py-4 glass border border-atelier-light/10 hover:border-atelier-light/30 transition-colors rounded-2xl text-atelier-light font-medium flex justify-center items-center gap-2"
          >
            {showBreakdown ? 'Hide tax breakdown' : 'Show tax breakdown'}
            <svg
              className={`w-4 h-4 transition-transform ${showBreakdown ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <AnimatePresence>
            {showBreakdown && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="glass-card rounded-2xl p-6 mt-4 space-y-6">
                  <div>
                    <h4 className="font-medium text-lg text-atelier-light">Tax Breakdown</h4>
                    <p className="text-sm text-atelier-light/60">See how your monthly salary tax is calculated.</p>
                  </div>

                  <div className="space-y-4 text-sm border-t border-atelier-light/10 pt-4">
                    <div className="flex justify-between">
                      <span className="text-atelier-light/60">Gross Income</span>
                      <span className="font-mono">{formatCurrency(totalGross)}</span>
                    </div>

                    {/* Visualization */}
                    {totalGross > 0 && (
                      <div className="py-2">
                        <div className="w-full h-3 flex rounded-full overflow-hidden bg-atelier-dark/50 border border-atelier-light/5">
                          <div
                            style={{ width: `${(results.netSalary / totalGross) * 100}%` }}
                            className="bg-atelier-accent transition-all duration-1000"
                            title="Net Salary"
                          />
                          <div
                            style={{ width: `${(results.payeTax / totalGross) * 100}%` }}
                            className="bg-red-400 transition-all duration-1000"
                            title="PAYE Tax"
                          />
                          <div
                            style={{ width: `${(results.employeeSSNIT / totalGross) * 100}%` }}
                            className="bg-orange-400 transition-all duration-1000"
                            title="SSNIT"
                          />
                        </div>
                        <div className="flex gap-4 text-[11px] mt-2 text-atelier-light/60">
                          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-atelier-accent"></span>Net ({((results.netSalary / totalGross) * 100).toFixed(1)}%)</div>
                          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400"></span>Tax ({((results.payeTax / totalGross) * 100).toFixed(1)}%)</div>
                          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-400"></span>SSNIT ({((results.employeeSSNIT / totalGross) * 100).toFixed(1)}%)</div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-atelier-light/60">SSNIT (Tier 1, 5.5%)</span>
                      <span className="font-mono text-red-400">-{formatCurrency(results.employeeSSNIT)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-atelier-light/60">Tax Relief</span>
                      <span className="font-mono text-red-400">-{formatCurrency(numReliefs)}</span>
                    </div>
                    {results.bonusTax > 0 && (
                      <div className="flex justify-between">
                        <span className="text-atelier-light/60">Bonus Tax (5% on excessive bonus)</span>
                        <span className="font-mono text-red-400">-{formatCurrency(results.bonusTax)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-atelier-light/10 pt-3">
                      <span className="text-atelier-light/80 font-medium">Taxable Income (for PAYE)</span>
                      <span className="font-medium font-mono">{formatCurrency(results.taxableIncome)}</span>
                    </div>
                    <div className="flex justify-between border-b border-atelier-light/10 pb-4">
                      <span className="text-atelier-light/60">Pension (Tier 2, 5%)</span>
                      <span className="font-mono text-atelier-accent">{formatCurrency(results.tier2Employer)}</span>
                    </div>

                    <div className="pt-2">
                      <p className="text-atelier-light/80 font-medium mb-3">Tax Band Application:</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-atelier-light/50 tracking-wider mb-2">
                          <span>Band</span>
                          <span>Amount</span>
                        </div>
                        {results.taxBands && results.taxBands.length > 0 ? (
                          results.taxBands.map((band, idx) => (
                            <div key={idx} className="flex justify-between items-center text-atelier-light/80 border-b border-atelier-light/5 pb-2 last:border-0 last:pb-0">
                              <span className="text-[13px]">{band.name}</span>
                              <span className="font-mono text-xs text-red-400">{formatCurrency(band.amount)}</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-xs text-atelier-light/50 py-2">No tax applicable.</div>
                        )}
                        <div className="flex justify-between text-atelier-light border-t border-atelier-light/20 pt-2 mt-2 font-medium">
                          <span>Total PAYE Tax</span>
                          <span className="font-mono text-red-400">{formatCurrency(results.payeTax)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-atelier-light/10">
                    <button
                      onClick={() => {
                        window.print();
                      }}
                      className="flex-1 py-3 px-4 glass hover:bg-white/5 transition-colors rounded-xl text-sm font-medium flex justify-center items-center gap-2 border border-atelier-light/10"
                    >
                      Download PDF
                    </button>
                    <button
                      onClick={() => setShowBreakdown(false)}
                      className="flex-1 py-3 px-4 glass hover:bg-white/5 transition-colors rounded-xl text-sm font-medium flex justify-center items-center border border-atelier-light/10"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <p className="text-xs text-atelier-light/40 text-center mt-6 italic">
            *Disclaimer: Results are provided for indicative purposes only. They do not replace professional tax accounting or payroll services.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

