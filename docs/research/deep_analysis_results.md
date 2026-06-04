# 🔬 Derin Araştırma Bilgileri ve Teknik Analiz Sonuçları

Bu klasör, Tesla Bluetooth Baseband zafiyetinin arka planda çalışan teknik kök-nedenlerini (Root Cause Analysis), paket analizlerini ve sömürü sonrası (Post-Exploitation) senaryolarını detaylandırmak için ayrılmıştır.

## 1. Zafiyet Mimarisi (Vulnerability Architecture)
Bluetooth yığını içindeki L2CAP protokolü üzerinden iletilen 'ping' isteklerinde, paket boyutları sınırlandırılmadığı takdirde doğrudan `Baseband Firmware` üzerinde tahribat yaratılabilir. Pwn2Own 2023 etkinliğinde keşfedilen bu açığın teknik anatomisi şöyledir:

- **Hatalı Katman:** Bluetooth L2CAP (Logical Link Control and Adaptation Protocol).
- **Zafiyet Türü:** Heap-Based Buffer Overflow & Out-of-Bounds Write.
- **Hedef Donanım:** Tesla MCU (Media Control Unit) ile haberleşen Baseband modülü.

## 2. Derin OOB (Out-of-Bounds) Write Analizi
Saldırganlar, taşan bellek havuzu üzerinden yürütme akışını (execution flow) değiştirmek için kontrollü bir "Out-of-Bounds" (OOB) yazma tekniği uygular:
1. Sahte bellek nesneleri (Fake Objects) oluşturularak Heap üzerine yerleştirilir.
2. V-Table (Sanal Fonksiyon Tablosu) işaretçileri ezilerek, çağrılan orijinal fonksiyonlar yerine saldırganın yüklediği ROP (Return-Oriented Programming) zinciri tetiklenir.
3. Baseband içerisinde elde edilen bu denetim, Gateway (Ağ geçidi) bypass edilerek Info-tainment (Linux) işletim sistemine root seviyesinde sekme (Pivoting) imkanı sunar.

## 3. CVSS Skor Hesaplaması ve Gerekçelendirme (CVSS v3.1)
- **Base Score:** 9.8 (CRITICAL)
- **Attack Vector (AV):** Adjacency (A) -> Saldırganın aracın Bluetooth menzili içinde olması gerekir.
- **Attack Complexity (AC):** Low (L) -> İstismar bir kez yazıldığında tekrarlanması çok kolaydır.
- **Privileges Required (PR):** None (N) -> Saldırganın hiçbir yetkiye ihtiyacı yoktur.
- **User Interaction (UI):** None (N) -> Sürücünün / Sahibin herhangi bir eylemde bulunması gerekmez (Zero-click).
- **Scope (S):** Changed (C) -> Baseband'den MCU'ya geçiş (Pivoting) yaşanır.

## 4. Araştırma Sonuçları
Bu derin araştırma sonucunda görülmüştür ki; otomotiv ağlarında donanımsal sandboxing (kumlama) hayati öneme sahiptir. Modüller arasındaki trafiğin, boyut ve tip bağımsız denetimlerden geçmemesi doğrudan araca fiziksel bir erişim riskine (Fren/Motor CAN bus sinyalleri manipülasyonu) yol açabilmektedir.

*(Not: Geliştirilen canlı PoC arayüzü ve Python simülasyon kodları, bu derin analizin görsel bir yansıması olarak kodlanmıştır.)*
