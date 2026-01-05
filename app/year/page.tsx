import { sanity } from "@/utilities/sanity";
import YearPixelsClient from "./YearPixelsClient";

export const dynamic = "force-dynamic";

type DayLog = {
  _id: string;
  date: string;
  color: string;
  note?: string;
  mood?: string;
  tags?: string[];
  image?: {
    asset: {
      _id: string;
      url: string;
    };
  };
};

export default async function YearInPixelsPage() {
  const currentYear = new Date().getFullYear();
  
  const dayLogs: DayLog[] = await sanity.fetch(`
    *[_type == "dayLog" && date >= "${currentYear}-01-01" && date <= "${currentYear}-12-31"] {
      _id,
      date,
      color,
      note,
      mood,
      tags,
      image{ asset->{_id, url} }
    } | order(date asc)
  `);

  return <YearPixelsClient initialLogs={dayLogs} currentYear={currentYear} />;
}