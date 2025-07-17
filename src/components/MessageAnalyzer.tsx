
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  Languages, 
  MessageCircle, 
  Globe, 
  AlertCircle,
  Lock,
  ArrowRight,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
  Progress
} from "@/components/ui/progress";
import { TranslationService, TranslationResult } from '@/services/translationService';
import { Badge } from '@/components/ui/badge';

const MessageAnalyzer = () => {
  const { canSendMessage, incrementMessageCount, messageCount, isProUser, remainingMessages } = useAuth();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [languageFrom, setLanguageFrom] = useState('english');
  const [languageTo, setLanguageTo] = useState('japanese');
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    if (!message.trim()) {
      toast({
        title: "Empty message",
        description: "Please enter a message to analyze",
        variant: "destructive"
      });
      return;
    }

    if (!canSendMessage) {
      toast({
        title: "Message limit reached",
        description: "You've reached your daily limit of 50 messages. Upgrade to Pro for unlimited messages.",
        variant: "destructive"
      });
      return;
    }

    setAnalyzing(true);
    setError(null);
    
    try {
      // Only increment if we're actually going to perform analysis
      incrementMessageCount();
      
      // Use real translation service
      const translationResult = await TranslationService.translateText(message, languageTo);
      
      setResult(translationResult);
      
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      
      toast({
        title: "Analysis complete",
        description: "Your message has been analyzed successfully",
        variant: "default"
      });
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during analysis');
      toast({
        title: "Analysis failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setAnalyzing(false);
    }
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Calculate progress percentage for message count
  const progressPercentage = isProUser ? 100 : ((messageCount / 50) * 100);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {!isProUser && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-yellow-800">Free Tier Usage</h3>
            <span className="text-sm text-yellow-800 font-medium">
              {messageCount}/50 messages used today
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2 mb-2" />
          <div className="flex items-center justify-between">
            <p className="text-sm text-yellow-700">
              {remainingMessages > 0 ? 
                `${remainingMessages} messages remaining today` : 
                "Message limit reached for today"}
            </p>
            <Link to="#pricing" className="text-sm font-medium text-converse-primary hover:underline flex items-center gap-1">
              Upgrade to Pro <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}

      {!canSendMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertCircle size={24} className="text-red-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-red-800">Daily Limit Reached</h3>
              <p className="text-red-700 mb-4">
                You've used all your free messages for today. Upgrade to Pro for unlimited messages.
              </p>
              <Link to="#pricing">
                <Button className="bg-converse-primary hover:bg-converse-secondary flex items-center gap-2">
                  <Lock size={16} /> Upgrade to Pro
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <Card className="card-shadow">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6">Message Analyzer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Language
              </label>
              <Select
                value={languageFrom}
                onValueChange={setLanguageFrom}
                disabled={!canSendMessage}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="japanese">Japanese</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Language
              </label>
              <Select 
                value={languageTo}
                onValueChange={setLanguageTo}
                disabled={!canSendMessage}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="japanese">Japanese</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your message:
            </label>
            <Textarea
              placeholder={canSendMessage ? 
                "Type your message here... (Try phrases like 'Please submit the report by EOD' or 'I need this ASAP')" :
                "Daily message limit reached. Upgrade to Pro to continue using the analyzer."
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="resize-none"
              disabled={!canSendMessage}
            />
            <div className="mt-2 text-xs text-gray-500">
              Try phrases like "Let me know ASAP" or "Please submit this by EOD"
            </div>
          </div>
          
          <Button 
            onClick={handleAnalyze} 
            className="w-full bg-converse-primary hover:bg-converse-secondary"
            disabled={analyzing || !canSendMessage}
          >
            {analyzing ? 'Analyzing...' : 'Analyze Message'}
          </Button>
        </CardContent>
      </Card>
      
      {error && (
        <div className="mt-8 animate-fade-in">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <XCircle className="text-red-500" size={24} />
                <h3 className="text-xl font-bold text-red-800">Analysis Error</h3>
              </div>
              <p className="text-red-700 mt-2">{error}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {result && (
        <div ref={resultRef} className="mt-8 animate-fade-in">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle className="text-green-500" size={24} />
                <h3 className="text-xl font-bold">Analysis Results</h3>
                <Badge variant="outline" className="ml-auto">
                  Confidence: {Math.round(result.confidence * 100)}%
                </Badge>
              </div>
              
              <Tabs defaultValue="translation">
                <TabsList className="mb-4">
                  <TabsTrigger value="translation" className="flex items-center gap-2">
                    <Languages size={16} /> Translation
                  </TabsTrigger>
                  <TabsTrigger value="cultural" className="flex items-center gap-2">
                    <Globe size={16} /> Cultural Nuances
                    {result.culturalNuances.length > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {result.culturalNuances.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="tone" className="flex items-center gap-2">
                    <MessageCircle size={16} /> Tone Analysis
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="translation" className="p-4 bg-gray-50 rounded-md">
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Original Text:</h4>
                    <p className="p-3 bg-white border rounded-md">{message}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Translated to {languageTo.charAt(0).toUpperCase() + languageTo.slice(1)}:
                    </h4>
                    <p className="p-3 bg-white border rounded-md whitespace-pre-wrap">{result.translatedText}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="cultural" className="p-4 bg-gray-50 rounded-md">
                  {result.culturalNuances.length > 0 ? (
                    result.culturalNuances.map((nuance, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <div className={`p-4 border rounded-md ${getSeverityColor(nuance.severity)}`}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{nuance.phrase}</h4>
                            <Badge variant="outline" className={getSeverityColor(nuance.severity)}>
                              {nuance.severity}
                            </Badge>
                          </div>
                          <p className="mb-2"><strong>Issue:</strong> {nuance.issue}</p>
                          <p><strong>Suggestion:</strong> {nuance.suggestion}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-500" size={20} />
                        <p className="text-green-800">No cultural issues detected - your message appears clear for cross-cultural communication</p>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="tone" className="p-4 bg-gray-50 rounded-md">
                  <div className="p-4 bg-white border rounded-md">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="font-medium">Overall tone:</span>
                        <Badge variant="outline" className="ml-2 capitalize">
                          {result.toneAnalysis.overall}
                        </Badge>
                      </div>
                      <div>
                        <span className="font-medium">Formality level:</span>
                        <Badge variant="outline" className="ml-2 capitalize">
                          {result.toneAnalysis.formality}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="font-medium">Politeness:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={result.toneAnalysis.politeness * 10} className="flex-1" />
                          <span className="text-sm">{result.toneAnalysis.politeness}/10</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Urgency:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={result.toneAnalysis.urgency * 10} className="flex-1" />
                          <span className="text-sm">{result.toneAnalysis.urgency}/10</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Suggestions:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {result.toneAnalysis.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-gray-700">{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MessageAnalyzer;
