"""Structured logging with redaction filters."""
from __future__ import annotations

import logging
import re
import sys

# Sensitive pattern regexes
SENSITIVE_PATTERNS = [
    (
        re.compile(
            r"(?i)(api[_-]?key|secret|token|password|bearer|authorization)\s*[:=]\s*([^\s,;]+)"
        ),
        r"\1: [REDACTED]",
    ),
    (re.compile(r"ghp_[A-Za-z0-9]{36}"), "[REDACTED_GITHUB_TOKEN]"),
    (re.compile(r"gho_[A-Za-z0-9]{36}"), "[REDACTED_GITHUB_OAUTH]"),
    (re.compile(r"-----BEGIN [A-Z ]+ PRIVATE KEY-----"), "[REDACTED_PRIVATE_KEY]"),
]


def redact_sensitive_text(text: str) -> str:
    """Redact sensitive credentials and tokens from text."""
    if not isinstance(text, str):
        return text
    redacted = text
    for pattern, replacement in SENSITIVE_PATTERNS:
        redacted = pattern.sub(replacement, redacted)
    return redacted


class RedactingFormatter(logging.Formatter):
    """Custom formatter that redacts sensitive tokens before outputting."""

    def __init__(self, fmt=None, datefmt=None, style='%', validate=True, defaults=None):
        if sys.version_info >= (3, 10):
            super().__init__(fmt=fmt, datefmt=datefmt, style=style, validate=validate, defaults=defaults)
        else:
            super().__init__(fmt=fmt, datefmt=datefmt, style=style, validate=validate)
            self._defaults = defaults or {}

    def format(self, record: logging.LogRecord) -> str:
        if not hasattr(record, "request_id"):
            record.request_id = getattr(self, "_defaults", {}).get("request_id", "-")
        original = super().format(record)
        return redact_sensitive_text(original)


def setup_logging(level: str = "INFO") -> logging.Logger:
    """Configure root and application loggers."""
    log_level = getattr(logging, level.upper(), logging.INFO)

    handler = logging.StreamHandler(sys.stdout)
    formatter = RedactingFormatter(
        "%(asctime)s [%(levelname)s] [%(name)s] [req:%(request_id)s] %(message)s",
        defaults={"request_id": "-"},
    )
    handler.setFormatter(formatter)

    logger = logging.getLogger("friday")
    logger.setLevel(log_level)
    logger.handlers.clear()
    logger.addHandler(handler)
    logger.propagate = False

    return logger


logger = setup_logging()
