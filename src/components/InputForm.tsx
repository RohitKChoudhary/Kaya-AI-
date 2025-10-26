import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Upload, FileText, X } from "lucide-react";
import { toast } from "sonner";

interface InputFormProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

interface FormData {
  company: string;
  industry: string;
  roles: string[];
  resumeFile: File | null;
}

export const InputForm = ({ onSubmit, onBack }: InputFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    company: "",
    industry: "",
    roles: ["", "", ""],
    resumeFile: null,
  });
  
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a PDF or DOCX file");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setFormData({ ...formData, resumeFile: file });
    toast.success("Resume uploaded successfully");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.company || !formData.industry) {
      toast.error("Please fill in company and industry");
      return;
    }

    if (!formData.roles[0]) {
      toast.error("Please select at least one job role");
      return;
    }

    if (!formData.resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    onSubmit(formData);
  };

  const updateRole = (index: number, value: string) => {
    const newRoles = [...formData.roles];
    newRoles[index] = value;
    setFormData({ ...formData, roles: newRoles });
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          ← Back to Home
        </Button>

        <Card className="p-8 shadow-elegant">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                Let's Analyze Your Resume
              </h2>
              <p className="text-muted-foreground">
                Provide your target role information and upload your resume
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Input */}
              <div className="space-y-2">
                <Label htmlFor="company">Target Company</Label>
                <Input
                  id="company"
                  placeholder="e.g., Google, Microsoft, Meta"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="transition-smooth focus:border-primary"
                />
              </div>

              {/* Industry Select */}
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => setFormData({ ...formData, industry: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Job Roles */}
              <div className="space-y-4">
                <Label>Target Job Roles (up to 3)</Label>
                {[0, 1, 2].map((index) => (
                  <Select
                    key={index}
                    value={formData.roles[index]}
                    onValueChange={(value) => updateRole(index, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Role ${index + 1} ${index === 0 ? '(Required)' : '(Optional)'}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software-engineer">Software Engineer</SelectItem>
                      <SelectItem value="data-scientist">Data Scientist</SelectItem>
                      <SelectItem value="product-manager">Product Manager</SelectItem>
                      <SelectItem value="ux-designer">UX Designer</SelectItem>
                      <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                      <SelectItem value="business-analyst">Business Analyst</SelectItem>
                      <SelectItem value="marketing-manager">Marketing Manager</SelectItem>
                      <SelectItem value="sales-executive">Sales Executive</SelectItem>
                    </SelectContent>
                  </Select>
                ))}
              </div>

              {/* Resume Upload */}
              <div className="space-y-2">
                <Label>Upload Resume (PDF or DOCX)</Label>
                <div
                  className={`
                    relative border-2 border-dashed rounded-lg p-8 text-center transition-smooth
                    ${dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
                    ${formData.resumeFile ? 'bg-success/5 border-success' : ''}
                  `}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="resume"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf,.docx"
                    onChange={handleFileInput}
                  />
                  
                  {formData.resumeFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="w-8 h-8 text-success" />
                      <div className="text-left">
                        <p className="font-medium text-success">{formData.resumeFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(formData.resumeFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData({ ...formData, resumeFile: null });
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="font-medium">Drop your resume here or click to browse</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          PDF or DOCX, max 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full text-lg py-6"
              >
                Analyze My Resume
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};
