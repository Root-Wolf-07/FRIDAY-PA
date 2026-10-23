"""Security headers middleware for FastAPI."""
from __future__ import annotations

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Enforces standard defensive HTTP security headers on all responses."""

    async def dispatch(self, request: Request, call_next) -> Response:
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: ws: wss: http: https: capacitor: ionic:; "
            "connect-src 'self' * ws: wss: http: https: data: blob:; "
            "img-src 'self' data: blob: http: https: capacitor: ionic:; "
            "media-src 'self' data: blob: http: https:; "
            "font-src 'self' data: https://fonts.gstatic.com; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "frame-src 'self' https://sketchfab.com https://*.sketchfab.com blob: data:; "
            "frame-ancestors 'self';"
        )
        return response
