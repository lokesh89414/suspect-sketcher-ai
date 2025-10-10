import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Question {
  id: string;
  question: string;
  type: "radio" | "input" | "textarea" | "select" | "checkbox" | "image-select";
  options?: { label: string; value: string; image?: string }[];
  required?: boolean;
  conditional?: { field: string; value: string };
}

const questions: Question[] = [
  {
    id: "gender",
    question: "What is the suspect's gender?",
    type: "radio",
    required: true,
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
  },
  {
    id: "age",
    question: "Approximate age of the suspect?",
    type: "input",
    required: true,
  },
  {
    id: "height",
    question: "Approximate height (optional, in cm)?",
    type: "input",
  },
  {
    id: "region",
    question: "Apparent region or ethnicity?",
    type: "select",
    required: true,
    options: [
      { label: "South Indian", value: "south_indian" },
      { label: "North Indian", value: "north_indian" },
      { label: "North-East Indian", value: "northeast_indian" },
      { label: "Foreign", value: "foreign" },
      { label: "Don't know", value: "unknown" },
    ],
  },
  {
    id: "skinTone",
    question: "What is the skin tone?",
    type: "image-select",
    required: true,
    options: [
      { label: "Very Fair", value: "very_fair", image: "#FFE4C4" },
      { label: "Fair", value: "fair", image: "#F5D0A9" },
      { label: "Wheatish", value: "wheatish", image: "#D2B48C" },
      { label: "Dusky", value: "dusky", image: "#C19A6B" },
      { label: "Brown", value: "brown", image: "#8B7355" },
      { label: "Dark", value: "dark", image: "#654321" },
      { label: "Very Dark", value: "very_dark", image: "#3E2723" },
    ],
  },
  {
    id: "distinguishingMarks",
    question: "Any distinguishing marks on the face? (scars, moles, blemishes)",
    type: "textarea",
  },
  {
    id: "faceShape",
    question: "What is the face shape?",
    type: "radio",
    required: true,
    options: [
      { label: "Round", value: "round" },
      { label: "Oval", value: "oval" },
      { label: "Square", value: "square" },
      { label: "Rectangular", value: "rectangular" },
      { label: "Diamond", value: "diamond" },
      { label: "Heart-shaped", value: "heart" },
    ],
  },
  {
    id: "jawline",
    question: "Describe the jawline",
    type: "radio",
    options: [
      { label: "Prominent", value: "prominent" },
      { label: "Soft", value: "soft" },
      { label: "Pointed", value: "pointed" },
      { label: "Wide", value: "wide" },
    ],
  },
  {
    id: "chin",
    question: "Describe the chin",
    type: "radio",
    options: [
      { label: "Pointed", value: "pointed" },
      { label: "Round", value: "round" },
      { label: "Dimpled", value: "dimpled" },
      { label: "Broad", value: "broad" },
    ],
  },
  {
    id: "forehead",
    question: "Describe the forehead",
    type: "radio",
    options: [
      { label: "High", value: "high" },
      { label: "Low", value: "low" },
      { label: "Broad", value: "broad" },
      { label: "Narrow", value: "narrow" },
    ],
  },
  {
    id: "hairLength",
    question: "Hair length?",
    type: "radio",
    required: true,
    options: [
      { label: "Bald", value: "bald" },
      { label: "Very short", value: "very_short" },
      { label: "Short", value: "short" },
      { label: "Medium", value: "medium" },
      { label: "Long", value: "long" },
    ],
  },
  {
    id: "hairColor",
    question: "Hair color?",
    type: "image-select",
    required: true,
    conditional: { field: "hairLength", value: "bald" },
    options: [
      { label: "Black", value: "black", image: "#000000" },
      { label: "Dark Brown", value: "dark_brown", image: "#3E2723" },
      { label: "Light Brown", value: "light_brown", image: "#8B4513" },
      { label: "Grey", value: "grey", image: "#808080" },
      { label: "Dyed/Highlights", value: "dyed", image: "#D4AF37" },
    ],
  },
  {
    id: "hairTexture",
    question: "Hair texture?",
    type: "radio",
    conditional: { field: "hairLength", value: "bald" },
    options: [
      { label: "Straight", value: "straight" },
      { label: "Wavy", value: "wavy" },
      { label: "Curly", value: "curly" },
      { label: "Coily", value: "coily" },
    ],
  },
  {
    id: "hairline",
    question: "Hairline type?",
    type: "radio",
    conditional: { field: "hairLength", value: "bald" },
    options: [
      { label: "Normal", value: "normal" },
      { label: "Receding", value: "receding" },
      { label: "Widow's Peak", value: "widows_peak" },
      { label: "High", value: "high" },
    ],
  },
  {
    id: "hairAccessories",
    question: "Any hair accessories?",
    type: "checkbox",
    options: [
      { label: "Cap", value: "cap" },
      { label: "Scarf", value: "scarf" },
      { label: "Hat", value: "hat" },
      { label: "Hair clips/flowers", value: "clips" },
      { label: "None", value: "none" },
    ],
  },
  {
    id: "beard",
    question: "Beard type?",
    type: "radio",
    conditional: { field: "gender", value: "male" },
    options: [
      { label: "None", value: "none" },
      { label: "Stubble", value: "stubble" },
      { label: "Short", value: "short" },
      { label: "Medium", value: "medium" },
      { label: "Full long", value: "full_long" },
    ],
  },
  {
    id: "beardStyle",
    question: "Beard style?",
    type: "image-select",
    conditional: { field: "gender", value: "male" },
    options: [
      { label: "Full", value: "full", image: "🧔" },
      { label: "Goatee", value: "goatee", image: "🧔‍♂️" },
      { label: "French", value: "french", image: "🧔" },
      { label: "Chin strap", value: "chin_strap", image: "🧔" },
      { label: "Soul patch", value: "soul_patch", image: "🧔" },
      { label: "Other", value: "other", image: "🧔" },
    ],
  },
  {
    id: "moustache",
    question: "Moustache type?",
    type: "image-select",
    conditional: { field: "gender", value: "male" },
    options: [
      { label: "None", value: "none", image: "😐" },
      { label: "Thin", value: "thin", image: "🥸" },
      { label: "Thick", value: "thick", image: "🥸" },
      { label: "Handlebar", value: "handlebar", image: "🥸" },
      { label: "Pencil", value: "pencil", image: "🥸" },
      { label: "Other", value: "other", image: "🥸" },
    ],
  },
  {
    id: "sideburns",
    question: "Sideburns?",
    type: "radio",
    conditional: { field: "gender", value: "male" },
    options: [
      { label: "None", value: "none" },
      { label: "Short", value: "short" },
      { label: "Medium", value: "medium" },
      { label: "Long", value: "long" },
      { label: "Connected to beard", value: "connected" },
    ],
  },
  {
    id: "eyeShape",
    question: "Eye shape?",
    type: "radio",
    required: true,
    options: [
      { label: "Almond", value: "almond" },
      { label: "Round", value: "round" },
      { label: "Hooded", value: "hooded" },
      { label: "Slanted", value: "slanted" },
      { label: "Deep-set", value: "deep_set" },
    ],
  },
  {
    id: "eyeSize",
    question: "Eye size?",
    type: "radio",
    options: [
      { label: "Small", value: "small" },
      { label: "Average", value: "average" },
      { label: "Large", value: "large" },
    ],
  },
  {
    id: "eyeColor",
    question: "Eye color?",
    type: "image-select",
    required: true,
    options: [
      { label: "Black", value: "black", image: "#1a1a1a" },
      { label: "Brown", value: "brown", image: "#5C4033" },
      { label: "Hazel", value: "hazel", image: "#8E7618" },
      { label: "Grey", value: "grey", image: "#A8A8A8" },
      { label: "Other", value: "other", image: "#4682B4" },
    ],
  },
  {
    id: "eyebrows",
    question: "Eyebrow type?",
    type: "radio",
    options: [
      { label: "Thick", value: "thick" },
      { label: "Thin", value: "thin" },
      { label: "Arched", value: "arched" },
      { label: "Straight", value: "straight" },
      { label: "Bushy", value: "bushy" },
      { label: "Unibrow", value: "unibrow" },
    ],
  },
  {
    id: "eyeAccessories",
    question: "Eye accessories?",
    type: "checkbox",
    options: [
      { label: "Glasses", value: "glasses" },
      { label: "Sunglasses", value: "sunglasses" },
      { label: "None", value: "none" },
    ],
  },
  {
    id: "noseShape",
    question: "Nose shape?",
    type: "radio",
    options: [
      { label: "Sharp", value: "sharp" },
      { label: "Broad", value: "broad" },
      { label: "Flat", value: "flat" },
      { label: "Hooked", value: "hooked" },
      { label: "Pointed", value: "pointed" },
      { label: "Upturned", value: "upturned" },
    ],
  },
  {
    id: "noseSize",
    question: "Nose size?",
    type: "radio",
    options: [
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
    ],
  },
  {
    id: "nostrils",
    question: "Nostril type?",
    type: "radio",
    options: [
      { label: "Narrow", value: "narrow" },
      { label: "Flared", value: "flared" },
    ],
  },
  {
    id: "lipThickness",
    question: "Lip thickness?",
    type: "radio",
    options: [
      { label: "Thin", value: "thin" },
      { label: "Medium", value: "medium" },
      { label: "Full", value: "full" },
    ],
  },
  {
    id: "mouthMarks",
    question: "Any distinguishing marks on mouth/teeth?",
    type: "checkbox",
    options: [
      { label: "Gap teeth", value: "gap_teeth" },
      { label: "Missing tooth", value: "missing_tooth" },
      { label: "Braces", value: "braces" },
      { label: "Gold tooth", value: "gold_tooth" },
      { label: "Other", value: "other" },
      { label: "None", value: "none" },
    ],
  },
  {
    id: "earrings",
    question: "Earrings?",
    type: "checkbox",
    options: [
      { label: "Stud", value: "stud" },
      { label: "Hoop", value: "hoop" },
      { label: "Other", value: "other" },
      { label: "None", value: "none" },
    ],
  },
  {
    id: "chains",
    question: "Visible chains near face/neck?",
    type: "radio",
    options: [
      { label: "None", value: "none" },
      { label: "Present", value: "present" },
    ],
  },
  {
    id: "facialTattoos",
    question: "Facial tattoos?",
    type: "textarea",
  },
  {
    id: "expression",
    question: "General facial expression?",
    type: "radio",
    options: [
      { label: "Neutral", value: "neutral" },
      { label: "Angry", value: "angry" },
      { label: "Smiling", value: "smiling" },
      { label: "Nervous", value: "nervous" },
      { label: "Surprised", value: "surprised" },
      { label: "Sad", value: "sad" },
    ],
  },
  {
    id: "eyeExpression",
    question: "Eye expression?",
    type: "radio",
    options: [
      { label: "Wide", value: "wide" },
      { label: "Narrow", value: "narrow" },
      { label: "Squinted", value: "squinted" },
    ],
  },
  {
    id: "mouthCorners",
    question: "Mouth corners?",
    type: "radio",
    options: [
      { label: "Upturned", value: "upturned" },
      { label: "Downturned", value: "downturned" },
    ],
  },
];

interface ManualFeatureSelectorProps {
  onGenerate: (data: Record<string, any>) => void;
  isLoading: boolean;
}

export const ManualFeatureSelector = ({ onGenerate, isLoading }: ManualFeatureSelectorProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [checkboxValues, setCheckboxValues] = useState<Record<string, string[]>>({});

  const getFilteredQuestions = () => {
    return questions.filter((q) => {
      if (!q.conditional) return true;
      const conditionalValue = formData[q.conditional.field];
      return conditionalValue !== q.conditional.value;
    });
  };

  const filteredQuestions = getFilteredQuestions();
  const currentQ = filteredQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / filteredQuestions.length) * 100;

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleValueChange = (value: any) => {
    setFormData({ ...formData, [currentQ.id]: value });
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const current = checkboxValues[currentQ.id] || [];
    const updated = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    setCheckboxValues({ ...checkboxValues, [currentQ.id]: updated });
    setFormData({ ...formData, [currentQ.id]: updated });
  };

  const handleGenerate = () => {
    onGenerate(formData);
  };

  const canProceed = () => {
    if (!currentQ.required) return true;
    const value = formData[currentQ.id];
    if (currentQ.type === "checkbox") {
      return checkboxValues[currentQ.id]?.length > 0;
    }
    return value !== undefined && value !== "";
  };

  const isLastQuestion = currentQuestion === filteredQuestions.length - 1;

  return (
    <Card>
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle>Manual Feature Selection</CardTitle>
            <span className="text-sm text-muted-foreground font-medium">
              Question {currentQuestion + 1} of {filteredQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <CardDescription className="text-base pt-2">
          {currentQ.question}
          {currentQ.required && <span className="text-destructive ml-1">*</span>}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentQ.type === "radio" && (
          <RadioGroup
            value={formData[currentQ.id]}
            onValueChange={handleValueChange}
            className="grid grid-cols-1 gap-3"
          >
            {currentQ.options?.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent cursor-pointer"
                onClick={() => handleValueChange(option.value)}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer font-medium">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {currentQ.type === "image-select" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {currentQ.options?.map((option) => (
              <button
                key={option.value}
                onClick={() => handleValueChange(option.value)}
                className={`flex flex-col items-center gap-3 p-4 border-2 rounded-lg transition-all hover:scale-105 ${
                  formData[currentQ.id] === option.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div
                  className="w-full aspect-square rounded-lg flex items-center justify-center text-4xl"
                  style={{
                    backgroundColor: option.image?.startsWith("#") ? option.image : "transparent",
                  }}
                >
                  {!option.image?.startsWith("#") && option.image}
                </div>
                <span className="text-sm font-medium text-center">{option.label}</span>
              </button>
            ))}
          </div>
        )}

        {currentQ.type === "input" && (
          <Input
            type="number"
            value={formData[currentQ.id] || ""}
            onChange={(e) => handleValueChange(e.target.value)}
            placeholder={`Enter ${currentQ.question.toLowerCase()}`}
            className="text-base"
          />
        )}

        {currentQ.type === "textarea" && (
          <Textarea
            value={formData[currentQ.id] || ""}
            onChange={(e) => handleValueChange(e.target.value)}
            placeholder={`Describe ${currentQ.question.toLowerCase()}`}
            className="min-h-[120px] resize-none"
          />
        )}

        {currentQ.type === "select" && (
          <Select value={formData[currentQ.id]} onValueChange={handleValueChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {currentQ.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {currentQ.type === "checkbox" && (
          <div className="grid grid-cols-1 gap-3">
            {currentQ.options?.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent"
              >
                <Checkbox
                  id={option.value}
                  checked={checkboxValues[currentQ.id]?.includes(option.value) || false}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(option.value, checked as boolean)
                  }
                />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer font-medium">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 gap-3">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="flex-1"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={handleGenerate}
              disabled={!canProceed() || isLoading}
              className="flex-1"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Criminal Face"
              )}
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={!canProceed()} className="flex-1">
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
