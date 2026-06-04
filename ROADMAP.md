# Proje Araştırma ve Öğrenme Yolculuğu (Roadmap)

## 1. Hazırlık ve Teori Aşaması
- **Amaç:** Tesla araçlarındaki (MCU) zafiyetin kök nedenini anlamak.
- **Odaklanılan Konular:**
  - Bluetooth L2CAP Protokolü paket yapısı.
  - Heap-based Buffer Overflow (Yığın Taşması) mekaniği.
  - Out-of-Bounds (OOB) Write ile yetki yükseltme.
- **Çıkmaz Sokaklar (Challenges):** İlk etapta doğrudan CAN bus üzerinden bir saldırı vektörü araştırılmış ancak Pwn2Own 2023 raporları incelendiğinde asıl sıçrama noktasının (pivoting) Baseband firmware olduğu anlaşılmıştır.

## 2. Geliştirme Aşaması (Frontend Dashboard)
- **Teknolojiler:** Vite, React, TypeScript.
- **Uygulananlar:**
  - Glassmorphism ve Dark-Theme tabanlı siber güvenlik gösterge paneli.
  - Zafiyet riskinin (CVSS) `Chart.js` kullanılarak Radar grafiği ile görselleştirilmesi.
  - Kırmızı Takım (Saldırgan) ve Mavi Takım (Savunma/IDS) konsollarının canlı log akışı.

## 3. Simülasyon Aşaması (Backend / Scripts)
- **Modüller (`src/scripts/`):**
  - `01_recon_bluetooth.py`: Keşif adımı (MAC tespiti).
  - `02_exploit_heap_overflow.py`: L2CAP paket manipülasyonu simülasyonu.
  - `03_defense_ids.py`: Hatalı boyuttaki paketleri engelleyen IDS simülasyonu.
- **Zorluklar:** Pwn2Own istismarı tamamen donanımsal olduğundan, bunu yazılımsal bir Web PoC olarak canlandırmak için mock (sahte) terminal loglarına ihtiyaç duyulmuştur.

## 4. Akademik Belgeleme (Dokümantasyon)
- **`docs/research/`:** Nessus OpenVAS simüle edilmiş raporu, Risk Matrisi ve Düzeltme Önerileri oluşturuldu.
- **Hedef:** Siber güvenlik raporlama standartlarına %100 uyum sağlamak ve BGT006 Sızma Testi ders çıktılarını karşılamak.
