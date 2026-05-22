<div align="center">

# 🏎️ Tesla Infotainment SecOps PoC
### 🎓 **Academic Research Project on Automotive Cyber Security**

```text
  _____ _____ ____  _        _      ____   ___   ___ _____ 
 |_   _| ____/ ___|| |      / \    |  _ \ / _ \ / _ \_   _|
   | | |  _| \___ \| |     / _ \   | |_) | | | | | | || |  
   | | | |___ ___) | |___ / ___ \  |  _ <| |_| | |_| || |  
   |_| |_____|____/|_____/_/   \_\ |_| \_\\___/ \___/ |_|  
                                                           
```

**Course:** Bilgi Güvenliği Teknolojileri - Siber Güvenlik Analizi ve Web PoC Projesi
**Researcher & Developer:** Mert Kızılırmak

[![Vulnerability](https://img.shields.io/badge/CVE-2023--XXXX-red?style=for-the-badge)](https://github.com/RedRiveRR/Tesla)
[![Target](https://img.shields.io/badge/Target-Tesla%20MCU%20Baseband-blue?style=for-the-badge)](https://github.com/RedRiveRR/Tesla)
[![Status](https://img.shields.io/badge/Status-Patched%20(OTA)-success?style=for-the-badge)](https://github.com/RedRiveRR/Tesla)
[![Docker](https://img.shields.io/badge/Docker-Supported-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://github.com/RedRiveRR/Tesla)
[![Python](https://img.shields.io/badge/Python-Red/Blue_Team-yellow?style=for-the-badge&logo=python&logoColor=white)](https://github.com/RedRiveRR/Tesla)

</div>

---

## 📑 1. Abstract (Proje Özeti)

Modern otomotiv endüstrisinde araçların "tekerlekli bilgisayarlara" dönüşmesiyle, siber güvenlik en kritik araştırma alanlarından biri haline gelmiştir. Bu akademik proje, **Pwn2Own 2023** yarışmasında Synacktiv araştırma ekibi tarafından keşfedilen kritik Tesla Bluetooth (BIP) Baseband zafiyetinin çok boyutlu (multi-dimensional) teknik analizini simüle eder. 

Sıradan bir statik rapor hazırlamak yerine, **Glassmorphism**, **Cyberpunk estetiği** ve modern **Vite/TypeScript** teknolojileri harmanlanarak, ağ ve donanım zafiyetlerinin modern web teknolojileri ile nasıl dinamik bir **"Güvenlik Gösterge Paneli" (SecOps Dashboard)** üzerinden raporlanabileceği kanıtlanmıştır.

---

## 📊 2. Visualization & Interface (Dashboard Önizlemesi)

Geliştirilen interaktif Cybersecurity Dashboard, hocalar ve araştırmacılar için veriyi yalnızca metin olarak sunmaz; interaktif grafikler ve canlı simülasyonlarla destekler.

<div align="center">
  <img src="./public/assets/demo_preview.png" alt="Tesla Dashboard Architecture" width="100%">
  <br>
  <em>Figür 1: Canlı Red/Blue Team Simülasyonu ve CVSS Radar Analizine sahip Dashboard Arayüzü</em>
</div>

---

## ⚙️ 3. Vulnerability Mechanics (Zafiyetin Anatomisi)

Bu projenin simüle ettiği saldırı vektörü (Attack Vector), iki ardışık hafıza bozulması güvenlik açığına dayanmaktadır:

| Faz | Açıklama | CVSS Puanı (Tahmini) |
| :--- | :--- | :--- |
| **1. Heap Buffer Overflow** | Tesla araçlarındaki Bluetooth Imaging Protocol (BIP) üzerinden kurbanın MAC adresine özel olarak hazırlanmış, boyutu manipüle edilmiş (oversized) L2CAP paketleri gönderilerek yığın belleğinde taşma (Heap Overflow) yaratılır. | `9.8 / 10` |
| **2. Out-of-Bounds Write** | Yığın taşması başarıyla sömürüldükten sonra "Pivot" işlemi gerçekleştirilir ve bellek sınırlarının dışına yazılarak (OOB Write) doğrudan bilgi-eğlence (Infotainment / MCU) sistemine "Root" erişimi sağlanır. | `9.5 / 10` |

---

## 🔬 4. Methodology & Implementation (Proje Mimarisi)

Bu depo, modern Frontend teknolojilerini, DevOps altyapısını ve Red/Blue Team felsefesini birleştiren tam teşekküllü bir PoC çalışmasıdır:

*   **Vite & TypeScript:** Hızlı derleme mimarisi ve statik tip güvenliği.
*   **Arayüz Tasarımı (Glassmorphism):** Saf CSS kullanılarak (kütüphanesiz) oluşturulan, donanım ivmeli arka plan bulanıklıkları ve siber güvenlik temalı (Cyberpunk) estetik.
*   **Veri Görselleştirme:** `Chart.js` kütüphanesi kullanılarak zafiyet metriklerinin (CVSS v3.1) dinamik Radar (Örümcek Ağı) grafiğine dönüştürülmesi.
*   **Modüler Veri Kaynağı:** Projedeki tüm olay geçmişi ve veriler `src/lib/data/` altındaki `.json` mimarisinden modüler şekilde okunur.
*   **DevOps (Docker):** Saldırı / Savunma laboratuvarının ağını dünyadan izole etmek adına `docker-compose` mimarisiyle konteynerize edilmiştir.
*   **CI/CD Entegrasyonu:** Kod her pushlandığında çalışacak GitHub Actions SAST güvenlik tarayıcıları yapılandırılmıştır.

---

## ⚔️ 5. Red vs Blue Team Simulation (Hacker Uçbirimi)

Proje sadece arayüzden ibaret değildir. `scripts/` dizininde, zafiyetin gerçek dünyada nasıl sömürüldüğünü ve bir IPS/IDS (Saldırı Tespit Sistemi) tarafından nasıl engellendiğini kanıtlayan kurgusal Python scriptleri mevcuttur.

**Test etmek için:**
```bash
# 1. Aşama: Red Team Keşif (Recon) İşlemi
python3 scripts/01_recon_bluetooth.py

# 2. Aşama: Red Team Saldırı (Exploit) Simülasyonu
python3 scripts/02_exploit_heap_overflow.py --target "9C:43:1E:XX:XX:XX"

# 3. Aşama: Blue Team Savunma (IDS) Simülasyonu
# Saldırganın L2CAP ping paketlerini yakalayıp banlayan mekanizma
python3 scripts/03_defense_ids.py
```

*(Not: Bu simülasyonların çalışması, arayüzdeki "Live SecOps Simulation" paneline de anlık olarak entegre edilmiş bir biçimde sergilenmektedir.)*

---

## 🛠️ 6. Deployment (Arayüz Kurulumu)

Araştırma panelini ayağa kaldırmak için aşağıdaki yöntemlerden birini kullanabilirsiniz:

### Yöntem A: Docker ile İzole Ağ (Akademik Öneri)
```bash
git clone https://github.com/RedRiveRR/Tesla.git
cd Tesla
docker-compose up -d --build
# localhost:5173 adresinden paneli görüntüleyin.
```

### Yöntem B: NodeJS ile Geliştirici Modu
```bash
npm install
npm run dev
# Vite sunucusunun vereceği (localhost:5174 vb.) adresten görüntüleyin.
```

---

## 🛡️ 7. Conclusion & Mitigation (Sonuç ve Savunma)

Bu analiz sonucunda; donanım modüllerindeki yazılım (Baseband Firmware) kaynaklı güvenlik açıklarının, ana sistemlere (MCU) atlama taşı (Pivoting) olarak kullanılabileceği kanıtlanmıştır. 

Tesla, bu zafiyeti tespitinden çok kısa bir süre sonra gelişmiş **Over-The-Air (OTA)** güncelleme sistemi ile araçları servise bile çağırmadan uzaktan yamamıştır. Modern otomotiv mimarisinde; Modüller arası sıkı Ağ İzolasyonu (Sandboxing) ve dinamik IDS entegrasyonu şarttır.

---

> **⚠️ Yasal Uyarı ve Etik Bildirim (Disclaimer)** <br>
> Bu depo ve içerisindeki simülasyonlar/analizler, siber güvenlik bilincini arttırmak, modern web teknolojilerinin analitik bir raporlama aracı olarak kullanımını kanıtlamak ve üniversite seviyesinde akademik araştırma yapmak amacıyla geliştirilmiştir. Kurgusal PoC verileri içerir. Kötüye kullanımı kesinlikle yasaktır. 