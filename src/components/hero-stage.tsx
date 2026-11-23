import { OpsBoard } from "@/components/ops-board";

/**
 * The home hero's picture of "harmonize": the scattered things an operation
 * runs on today (a spreadsheet, a rate con PDF, a driver text, a missed call,
 * a forwarded email, a sticky note) drifting around the one live board.
 * Desktop only; on small screens the board stands alone. Under reduced motion
 * the scraps hold still. All names are made up.
 */

type Scrap = {
  key: string;
  pos: string;
  tilt: number;
  delay: number;
  tone?: "sticky";
  icon: React.ReactNode;
  kind: string;
  text: string;
};

const SCRAPS: Scrap[] = [
  {
    key: "sheet",
    pos: "-left-10 top-[4%]",
    tilt: -5,
    delay: 0,
    icon: <SheetIcon />,
    kind: "Spreadsheet",
    text: "loads_FINAL_v3.xlsx",
  },
  {
    key: "ratecon",
    pos: "-left-16 top-[40%]",
    tilt: 3,
    delay: 1.4,
    icon: <PdfIcon />,
    kind: "PDF",
    text: "RateCon_MidwestPaper.pdf",
  },
  {
    key: "call",
    pos: "-left-6 top-[74%]",
    tilt: -2,
    delay: 0.7,
    icon: <PhoneIcon />,
    kind: "Missed call (3)",
    text: "“Where's my truck?”",
  },
  {
    key: "text",
    pos: "-right-10 top-[10%]",
    tilt: 4,
    delay: 0.9,
    icon: <ChatIcon />,
    kind: "Text from Marcus",
    text: "At the dock. No one here.",
  },
  {
    key: "email",
    pos: "-right-16 top-[44%]",
    tilt: -3,
    delay: 2.1,
    icon: <MailIcon />,
    kind: "Inbox",
    text: "Fwd: Fwd: RE: updated COI",
  },
  {
    key: "sticky",
    pos: "-right-2 top-[72%]",
    tilt: 5,
    delay: 0.3,
    tone: "sticky",
    icon: null,
    kind: "",
    text: "Call Dana re: detention!!",
  },
];

export function HeroStage() {
  return (
    <div className="relative mx-auto max-w-[68rem]">
      {/* glow behind the board */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[12%] top-[8%] bottom-0 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_40%,rgb(202_107_68/0.22),transparent_70%)] blur-2xl"
      />

      <div className="relative z-10 mx-auto max-w-[44rem]">
        <OpsBoard />
      </div>

      <div aria-hidden="true" className="hidden xl:block">
        {SCRAPS.map((s) => (
          <div key={s.key} className={`absolute z-20 ${s.pos}`} style={{ rotate: `${s.tilt}deg` }}>
            <div className="hero-scrap" style={{ animationDelay: `${-s.delay}s` }}>
              {s.tone === "sticky" ? (
                <div className="w-44 bg-[#f6e7a8] px-4 pt-4 pb-6 font-semibold text-[0.9375rem] leading-snug text-ink shadow-[0_14px_30px_-14px_rgb(28_34_30/0.45)]">
                  {s.text}
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-xl border border-line bg-paper px-3.5 py-3 shadow-[0_14px_34px_-16px_rgb(28_34_30/0.4)]">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-mist">{s.icon}</span>
                  <span className="min-w-0">
                    <span className="block text-[0.6875rem] font-semibold tracking-wide text-muted uppercase">
                      {s.kind}
                    </span>
                    <span className="block whitespace-nowrap text-[0.8125rem] font-semibold text-ink">{s.text}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const ico = "size-[1.125rem]";

function SheetIcon() {
  return (
    <svg viewBox="0 0 20 20" className={`${ico} text-go`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="14" height="14" rx="2" />
      <path d="M3 8h14M3 12.5h14M8 3v14" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg viewBox="0 0 20 20" className={`${ico} text-stop`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 2.5h7l3.5 3.5v11.5H5z" strokeLinejoin="round" />
      <path d="M12 2.5V6h3.5M7.5 11h5M7.5 14h3.5" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" className={`${ico} text-stop`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path
        d="M6.5 3h-2A1.5 1.5 0 0 0 3 4.6C3.3 11 9 16.7 15.4 17a1.5 1.5 0 0 0 1.6-1.5v-2l-3.3-1.4-1.6 1.6a9 9 0 0 1-4.8-4.8l1.6-1.6z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 20 20" className={`${ico} text-ink`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3.5 4.5h13v9h-7l-4 3v-3h-2z" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" className={`${ico} text-warn`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
      <path d="M3 5.5l7 5.5 7-5.5" strokeLinejoin="round" />
    </svg>
  );
}
