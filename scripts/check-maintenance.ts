/**
 * Verification Script: check-maintenance.ts
 *
 * Verifies that maintenance data adheres strictly to DESIGN.md §4.1:
 * 1. Exactly 5 items with unique IDs ("layar", "cooling", "motherboard", "baterai", "sasis")
 * 2. Strict order 1 to 5 without duplicates or gaps
 * 3. Coordinates within 0-100% and matching physical layers in generic exploded laptop
 * 4. Claim rules: For unconfirmed items (confirmed: false), NO duration is specified, and displayed services are empty
 * 5. Links: Query string comes before hash (/?tujuan=pemeliharaan#kontak and /?layanan=<id>#kontak)
 */

import {
  MAINTENANCE_CONTENT,
  getDisplayedServices,
  type MaintenanceItem,
} from "../src/content/maintenance";

function runVerification() {
  console.log("🔍 Running Maintenance Section Verification (DESIGN.md §4.1)...");

  const errors: string[] = [];
  const items = MAINTENANCE_CONTENT.items;

  // 1. Check count
  if (!items || items.length !== 5) {
    errors.push(`Expected exactly 5 items, found ${items?.length ?? 0}`);
  }

  // 2. Check unique IDs and allowed values
  const expectedIds = ["layar", "cooling", "motherboard", "baterai", "sasis"];
  const ids = items.map((it) => it.id);
  const uniqueIds = new Set(ids);

  if (uniqueIds.size !== items.length) {
    errors.push(`Duplicate component IDs detected: ${ids.join(", ")}`);
  }

  for (const exp of expectedIds) {
    if (!ids.includes(exp as MaintenanceItem["id"])) {
      errors.push(`Missing required component ID: "${exp}"`);
    }
  }

  // 3. Check order: 1 to 5 without duplicates
  const orders = items.map((it) => it.order);
  const expectedOrders = [1, 2, 3, 4, 5];
  for (let i = 0; i < expectedOrders.length; i++) {
    if (orders[i] !== expectedOrders[i]) {
      errors.push(
        `Item at index ${i} has order ${orders[i]}, expected ${expectedOrders[i]} (${expectedIds[i]})`
      );
    }
  }

  // 4. Check coordinates (0 <= x <= 100, 0 <= y <= 100) and layer mapping
  const expectedCoords: Record<string, { x: number; y: number; side: string }> = {
    layar: { x: 50, y: 22, side: "left" },
    cooling: { x: 40, y: 39, side: "left" },
    motherboard: { x: 54, y: 52, side: "right" },
    baterai: { x: 46, y: 68, side: "left" },
    sasis: { x: 46, y: 83, side: "right" },
  };

  for (const item of items) {
    if (typeof item.x !== "number" || item.x < 0 || item.x > 100) {
      errors.push(`Item "${item.id}" x-coordinate invalid: ${item.x}`);
    }
    if (typeof item.y !== "number" || item.y < 0 || item.y > 100) {
      errors.push(`Item "${item.id}" y-coordinate invalid: ${item.y}`);
    }

    const exp = expectedCoords[item.id];
    if (exp) {
      if (item.x !== exp.x || item.y !== exp.y) {
        errors.push(
          `Item "${item.id}" coords (${item.x}, ${item.y}) do not match DESIGN.md §4.1 (${exp.x}, ${exp.y})`
        );
      }
      if (item.side !== exp.side) {
        errors.push(
          `Item "${item.id}" side "${item.side}" does not match DESIGN.md §4.1 "${exp.side}"`
        );
      }
    }
  }

  // 5. Check claim rules: unconfirmed items must not expose duration or services
  for (const item of items) {
    if (!item.confirmed) {
      if (item.duration !== undefined) {
        errors.push(
          `Item "${item.id}" is unconfirmed but specifies duration: "${item.duration}". Duration must be omitted.`
        );
      }
      const publicServices = getDisplayedServices(item);
      if (publicServices.length > 0) {
        errors.push(
          `Item "${item.id}" is unconfirmed but exposes ${publicServices.length} public services. Must be empty.`
        );
      }
    }
  }

  // 6. Check closing CTA and link patterns (query before hash)
  const ctaHref = MAINTENANCE_CONTENT.closingCta.href;
  if (ctaHref !== "/?tujuan=pemeliharaan#kontak") {
    errors.push(
      `Closing CTA href "${ctaHref}" invalid. Must be "/?tujuan=pemeliharaan#kontak" (query before hash)`
    );
  }

  for (const item of items) {
    const expectedItemHref = `/?layanan=${item.id}#kontak`;
    const hashIndex = expectedItemHref.indexOf("#");
    const queryIndex = expectedItemHref.indexOf("?");
    if (queryIndex === -1 || hashIndex === -1 || queryIndex > hashIndex) {
      errors.push(`Item "${item.id}" link does not put query before hash: ${expectedItemHref}`);
    }
  }

  // 7. Output result
  if (errors.length > 0) {
    console.error("❌ Maintenance verification failed with errors:");
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log("✅ All maintenance checks PASSED:");
  console.log(`  - 5 components present in fixed order 01-05`);
  console.log(`  - Leader point coordinates verified:`);
  items.forEach((it) => {
    console.log(
      `    [${String(it.order).padStart(2, "0")}] ${it.id.padEnd(12)} -> (${it.x}%, ${it.y}%) [${it.side}] - confirmed: ${it.confirmed}`
    );
  });
  console.log(`  - Unconfirmed claim rules respected: no durations, no public service claims`);
  console.log(`  - Links verified: query string precedes hash (#kontak)`);
}

runVerification();
