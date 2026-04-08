import json
from datetime import datetime
from pathlib import Path

from governance_client import evaluate_with_elena


LOG_DIR = Path("logs")
LOG_FILE = LOG_DIR / "partner_runs.jsonl"


def ensure_log_dir() -> None:
    LOG_DIR.mkdir(exist_ok=True)


def write_log(entry: dict) -> None:
    ensure_log_dir()
    with LOG_FILE.open("a", encoding="utf-8") as f:
        f.write(json.dumps(entry) + "\n")


def build_partner_output(user_input: str, governance: dict) -> str:
    decision = governance["decision"]
    reason = governance.get("reason") or "No reason provided."
    safe_alternative = governance.get("safe_alternative")
    response_preview = governance.get("response_preview")

    if decision == "APPROVED":
        return (
            f"APPROVED by E.L.E.N.A.\n"
            f"Intent: {governance['intent']}\n"
            f"Proceeding with partner handling for: {user_input}"
        )

    if decision == "CLARIFICATION_REQUIRED":
        return (
            "E.L.E.N.A. requires clarification before proceeding.\n"
            f"Reason: {reason}\n"
            "Please provide a more specific target, action, or context."
        )

    if decision == "REFUSED":
        return (
            response_preview
            or f"Request refused by E.L.E.N.A.\nReason: {reason}\n"
               f"Safe alternative: {safe_alternative or 'Please reframe the request safely.'}"
        )

    if decision == "ESCALATED":
        return (
            f"Request escalated by E.L.E.N.A.\nReason: {reason}\n"
            "This path should be reviewed or handled more carefully."
        )

    if decision == "HALT":
        return f"E.L.E.N.A. halted execution.\nReason: {reason}"

    return f"Unknown governance result received.\nReason: {reason}"


def run_partner() -> None:
    print("IRONBOUND PARTNER v2")
    print("Governed by E.L.E.N.A.")
    print("Type 'exit' to quit.\n")

    while True:
        user_input = input("You: ").strip()

        if not user_input:
            continue

        if user_input.lower() in {"exit", "quit"}:
            print("Partner session closed.")
            break

        try:
            governance = evaluate_with_elena(user_input)
            final_output = build_partner_output(user_input, governance)

            print("\n--- GOVERNANCE RESULT ---")
            print(f"Decision: {governance['decision']}")
            print(f"Intent: {governance['intent']}")
            print(f"Confidence: {governance['confidence']}")
            print(f"Constraints: {governance['constraints_triggered']}")
            print(f"Drift flags: {governance['drift_flags']}")
            print(f"Endpoint: {governance['endpoint_used']}")
            print("\n--- PARTNER OUTPUT ---")
            print(final_output)
            print()

            write_log({
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "input": user_input,
                "governance": governance,
                "final_output": final_output,
            })

        except Exception as e:
            print(f"\nERROR: {e}\n")


if __name__ == "__main__":
    run_partner()