#!/usr/bin/env python3
"""
ISU SecOps Lab - Blue Team IDS Simulation
Author: Mert Kızılırmak
Description: Simulates an Intrusion Detection System (IDS) monitoring 
the Bluetooth Baseband for L2CAP anomalous oversized ping packets 
(Heap Overflow Attempt).
"""

import time
import sys
import random

def print_banner():
    print("\033[96m" + "="*50)
    print("Tesla Baseband IDS [Blue Team Defense PoC]")
    print("="*50 + "\033[0m")

def monitor_traffic():
    print("[*] Starting L2CAP traffic monitoring on interface hci0...")
    time.sleep(1)
    
    # Simulate normal traffic
    for i in range(1, 4):
        print(f"    [OK] Normal ping packet received (Size: {random.randint(20, 64)} bytes)")
        time.sleep(1)

    print("\n\033[93m[!] WARNING: Anomalous traffic detected!\033[0m")
    time.sleep(0.5)
    print("    [>] Source: Unknown | Protocol: L2CAP | Size: 1028 bytes")
    print("    [>] Signature Match: HEAP_OVERFLOW_CVE-2023-XXXX")
    time.sleep(1.5)

    print("\n\033[91m[X] MALICIOUS PAYLOAD INTERCEPTED\033[0m")
    print("[*] Initiating counter-measures...")
    time.sleep(1)
    print("[*] Dropping packet and blacklisting attacker MAC address.")
    time.sleep(1)
    print("\033[92m[+] Defense successful. Infotainment system secured.\033[0m")

if __name__ == "__main__":
    try:
        print_banner()
        monitor_traffic()
    except KeyboardInterrupt:
        print("\n[!] Monitoring aborted by user.")
        sys.exit(0)
