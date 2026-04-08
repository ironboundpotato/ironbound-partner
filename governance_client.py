import json
import urllib.request
import urllib.error


BASE_URL = "http://127.0.0.1:8000"
CANDIDATE_ENDPOINTS = [
    "/evaluate",
    "/govern",
    "/decision",
    "/classify",
]


def _normalize_decision(value: str) -> str:
    if not value:
        return "UNKNOWN"

    value = value.strip().lower()

    mapping = {
        "allow": "APPROVED",
        "approved": "APPROVED",
        "execute": "APPROVED",
        "allow_with_warning": "APPROVED",
        "ask_for_clarification": "CLARIFICATION_REQUIRED",
        "clarification_required": "CLARIFICATION_REQUIRED",
        "clarify": "CLARIFICATION_REQUIRED",
        "refuse": "REFUSED",
        "refused": "REFUSED",
        "blocked": "REFUSED",
        "redirect_to_safe_mode": "REFUSED",
        "escalate": "ESCALATED",
        "escalated": "ESCALATED",
        "halt": "HALT",
        "stop": "HALT",
    }

    return mapping.get(value, value.upper())


def _extract_list(payload: dict, *keys: str) -> list:
    for key in keys:
        value = payload.get(key)
        if isinstance(value, list):
            return value
    return []


def evaluate_with_elena(prompt: str) -> dict:
    body = {
        "prompt": prompt
    }
    data = json.dumps(body).encode("utf-8")
    headers = {"Content-Type": "application/json"}

    last_error = None

    for endpoint in CANDIDATE_ENDPOINTS:
        url = f"{BASE_URL}{endpoint}"
        req = urllib.request.Request(url, data=data, headers=headers, method="POST")

        try:
            with urllib.request.urlopen(req, timeout=10) as response:
                raw = response.read().decode("utf-8")
                payload = json.loads(raw)

                decision = payload.get("decision") or payload.get("route") or "UNKNOWN"

                normalized = {
                    "decision": _normalize_decision(decision),
                    "intent": payload.get("intent", "unknown"),
                    "confidence": payload.get("confidence", 0.0),
                    "constraints_triggered": _extract_list(
                        payload,
                        "constraints_triggered",
                        "triggered_constraints",
                    ),
                    "drift_flags": _extract_list(payload, "drift_flags"),
                    "safe_alternative": payload.get("safe_alternative"),
                    "reason": payload.get("reason", "No reason provided."),
                    "response_preview": payload.get("response_preview"),
                    "raw": payload,
                    "endpoint_used": endpoint,
                }
                return normalized

        except urllib.error.HTTPError as e:
            last_error = f"{endpoint} returned HTTP {e.code}"
        except urllib.error.URLError as e:
            last_error = f"{endpoint} failed: {e.reason}"
        except Exception as e:
            last_error = f"{endpoint} failed: {e}"

    raise RuntimeError(
        f"Could not reach a working E.L.E.N.A. decision endpoint at {BASE_URL}. "
        f"Last error: {last_error}"
    )