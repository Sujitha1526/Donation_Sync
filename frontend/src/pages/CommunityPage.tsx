import { useEffect, useState } from "react";
import { getDonations } from "@/api";
import { Donation } from "@/types";

export default function Community() {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDonations();
        setDonations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6 text-white">

      {/* 🔥 TITLE */}
      <div>
        <h1 className="text-2xl font-bold">Community Feed</h1>
        <p className="text-sm text-gray-400">
          Live donation activity across platform
        </p>
      </div>

      {/* 🔥 GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {donations.length === 0 && (
          <p className="text-gray-400">No donations found</p>
        )}

        {donations.map((d) => {

          // 🎯 Emoji mapping
          const emoji =
            d.category === "food" ? "🍎" :
            d.category === "clothes" ? "👕" :
            d.category === "books" ? "📚" : "🎁";

          // 🎯 Status color
          const statusColor =
            d.status === "completed" ? "bg-green-500/20 text-green-400" :
            d.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
            d.status === "requested" ? "bg-orange-500/20 text-orange-400" :
            "bg-gray-500/20 text-gray-400";

          return (
            <div
              key={d._id}
              className="p-5 rounded-2xl 
              bg-gradient-to-br from-white/5 to-white/0 
              border border-white/10 shadow 
              hover:shadow-xl hover:scale-[1.02] 
              transition-all duration-300"
            >

              {/* 🔥 HEADER */}
              <div className="flex justify-between items-start">

                <div>
                  <h3 className="text-lg font-semibold">
                    {emoji} {d.details?.title || "Donation"}
                  </h3>

                  <div className="flex gap-2 mt-2">
                    <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400 capitalize">
                      {d.category}
                    </span>

                    <span className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-400">
                      Qty: {d.quantity}
                    </span>
                  </div>
                </div>

                {/* 🔥 STATUS */}
                <span className={`text-xs px-3 py-1 rounded-full ${statusColor}`}>
                  {d.status}
                </span>
              </div>

              {/* 🔥 DETAILS */}
              <div className="mt-4 text-sm text-gray-400 space-y-2">

                <p>
  👤 <span className="text-gray-300">Donor:</span>{" "}
  {d.donor?.name || "Unknown"}
</p>

<p>
  🏢 <span className="text-gray-300">Organization:</span>{" "}
  {d.organization?.name || "Not assigned"}
</p>

<p>
  🤝 <span className="text-gray-300">Volunteer:</span>{" "}
  {d.volunteer?.name || "Not assigned"}
</p>

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}