import Image from "next/image";
import { Property } from "@/pages";

type Props = {
  property: Property;
};

export default function PropertyCard({ property }: Props) {
  const {
    title,
    price,
    location,
    imageUrl,
    bedrooms,
    bathrooms,
    areaSqm,
  } = property;

  return (
    <article className="rounded-lg overflow-hidden border bg-white shadow-sm hover:shadow-md transition">
      <div className="relative h-48 w-full">
        {/* If using external domains, add them to next.config.js images.domains */}
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{location}</p>

        <p className="text-base font-semibold">
          {new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(price)}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          {typeof bedrooms === "number" && <span>{bedrooms} bd</span>}
          {typeof bathrooms === "number" && <span>{bathrooms} ba</span>}
          {typeof areaSqm === "number" && <span>{areaSqm} m²</span>}
        </div>

        <button className="w-full mt-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50">
          View Details
        </button>
      </div>
    </article>
  );
}
