"use client";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { primaryLinks, navigationGroups, headerAction } from "@/content/fr";

function SignInIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 4h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-5M3 12h12m-4-4 4 4-4 4" />
    </svg>
  );
}

export function Header({ memberUrl = "/login" }: { memberUrl?: string }) {
  const pathname = usePathname();
  return (
    <HeaderNavigation
      key={pathname}
      pathname={pathname}
      memberUrl={memberUrl}
    />
  );
}

function HeaderNavigation({
  pathname,
  memberUrl,
}: {
  pathname: string;
  memberUrl: string;
}) {
  const [mobile, setMobile] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const close = () => {
    setMobile(false);
    setOpenGroup(null);
  };
  useEffect(() => {
    if (!mobile) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    header.current
      ?.querySelector<HTMLAnchorElement>(".header-actions a")
      ?.focus();
    function trap(event: KeyboardEvent) {
      if (event.key !== "Tab") return;
      const elements = Array.from(
        header.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [],
      ).filter((element) => element.getClientRects().length > 0);
      const first = elements[0],
        last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener("keydown", trap);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", trap);
    };
  }, [mobile]);
  useEffect(() => {
    function key(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (openGroup) {
        header.current
          ?.querySelector<HTMLButtonElement>(
            `[aria-controls="${openGroup}-menu"]`,
          )
          ?.focus();
        setOpenGroup(null);
      } else if (mobile) {
        setMobile(false);
        mobileButton.current?.focus();
      }
    }
    function outside(e: PointerEvent) {
      if (!header.current?.contains(e.target as Node)) {
        setOpenGroup(null);
        setMobile(false);
      }
    }
    const breakpoint = window.matchMedia("(min-width: 1280px)");
    function resize() {
      setMobile(false);
      setOpenGroup(null);
    }
    breakpoint.addEventListener("change", resize);
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => {
      breakpoint.removeEventListener("change", resize);
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", outside);
    };
  }, [mobile, openGroup]);
  const active = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
  return (
    <header
      ref={header}
      className="site-header"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) close();
      }}
    >
      <div className="wrap header-inner">
        <Link
          href="/"
          onClick={close}
          className="header-brand"
          aria-label="SEAFA — Accueil"
        >
          <BrandLogo
            variant="main"
            sizes="56px"
            className="h-12 w-auto object-contain"
          />
          <span>
            <span className="block text-xl font-black tracking-[0.12em]">
              SEAFA
            </span>
            <span className="header-motto">
              Football · Fraternité · Communauté
            </span>
          </span>
        </Link>
        <button
          ref={mobileButton}
          type="button"
          aria-expanded={mobile}
          aria-controls="site-navigation"
          onClick={() => {
            setMobile(!mobile);
            setOpenGroup(null);
          }}
          className="header-toggle"
        >
          {mobile ? "Fermer" : "Menu"}
          <svg
            aria-hidden="true"
            focusable="false"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path
              d={mobile ? "m6 6 12 12M6 18 18 6" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
        <nav
          id="site-navigation"
          aria-label="Navigation principale"
          className={`header-navigation ${mobile ? "is-open" : ""}`}
        >
          <div className="header-links">
            {navigationGroups.map((group) => (
              <div
                key={group.id}
                className="header-group"
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget))
                    setOpenGroup((current) =>
                      current === group.id ? null : current,
                    );
                }}
              >
                <button
                  type="button"
                  className="header-link"
                  data-active={
                    group.links.some((link) => active(link.href)) || undefined
                  }
                  aria-expanded={openGroup === group.id}
                  aria-controls={`${group.id}-menu`}
                  onClick={() =>
                    setOpenGroup(openGroup === group.id ? null : group.id)
                  }
                >
                  {group.label}
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div
                  id={`${group.id}-menu`}
                  className="header-dropdown"
                  hidden={openGroup !== group.id}
                >
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={close}
                      aria-current={active(link.href) ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="header-link"
                aria-current={active(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="header-actions">
            <Link
              href={memberUrl}
              onClick={close}
              className="header-login"
              aria-current={active("/login") ? "page" : undefined}
            >
              <SignInIcon />
              Espace membre
            </Link>
            <Link
              href={headerAction.href}
              onClick={close}
              className="header-join"
              aria-current={active(headerAction.href) ? "page" : undefined}
            >
              {headerAction.label}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
