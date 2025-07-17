export interface TranslationResult {
  translatedText: string;
  confidence: number;
  culturalNuances: CulturalNuance[];
  toneAnalysis: ToneAnalysis;
}

export interface CulturalNuance {
  phrase: string;
  issue: string;
  suggestion: string;
  severity: 'low' | 'medium' | 'high';
}

export interface ToneAnalysis {
  overall: string;
  formality: string;
  politeness: number;
  urgency: number;
  suggestions: string[];
}

const COMMON_PHRASES = {
  asap: {
    phrase: 'ASAP / as soon as possible',
    issue: 'Can sound demanding or create unnecessary pressure in many cultures',
    suggestion: 'Could you complete this by [specific date/time]?',
    severity: 'high' as const
  },
  justWondering: {
    phrase: 'Just wondering/checking',
    issue: 'Can make you sound uncertain or apologetic in some cultures',
    suggestion: 'I would like to know about...',
    severity: 'medium' as const
  },
  letMeKnow: {
    phrase: 'Let me know',
    issue: 'Can be seen as vague or placing burden on the recipient',
    suggestion: 'Please share your thoughts on this by [date]',
    severity: 'medium' as const
  },
  hopOnCall: {
    phrase: 'Hop on a call',
    issue: 'Casual idiom that may be confusing for non-native speakers',
    suggestion: 'Would you be available for a phone/video meeting?',
    severity: 'medium' as const
  },
  eod: {
    phrase: 'EOD / end of day',
    issue: 'Ambiguous due to different time zones and work schedules',
    suggestion: 'by [specific time] [timezone]',
    severity: 'high' as const
  },
  touchBase: {
    phrase: 'Touch base',
    issue: 'American business idiom that may not translate well',
    suggestion: 'Let\'s discuss this further or I\'d like to follow up on this',
    severity: 'medium' as const
  },
  circleBack: {
    phrase: 'Circle back',
    issue: 'Business jargon that may confuse international colleagues',
    suggestion: 'I\'ll follow up with you later or Let\'s revisit this',
    severity: 'medium' as const
  }
};

const TRANSLATION_DICTIONARY = {
  japanese: {
    'hello': 'こんにちは',
    'please': 'お願いします',
    'thank you': 'ありがとうございます',
    'meeting': '会議',
    'deadline': '締切',
    'project': 'プロジェクト',
    'report': 'レポート',
    'schedule': 'スケジュール',
    'urgent': '緊急',
    'asap': '可能な限り早く',
    'could you': 'していただけますか',
    'would you': 'していただけませんか',
    'I need': '必要です',
    'by end of day': '本日中に',
    'by tomorrow': '明日までに'
  },
  spanish: {
    'hello': 'hola',
    'please': 'por favor',
    'thank you': 'gracias',
    'meeting': 'reunión',
    'deadline': 'fecha límite',
    'project': 'proyecto',
    'report': 'informe',
    'schedule': 'horario',
    'urgent': 'urgente',
    'asap': 'lo antes posible',
    'could you': 'podrías',
    'would you': 'podrías',
    'I need': 'necesito',
    'by end of day': 'para el final del día',
    'by tomorrow': 'para mañana'
  },
  german: {
    'hello': 'hallo',
    'please': 'bitte',
    'thank you': 'danke',
    'meeting': 'Besprechung',
    'deadline': 'Frist',
    'project': 'Projekt',
    'report': 'Bericht',
    'schedule': 'Zeitplan',
    'urgent': 'dringend',
    'asap': 'so schnell wie möglich',
    'could you': 'könnten Sie',
    'would you': 'würden Sie',
    'I need': 'ich brauche',
    'by end of day': 'bis Ende des Tages',
    'by tomorrow': 'bis morgen'
  },
  french: {
    'hello': 'bonjour',
    'please': 's\'il vous plaît',
    'thank you': 'merci',
    'meeting': 'réunion',
    'deadline': 'échéance',
    'project': 'projet',
    'report': 'rapport',
    'schedule': 'emploi du temps',
    'urgent': 'urgent',
    'asap': 'dès que possible',
    'could you': 'pourriez-vous',
    'would you': 'voudriez-vous',
    'I need': 'j\'ai besoin',
    'by end of day': 'avant la fin de la journée',
    'by tomorrow': 'avant demain'
  }
};

export class TranslationService {
  static async translateText(text: string, targetLanguage: string): Promise<TranslationResult> {
    // Simulate API delay with realistic timing
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
    
    try {
      const translatedText = this.performTranslation(text, targetLanguage);
      const culturalNuances = this.detectCulturalNuances(text);
      const toneAnalysis = this.analyzeTone(text);
      
      // Calculate confidence based on text complexity and cultural issues
      const confidence = this.calculateConfidence(text, culturalNuances);
      
      return {
        translatedText,
        confidence,
        culturalNuances,
        toneAnalysis
      };
    } catch (error) {
      throw new Error('Translation service temporarily unavailable. Please try again.');
    }
  }
  
  private static calculateConfidence(text: string, nuances: CulturalNuance[]): number {
    let baseConfidence = 0.9;
    
    // Reduce confidence based on cultural issues
    const severityPenalty = {
      'high': 0.15,
      'medium': 0.08,
      'low': 0.03
    };
    
    nuances.forEach(nuance => {
      baseConfidence -= severityPenalty[nuance.severity];
    });
    
    // Adjust based on text complexity
    const wordCount = text.split(' ').length;
    if (wordCount < 5) baseConfidence -= 0.1;
    if (wordCount > 50) baseConfidence -= 0.05;
    
    return Math.max(0.65, Math.min(0.98, baseConfidence));
  }
  
  private static performTranslation(text: string, targetLanguage: string): string {
    const dictionary = TRANSLATION_DICTIONARY[targetLanguage as keyof typeof TRANSLATION_DICTIONARY];
    
    if (!dictionary) {
      return `[Translation to ${targetLanguage}] ${text}`;
    }
    
    let translatedText = text.toLowerCase();
    
    // Apply context-aware translations
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const translatedSentences = sentences.map(sentence => {
      let translated = sentence.toLowerCase();
      
      // Replace common phrases with context
      Object.entries(dictionary).forEach(([english, translation]) => {
        const regex = new RegExp(`\\b${english}\\b`, 'gi');
        translated = translated.replace(regex, translation);
      });
      
      return translated;
    });
    
    translatedText = translatedSentences.join('. ');
    
    // Add cultural adaptation note
    const culturalNote = this.getCulturalNote(targetLanguage);
    const contextualTip = this.getContextualTip(text, targetLanguage);
    
    return `${translatedText}\n\n${culturalNote}\n\n💡 ${contextualTip}`;
  }
  
  private static getCulturalNote(language: string): string {
    const notes = {
      japanese: '🇯🇵 (丁寧語で表現されています - Expressed in polite form)',
      spanish: '🇪🇸 (Expresado con cortesía apropiada - Expressed with appropriate courtesy)',
      german: '🇩🇪 (Höflich und professionell ausgedrückt - Expressed politely and professionally)',
      french: '🇫🇷 (Exprimé avec politesse appropriée - Expressed with appropriate politeness)'
    };
    
    return notes[language as keyof typeof notes] || '🌍 (Culturally adapted for international communication)';
  }
  
  private static getContextualTip(text: string, language: string): string {
    const tips = {
      japanese: [
        'In Japanese business culture, indirect communication is preferred',
        'Consider using humble forms when making requests',
        'Time references should be very specific to avoid confusion'
      ],
      spanish: [
        'Spanish speakers appreciate warm, personal greetings',
        'Consider regional variations in formal vs informal address',
        'Relationship-building phrases can enhance communication'
      ],
      german: [
        'German business communication values directness and clarity',
        'Structured information with clear timeframes works best',
        'Formal titles and proper greetings are important'
      ],
      french: [
        'French business culture values eloquence and proper form',
        'Polite expressions and formal structures are essential',
        'Context and nuance are highly valued in communication'
      ]
    };
    
    const languageTips = tips[language as keyof typeof tips] || ['Cross-cultural communication benefits from clear, respectful language'];
    return languageTips[Math.floor(Math.random() * languageTips.length)];
  }
  
  private static detectCulturalNuances(text: string): CulturalNuance[] {
    const nuances: CulturalNuance[] = [];
    const lowerText = text.toLowerCase();
    
    // Check for common problematic phrases
    if (lowerText.includes('asap') || lowerText.includes('as soon as possible')) {
      nuances.push(COMMON_PHRASES.asap);
    }
    
    if (lowerText.includes('just wondering') || lowerText.includes('just checking')) {
      nuances.push(COMMON_PHRASES.justWondering);
    }
    
    if (lowerText.includes('let me know')) {
      nuances.push(COMMON_PHRASES.letMeKnow);
    }
    
    if (lowerText.includes('hop on a call') || lowerText.includes('jump on a call')) {
      nuances.push(COMMON_PHRASES.hopOnCall);
    }
    
    if (lowerText.includes('eod') || lowerText.includes('end of day')) {
      nuances.push(COMMON_PHRASES.eod);
    }
    
    if (lowerText.includes('touch base')) {
      nuances.push(COMMON_PHRASES.touchBase);
    }
    
    if (lowerText.includes('circle back')) {
      nuances.push(COMMON_PHRASES.circleBack);
    }
    
    return nuances.length > 0 ? nuances : [];
  }
  
  private static analyzeTone(text: string): ToneAnalysis {
    const lowerText = text.toLowerCase();
    let overall = 'neutral';
    let formality = 'neutral';
    let politeness = 5; // Scale of 1-10
    let urgency = 5; // Scale of 1-10
    const suggestions: string[] = [];
    
    // Analyze urgency
    if (lowerText.includes('urgent') || lowerText.includes('asap') || lowerText.includes('immediately')) {
      urgency = 9;
      overall = 'urgent';
      suggestions.push('Consider softening urgent language to avoid appearing demanding');
    }
    
    // Analyze politeness
    if (lowerText.includes('please') && lowerText.includes('thank')) {
      politeness = 8;
      overall = 'polite';
    } else if (lowerText.includes('please')) {
      politeness = 7;
    } else if (!lowerText.includes('please') && (lowerText.includes('send') || lowerText.includes('give me'))) {
      politeness = 3;
      suggestions.push('Adding "please" would make the message more polite');
    }
    
    // Analyze formality
    if (lowerText.includes('hey') || lowerText.includes('btw') || lowerText.includes('fyi')) {
      formality = 'casual';
      suggestions.push('Consider using more formal language for professional communication');
    } else if (lowerText.includes('dear') || lowerText.includes('respectfully')) {
      formality = 'formal';
    }
    
    // Check for apologies
    if (lowerText.includes('sorry') || lowerText.includes('apolog')) {
      overall = 'apologetic';
      suggestions.push('Consider if an apology is necessary in this context');
    }
    
    // Check for demands
    if (lowerText.includes('need you to') || lowerText.includes('you must')) {
      overall = 'demanding';
      suggestions.push('Consider using more collaborative language like "could you" or "would you be able to"');
    }
    
    if (suggestions.length === 0) {
      suggestions.push('Tone appears appropriate for professional communication');
    }
    
    return {
      overall,
      formality,
      politeness,
      urgency,
      suggestions
    };
  }
}