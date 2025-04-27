import React from 'react';
import NavBar from '@/components/NavBar';
import MessageAnalyzer from '@/components/MessageAnalyzer';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Languages, Globe, Info } from 'lucide-react';

const Workspace = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-grow pt-24 pb-10 px-4 md:px-6 container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">ConverseEasy Workspace</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Experience our NLP-powered communication tools with this interactive demo
          </p>
        </div>
        
        <div className="mb-8 bg-converse-light border border-converse-primary/20 rounded-lg p-4 flex items-start gap-3 animate-fade-in">
          <Info size={24} className="text-converse-primary shrink-0 mt-1" />
          <div>
            <h3 className="font-medium">Demo Mode</h3>
            <p className="text-gray-700">
              This is a demonstration of ConverseEasy's core capabilities. Try messages containing terms like "ASAP", "EOD", "meeting", or "deadline" to see the AI analyze cultural nuances and suggest improvements.
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="analyzer" className="animate-fade-in">
          <TabsList className="justify-center mb-8">
            <TabsTrigger value="analyzer" className="flex gap-2">
              <MessageCircle size={18} /> Message Analyzer
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex gap-2">
              <Globe size={18} /> App Integrations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="analyzer">
            <MessageAnalyzer />
          </TabsContent>
          
          <TabsContent value="integrations">
            <div className="max-w-4xl mx-auto">
              <Card className="card-shadow">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">App Integrations</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-4 border rounded-lg hover:border-converse-primary transition-colors">
                      <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                        🔵
                      </div>
                      <h3 className="text-xl font-medium mb-2">Slack Integration</h3>
                      <p className="text-gray-700 mb-4">
                        Add ConverseEasy to your Slack workspace for real-time message translation and suggestions.
                      </p>
                      <Button variant="outline">Connect Slack</Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg hover:border-converse-primary transition-colors">
                      <div className="h-16 w-16 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                        🟣
                      </div>
                      <h3 className="text-xl font-medium mb-2">Microsoft Teams</h3>
                      <p className="text-gray-700 mb-4">
                        Enhance Teams communications with cultural context and tone optimization.
                      </p>
                      <Button variant="outline">Connect Teams</Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg hover:border-converse-primary transition-colors">
                      <div className="h-16 w-16 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-4">
                        🔴
                      </div>
                      <h3 className="text-xl font-medium mb-2">Gmail Integration</h3>
                      <p className="text-gray-700 mb-4">
                        Write culturally-sensitive emails with real-time feedback and translation.
                      </p>
                      <Button variant="outline">Connect Gmail</Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg hover:border-converse-primary transition-colors">
                      <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                        🟡
                      </div>
                      <h3 className="text-xl font-medium mb-2">Zoom Meetings</h3>
                      <p className="text-gray-700 mb-4">
                        Translate meeting conversations in real-time and capture cultural context.
                      </p>
                      <Button variant="outline">Connect Zoom</Button>
                    </div>
                  </div>
                  
                  <div className="mt-12 text-center">
                    <p className="text-gray-500 mb-4">Need custom integrations for your enterprise?</p>
                    <Button className="bg-converse-primary hover:bg-converse-secondary">
                      Contact Our Team
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Workspace;
