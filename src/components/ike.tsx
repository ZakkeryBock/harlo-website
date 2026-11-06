/**
 * A short exchange with Ike: one document it read, one question about the week.
 * Shows the propose-then-approve flow; nothing in it is clickable.
 */
export function IkeChat() {
  return (
    <div
      className="rounded-2xl border border-pine-3 bg-pine-2 p-4 sm:p-6"
      role="img"
      aria-label="Example conversation. A dispatcher uploads a proof of delivery and Ike reports two pallets short, offering to attach it to the load and note the shortage. Then Ike answers how many loads are running this week."
    >
      <div aria-hidden="true" className="grid gap-4 text-[0.9375rem]">
        <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-pine-3 px-4 py-3 text-on-pine">
          <p className="flex items-center gap-2 text-xs text-on-pine-muted">
            <span className="rounded bg-pine px-1.5 py-0.5 font-bold text-cream">PDF</span>
            POD_NL-88412.pdf
          </p>
          <p className="mt-1.5">Here&apos;s the POD from Columbus.</p>
        </div>

        <div className="max-w-[92%]">
          <p className="mb-1.5 text-xs font-semibold text-rust-light">Ike</p>
          <div className="rounded-xl rounded-bl-sm bg-paper px-4 py-3 text-ink">
            <p>
              Signed by J. Patel at 9:20 AM Friday. The receiver wrote <strong>2 pallets short</strong>{" "}
              against 24 on the BOL.
            </p>
            <p className="mt-2">Want me to attach it to load NL-88412 and add the shortage to the notes?</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-md bg-rust-ink px-3 py-1.5 text-sm font-semibold text-white">
                Attach and add note
              </span>
              <span className="rounded-md border border-line px-3 py-1.5 text-sm font-semibold text-ink">
                Let me check it
              </span>
            </div>
          </div>
        </div>

        <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-pine-3 px-4 py-3 text-on-pine">
          How many loads are we running this week?
        </div>

        <div className="max-w-[92%]">
          <p className="mb-1.5 text-xs font-semibold text-rust-light">Ike</p>
          <div className="rounded-xl rounded-bl-sm bg-paper px-4 py-3 text-ink">
            14 this week. 9 delivered, 4 in transit and 1 still waiting on a driver.
          </div>
        </div>
      </div>
    </div>
  );
}
