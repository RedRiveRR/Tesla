#!/usr/bin/env python3
"""
ISU SecOps Lab - Tesla Bluetooth Reconnaissance PoC
Author: Mert Kızılırmak
Description: Simulates the initial reconnaissance phase of the Tesla Bluetooth 
baseband attack (Pwn2Own 2023 style) by identifying vulnerable MAC addresses.
"""

import time
import random
import sys

def print_banner():
    print("\033[94m" + "="*50)
    print("Tesla Bluetooth Baseband Recon Scanner [PoC]")
    print("="*50 + "\033[0m")

def scan_environment():
    print("[*] Initializing Bluetooth interfaces...")
    time.sleep(1)
    print("[*] Scanning for discoverable Tesla MCU basebands (BIP Protocol)...\n")
    time.sleep(2)

    found_devices = [
        {"mac": "9C:43:1E:XX:XX:XX", "model": "Tesla Model 3", "signal": "-45 dBm", "vuln": True},
        {"mac": "00:1A:7D:XX:XX:XX", "model": "Unknown Device", "signal": "-70 dBm", "vuln": False},
        {"mac": "9C:43:1E:YY:YY:YY", "model": "Tesla Model Y", "signal": "-38 dBm", "vuln": True}
    ]

    for dev in found_devices:
        color = "\033[91m[VULNERABLE]\033[0m" if dev['vuln'] else "\033[92m[SAFE]\033[0m"
        print(f"[+] Device Found: {dev['mac']} | Model: {dev['model']} | Signal: {dev['signal']} -> {color}")
        time.sleep(0.5)

    print("\n[*] Recon completed. Vulnerable targets identified.")

if __name__ == "__main__":
    try:
        print_banner()
        scan_environment()
    except KeyboardInterrupt:
        print("\n[!] Scan aborted by user.")
        sys.exit(0)
