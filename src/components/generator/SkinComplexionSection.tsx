import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface SkinComplexionSectionProps {
  values: {
    skinTone: string;
    marks: string;
  };
  onChange: (field: string, value: string) => void;
}

const skinTones = [
  { id: "very-fair", label: "Very Fair", color: "hsl(30, 50%, 95%)" },
  { id: "fair", label: "Fair", color: "hsl(30, 45%, 85%)" },
  { id: "wheatish", label: "Wheatish", color: "hsl(30, 40%, 70%)" },
  { id: "dusky", label: "Dusky", color: "hsl(30, 35%, 55%)" },
  { id: "brown", label: "Brown", color: "hsl(30, 30%, 40%)" },
  { id: "dark", label: "Dark", color: "hsl(30, 25%, 25%)" },
  { id: "very-dark", label: "Very Dark", color: "hsl(30, 20%, 15%)" },
];

export const SkinComplexionSection = ({ values, onChange }: SkinComplexionSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Skin / Complexion</h3>
      </div>

      <div className="space-y-3">
        <Label className="text-base">Skin Tone *</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {skinTones.map((tone) => (
            <button
              key={tone.id}
              type="button"
              onClick={() => onChange('skinTone', tone.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:shadow-md",
                values.skinTone === tone.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <div
                className="w-16 h-16 rounded-full border-2 border-border shadow-sm"
                style={{ backgroundColor: tone.color }}
              />
              <span className="text-sm font-medium text-center">{tone.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="marks" className="text-base">Distinguishing Marks</Label>
        <Textarea
          id="marks"
          placeholder="Describe any scars, moles, blemishes, birthmarks..."
          value={values.marks}
          onChange={(e) => onChange('marks', e.target.value)}
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};
