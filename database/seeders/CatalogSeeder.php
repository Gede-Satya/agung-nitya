<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CatalogSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Default Administrator
        User::firstOrCreate(
            ['email' => 'admin@agungnitya.co.id'],
            [
                'name' => 'Administrator PT Agung Wijaya Nitya',
                'password' => Hash::make('admin12345'),
            ]
        );

        // 2. 16 Core Categories Data
        $categories = [
            [
                'slug' => 'kamera',
                'order_label' => '01',
                'short_title' => 'Kamera & Visual',
                'title' => 'Kamera & Dokumentasi Visual',
                'subtitle' => 'Camcorder 4K, Mirrorless, DSLR, Konferensi, CCTV & Drone',
                'description' => 'Rangkaian lengkap perangkat kamera dokumentasi, camcorder profesional, kamera mirrorless/DSLR, kamera konferensi ruang rapat, CCTV keamanan, drone pemetaan, gimbal stabilizer, hingga pencahayaan studio.',
                'theme' => 'crimson',
                'cover_image' => '/products/sony-pxw-z200.png',
                'sub_types_summary' => [
                    'Camcorder Profesional 4K',
                    'Kamera Mirrorless & DSLR',
                    'Kamera Konferensi Video',
                    'CCTV & Body Camera',
                    'Drone & Gimbal Stabilizer',
                    'Lensa, Lighting & Dry Cabinet',
                ],
                'icon_svg' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3.5"/></svg>',
                'order_num' => 1,
                'sample_products' => [
                    [
                        'name' => 'Sony PXW-Z200 4K HDR XDCAM Camcorder',
                        'brand' => 'Sony',
                        'sku' => 'CAM-SNY-Z200',
                        'price' => 74500000,
                        'tkdn_percent' => 38.5,
                        'specs' => '1.0-type stacked Exmor RS CMOS, 20x Optical Zoom, Auto Framing AI, 12G-SDI & HDMI',
                        'image_url' => '/products/sony-pxw-z200.png',
                        'inaproc_url' => 'https://katalog.inaproc.id/agung-wijaya-nitya',
                    ],
                    [
                        'name' => 'PTZ Conference Camera 4K USB/HDMI/IP',
                        'brand' => 'Logitech / Aver',
                        'sku' => 'CAM-PTZ-4K',
                        'price' => 28500000,
                        'tkdn_percent' => 40.0,
                        'specs' => 'Sensor 4K Ultra HD, 12x Optical Zoom, Auto Tracking, Speaker Tracking, PoE Support',
                        'image_url' => '/products/sony-pxw-z200.png',
                        'inaproc_url' => 'https://katalog.inaproc.id/agung-wijaya-nitya',
                    ]
                ]
            ],
            [
                'slug' => 'server',
                'order_label' => '02',
                'short_title' => 'Server & Data Center',
                'title' => 'Server & Pusat Data',
                'subtitle' => 'Rack Server 2U, Tower Server Xeon, KVM & InRow Cooling',
                'description' => 'Infrastruktur komputasi pusat data instansi yang mencakup rackmount server dual-socket, tower server enterprise, konsol KVM switch, serta sistem pendingin presisi ruang server.',
                'theme' => 'navy',
                'cover_image' => '/products/server-dell-r760xs.png',
                'sub_types_summary' => [
                    'Rack Server Enterprise (1U/2U)',
                    'Tower Server Xeon',
                    'KVM Console Switch 8-16 Port',
                    'Pendingin Ruang Server (InRow)',
                ],
                'icon_svg' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="7" rx="2"/><rect x="2" y="14" width="20" height="7" rx="2"/><line x1="6" y1="6.5" x2="6.01" y2="6.5"/><line x1="6" y1="17.5" x2="6.01" y2="17.5"/></svg>',
                'order_num' => 2,
                'sample_products' => [
                    [
                        'name' => 'Dell PowerEdge R760xs Rack Server 2U',
                        'brand' => 'Dell Technologies',
                        'sku' => 'SRV-DEL-R760XS',
                        'price' => 125000000,
                        'tkdn_percent' => 32.0,
                        'specs' => 'Dual Intel Xeon Silver 4410Y, 64GB DDR5 ECC, 2x 960GB SSD SAS, Dual PSU Redundant',
                        'image_url' => '/products/server-dell-r760xs.png',
                        'inaproc_url' => 'https://katalog.inaproc.id/agung-wijaya-nitya',
                    ]
                ]
            ],
            [
                'slug' => 'pc-workstation',
                'order_label' => '03',
                'short_title' => 'Workstation & PC',
                'title' => 'Workstation, PC All-in-One & Laptop',
                'subtitle' => 'Workstation Xeon/RTX, All-in-One PC, Desktop SFF & Notebook',
                'description' => 'Perangkat komputasi kerja mulai dari workstation bersertifikasi ISV untuk pemodelan teknik, komputer meja All-in-One hemat ruang, PC desktop SFF, hingga laptop operasional.',
                'theme' => 'gold',
                'cover_image' => '/products/workstation-lenovo-p7.jpeg',
                'sub_types_summary' => [
                    'Workstation Performa Tinggi',
                    'All-in-One (AIO) PC 21.5"-24"',
                    'PC Desktop & Small Form Factor',
                    'Laptop & Notebook Institusi',
                ],
                'icon_svg' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
                'order_num' => 3,
                'sample_products' => [
                    [
                        'name' => 'Lenovo ThinkStation P7 Workstation',
                        'brand' => 'Lenovo',
                        'sku' => 'WS-LNV-P7',
                        'price' => 88000000,
                        'tkdn_percent' => 41.2,
                        'specs' => 'Intel Xeon W7-2475X, 64GB DDR5, NVIDIA RTX A4500 20GB, 2TB PCIe NVMe SSD Gen4',
                        'image_url' => '/products/workstation-lenovo-p7.jpeg',
                        'inaproc_url' => 'https://katalog.inaproc.id/agung-wijaya-nitya',
                    ]
                ]
            ],
            [
                'slug' => 'ups',
                'order_label' => '04',
                'short_title' => 'UPS & Daya Cadangan',
                'title' => 'UPS & Proteksi Daya Listrik',
                'subtitle' => 'Smart-UPS Rackmount, Online UPS 20-30kVA & Line Interactive',
                'description' => 'Sistem cadangan daya tanpa jeda (Uninterruptible Power Supply) gelombang sinus murni untuk melindungi server, jaringan, dan perangkat laboratorium dari gangguan listrik.',
                'theme' => 'charcoal',
                'cover_image' => '/products/ups-apc-smc3000i.jpeg',
                'sub_types_summary' => [
                    'UPS Online Kapasitas Besar (20 sampai 30kVA)',
                    'UPS Rackmount Server (2U)',
                    'UPS Tower & Line Interactive',
                ],
                'icon_svg' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
                'order_num' => 4,
                'sample_products' => [
                    [
                        'name' => 'APC Smart-UPS SMC3000I-2U Rackmount 3000VA',
                        'brand' => 'Schneider Electric / APC',
                        'sku' => 'UPS-APC-3000I',
                        'price' => 34500000,
                        'tkdn_percent' => 43.1,
                        'specs' => '3000VA / 2100W, Pure Sine Wave, 2U Rackmount, LCD Status Display, SmartSlot Card',
                        'image_url' => '/products/ups-apc-smc3000i.jpeg',
                        'inaproc_url' => 'https://katalog.inaproc.id/agung-wijaya-nitya',
                    ]
                ]
            ],
            [
                'slug' => 'monitor-display',
                'order_label' => '05',
                'short_title' => 'Monitor & Video Wall',
                'title' => 'Monitor Diagnostik, Signage & Video Wall',
                'subtitle' => 'Monitor Medis 8MP, Video Wall 3×3, Interactive Board 86" & TV',
                'description' => 'Layar visual resolusi tinggi untuk ruang kendali, radiologi diagnostik DICOM, papan tulis interaktif ruang rapat, digital signage informasi publik, serta smart TV komersial.',
                'theme' => 'bronze',
                'cover_image' => '/products/monitor-lg-32hl512d.jpeg',
                'sub_types_summary' => [
                    'Monitor Diagnostik Resolusi Tinggi',
                    'Sistem Video Wall 2×2 & 3×3',
                    'Interactive Flat Panel 86"',
                    'Digital Signage UHD 55"-98"',
                    'Smart TV Komersial',
                ],
                'icon_svg' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>',
                'order_num' => 5,
                'sample_products' => [
                    [
                        'name' => 'LG 32HL512D 31.5" 8MP Diagnostik Medis DICOM',
                        'brand' => 'LG Medical Displays',
                        'sku' => 'DSP-LG-32HL512',
                        'price' => 96000000,
                        'tkdn_percent' => 35.0,
                        'specs' => '8MP (3840x2160) IPS, Kecerahan 850 cd/m2, Kalibrasi DICOM Part 14 bawaan',
                        'image_url' => '/products/monitor-lg-32hl512d.jpeg',
                        'inaproc_url' => 'https://katalog.inaproc.id/agung-wijaya-nitya',
                    ]
                ]
            ],
            [
                'slug' => 'jaringan',
                'order_label' => '06',
                'short_title' => 'Switch & Jaringan',
                'title' => 'Switch, Wi-Fi 6 & Infrastruktur Optik',
                'subtitle' => 'Managed PoE Switch, Access Point, Router, SFP+ & Fiber Optik',
                'description' => 'Perangkat konektivitas jaringan korporat mencakup switch PoE terkelola Layer 2+, router core, access point Wi-Fi 6 indoor/outdoor, modul transceiver SFP+, dan kabel fiber optik.',
                'theme' => 'slate',
                'cover_image' => '/images/card-server-storage.jpg',
                'sub_types_summary' => [
                    'Network Switch & Core Router',
                    'Access Point Wi-Fi 6 Indoor/Outdoor',
                    'Modul Optical Transceiver SFP+',
                    'Kabel & Patch Cord Fiber/UTP Cat6',
                ],
                'icon_svg' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="14" width="20" height="6" rx="1.5"/><path d="M6 17h.01M10 17h.01M14 17h4"/><path d="M8.5 8.5a5 5 0 0 1 7 0"/><path d="M6 6a8.5 8.5 0 0 1 12 0"/></svg>',
                'order_num' => 6,
                'sample_products' => []
            ],
            [
                'slug' => 'audio-sound',
                'order_label' => '07',
                'short_title' => 'Audio & Konferensi',
                'title' => 'Sistem Audio, Konferensi & Tata Suara',
                'subtitle' => 'Conference Mic, Mixer, Power Amplifier, Speaker & Soundcard',
                'description' => 'Perangkat tata suara aula dan ruang rapat resmi yang meliputi mikrofon delegasi/chairman, power amplifier multi-kanal, ceiling speaker, line array, mixer, serta soundcard.',
                'theme' => 'gold',
                'cover_image' => '/products/behringer-um2.png',
                'sub_types_summary' => [
                    'Sistem Konferensi & Mikrofon Rapat',
                    'Speaker Aula, Ceiling & Soundbar',
                    'Power & Mixer Amplifier',
                    'Audio Interface, Mixer & Processor',
                    'Headphone Studio & Stand Mic',
                ],
                'icon_svg' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>',
                'order_num' => 7,
                'sample_products' => []
            ],
            [
                'slug' => 'printer-scanner',
                'order_label' => '08',
                'short_title' => 'Printer & Scanner',
                'title' => 'Printer, Scanner Dokumen & Barcode',
                'subtitle' => 'Scanner Dokumen A4, Printer Ink Tank A3/A4, LaserJet & Thermal',
                'description' => 'Peralatan pencetakan dan digitalisasi arsip mulai dari document scanner dupleks cepat, printer multifungsi A3/A4, printer dot matrix rangkap, hingga barcode scanner.',
                'theme' => 'crimson',
                'cover_image' => '/images/card-workstation-pc.jpg',
                'sub_types_summary' => [
                    'Scanner Dokumen Kecepatan Tinggi',
                    'Printer Ink Tank & LaserJet Kantor',
                    'Printer Thermal & Barcode Scanner',
                    'Printer Dot Matrix & Pita',
                    'Signature Pad Tanda Tangan Digital',
                ],
                'icon_svg' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
                'order_num' => 8,
                'sample_products' => []
            ],
            [
                'slug' => 'telepon-ip',
                'order_label' => '09',
                'short_title' => 'Telepon IP & Kiosk',
                'title' => 'Telepon IP, PABX, Kiosk & Biometrik',
                'subtitle' => 'IP Phone Gigabit, IP-PBX Appliance, Kiosk Anjungan & Akses Wajah',
                'description' => 'Sistem telekomunikasi kantor berbasis SIP/VoIP, mesin anjungan pelayanan mandiri layar sentuh (kiosk antrian), serta terminal pengenalan wajah dan sidik jari.',
                'theme' => 'navy',
                'cover_image' => '/images/card-commercial-display-render.jpg',
                'sub_types_summary' => [
                    'Telepon IP & Server IP-PBX',
                    'Kiosk Touchscreen & Mesin Antrian',
                    'Terminal Biometrik & Sidik Jari',
                    'Docking Station Data',
                ],
                'icon_svg' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
                'order_num' => 9,
                'sample_products' => []
            ],
            [
                'slug' => 'storage-nas',
                'order_label' => '10',
                'short_title' => 'NAS, SSD & Storage',
                'title' => 'NAS, SSD Portabel & Media Penyimpanan',
                'subtitle' => 'Synology DiskStation NAS, SSD Eksternal 2TB, HDD 5TB & Periferal',
                'description' => 'Solusi penyimpanan cadangan data terpusat (NAS), solid-state drive portabel berkecepatan tinggi, hard drive eksternal, kartu memori, serta periferal input komputer.',
                'theme' => 'charcoal',
                'cover_image' => '/images/ups-smart-online.jpg',
                'sub_types_summary' => [
                    'NAS (Network Attached Storage)',
                    'SSD Portabel & Hardisk Eksternal',
                    'Kartu Memori & Perangkat Bergerak',
                    'Periferal Mouse & Keyboard',
                ],
                'icon_svg' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
                'order_num' => 10,
                'sample_products' => []
            ],
            [
                'slug' => 'proyektor',
                'order_label' => '11',
                'short_title' => 'Proyektor & Layar',
                'title' => 'Proyektor Laser & Layar Presentasi',
                'subtitle' => 'Laser Projector 8000 Lumens, Proyektor Rapat, Wall & Tripod Screen',
                'description' => 'Perangkat proyeksi visual auditorium dan ruang sidang mulai dari proyektor laser 8000 lumens hingga layar proyektor gantung (wallscreen) dan tripod portabel.',
                'theme' => 'bronze',
                'cover_image' => '/images/card-commercial-display-render.jpg',
                'sub_types_summary' => [
                    'Proyektor Laser & Ruang Rapat',
                    'Layar Proyektor Wallscreen & Tripod',
                ],
                'icon_svg' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="10" rx="2"/><circle cx="15" cy="12" r="2.5"/><line x1="6" y1="12" x2="9" y2="12"/><line x1="6" y1="17" x2="5" y2="20"/><line x1="18" y1="17" x2="19" y2="20"/></svg>',
                'order_num' => 11,
                'sample_products' => []
            ],
            [
                'slug' => 'ac-pendingin',
                'order_label' => '12',
                'short_title' => 'AC & Pendingin',
                'title' => 'AC Ruangan, Kulkas Medis & Dispenser',
                'subtitle' => 'Kulkas Farmasi Lab, AC Split/Inverter 1-2 PK, Air Cooler & Dispenser',
                'description' => 'Pengatur suhu ruangan kerja dan penyimpanan khusus yang mencakup refrigerator farmasi berstandar klinis, AC split inverter/standar, evaporative air cooler, dan dispenser.',
                'theme' => 'slate',
                'cover_image' => '/products/rak-display-obat.png',
                'sub_types_summary' => [
                    'AC Split & Inverter 1-2 PK',
                    'Kulkas Medis & Farmasi (Refrigerator)',
                    'Industrial Air Cooler 13.000 CMH',
                    'Dispenser Air Bottom Loading',
                ],
                'icon_svg' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"/><path d="M20 16v-4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"/><path d="M12 2v4"/><path d="M8 19l-1 3"/><path d="M16 19l1 3"/><path d="M12 19v3"/></svg>',
                'order_num' => 12,
                'sample_products' => []
            ],
            [
                'slug' => 'rak-lemari-arsip',
                'order_label' => '13',
                'short_title' => 'Rak & Lemari Arsip',
                'title' => 'Rak Besi, Rak Stainless & Kabinet Arsip',
                'subtitle' => 'Rak Stainless SUS 304, Rak Medium Duty, Close Rack 42U & Filing Cabinet',
                'description' => 'Sistem penyimpanan fisik gudang, ruang server, dan ruang arsip meliputi rak stainless steel 4 susun, rak gudang beban menengah, kabinet server 42U, serta lemari arsip.',
                'theme' => 'gold',
                'cover_image' => '/products/rak-stainless-steel.png',
                'sub_types_summary' => [
                    'Rak Stainless Steel & Display Medis',
                    'Rak Gudang Medium Duty',
                    'Lemari Arsip & Filing Cabinet Besi',
                    'Server Close Rack 42U & Wallmount',
                ],
                'icon_svg' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>',
                'order_num' => 13,
                'sample_products' => [
                    [
                        'name' => 'Rak Susun Stainless Steel SUS 304 4 Tingkat',
                        'brand' => 'Custom Hospital Grade',
                        'sku' => 'RAK-SS-4T',
                        'price' => 5400000,
                        'tkdn_percent' => 55.0,
                        'specs' => 'Stainless Steel SUS 304, Dimensi 1200x500x1550mm, Kapasitas beban 150kg/tingkat',
                        'image_url' => '/products/rak-stainless-steel.png',
                        'inaproc_url' => 'https://katalog.inaproc.id/agung-wijaya-nitya',
                    ]
                ]
            ],
            [
                'slug' => 'lemari-b3-lab',
                'order_label' => '14',
                'short_title' => 'Lemari B3 & Alat Lab',
                'title' => 'Lemari B3 & Instrumen Ukur Laboratorium',
                'subtitle' => 'Lemari Bahan Berbahaya B3, Light Meter, Multimeter, Clamp Meter & APAR',
                'description' => 'Peralatan keselamatan kerja dan instrumen pengukuran teknis laboratorium meliputi lemari penyimpanan bahan berbahaya dan beracun (B3), lux meter, multimeter, dan APAR CO2.',
                'theme' => 'crimson',
                'cover_image' => '/products/lemari-penyimpanan-b3.png',
                'sub_types_summary' => [
                    'Lemari Penyimpanan Bahan Berbahaya (B3)',
                    'Alat Ukur Listrik & Cahaya (Meter)',
                    'Thermometer Hygrometer Digital',
                    'Tabung Pemadam Api (APAR CO2)',
                ],
                'icon_svg' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
                'order_num' => 14,
                'sample_products' => [
                    [
                        'name' => 'Lemari Penyimpanan Bahan Kimia Berbahaya (B3) Kuning 45 Gallon',
                        'brand' => 'Krisbow / SYSBEL',
                        'sku' => 'LAB-B3-45G',
                        'price' => 16500000,
                        'tkdn_percent' => 45.0,
                        'specs' => 'Double-walled 18 gauge steel, kapasitas 45 Gal/170L, ventilasi ganda antiledak',
                        'image_url' => '/products/lemari-penyimpanan-b3.png',
                        'inaproc_url' => 'https://katalog.inaproc.id/agung-wijaya-nitya',
                    ]
                ]
            ],
            [
                'slug' => 'kursi-meja',
                'order_label' => '15',
                'short_title' => 'Kursi & Meja Kerja',
                'title' => 'Kursi Kantor, Meja Kerja & Furnitur',
                'subtitle' => 'Kursi Direktur/Staf Ergonomis, Meja Kerja Jati/Kantor, Sofa & Blinds',
                'description' => 'Furnitur penunjang ruang kerja instansi meliputi kursi kerja ergonomis sandaran tinggi/rendah, meja kerja kayu jati dan partisi, sofa ruang tunggu, serta tirai vertikal.',
                'theme' => 'navy',
                'cover_image' => '/products/rak-medium-duty.png',
                'sub_types_summary' => [
                    'Kursi Direktur & Manager',
                    'Kursi Kerja Staf & Tamu',
                    'Meja Kerja Kantor & Kayu Jati',
                    'Sofa Ruang Tamu & Vertical Blinds',
                ],
                'icon_svg' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6"/><path d="M5 11h14a2 2 0 0 1 2 2v3H3v-3a2 2 0 0 1 2-2Z"/><path d="M12 16v5"/><path d="M8 21h8"/></svg>',
                'order_num' => 15,
                'sample_products' => []
            ],
            [
                'slug' => 'troli-kebersihan',
                'order_label' => '16',
                'short_title' => 'Troli & Perkakas',
                'title' => 'Troli Logistik, Kebersihan & Perkakas',
                'subtitle' => 'Troli Linen/Barang, Tempat Sampah 240L, Vacuum Industri & Perkakas',
                'description' => 'Sarana logistik rumah sakit/instansi, tempat sampah beroda kapasitas 240 liter, mesin penghisap debu wet/dry kapasitas besar, kompresor, hingga perkakas bengkel teknis.',
                'theme' => 'charcoal',
                'cover_image' => '/products/krisbow-pedal-240l.png',
                'sub_types_summary' => [
                    'Troli Linen & Troli Barang 300kg',
                    'Tempat Sampah Roda 240L & Vacuum',
                    'Mesin Bor, Gergaji & Kompresor',
                    'Perkakas Teknis & Alat Pelindung Diri',
                ],
                'icon_svg' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="19" r="2"/><circle cx="17" cy="19" r="2"/><path d="M3 5h2l2.4 10.2a2 2 0 0 0 2 1.5h8.8a2 2 0 0 0 2-1.6L21.5 8H6"/></svg>',
                'order_num' => 16,
                'sample_products' => [
                    [
                        'name' => 'Tempat Sampah Roda Pedal Krisbow 240 Liter HDPE',
                        'brand' => 'Krisbow',
                        'sku' => 'TRL-KB-240L',
                        'price' => 1250000,
                        'tkdn_percent' => 52.0,
                        'specs' => 'Kapasitas 240 Liter, Bahan High-Density Polyethylene (HDPE), Roda Karet Solid + Pedal',
                        'image_url' => '/products/krisbow-pedal-240l.png',
                        'inaproc_url' => 'https://katalog.inaproc.id/agung-wijaya-nitya',
                    ]
                ]
            ],
        ];

        foreach ($categories as $catData) {
            $samples = $catData['sample_products'] ?? [];
            unset($catData['sample_products']);

            $category = Category::updateOrCreate(
                ['slug' => $catData['slug']],
                $catData
            );

            foreach ($samples as $idx => $sample) {
                Product::updateOrCreate(
                    [
                        'category_id' => $category->id,
                        'sku' => $sample['sku'] ?? 'SKU-' . $category->id . '-' . $idx,
                    ],
                    array_merge($sample, [
                        'order_num' => $idx + 1,
                        'is_active' => true,
                    ])
                );
            }
        }
    }
}
