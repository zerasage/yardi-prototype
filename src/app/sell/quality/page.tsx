"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GradeBadge } from "@/components/ui/grade-badge";
import { FabricSwatch } from "@/components/fabric-swatch";
import { useApp } from "@/lib/store";

const STEPS = ["Macro shot", "Weight", "Fibre", "Selvedge", "Result"];

export default function QualityPage() {
  const [step, setStep] = useState(0);
  const [grams, setGrams] = useState("118");
  const router = useRouter();
  const { toast } = useApp();
  const gsm = Math.round((Number(grams) || 118) / 0.91);

  return (
    <div className="px-4 pb-8 pt-3">
      <div className="mb-4 flex gap-1">
        {STEPS.map((s, i) => (
          <span key={s} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-brass-500" : "bg-line-200"}`} />
        ))}
      </div>
      <p className="text-[11px] font-bold uppercase tracking-wide text-brass-700">
        Step {step + 1} · {STEPS[step]}
      </p>

      {step === 0 && (
        <Block
          title="Place the Yardi card on the cloth"
          body="A macro shot against the reference card lets us estimate weave density. This is an estimate, not a laboratory count."
        >
          <FabricSwatch
            seed="quality-macro"
            fabricType="ankara"
            base="#0F5C43"
            accent="#D9A441"
            className="h-48 rounded-card"
            rounded
          />
          <p className="mt-2 text-[12px] font-semibold text-signal-green">
            Weave estimate: ~92 TPI · confidence high
          </p>
        </Block>
      )}

      {step === 1 && (
        <Block
          title="Weigh a measured cut"
          body="Enter the grams of a 1-yard cut. We compute GSM from that."
        >
          <input
            value={grams}
            onChange={(e) => setGrams(e.target.value)}
            className="h-14 w-full rounded-xl bg-cream-100 text-center text-2xl font-extrabold ring-1 ring-line-200"
          />
          <p className="mt-2 text-center text-[13px] font-semibold">
            Computed weight · <span className="tnum">{gsm} GSM</span>
          </p>
        </Block>
      )}

      {step === 2 && (
        <Block title="Declare fibre and market tier" body="Pick what it actually is. Misdeclaration loses the grade.">
          <select className="h-11 w-full rounded-xl bg-cream-100 px-3 font-semibold ring-1 ring-line-200">
            <option>100% cotton</option>
            <option>Cotton-polyester blend</option>
            <option>Silk-cotton</option>
          </select>
          <select className="mt-2 h-11 w-full rounded-xl bg-cream-100 px-3 font-semibold ring-1 ring-line-200">
            <option>Wax Hollandais</option>
            <option>Fancy print</option>
            <option>African wax</option>
            <option>Super Wax</option>
          </select>
        </Block>
      )}

      {step === 3 && (
        <Block title="Photograph the selvedge and both faces" body="Stamped selvedge and identical printing on both faces are how the trade authenticates wax.">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-card bg-cream-100 p-6 text-center text-[12px] font-semibold ring-1 ring-dashed ring-line-200">
              Selvedge
            </div>
            <div className="rounded-card bg-cream-100 p-6 text-center text-[12px] font-semibold ring-1 ring-dashed ring-line-200">
              Reverse face
            </div>
          </div>
        </Block>
      )}

      {step === 4 && (
        <div className="rounded-card bg-indigo-900 p-5 text-center text-cream-50">
          <GradeBadge letter="A" size="lg" />
          <p className="mt-3 text-2xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
            Proposed Grade A
          </p>
          <p className="tnum text-brass-500">Score 88 / 100</p>
          <p className="mt-2 text-[13px] leading-relaxed text-cream-100/75">
            Combination of camera estimate, your declaration, and your track record. A Yardi reviewer confirms before the badge goes live.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          if (step < 4) setStep(step + 1);
          else {
            toast({ title: "Submitted for verification", detail: "Grade pending", tone: "brass" });
            router.push("/sell");
          }
        }}
        className="mt-5 w-full rounded-xl bg-indigo-700 py-3.5 text-sm font-bold text-cream-50"
      >
        {step < 4 ? "Continue" : "Submit for verification"}
      </button>
    </div>
  );
}

function Block({ title, body, children }: { title: string; body: string; children: React.ReactNode }) {
  return (
    <div className="mt-2">
      <h2 className="text-lg font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h2>
      <p className="mt-1 text-[13px] leading-relaxed text-ink-500">{body}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}
