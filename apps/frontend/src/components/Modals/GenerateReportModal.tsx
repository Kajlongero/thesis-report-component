import React, { useState } from "react";
import { FileText, Settings, Plus, Upload } from "lucide-react";

import Modal from "../Commons/Modal";

import { Input } from "../Commons/Input";
import { Label } from "../Commons/Label";
import { Button } from "../Commons/Button";
import { Select } from "../Commons/Select";

interface GenerateReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GenerateReportModal: React.FC<GenerateReportModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    format: "PDF",
    templateId: "",
    queryId: "",
  });

  const formats = [
    { value: "CSV", label: "CSV - Comma Separated Values" },
    { value: "PDF", label: "PDF - Portable Document Format" },
    { value: "HTML", label: "HTML - Web Page" },
    { value: "XLSX", label: "XLSX - Excel Spreadsheet" },
    { value: "DOCX", label: "DOCX - Word Document" },
  ];

  const templates = [
    {
      value: "1",
      label: "Financial Summary",
      description: "Standard financial reporting template",
    },
    {
      value: "2",
      label: "User Analytics",
      description: "User behavior and engagement metrics",
    },
    {
      value: "3",
      label: "Sales Performance",
      description: "Sales data and performance indicators",
    },
    {
      value: "4",
      label: "Custom Template",
      description: "Build your own template structure",
    },
  ];

  const queries = [
    {
      value: "q1",
      label: "Monthly Revenue",
      description: "Total revenue grouped by month with growth analysis",
    },
    {
      value: "q2",
      label: "User Engagement",
      description: "Active users, session duration, and feature usage metrics",
    },
    {
      value: "q3",
      label: "Department Performance",
      description:
        "Performance metrics by department including costs and efficiency",
    },
    {
      value: "q4",
      label: "Product Analytics",
      description:
        "Product usage, conversion rates, and customer feedback data",
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    console.log("Generating report with data:", formData);
    // TODO: Implement report generation logic
    onOpenChange(false);
  };

  const selectedQuery = queries.find((q) => q.value === formData.queryId);
  const selectedTemplate = templates.find(
    (t) => t.value === formData.templateId
  );

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Generate New Report"
      description="Configure your report settings and data sources"
      size="lg"
    >
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="report-name">Report Name</Label>
            <Input
              id="report-name"
              placeholder="Enter report name..."
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="report-description">Description</Label>
            <textarea
              id="report-description"
              placeholder="Describe what this report contains..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        {/* Format Selection */}
        <div>
          <Label>Export Format</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {formats.map((format) => (
              <button
                key={format.value}
                onClick={() => handleInputChange("format", format.value)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  formData.format === format.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:bg-accent"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="font-medium">{format.value}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {format.label.split(" - ")[1]}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Template Selection */}
        <div>
          <Label htmlFor="template-select">Report Template</Label>
          <Select
            value={formData.templateId}
            onChange={(value) => handleInputChange("templateId", value)}
            options={templates}
            placeholder="Select a template..."
            className="mt-1"
          />
          {selectedTemplate && (
            <p className="text-sm text-muted-foreground mt-2">
              {selectedTemplate.description}
            </p>
          )}
        </div>

        {/* Query Selection */}
        <div>
          <Label htmlFor="query-select">Data Query</Label>
          <Select
            value={formData.queryId}
            onChange={(value) => handleInputChange("queryId", value)}
            options={queries}
            placeholder="Select a data query..."
            className="mt-1"
          />
          {selectedQuery && (
            <p className="text-sm text-muted-foreground mt-2">
              {selectedQuery.description}
            </p>
          )}
        </div>

        {/* Selected Query Info */}
        {selectedQuery && (
          <div className="p-4 bg-accent/50 rounded-lg border">
            <h4 className="font-medium text-sm">
              Selected Query: {selectedQuery.label}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedQuery.description}
            </p>
          </div>
        )}

        {/* Additional Options */}
        <div className="space-y-3">
          <Label>Additional Options</Label>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Insert Manual Data
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Upload Data File
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Advanced Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          onClick={handleGenerate}
          disabled={!formData.name || !formData.templateId || !formData.queryId}
          className="bg-gradient-primary text-white"
        >
          Generate Report
        </Button>
      </div>
    </Modal>
  );
};

export default GenerateReportModal;
