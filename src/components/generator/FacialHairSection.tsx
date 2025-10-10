import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface FacialHairSectionProps {
  gender: string;
  values: {
    beard: string;
    beardStyle: string;
    moustache: string;
    sideburns: string;
  };
  onChange: (field: string, value: string) => void;
}

export const FacialHairSection = ({ gender, values, onChange }: FacialHairSectionProps) => {
  if (gender !== 'male') {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Facial Hair</h3>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Beard</Label>
        <RadioGroup value={values.beard} onValueChange={(val) => onChange('beard', val)}>
          {['None', 'Stubble', 'Short', 'Medium', 'Full long'].map((beard) => (
            <div key={beard} className="flex items-center space-x-2">
              <RadioGroupItem value={beard.toLowerCase().replace(' ', '-')} id={`beard-${beard}`} />
              <Label htmlFor={`beard-${beard}`} className="font-normal cursor-pointer">{beard}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {values.beard !== 'none' && values.beard && (
        <div className="space-y-2">
          <Label className="text-base">Beard Style</Label>
          <RadioGroup value={values.beardStyle} onValueChange={(val) => onChange('beardStyle', val)}>
            {['Full', 'Goatee', 'French', 'Chin strap', 'Soul patch', 'Other'].map((style) => (
              <div key={style} className="flex items-center space-x-2">
                <RadioGroupItem value={style.toLowerCase().replace(' ', '-')} id={`beard-style-${style}`} />
                <Label htmlFor={`beard-style-${style}`} className="font-normal cursor-pointer">{style}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-base">Moustache</Label>
        <RadioGroup value={values.moustache} onValueChange={(val) => onChange('moustache', val)}>
          {['None', 'Thin', 'Thick', 'Handlebar', 'Pencil', 'Other'].map((moustache) => (
            <div key={moustache} className="flex items-center space-x-2">
              <RadioGroupItem value={moustache.toLowerCase()} id={`moustache-${moustache}`} />
              <Label htmlFor={`moustache-${moustache}`} className="font-normal cursor-pointer">{moustache}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Sideburns</Label>
        <RadioGroup value={values.sideburns} onValueChange={(val) => onChange('sideburns', val)}>
          {['None', 'Short', 'Medium', 'Long', 'Connected to beard'].map((sideburn) => (
            <div key={sideburn} className="flex items-center space-x-2">
              <RadioGroupItem value={sideburn.toLowerCase().replace(' ', '-')} id={`sideburn-${sideburn}`} />
              <Label htmlFor={`sideburn-${sideburn}`} className="font-normal cursor-pointer">{sideburn}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
