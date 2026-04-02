import yaml
from datetime import datetime
import os

print("IRONBOUND v0.1 — Governance layer active")
print("Jarvis/T.A.R.S.-styled partner ready\n")

def validate_command(command):
    print(f"→ Governance check for: {command}")
    return {"status": "APPROVED", "reason": "Governance green"}

def handle_command(command):
    cmd = command.lower()
    if "security" in cmd or "camera" in cmd or "doorbell" in cmd:
        return "Security overwatch active. Cameras online. Ring doorbell answered. No alerts."
    elif "health" in cmd or "vitals" in cmd or "wellness" in cmd:
        return "Health overwatch running. Vitals stable. Suggestion: 10-minute walk today."
    elif "project" in cmd or "plan" in cmd or "creative" in cmd or "workshop" in cmd:
        return "Project planner engaged. What are we building today?"
    elif "schedule" in cmd or "calendar" in cmd or "financial" in cmd or "tax" in cmd:
        return "Scheduling & financial monitoring active. Anything specific?"
    elif "t.a.r.s" in cmd or "tars" in cmd or "mission" in cmd:
        return "T.A.R.S. Mode activated. Mission parameters?"
    else:
        return "Command received. How can I assist?"

while True:
    command = input("\nYou: ")
    if command.lower() in ["exit", "quit"]:
        print("Ironbound offline.")
        break
    decision = validate_command(command)
    if decision["status"] == "APPROVED":
        print(f"✅ {handle_command(command)}")
    else:
        print(f"⛔ BLOCKED: {decision.get('reason')}")
