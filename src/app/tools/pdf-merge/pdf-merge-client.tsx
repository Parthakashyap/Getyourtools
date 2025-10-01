
"use client";

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import type { Tool } from '@/config/site';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { AdsensePlaceholder } from "@/components/adsense-placeholder";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, X, Loader2, Download, ArrowUp, ArrowDown } from 'lucide-react';

interface PdfFile {
    id: string;
    file: File;
}

interface PdfMergeClientProps {
    tool: Omit<Tool, 'path' | 'icon' | 'schema'>;
}

export default function PdfMergeClient({ tool }: PdfMergeClientProps) {
    const [files, setFiles] = useState<PdfFile[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const newFiles = Array.from(selectedFiles).map(file => ({
                id: crypto.randomUUID(),
                file,
            }));
            setFiles(prev => [...prev, ...newFiles]);
        }
        // Reset file input to allow selecting the same file again
        if(fileInputRef.current) {
          fileInputRef.current.value = "";
        }
    };

    const handleRemoveFile = (id: string) => {
        setFiles(files.filter(f => f.id !== id));
    };

    const moveFile = (index: number, direction: 'up' | 'down') => {
        const newFiles = [...files];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
        if (targetIndex < 0 || targetIndex >= newFiles.length) {
            return;
        }
    
        [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
        setFiles(newFiles);
    };

    const handleMerge = async () => {
        if (files.length < 2) {
            toast({
                title: "Not enough files",
                description: "Please select at least two PDF files to merge.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        try {
            const mergedPdf = await PDFDocument.create();
            for (const { file } of files) {
                const pdfBytes = await file.arrayBuffer();
                const pdf = await PDFDocument.load(pdfBytes);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const mergedPdfBytes = await mergedPdf.save();
            const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `getyourtools-merged-${Date.now()}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            toast({
                title: "Success!",
                description: "Your PDFs have been merged and downloaded.",
            });
            setFiles([]);
        } catch (error) {
            console.error(error);
            toast({
                title: "Merge Failed",
                description: "An error occurred. Please ensure all files are valid, uncorrupted, and not password-protected PDFs.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
      <div className="space-y-8">
          <div className="text-center">
              <h1 className="text-3xl font-bold">{tool.name}</h1>
              <p className="text-muted-foreground mt-2">{tool.description}</p>
          </div>

          <Card>
              <CardHeader>
                  <CardTitle>Upload Your PDFs</CardTitle>
                  <CardDescription>Select or drag and drop the PDF files you want to merge. You can reorder them after uploading.</CardDescription>
              </CardHeader>
              <CardContent>
                  <div 
                      className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                  >
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground"/>
                      <p className="mt-4 text-sm text-muted-foreground">
                          Click to browse or drag and drop files here
                      </p>
                      <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleFileChange}
                          className="hidden"
                          accept="application/pdf"
                          multiple
                      />
                  </div>

                  {files.length > 0 && (
                      <div className="mt-6 space-y-2">
                          <h3 className="font-medium">File Queue:</h3>
                          <ul className="space-y-2">
                              {files.map(({id, file}, index) => (
                                  <li key={id} className="flex items-center justify-between p-2 border rounded-md bg-background hover:bg-muted/50">
                                      <div className="flex items-center gap-2 overflow-hidden">
                                          <FileText className="h-5 w-5 shrink-0 text-primary" />
                                          <span className="truncate" title={file.name}>{file.name}</span>
                                          <span className="text-xs text-muted-foreground shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Button variant="ghost" size="icon" onClick={() => moveFile(index, 'up')} disabled={index === 0}>
                                            <ArrowUp className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => moveFile(index, 'down')} disabled={index === files.length - 1}>
                                            <ArrowDown className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveFile(id)} className="text-destructive/80 hover:text-destructive">
                                          <X className="h-4 w-4" />
                                        </Button>
                                      </div>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  )}
              </CardContent>
              <CardFooter>
                  <Button onClick={handleMerge} disabled={isLoading || files.length < 2} className="w-full">
                      {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                          <Download className="mr-2 h-4 w-4" />
                      )}
                      Merge & Download ({files.length} {files.length === 1 ? 'file' : 'files'})
                  </Button>
              </CardFooter>
          </Card>
          
          <AdsensePlaceholder />
          
          <ToolSeoContent name={tool.name} />
      </div>
    );
}
