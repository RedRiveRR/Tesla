# 🔧 Düzeltme Önerileri ve Sıkılaştırma Raporu (Remediation Plan)

Bu doküman, "01_OpenVAS_Scan_Report" içerisinde tespit edilen zafiyetlerin giderilmesi için uygulanması gereken adım adım çözüm (Remediation) ve sıkılaştırma (Hardening) süreçlerini tanımlar.

## 1. Zafiyet: Tesla Bluetooth Baseband Heap Overflow (Kritik Risk)

**Kök Neden:** Baseband yazılımı, Bluetooth L2CAP protokolü üzerinden gelen paketlerin boyutlarını doğrulamamaktadır (Lack of Input Validation).

### Çözüm Adımları:
1. **Yama Uygulaması (Patching):**
   - Tesla mühendisleri tarafından yayınlanan resmi `Over-The-Air (OTA)` Firmware güncellemesini derhal araca uygulayın. 
   - Yeni güncellemenin L2CAP tampon (buffer) boyut sınırlarını içerdiğinden emin olun.
2. **Girdi Doğrulama (Input Validation) Kod Düzeltmesi (Geliştiriciler İçin):**
   - Kaynak kodda, `receive_l2cap_packet()` fonksiyonuna aşağıdaki gibi bir sınır kontrolü (Boundary Check) eklenmelidir:
     ```c
     if (packet_length > MAX_L2CAP_SIZE) {
         drop_packet();
         log_anomaly();
         return ERROR_OVERSIZED_PAYLOAD;
     }
     ```
3. **Ağ İzolasyonu (Sandboxing & Segmentation):**
   - Bluetooth (Baseband) yongasının bellek alanı (Memory Space) ile Merkezi İşlem Biriminin (MCU / Infotainment) bellek alanını katı bir IOMMU (Input-Output Memory Management Unit) ile izole edin.
   - Baseband modülünden MCU'ya doğrudan bellek erişimi (DMA) yapılmasına izin vermeyin.
4. **Saldırı Tespit Sistemi (IDS) Entegrasyonu:**
   - Araç içi ağ izleme sensörlerine, 1024 byte'ın üzerindeki anormal L2CAP paketlerini anında "DROP" (Düşürme) kuralı tanımlayın (Red/Blue Team senaryosundaki `03_defense_ids.py` scriptinde örneklendirilmiştir).

## 2. Zafiyet: Bluetooth Discoverable Mode Enabled (Orta Risk)

**Kök Neden:** Aracın Bluetooth arayüzünün, yetkisiz kişilerin MAC adresini tespit edebileceği şekilde "Keşfedilebilir" (Discoverable) modda sürekli açık bırakılması.

### Çözüm Adımları:
1. **Konfigürasyon Değişikliği:**
   - Bluetooth servisinin yapılandırma dosyasında `DiscoverableTimeout` değerini 60 saniye ile sınırlandırın.
   - Sadece araç içi kullanıcı arayüzünden "Cihaz Ekle" (Add Device) butonuna basıldığında yayın (Broadcast) yapmasını sağlayın.

---
*İyileştirme adımları uygulandıktan sonra sistemin tekrar bir sızma testine (Retest) tabi tutulması şiddetle tavsiye edilir.*
