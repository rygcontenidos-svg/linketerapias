"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

export interface DropdownItem {
  icon: string;
  label: string;
  href?: string;
  value?: string;
}

interface MenuModeProps {
  mode: "menu";
  label: string;
  items: DropdownItem[];
}

interface SelectModeProps {
  mode: "select";
  label: string;
  items: DropdownItem[];
  value: string;
  onChange: (value: string) => void;
}

type NavDropdownProps = MenuModeProps | SelectModeProps;

export function NavDropdown(props: NavDropdownProps & { dark?: boolean }) {
  const { mode, label, items, dark } = props;
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [closeTimer, setCloseTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedValue = mode === "select" ? props.value : "";

  const close = useCallback(() => {
    setOpen(false);
    setFocusedIdx(-1);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [close]);

  function handleTriggerClick() {
    if (open) {
      close();
    } else {
      setOpen(true);
      setFocusedIdx(-1);
    }
  }

  function handleMouseEnter() {
    if (closeTimer) { clearTimeout(closeTimer); setCloseTimer(null); }
    setHover(true);
    setOpen(true);
  }

  function handleMouseLeave() {
    setHover(false);
    const timer = setTimeout(() => {
      setOpen(false);
      setFocusedIdx(-1);
    }, 200);
    setCloseTimer(timer);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
        setFocusedIdx(0);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIdx((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIdx((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (focusedIdx >= 0 && focusedIdx < items.length) {
        const item = items[focusedIdx];
        if (mode === "select") {
          props.onChange(item.value ?? "");
        } else if (item.href) {
          window.location.href = item.href;
        }
        close();
      }
    }
  }

  useEffect(() => {
    if (open && focusedIdx >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll<HTMLElement>("[role=option],a");
      items[focusedIdx]?.focus();
    }
  }, [open, focusedIdx]);

  const selectedItem = mode === "select"
    ? items.find((i) => i.value === selectedValue)
    : null;

  return (
    <div
      ref={ref}
      className={`${mode === "select" ? "flex flex-1" : ""} relative`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={handleTriggerClick}
        className={`flex items-center gap-1 text-[13px] font-medium transition ${
          dark ? "text-white/80 hover:text-white" : "text-muted hover:text-brand"
        } ${
          mode === "select" ? "w-full justify-between px-3 py-2.5" : ""
        }`}
        style={open || hover ? { color: dark ? "#fff" : "var(--brand)" } : undefined}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {mode === "select" && selectedItem ? (
          <span className="flex items-center gap-2">
            <i className={`ti ${selectedItem.icon} text-base`} aria-hidden />
            <span>{selectedItem.label}</span>
          </span>
        ) : (
          label
        )}
        <i
          className={`ti ti-chevron-down text-xs transition ${
            open ? "rotate-180" : ""
          }`}
          style={{ color: open || hover ? (dark ? "#fff" : "var(--brand)") : undefined }}
          aria-hidden
        />
      </button>

      {open && (
        <div
          className={`absolute left-0 top-full z-30 ${
            mode === "menu" ? "pt-3" : "pt-1"
          }`}
          style={{ animation: "navFadeIn 0.15s ease-out" }}
          onMouseEnter={() => { if (closeTimer) { clearTimeout(closeTimer); setCloseTimer(null); } }}
        >
          <div
            className="min-w-[280px] overflow-hidden rounded-xl border border-line bg-surface shadow-lg"
            style={{ boxShadow: "0 12px 34px rgba(94,23,235,0.14)" }}
          >
            <div className="h-[3px] w-full bg-brand" />
            <ul ref={listRef} role={mode === "select" ? "listbox" : undefined} className="flex flex-col gap-1 p-2">
              {items.map((item, i) => {
                const isActive = mode === "select" && item.value === selectedValue;
                const isFocused = focusedIdx === i;
                const inner = (
                  <>
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition"
                      style={{ background: "rgba(94,23,235,0.10)", color: "var(--brand)" }}
                    >
                      <i className={`ti ${item.icon} text-base`} aria-hidden />
                    </div>
                    <span className="flex-1 text-nowrap text-sm">{item.label}</span>
                    {mode === "select" && isActive && (
                      <i
                        className="ti ti-check shrink-0 text-sm"
                        style={{ color: "var(--accent-text)" }}
                        aria-hidden
                      />
                    )}
                  </>
                );

                const itemClasses =
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink transition hover:bg-[rgba(94,23,235,0.06)] hover:text-brand focus:outline-none";

                if (mode === "menu" && item.href) {
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={itemClasses}
                        onClick={close}
                      >
                        {inner}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={item.label} role={mode === "select" ? "option" : undefined} aria-selected={mode === "select" ? isActive : undefined}>
                    <button
                      type="button"
                      className={itemClasses}
                      onClick={() => {
                        if (mode === "select") props.onChange(item.value ?? "");
                        else if (item.href) window.location.href = item.href;
                        close();
                      }}
                      tabIndex={isFocused ? 0 : -1}
                    >
                      {inner}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
