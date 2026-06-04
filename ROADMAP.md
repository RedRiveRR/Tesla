# BGT006 Öğrenme ve Araştırma Yolculuğu (ROADMAP)

"Önce anla, sonra kodla." felsefesiyle bir dedektif gibi gözlemleyerek ve ham verileri çevirerek bu proje aşağıdaki fazlara göre geliştirilmiştir.

## Faz 0: Yazmadan Önce Anla
- Pwn2Own 2023 Tesla Model 3 hack senaryosunun teknik özetlerinin okunması ve mantığının kavranması.
- Bluetooth yığınındaki L2CAP (Logical Link Control and Adaptation Protocol) bağlantı yapısının incelenmesi.
- Hedeflenen zafiyetin (Heap-Based Buffer Overflow / Sınır Dışı Yazma) teori düzeyinde kök-nedeninin anlaşılması.
- Gerçek bir donanımsal zafiyetin, web teknolojileri (Vite/React) ve betikler (Python) ile nasıl simüle edilebileceğinin kurgulanması.

## Faz 1: Araştırma ve Keşif (→ docs/research/)
- Zafiyete ait CVE (CVE-2023-32157) kaydının incelenmesi.
- CVSS v3.1 9.8 Kritik skorunun hangi Etki (Impact) ve İhtimal (Likelihood) bileşenlerinden kaynaklandığının araştırılması.
- Nessus/OpenVAS benzeri araçların bu zafiyeti nasıl raporlayacağının simüle edilmesi ve belgelenmesi.
- Araştırma çıktılarının, çıkmaz sokakların ve teknik analizlerin `docs/research/` dizininde raporlanması.

## Faz 2: Ortam Kurulumu
- Docker ve `docker-compose.yml` kullanılarak laboratuvar ortamının yalıtılması.
- Ortam değişkenlerini ayrıştırmak için `.env.example` şablonunun oluşturulması.
- Vite (React + TypeScript) altyapısının ayağa kaldırılması ve gerekli bağımlılıkların (ör. Chart.js) kurulması.
- Kırmızı Takım ve Mavi Takım simülasyonları için Python sanal ortamının hazırlanması.

## Faz 3: Uygulama (Modüller)

### 3.1: Python Simülasyon Betikleri
1. Keşif (`01_recon_bluetooth.py`): Etraftaki Bluetooth cihazlarının MAC adreslerini tarayan kurgusal mantığın kodlanması.
2. Sömürü (`02_exploit_heap_overflow.py`): 1024 byte'dan büyük aşırı yüklü (oversized) L2CAP paketleri gönderen mock betiğin yazılması.
3. Savunma (`03_defense_ids.py`): Gelen L2CAP paketlerini analiz eden ve 1024 byte'ı aşan durumlarda kaynağı engelleyen (Ban) sistemin kodlanması.

### 3.2: Frontend Siber Güvenlik Arayüzü (Dashboard)
1. "Glassmorphism" ve "Dark-Theme" odaklı arayüz tasarımının CSS kodlaması.
2. CVSS risklerinin Radar grafiği olarak (Chart.js ile) entegre edilmesi.
3. Kırmızı Takım / Mavi Takım loglarının anlık akan mock terminal pencerelerine dönüştürülmesi.
4. Python betiklerinin senaryosunun frontend üzerinde görselleştirilmesi.

## Faz 4: Test ve Raporlama
- Python betiklerinin doğru sırayla (Recon -> Exploit -> IDS Ban) çalıştığının test edilmesi.
- UI/UX tarafındaki "Live SecOps Simulation" panellerinin tasarımsal olarak sorunsuz çalıştığının doğrulanması.
- Araştırma notlarının, sızma testi sonuçlarının ve Düzeltme Önerilerinin (Remediation) son kontrollerinin yapılması.
- Bulunan bulgulara dair risklerin "Risk Matrisi" tablosuna oturtulması.

## Faz 5: Teslim Kontrol Listesi
- [x] README.md ana belge şablonlarının kurallara tam uyması.
- [x] Öğrenci numarasının maskelenerek eklenmesi.
- [x] ROADMAP.md dosyasının zorunlu fazları içermesi.
- [x] `docs/research/`, `docs/modules/`, `docs/references/` dizinlerinin eksiksiz oluşturulması.
- [x] `Dockerfile` ve `docker-compose.yml` dosyalarının hazır bulunması.
- [x] `.env.example` dosyasının projede yer alması.
- [x] Proje danışman hocasının (`keyvanarasteh`) GitHub'a Collaborator olarak eklenmesi (Manual Adım).
- [x] Kodların ve belgelerin GitHub repoya (Push) yüklenmesi.
