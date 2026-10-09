export type ModuleGroup = "klinis" | "penunjang" | "administrasi";

export interface HospitalModule {
  id: string;
  name: string;
  nameEn: string;
  group: ModuleGroup;
  groupLabel: string;
  description: string;
  glyph:
    | "registration"
    | "outpatient"
    | "inpatient"
    | "pharmacy"
    | "laboratory"
    | "radiology"
    | "emr"
    | "billing"
    | "logistics";
  index: number;
}

export const MODULE_GROUPS: Record<
  ModuleGroup,
  { label: string; count: number; description: string }
> = {
  administrasi: {
    label: "Administrasi & Finansial",
    count: 3,
    description: "Alur pendaftaran, tagihan, asuransi, dan manajemen logistik terpadu.",
  },
  klinis: {
    label: "Pelayanan Klinis",
    count: 3,
    description: "Rekam medis elektronik, poli rawat jalan, dan rawat inap satu rekonsiliasi.",
  },
  penunjang: {
    label: "Penunjang Medis",
    count: 3,
    description: "Farmasi, laboratorium terintegrasi, dan radiologi tanpa re-entri.",
  },
};

export const HOSPITAL_MODULES: HospitalModule[] = [
  // Administrasi
  {
    id: "pendaftaran",
    name: "Pendaftaran & Antrean",
    nameEn: "Registration",
    group: "administrasi",
    groupLabel: "Administrasi",
    description:
      "Entri data identitas dan penjaminan pasien sekali di awal kunjungan; langsung terdistribusi ke seluruh unit tujuan tanpa diketik ulang.",
    glyph: "registration",
    index: 0,
  },
  // Klinis
  {
    id: "rawat-jalan",
    name: "Rawat Jalan",
    nameEn: "Outpatient",
    group: "klinis",
    groupLabel: "Klinis",
    description:
      "Poli spesialis terhubung langsung dengan riwayat medis, peresepan elektronik, dan tindakan medis secara real-time.",
    glyph: "outpatient",
    index: 1,
  },
  {
    id: "rawat-inap",
    name: "Rawat Inap",
    nameEn: "Inpatient",
    group: "klinis",
    groupLabel: "Klinis",
    description:
      "Manajemen bed, catatan perkembangan pasien terintegrasi (CPPT), serta instruksi medis dokter dan perawat dalam satu alur.",
    glyph: "inpatient",
    index: 2,
  },
  {
    id: "rme",
    name: "Rekam Medis Elektronik",
    nameEn: "EMR",
    group: "klinis",
    groupLabel: "Klinis",
    description:
      "Satu berkas rekam medis seumur hidup pasien sesuai standar regulasi Kemenkes; riwayat alergi, diagnosis ICD-10, dan tindakan aman.",
    glyph: "emr",
    index: 3,
  },
  // Penunjang
  {
    id: "farmasi",
    name: "Farmasi & Resep Digital",
    nameEn: "Pharmacy",
    group: "penunjang",
    groupLabel: "Penunjang",
    description:
      "E-prescribing langsung dari poli atau bangsal; verifikasi dosis, telaah obat otomatis, dan stok inventaris terpotong real-time.",
    glyph: "pharmacy",
    index: 4,
  },
  {
    id: "laboratorium",
    name: "Laboratorium (LIS)",
    nameEn: "Laboratory",
    group: "penunjang",
    groupLabel: "Penunjang",
    description:
      "Order tes langsung masuk instrumen; hasil kritis terverifikasi langsung masuk ke rekam medis dokter tanpa menunggu cetak fisik.",
    glyph: "laboratory",
    index: 5,
  },
  {
    id: "radiologi",
    name: "Radiologi & PACS",
    nameEn: "Radiology",
    group: "penunjang",
    groupLabel: "Penunjang",
    description:
      "Permintaan citra X-Ray, CT-Scan, dan USG terintegrasi; ekspertise radiolog langsung dapat diakses dokter penanggung jawab.",
    glyph: "radiology",
    index: 6,
  },
  // Administrasi / Finansial
  {
    id: "billing",
    name: "Billing & Klaim BPJS",
    nameEn: "Billing",
    group: "administrasi",
    groupLabel: "Administrasi",
    description:
      "Perhitungan tarif otomatis berdasarkan tindakan dan farmasi; kesiapan bridging BPJS V-Claim tanpa selisih rekonsiliasi akhir bulan.",
    glyph: "billing",
    index: 7,
  },
  {
    id: "aset-logistik",
    name: "Aset & Logistik RS",
    nameEn: "Asset & Logistics",
    group: "administrasi",
    groupLabel: "Administrasi",
    description:
      "Monitoring inventaris obat, alkes, reagen, dan pemeliharaan alat medis berharga tinggi dengan pelacakan batch dan expired date.",
    glyph: "logistics",
    index: 8,
  },
];
