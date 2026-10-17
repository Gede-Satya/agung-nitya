/**
 * Single source of truth for maintenance data (DESIGN.md §4.1).
 * All items stay `confirmed: false` until the owner confirms the services.
 */

export type MaintenanceItem = {
  id: "layar" | "cooling" | "motherboard" | "baterai" | "sasis";
  order: 1 | 2 | 3 | 4 | 5;
  label: string;
  x: number; // leader point, % of image width
  y: number; // leader point, % of image height
  side: "left" | "right";
  services: string[]; // service claims
  summary: string; // neutral component description (not a service claim)
  duration?: string; // omit until confirmed
  confirmed: boolean; // false = draft, not yet approved by owner
};

export interface MaintenanceSectionContent {
  sectionId: string;
  eyebrow: string;
  title: string;
  unconfirmedNotice: string;
  closingCta: {
    label: string;
    href: string;
  };
  inquireActionLabel: string;
  items: MaintenanceItem[];
}

export const MAINTENANCE_CONTENT: MaintenanceSectionContent = {
  sectionId: "pemeliharaan",
  eyebrow: "Pemeliharaan & purnajual",
  title: "Dirancang untuk dirawat, bukan diganti.",
  unconfirmedNotice: "Layanan dikonfirmasi saat penawaran.",
  closingCta: {
    label: "Jadwalkan pemeliharaan",
    href: "/?tujuan=pemeliharaan#kontak",
  },
  inquireActionLabel: "Tanya layanan ini",
  items: [
    {
      id: "layar",
      order: 1,
      label: "Layar & panel display",
      x: 50,
      y: 22,
      side: "left",
      services: [
        "Pemeriksaan dead pixel dan backlight bleeding",
        "Penggantian panel LCD/IPS",
      ],
      summary: "Panel, backlight, dan kabel fleksibel layar.",
      confirmed: false,
    },
    {
      id: "cooling",
      order: 2,
      label: "Cooling fan & heat pipe",
      x: 40,
      y: 39,
      side: "left",
      services: [
        "Pembersihan sirip radiator dan blower",
        "Penggantian thermal paste",
      ],
      summary: "Kipas, heat pipe, dan jalur pendinginan prosesor.",
      confirmed: false,
    },
    {
      id: "motherboard",
      order: 3,
      label: "Motherboard (RAM & SSD)",
      x: 54,
      y: 52,
      side: "right",
      services: [
        "Upgrade RAM",
        "Penambahan atau penggantian SSD",
        "Diagnosa sirkuit daya",
      ],
      summary: "Papan utama, memori, dan media penyimpanan.",
      confirmed: false,
    },
    {
      id: "baterai",
      order: 4,
      label: "Baterai & modul daya",
      x: 46,
      y: 68,
      side: "left",
      services: [
        "Pengecekan kesehatan baterai",
        "Penggantian modul baterai",
      ],
      summary: "Sel baterai, konektor, dan modul pengisian daya.",
      confirmed: false,
    },
    {
      id: "sasis",
      order: 5,
      label: "Bottom cover & rangka sasis",
      x: 46,
      y: 83,
      side: "right",
      services: [
        "Penggantian casing bawah",
        "Perbaikan engsel",
      ],
      summary: "Casing bawah, engsel, dan rangka penopang.",
      confirmed: false,
    },
  ],
};

/**
 * Returns public service claims only if confirmed by owner.
 * If unconfirmed, returns empty array as per DESIGN.md §4.1 claim rules.
 */
export function getDisplayedServices(item: MaintenanceItem): string[] {
  return item.confirmed ? item.services : [];
}

