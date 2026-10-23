"""UTC datetime helpers for Python 3.12+ compatibility."""
from __future__ import annotations

try:
    from datetime import UTC, datetime
except ImportError:
    from datetime import datetime, timezone
    UTC = timezone.utc


def utc_now() -> datetime:
    """Return naive UTC datetime without Python 3.12 deprecation warning."""
    return datetime.now(UTC).replace(tzinfo=None)
