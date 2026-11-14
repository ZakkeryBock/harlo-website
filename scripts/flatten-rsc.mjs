// Next 16's static export writes the client-navigation payloads of dynamic
// routes as nested folders (__next.reference/$d$resource.txt) but the browser
// asks for dotted names (__next.reference.$d$resource.txt), so every prefetch
// 404s. This copies each nested payload to the dotted name it's fetched by.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

let n = 0;
function flatten(dir, base, parts) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) flatten(p, base, [...parts, e]);
    else if (e.endsWith(".txt")) {
      const target = join(base, [...parts, e].join("."));
      if (!existsSync(target)) { copyFileSync(p, target); n++; }
    }
  }
}
function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (!statSync(p).isDirectory()) continue;
    if (e.startsWith("__next.")) flatten(p, dir, [e]);
    else if (e !== "_next") walk(p);
  }
}
walk("out");
console.log(`flatten-rsc: ${n} payloads`);
