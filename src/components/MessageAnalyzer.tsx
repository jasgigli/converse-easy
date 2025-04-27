
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
import { Translate, MessageCircle, Globe } from 'lucide-react';

const MessageAnalyzer = () => {
  const [message, setMessage] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [languageFrom, setLanguageFrom] = useState('english');
  const [languageTo, setLanguageTo] = useState('japanese');
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);

  const analyzeMessage = () => {
    if (!message.trim()) {
      toast({
        title: 'Empty Message',
        description: 'Please enter a message to analyze.',
        variant: 'destructive',
      });
      return;
    }

    setAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Demo results based on common workplace phrases
      const results = {
        translation: {
          original: message,
          translated: simulateTranslation(message, languageTo),
        },
        culturalNuances: detectCulturalNuances(message),
        toneAnalysis: analyzeTone(message),
      };
      
      setResult(results);
      setAnalyzing(false);
      
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1500);
  };
  
  // Simulated translation function
  const simulateTranslation = (text: string, targetLang: string) => {
    // This is just a demo simulation
    if (targetLang === 'japanese') {
      if (text.toLowerCase().includes('deadline')) {
        return '締め切りについて話しましょう。（丁寧な表現で書かれています）';
      }
      if (text.toLowerCase().includes('meeting')) {
        return '会議のスケジュールを調整しましょう。（丁寧な表現で書かれています）';
      }
      if (text.toLowerCase().includes('asap') || text.toLowerCase().includes('as soon as possible')) {
        return '可能な限り早くお願いします。（丁寧な表現に調整されています）';
      }
      return '翻訳されたテキストがここに表示されます。（デモ版）';
    }
    
    if (targetLang === 'spanish') {
      if (text.toLowerCase().includes('deadline')) {
        return 'Hablemos sobre la fecha límite. (Expresado cortésmente)';
      }
      if (text.toLowerCase().includes('meeting')) {
        return 'Organicemos una reunión. (Expresado cortésmente)';
      }
      return 'El texto traducido aparecería aquí. (Versión demo)';
    }
    
    return 'Translated text would appear here. (Demo version)';
  };
  
  // Detect cultural nuances
  const detectCulturalNuances = (text: string) => {
    const nuances = [];
    
    if (text.toLowerCase().includes('asap') || text.toLowerCase().includes('as soon as possible')) {
      nuances.push({
        phrase: 'ASAP / as soon as possible',
        issue: 'In many cultures, this can sound demanding or create unnecessary pressure',
        suggestion: 'Could you complete this by [specific date/time]?',
      });
    }
    
    if (text.toLowerCase().includes('just') && 
        (text.toLowerCase().includes('wondering') || text.toLowerCase().includes('checking'))) {
      nuances.push({
        phrase: 'Just wondering/checking',
        issue: 'Can make you sound uncertain or apologetic in some cultures',
        suggestion: 'I would like to know about...',
      });
    }
    
    if (text.toLowerCase().includes('let me know')) {
      nuances.push({
        phrase: 'Let me know',
        issue: 'Can be seen as vague or placing burden on the recipient',
        suggestion: 'Please share your thoughts on this by [date]',
      });
    }
    
    if (text.toLowerCase().includes('hop on a call')) {
      nuances.push({
        phrase: 'Hop on a call',
        issue: 'Casual idiom that may be confusing for non-native speakers',
        suggestion: 'Would you be available for a phone/video meeting?',
      });
    }
    
    if (text.toLowerCase().includes('eod') || text.toLowerCase().includes('end of day')) {
      nuances.push({
        phrase: 'EOD / end of day',
        issue: 'Ambiguous due to different time zones and work schedules',
        suggestion: 'by [specific time] [timezone]',
      });
    }
    
    return nuances.length > 0 ? nuances : [{ 
      phrase: 'No specific cultural issues detected', 
      issue: '',
      suggestion: 'Your message appears clear for cross-cultural communication'
    }];
  };
  
  // Analyze tone
  const analyzeTone = (text: string) => {
    let tone = 'neutral';
    let formality = 'neutral';
    let suggestions = [];
    
    // Simple tone analysis
    if (text.includes('!') || text.toLowerCase().includes('urgent') || text.toLowerCase().includes('asap')) {
      tone = 'urgent/demanding';
      suggestions.push('Consider softening urgent language to avoid appearing demanding');
    } else if (text.toLowerCase().includes('please') && text.toLowerCase().includes('thank')) {
      tone = 'polite';
    } else if (text.toLowerCase().includes('sorry') || text.toLowerCase().includes('apolog')) {
      tone = 'apologetic';
      suggestions.push('Consider if an apology is necessary in this context');
    }
    
    // Simple formality analysis
    if (text.toLowerCase().includes('hey') || text.toLowerCase().includes('btw') || text.toLowerCase().includes('fyi')) {
      formality = 'casual';
      suggestions.push('Some expressions are casual and may be inappropriate for formal communication');
    } else if (text.toLowerCase().includes('dear') || text.toLowerCase().includes('respectfully')) {
      formality = 'formal';
    }
    
    if (suggestions.length === 0) {
      suggestions.push('Tone appears appropriate for professional communication');
    }
    
    return {
      overall: tone,
      formality,
      suggestions
    };
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
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
              placeholder="Type your message here... (Try phrases like 'Please submit the report by EOD' or 'I need this ASAP')"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="resize-none"
            />
            <div className="mt-2 text-xs text-gray-500">
              Try phrases like "Let me know ASAP" or "Please submit this by EOD"
            </div>
          </div>
          
          <Button 
            onClick={analyzeMessage} 
            className="w-full bg-converse-primary hover:bg-converse-secondary"
            disabled={analyzing}
          >
            {analyzing ? 'Analyzing...' : 'Analyze Message'}
          </Button>
        </CardContent>
      </Card>
      
      {result && (
        <div ref={resultRef} className="mt-8 animate-fade-in">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6">Analysis Results</h3>
              
              <Tabs defaultValue="translation">
                <TabsList className="mb-4">
                  <TabsTrigger value="translation" className="flex items-center gap-2">
                    <Translate size={16} /> Translation
                  </TabsTrigger>
                  <TabsTrigger value="cultural" className="flex items-center gap-2">
                    <Globe size={16} /> Cultural Nuances
                  </TabsTrigger>
                  <TabsTrigger value="tone" className="flex items-center gap-2">
                    <MessageCircle size={16} /> Tone Analysis
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="translation" className="p-4 bg-gray-50 rounded-md">
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Original Text:</h4>
                    <p className="p-3 bg-white border rounded-md">{result.translation.original}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Translated to {languageTo.charAt(0).toUpperCase() + languageTo.slice(1)}:
                    </h4>
                    <p className="p-3 bg-white border rounded-md">{result.translation.translated}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="cultural" className="p-4 bg-gray-50 rounded-md">
                  {result.culturalNuances.map((nuance: any, index: number) => (
                    <div key={index} className="mb-4 last:mb-0">
                      {nuance.issue ? (
                        <div className="p-3 bg-white border rounded-md">
                          <h4 className="font-medium text-converse-primary">{nuance.phrase}</h4>
                          <p className="text-gray-700 mt-1"><strong>Issue:</strong> {nuance.issue}</p>
                          <p className="text-gray-700 mt-1"><strong>Suggestion:</strong> {nuance.suggestion}</p>
                        </div>
                      ) : (
                        <div className="p-3 bg-white border rounded-md">
                          <p>{nuance.phrase}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="tone" className="p-4 bg-gray-50 rounded-md">
                  <div className="p-3 bg-white border rounded-md">
                    <div className="mb-2">
                      <span className="font-medium">Overall tone:</span> {' '}
                      <span className="capitalize">{result.toneAnalysis.overall}</span>
                    </div>
                    <div className="mb-4">
                      <span className="font-medium">Formality level:</span> {' '}
                      <span className="capitalize">{result.toneAnalysis.formality}</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Suggestions:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {result.toneAnalysis.suggestions.map((suggestion: string, index: number) => (
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
