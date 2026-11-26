"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, type MouseEvent } from "react";
import { navigation } from "../salon";
import { Wordmark } from "./editorial";

export function Header() {
  const pathname = usePathname();
  const menu = useRef<HTMLDialogElement>(null);

  function closeAfterSelection(event: MouseEvent<HTMLAnchorElement>) {
    if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) menu.current?.close();
  }

  return (
    <header className="site-header" data-hero-enter>
      <div className="frame header-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/booking" className="button button-outline header-book">Book now</Link>
          <button className="menu-toggle" type="button" aria-label="Open menu" aria-haspopup="dialog" onClick={() => menu.current?.showModal()}>
            <span /><span />
          </button>
        </div>
      </div>
      <dialog ref={menu} className="mobile-menu" aria-label="Main navigation">
        <div className="menu-top">
          <span className="wordmark" aria-hidden="true">nagi<span>.</span></span>
          <button type="button" autoFocus onClick={() => menu.current?.close()}>Close <span aria-hidden="true">×</span></button>
        </div>
        <nav aria-label="Mobile navigation">
          <Link href="/" onClick={closeAfterSelection}>Home</Link>
          {navigation.map((item) => <Link key={item.href} href={item.href} onClick={closeAfterSelection}>{item.label}</Link>)}
          <Link className="menu-book" href="/booking" onClick={closeAfterSelection}>Book now</Link>
        </nav>
      </dialog>
    </header>
  );
}
