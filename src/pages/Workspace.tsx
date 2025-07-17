import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import MessageAnalyzer from '@/components/MessageAnalyzer';
import Footer from '@/components/Footer';
import IntegrationCard from '@/components/IntegrationCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Languages, 
  Globe, 
  Info, 
  Play, 
  RefreshCw,
  Sparkles,
  Users,
  Clock,
  CheckCircle2
} from 'lucide-react';

const Workspace = () => {
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  
  const demoExamples = [
    {
      id: 'urgent-request',
      title: 'Urgent Request',
      message: 'Hi team, I need the quarterly report ASAP. Please submit by EOD today.',
      issues: ['ASAP usage', 'EOD ambiguity'],
      improvement: 'More specific timing'
    },
    {
      id: 'meeting-invite',
      title: 'Meeting Invitation',
      message: 'Hey everyone, let\'s hop on a call to touch base about the project.',
      issues: ['Casual tone', 'Business jargon'],
      improvement: 'Clearer language'
    },
    {
      id: 'follow-up',
      title: 'Follow-up Message',
      message: 'Just checking in - let me know if you need anything from my end.',
      issues: ['Vague request', 'Uncertain tone'],
      improvement: 'More specific ask'
    },
    {
      id: 'feedback-request',
      title: 'Feedback Request',
      message: 'Could you take a quick look at this and circle back with your thoughts?',
      issues: ['Business jargon', 'Vague timeline'],
      improvement: 'Clear expectations'
    }
  ];

  const integrations = [
    {
      name: 'Slack',
      description: 'Real-time message analysis and suggestions in Slack channels',
      logo: '🔵',
      color: 'blue',
      features: ['Auto-detect cultural issues', 'Instant translations', 'Team analytics'],
      status: 'available' as const
    },
    {
      name: 'Microsoft Teams',
      description: 'Enhance Teams communications with cultural context',
      logo: '🟣',
      color: 'purple',
      features: ['Meeting transcripts', 'Cultural coaching', 'Language support'],
      status: 'available' as const
    },
    {
      name: 'Gmail',
      description: 'Culturally-sensitive email writing with real-time feedback',
      logo: '🔴',
      color: 'red',
      features: ['Email templates', 'Tone analysis', 'Cultural adaptations'],
      status: 'available' as const
    },
    {
      name: 'Zoom',
      description: 'Live meeting translations and cultural context',
      logo: '🟡',
      color: 'yellow',
      features: ['Live captions', 'Cultural alerts', 'Meeting summaries'],
      status: 'coming-soon' as const
    },
    {
      name: 'Google Meet',
      description: 'Meeting enhancement with cultural intelligence',
      logo: '🟢',
      color: 'green',
      features: ['Real-time translations', 'Cultural insights', 'Action items'],
      status: 'coming-soon' as const
    }
  ];

  const handleExampleSelect = (example: any) => {
    setSelectedExample(example.message);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-grow pt-24 pb-10 px-4 md:px-6 container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            ConverseEasy 
            <span className="ml-2 text-primary">Demo Studio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience our AI-powered communication tools with interactive demos and real-world examples
          </p>
        </div>
        
        <div className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Info size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Interactive Demo Environment</h3>
              <p className="text-muted-foreground mb-4">
                This is a fully functional demonstration of ConverseEasy's capabilities. Try the examples below 
                or enter your own messages to see how our AI detects cultural nuances and provides actionable feedback.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Sparkles size={14} />
                  AI-Powered Analysis
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Users size={14} />
                  Cultural Intelligence
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock size={14} />
                  Real-time Feedback
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="analyzer" className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analyzer" className="flex gap-2">
              <MessageCircle size={18} /> Message Analyzer
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex gap-2">
              <Play size={18} /> Demo Examples
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex gap-2">
              <Globe size={18} /> Integrations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="analyzer" className="mt-8">
            <MessageAnalyzer prefilledMessage={selectedExample} />
          </TabsContent>
          
          <TabsContent value="examples" className="mt-8">
            <div className="max-w-4xl mx-auto">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="text-primary" size={24} />
                    Try These Real-World Examples
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Click on any example to see how ConverseEasy analyzes and improves communication
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {demoExamples.map((example) => (
                      <Card 
                        key={example.id} 
                        className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary/50"
                        onClick={() => handleExampleSelect(example)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{example.title}</h3>
                            <Button variant="ghost" size="sm" className="text-primary">
                              Try it <RefreshCw size={14} className="ml-1" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 italic">
                            "{example.message}"
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium">Issues:</span>
                              {example.issues.map((issue, idx) => (
                                <Badge key={idx} variant="destructive" className="text-xs">
                                  {issue}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium">Focus:</span>
                              <Badge variant="secondary" className="text-xs">
                                {example.improvement}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-green-500" />
                      What You'll Learn
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• How cultural context affects message interpretation</li>
                      <li>• Why timing specificity matters across cultures</li>
                      <li>• How to avoid common business communication pitfalls</li>
                      <li>• Best practices for international team collaboration</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="integrations" className="mt-8">
            <div className="max-w-6xl mx-auto">
              <Card className="mb-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl flex items-center justify-center gap-2">
                    <Globe className="text-primary" size={28} />
                    Workplace Integrations
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Connect ConverseEasy to your existing tools and workflows
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {integrations.map((integration, index) => (
                      <IntegrationCard
                        key={integration.name}
                        name={integration.name}
                        description={integration.description}
                        logo={integration.logo}
                        color={integration.color}
                        features={integration.features}
                        status={integration.status}
                        delay={index * 0.1}
                      />
                    ))}
                  </div>
                  
                  <div className="mt-12 p-8 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
                    <h3 className="text-xl font-semibold mb-6 text-center">Integration Process</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                          1
                        </div>
                        <h4 className="font-semibold mb-2">Choose Your Platform</h4>
                        <p className="text-sm text-muted-foreground">
                          Select from our supported workplace tools and communication platforms
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                          2
                        </div>
                        <h4 className="font-semibold mb-2">Quick Setup</h4>
                        <p className="text-sm text-muted-foreground">
                          Authenticate and configure your preferences in just a few clicks
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                          3
                        </div>
                        <h4 className="font-semibold mb-2">Start Communicating</h4>
                        <p className="text-sm text-muted-foreground">
                          Get instant cultural insights and communication improvements
                        </p>
                      </div>
                    </div>
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
