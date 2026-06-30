"""
Simulator: generates 24 hourly telemetry records for a demo energy site
and writes them to data/sample-telemetry.json.
"""

import json
import math
import os
from datetime import datetime, timezone, timedelta

SITE_ID = "demo-site-001"
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "data", "sample-telemetry.json")

# Rough solar irradiance profile: peaks at noon, zero at night
def _solar_kw(hour: int) -> float:
    if hour < 6 or hour >= 20:
        return 0.0
    angle = math.pi * (hour - 6) / 14
    return round(50.0 * math.sin(angle), 2)

# Load profile: higher in morning and evening, lower at night
def _load_kw(hour: int) -> float:
    base = 20.0
    morning_peak = 15.0 * math.exp(-0.5 * ((hour - 8) / 2) ** 2)
    evening_peak = 20.0 * math.exp(-0.5 * ((hour - 19) / 2) ** 2)
    return round(base + morning_peak + evening_peak, 2)

def _site_status(solar: float, battery_soc: float, grid: float) -> str:
    if solar > 30:
        return "solar_export" if grid < 0 else "solar_charging"
    if battery_soc < 20:
        return "low_battery"
    if grid > 10:
        return "grid_import"
    return "normal"

def generate_records() -> list:
    base_time = datetime(2026, 6, 30, 0, 0, 0, tzinfo=timezone.utc)
    battery_soc = 60.0
    records = []

    for hour in range(24):
        ts = base_time + timedelta(hours=hour)
        solar = _solar_kw(hour)
        load = _load_kw(hour)

        # Net power: positive means excess (charge battery / export), negative means deficit
        net = solar - load

        # Generator kicks in when battery is low and solar is insufficient
        generator_kw = 0.0
        if battery_soc < 20 and net < 0:
            generator_kw = round(min(abs(net), 15.0), 2)

        # Battery absorbs/provides up to 10 kW, SOC bounded 0-100
        battery_delta = net + generator_kw
        battery_change = max(-10.0, min(10.0, battery_delta))
        battery_soc = round(max(0.0, min(100.0, battery_soc + battery_change)), 1)

        # Grid makes up any remaining imbalance
        grid_kw = round(net + generator_kw - battery_change, 2)

        record = {
            "timestamp": ts.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "site_id": SITE_ID,
            "solar_kw": solar,
            "load_kw": load,
            "battery_soc": battery_soc,
            "generator_kw": generator_kw,
            "grid_kw": grid_kw,
            "site_status": _site_status(solar, battery_soc, grid_kw),
        }
        records.append(record)

    return records

def main() -> None:
    records = generate_records()
    out_path = os.path.normpath(OUTPUT_PATH)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(records, f, indent=2)
    print(f"Wrote {len(records)} records to {out_path}")

if __name__ == "__main__":
    main()
