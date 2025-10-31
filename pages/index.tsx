// pages/index.tsx
import { useMemo, useState, useEffect } from "react";
import { HERO_BG, PRESET_FILTERS, PROPERTYLISTINGSAMPLE } from "@/constants";
import Pill from "@/components/common/Pill";
import PropertyCard from "@/components/common/PropertyCard";
import type { PropertyProps } from "@/interfaces";
import axios from "axios";

const filterPredicate = (p: PropertyProps, active: Set<string>) => {
  if (active.size === 0) return true;

  return Array.from(active).every((label) => {
    if (label === "Top Villa") return p.rating >= 4.85;
    const lc = label.toLowerCase();
    return p.category.some((c) => c.toLowerCase().includes(lc));
  });
};

export default function HomePage() {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleFilter = (label: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const filtered = useMemo(
    () =>
      PROPERTYLISTINGSAMPLE.filter((p) => filterPredicate(p, activeFilters)),
    [activeFilters]
  );

  return (
    <>
      <section
        className="relative"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-20 text-white md:py-28">
          <h1 className="max-w-2xl text-3xl font-bold md:text-5xl">
            Find your favorite place here!
          </h1>
          <p className="max-w-2xl text-lg md:text-xl">
            The best prices for over 2 million properties worldwide.
          </p>

          <div className="mt-4 flex w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-2 shadow-lg">
            <input
              placeholder="Try 'Bali', 'Mountain View', 'Beachfront'..."
              className="w-full rounded-xl px-3 py-2 text-gray-800 outline-none"
            />
            <button className="rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-3 text-sm text-gray-600">Filters</div>
        <div className="flex flex-wrap gap-2">
          {PRESET_FILTERS.map((label) => (
            <Pill
              key={label}
              label={label}
              active={activeFilters.has(label)}
              onToggle={toggleFilter}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {filtered.length} places {activeFilters.size > 0 ? "found" : ""}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <PropertyCard key={item.name} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
