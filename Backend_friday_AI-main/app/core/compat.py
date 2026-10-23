"""Python 3.9 runtime compatibility shim for SQLAlchemy and Pydantic."""

from __future__ import annotations

import sys

# Ensure eval_type_backport is active for Pydantic and SQLAlchemy on Python < 3.10
try:
    import eval_type_backport  # noqa: F401
    import typing
    import sqlalchemy.util.typing as sa_typing

    _orig_eval_expression = sa_typing.eval_expression

    def _compat_eval_expression(expression: str, module_name: str, *, locals_=None, in_class=None):
        try:
            return _orig_eval_expression(expression, module_name, locals_=locals_, in_class=in_class)
        except Exception:
            base_globals = sys.modules[module_name].__dict__
            ns = dict(base_globals)
            if in_class is not None:
                ns.update(in_class.__dict__)
                ns.setdefault(in_class.__name__, in_class)
                ns.update(base_globals)
            f_ref = typing.ForwardRef(expression)
            return eval_type_backport.eval_type_backport(f_ref, ns, locals_ or {})

    sa_typing.eval_expression = _compat_eval_expression
except Exception:
    pass
