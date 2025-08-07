import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon, Megaphone } from "lucide-react";

interface AdSpaceProps {
  type?: "adsense" | "sponsor";
}

export default function AdSpace({ type = "adsense" }: AdSpaceProps) {
  if (type === "sponsor") {
    return (
      <Card className="border-2 border-dashed border-slate-300 bg-slate-100">
        <CardContent className="p-6 text-center">
          <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-500 text-sm font-medium">Sponsor Image</p>
          <p className="text-slate-400 text-xs">300x200 px</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-dashed border-slate-300 bg-slate-100 mb-6">
      <CardContent className="p-6 text-center">
        <Megaphone className="w-12 h-12 text-slate-400 mx-auto mb-2" />
        <p className="text-slate-500 text-sm font-medium">Google AdSense</p>
        <p className="text-slate-400 text-xs">300x250 px</p>
        <div className="mt-4 text-xs text-slate-400">
          <p>Tempat untuk iklan Google AdSense</p>
          <p>atau konten sponsor lainnya</p>
        </div>
      </CardContent>
    </Card>
  );
}
