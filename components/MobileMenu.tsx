"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuItem } from "@/lib/menu";

export default function MobileMenu({ menuItems }: { menuItems: MenuItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-white p-2 hover:text-gray-300 transition-colors"
        aria-label="Toggle menu"
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 top-16 bg-black z-40 flex flex-col">
          <div className="px-6 py-4">
            {menuItems.map((item) => (
              <div key={item.id}>
                <Link
                  href={item.url}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-white font-medium uppercase tracking-wide border-b border-gray-900 hover:text-gray-300 transition-colors"
                >
                  {item.title}
                </Link>
                {item.children && item.children.map((child) => (
                  <Link
                    key={child.id}
                    href={child.url}
                    onClick={() => setOpen(false)}
                    className="block py-3 pl-4 text-gray-400 text-sm uppercase tracking-wide hover:text-white transition-colors"
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-center text-white text-sm font-semibold uppercase tracking-wide px-5 py-3 border border-gray-600 hover:border-white transition-colors rounded-sm"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="text-center bg-white text-black text-sm font-bold uppercase tracking-wide px-5 py-3 hover:bg-gray-200 transition-colors rounded-sm"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
