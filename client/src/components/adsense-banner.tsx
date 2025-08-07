import { Card } from "@/components/ui/card";

interface AdSenseBannerProps {
  slot?: string;
  className?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
}

export default function AdSenseBanner({ 
  slot = "demo-slot", 
  className = "",
  format = "auto" 
}: AdSenseBannerProps) {
  return (
    <Card className={`bg-slate-50 border-2 border-dashed border-slate-300 p-6 text-center ${className}`}>
      <div className="text-slate-400 text-sm mb-2">Google AdSense</div>
      <div className="text-slate-600 text-xs">
        Slot: {slot} | Format: {format}
      </div>
      <div className="text-slate-500 text-xs mt-2">
        Iklan akan muncul di sini setelah Google AdSense diaktifkan
      </div>
    </Card>
  );
}