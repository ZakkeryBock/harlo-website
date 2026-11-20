/**
 * The facts every legal page states about Harlo.
 *
 * Kept in one file because a privacy policy and a terms of service that
 * disagree about who the company is are worse than either one alone.
 *
 * These are published. Changing the entity, address, or governing state
 * changes what the policies legally say — treat an edit here as an edit to
 * both documents.
 */

export const COMPANY = "Harlo Solutions";

export const LEGAL_ENTITY = "Harlo Solutions LLC";

/** Registered business address; notices are served here. */
export const ADDRESS = "8034 46 St, Lyons, IL 60534";

export const SUPPORT_EMAIL = "support@goharlo.com";

/** Privacy requests share the support mailbox — one inbox that is actually read. */
export const PRIVACY_EMAIL = SUPPORT_EMAIL;

/** Legal notices, arbitration demands, opt-outs. Same inbox for now. */
export const LEGAL_EMAIL = SUPPORT_EMAIL;

export const GOVERNING_STATE = "Illinois";

/** County whose courts hear anything the arbitration clause carves out. */
export const GOVERNING_VENUE = "Cook County, Illinois";

/** Shown on each policy. Update when the text materially changes. */
export const EFFECTIVE_DATE = "November 20, 2026";
