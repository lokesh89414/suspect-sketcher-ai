import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ExpressionSectionProps {
  values: {
    generalLook: string;
    eyeExpression: string;
    mouthExpression: string;
  };
  onChange: (field: string, value: string) => void;
}

export const ExpressionSection = ({ values, onChange }: ExpressionSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Expression / Emotion</h3>
      </div>

      <div className="space-y-2">
        <Label className="text-base">General Look</Label>
        <RadioGroup value={values.generalLook} onValueChange={(val) => onChange('generalLook', val)}>
          {['Neutral', 'Angry', 'Smiling', 'Nervous', 'Surprised', 'Sad'].map((look) => (
            <div key={look} className="flex items-center space-x-2">
              <RadioGroupItem value={look.toLowerCase()} id={`look-${look}`} />
              <Label htmlFor={`look-${look}`} className="font-normal cursor-pointer">{look}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Eyes</Label>
        <RadioGroup value={values.eyeExpression} onValueChange={(val) => onChange('eyeExpression', val)}>
          {['Wide', 'Narrow', 'Squinted'].map((expression) => (
            <div key={expression} className="flex items-center space-x-2">
              <RadioGroupItem value={expression.toLowerCase()} id={`eye-expr-${expression}`} />
              <Label htmlFor={`eye-expr-${expression}`} className="font-normal cursor-pointer">{expression}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Mouth Corners</Label>
        <RadioGroup value={values.mouthExpression} onValueChange={(val) => onChange('mouthExpression', val)}>
          {['Upturned', 'Downturned'].map((expression) => (
            <div key={expression} className="flex items-center space-x-2">
              <RadioGroupItem value={expression.toLowerCase()} id={`mouth-expr-${expression}`} />
              <Label htmlFor={`mouth-expr-${expression}`} className="font-normal cursor-pointer">{expression}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
