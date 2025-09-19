
import React, { useState, useRef, useCallback } from 'react';
import { Camera, AlertTriangle, CheckCircle, UploadCloud, Loader2 } from 'lucide-react';
import { analyzeCompartmentImage } from '../services/geminiService';

const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
});

const CompartmentCheck: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [analysisResult, setAnalysisResult] = useState<'SAFE' | 'UNSAFE' | 'ERROR' | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAnalysisResult(null);
            setIsLoading(true);
            setImagePreview(URL.createObjectURL(file));

            try {
                const base64Image = await toBase64(file);
                const result = await analyzeCompartmentImage(base64Image, file.type);
                setAnalysisResult(result);
            } catch (error) {
                console.error("Error processing image:", error);
                setAnalysisResult('ERROR');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const triggerFileSelect = useCallback(() => {
        fileInputRef.current?.click();
    }, []);
    
    const resetState = useCallback(() => {
        setImagePreview(null);
        setAnalysisResult(null);
        setIsLoading(false);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, []);

    const ResultCard = () => {
        if (!analysisResult) return null;

        const content = {
            SAFE: {
                icon: <CheckCircle className="h-12 w-12 text-green-500" />,
                title: "Safe Crowd Detected",
                message: "Sufficient crowd level detected. You can travel with peace of mind.",
                bgColor: "bg-green-50"
            },
            UNSAFE: {
                icon: <AlertTriangle className="h-12 w-12 text-red-500" />,
                title: "Low Crowd Detected",
                message: "Compartment is sparsely populated. An alert has been sent to the nearest RPF with your location.",
                bgColor: "bg-red-50"
            },
            ERROR: {
                icon: <AlertTriangle className="h-12 w-12 text-yellow-500" />,
                title: "Analysis Error",
                message: "Could not analyze the image. Please try again with a clearer picture.",
                bgColor: "bg-yellow-50"
            }
        }[analysisResult];

        return (
            <div className={`p-4 rounded-lg shadow-md mt-6 text-center ${content.bgColor}`}>
                <div className="flex justify-center mb-2">{content.icon}</div>
                <h3 className="text-lg font-bold text-gray-800">{content.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{content.message}</p>
                <button
                    onClick={resetState}
                    className="mt-4 px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200"
                >
                    Check Another
                </button>
            </div>
        )
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Compartment Safety Check</h2>
            <p className="text-sm text-gray-600">
                If you feel unsafe due to an empty compartment, take a picture to analyze the crowd level and alert authorities if needed.
            </p>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
            
            { !imagePreview && (
                 <button
                    onClick={triggerFileSelect}
                    className="w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 hover:border-purple-400 hover:text-purple-600 transition-colors"
                >
                    <UploadCloud className="h-12 w-12 mb-2" />
                    <span className="font-semibold">Tap to Upload Photo</span>
                    <span className="text-xs mt-1">Check your compartment's safety</span>
                </button>
            )}

            {imagePreview && (
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <img src={imagePreview} alt="Compartment preview" className="w-full rounded-md object-cover max-h-64" />
                </div>
            )}
            
            {isLoading && (
                <div className="flex items-center justify-center p-4 rounded-lg bg-purple-50 text-purple-700">
                    <Loader2 className="h-6 w-6 animate-spin mr-3" />
                    <span className="font-semibold">Analyzing image... Please wait.</span>
                </div>
            )}
            
            <ResultCard />
        </div>
    );
};

export default CompartmentCheck;
