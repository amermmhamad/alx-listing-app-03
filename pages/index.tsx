import axios from "axios";
import { useEffect, useState } from "react";
import PropertyCard from "@/components/common/PropertyCard";

export type Property = {
  id: string | number;
  title: string;
  price: number;           
  location: string;        
  imageUrl: string;        
  bedrooms?: number;
  bathrooms?: number;
  areaSqm?: number;
};

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get<Property[]>("/api/properties", {
          signal: controller.signal,
        });
        setProperties(res.data ?? []);
      } catch (err: any) {
        if (axios.isCancel(err)) return;
        console.error("Error fetching properties:", err);
        setError("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border p-4 space-y-3"
          >
            <div className="h-40 w-full rounded-md bg-gray-200" />
            <div className="h-5 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-600 font-medium">
        {error} Please try again later.
      </p>
    );
  }

  if (!properties.length) {
    return <p className="text-gray-500">No properties found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
