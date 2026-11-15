export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
];

export const SUPPORTED_LANGUAGE_CODES = ["en", "hi", "ta", "te", "ml", "kn"] as const;
export type LanguageCode = (typeof SUPPORTED_LANGUAGE_CODES)[number];

export interface UILabels {
  parentBriefing: string;
  quickSummary: string;
  intuition: string;
  stepsHeading: string;
  notesHeading: string;
  notesSubtext: string;
  keyTermsHeading: string;
  coreRulesHeading: string;
  realWorldHeading: string;
  cheatSheetHeading: string;
  teachingScriptHeading: string;
  teachingScriptSubtext: string;
  commonMistakesHeading: string;
  practiceHeading: string;
  practiceSubtext: string;
  showHint: string;
  hideHint: string;
  revealAnswer: string;
  hideAnswer: string;
  answerLabel: string;
  solutionStepsLabel: string;
  printWorksheet: string;
  backToSearch: string;
  languageSelectLabel: string;
  problemOf: string;
}

export const UI_TRANSLATIONS: Record<LanguageCode, UILabels> = {
  en: {
    parentBriefing: "Parent Briefing",
    quickSummary: "Quick Summary (Read in 30 seconds)",
    intuition: "The Intuition Behind It",
    stepsHeading: "How to Explain It Step-by-Step",
    notesHeading: "Complete Teaching Notes for Parents",
    notesSubtext:
      "Full conceptual guide, definitions, key rules, and memory aids to help you teach with confidence.",
    keyTermsHeading: "Key Terms & Definitions",
    coreRulesHeading: "Core Rules & Formulas",
    realWorldHeading: "Real-World Metaphors & Examples",
    cheatSheetHeading: "Parent's Quick Cheat Sheet",
    teachingScriptHeading: "Try Saying This to Your Child",
    teachingScriptSubtext:
      "Feel free to adapt these words to whatever conversational style works best for you and your child.",
    commonMistakesHeading: "Common Mistakes to Watch Out For",
    practiceHeading: "5 Practice Problems",
    practiceSubtext:
      "Progressive problems designed to test understanding step-by-step.",
    showHint: "💡 Show Hint",
    hideHint: "💡 Hide Hint",
    revealAnswer: "✓ Reveal Answer",
    hideAnswer: "✓ Hide Answer & Solution",
    answerLabel: "Answer:",
    solutionStepsLabel: "Step-by-Step Solution:",
    printWorksheet: "Print Worksheet",
    backToSearch: "Back to Search",
    languageSelectLabel: "Explain in:",
    problemOf: "Problem",
  },
  hi: {
    parentBriefing: "अभिभावक गाइड (Parent Briefing)",
    quickSummary: "त्वरित सारांश (30 सेकंड में समझें)",
    intuition: "इसके पीछे का मुख्य विचार (Intuition)",
    stepsHeading: "कदम-दर-कदम कैसे समझाएं",
    notesHeading: "अभिभावक के लिए संपूर्ण शिक्षण नोट्स (Complete Notes)",
    notesSubtext:
      "बच्चे को आत्मविश्वास से सिखाने के लिए संपूर्ण अवधारणा, महत्वपूर्ण परिभाषाएं, नियम और उदाहरण।",
    keyTermsHeading: "मुख्य शब्द और परिभाषाएं (Key Definitions)",
    coreRulesHeading: "मूल नियम एवं सिद्धांत (Core Rules)",
    realWorldHeading: "दैनिक जीवन के उदाहरण एवं उपमाएं",
    cheatSheetHeading: "अभिभावक चीट-शीट (Quick Cheat Sheet)",
    teachingScriptHeading: "अपने बच्चे से यह कहकर समझाएं",
    teachingScriptSubtext:
      "आप इन शब्दों को अपनी पसंद के अनुसार आसान भाषा में बदलकर बच्चे से बात कर सकते हैं।",
    commonMistakesHeading: "सामान्य गलतियाँ जिनसे सावधान रहें",
    practiceHeading: "5 अभ्यास प्रश्न",
    practiceSubtext: "बच्चे की समझ को धीरे-धीरे मजबूत करने के लिए 5 अभ्यास प्रश्न।",
    showHint: "💡 संकेत (Hint) देखें",
    hideHint: "💡 संकेत छिपाएं",
    revealAnswer: "✓ उत्तर देखें",
    hideAnswer: "✓ उत्तर और हल छिपाएं",
    answerLabel: "उत्तर:",
    solutionStepsLabel: "कदम-दर-कदम हल:",
    printWorksheet: "वर्कशीट प्रिंट करें",
    backToSearch: "खोज पर वापस जाएं",
    languageSelectLabel: "भाषा चुनें:",
    problemOf: "प्रश्न",
  },
  ta: {
    parentBriefing: "பெற்றோர் வழிகாட்டி (Parent Briefing)",
    quickSummary: "விரைவு சுருக்கம் (30 நொடிகளில் படிக்கவும்)",
    intuition: "இதன் பின்னணியில் உள்ள யோசனை (Intuition)",
    stepsHeading: "படி படியாக விளக்குவது எப்படி",
    notesHeading: "பெற்றோருக்கான முழுமையான கற்றல் குறிப்புகள் (Complete Notes)",
    notesSubtext:
      "உங்கள் குழந்தைக்கு எளிதாகக் கற்பிக்க உதவும் முழுமையான விளக்கங்கள், முக்கிய விதிகளும் எடுத்துக்காட்டுகளும்.",
    keyTermsHeading: "முக்கிய சொற்களும் விளக்கங்களும் (Key Terms)",
    coreRulesHeading: "அடிப்படை விதிகளும் சூத்திரங்களும் (Core Rules)",
    realWorldHeading: "நடைமுறை வாழ்க்கை உதாரணங்கள்",
    cheatSheetHeading: "பெற்றோருக்கான சுருக்கக் குறிப்பு (Cheat Sheet)",
    teachingScriptHeading: "உங்கள் குழந்தையிடம் இதை சொல்லிப் பாருங்கள்",
    teachingScriptSubtext:
      "உங்கள் குழந்தைக்கு எளிதாக புரியும் வகையில் உங்கள் சொந்த வார்த்தைகளிலும் பேசலாம்.",
    commonMistakesHeading: "கவனிக்க வேண்டிய பொதுவான தவறுகள்",
    practiceHeading: "5 பயிற்சி கணக்குகள்",
    practiceSubtext: "படி படியாகப் புரிந்து கொள்ள வடிவமைக்கப்பட்ட 5 பயிற்சிகள்.",
    showHint: "💡 குறிப்பு (Hint) காட்டு",
    hideHint: "💡 குறிப்பை மறை",
    revealAnswer: "✓ பதில் காட்டு",
    hideAnswer: "✓ பதில் & தீர்வை மறை",
    answerLabel: "பதில்:",
    solutionStepsLabel: "படி படியான தீர்வு:",
    printWorksheet: "பணித்தாளை அச்சிடுக",
    backToSearch: "மீண்டும் தேடலுக்குச் செல்க",
    languageSelectLabel: "விளக்க மொழி:",
    problemOf: "கேள்வி",
  },
  te: {
    parentBriefing: "తల్లిదండ్రుల గైడ్ (Parent Briefing)",
    quickSummary: "త్వరిత సారాంశం (30 సెకన్లలో చదవండి)",
    intuition: "దీని వెనుక ఉన్న ఆలోచన (Intuition)",
    stepsHeading: "దశలవారీగా ఎలా వివరించాలి",
    notesHeading: "తల్లిదండ్రుల కోసం పూర్తి బోధనా నోట్స్ (Complete Notes)",
    notesSubtext:
      "పిల్లలకు ఆత్మవిశ్వాసంతో బోధించడానికి పూర్తి భావన, ముఖ్యమైన నిర్వచనాలు, నియమాలు మరియు ఉదాహరణలు.",
    keyTermsHeading: "ముఖ్యమైన పదాలు & నిర్వచనాలు (Key Terms)",
    coreRulesHeading: "ముఖ్య నియమాలు & సూత్రాలు (Core Rules)",
    realWorldHeading: "నిజ జీవిత ఉదాహరణలు & పోలికలు",
    cheatSheetHeading: "త్వరిత రిఫరెన్స్ చీట్ షీట్ (Cheat Sheet)",
    teachingScriptHeading: "మీ పిల్లలతో ఇలా చెప్పి చూడండి",
    teachingScriptSubtext:
      "మీ పిల్లాడితో మాట్లాడేటప్పుడు మీ సహజమైన శైలికి తగినట్లుగా ఈ మాటలను మార్చుకోవచ్చు.",
    commonMistakesHeading: "జాగ్రత్త వహించాల్సిన సాధారణ పొరపాట్లు",
    practiceHeading: "5 అభ్యాస ప్రశ్నలు",
    practiceSubtext: "అర్థం చేసుకోవడాన్ని క్రమంగా పరీక్షించడానికి 5 ప్రాక్టీస్ ప్రశ్నలు.",
    showHint: "💡 క్లూ (Hint) చూడండి",
    hideHint: "💡 క్లూ దాచండి",
    revealAnswer: "✓ సమాధానం చూడండి",
    hideAnswer: "✓ సమాధానం దాచండి",
    answerLabel: "సమాధానం:",
    solutionStepsLabel: "దశలవారీ పరిష్కారం:",
    printWorksheet: "వర్క్‌షీట్ ప్రింట్ చేయండి",
    backToSearch: "వెనుకకు వెళ్ళండి",
    languageSelectLabel: "వివరణ భాష:",
    problemOf: "ప్రశ్న",
  },
  ml: {
    parentBriefing: "രക്ഷിതാക്കൾക്കുള്ള ഗൈഡ് (Parent Briefing)",
    quickSummary: "ചുരുക്കം (30 സെക്കൻഡിൽ വായിക്കാം)",
    intuition: "ഇതിന്റെ അടിസ്ഥാന ആശയം (Intuition)",
    stepsHeading: "ഘട്ടം ഘട്ടമായി എങ്ങനെ വിശദീകരിക്കാം",
    notesHeading: "രക്ഷിതാക്കൾക്കുള്ള പൂർണ്ണ പഠന കുറിപ്പുകൾ (Complete Notes)",
    notesSubtext:
      "കുട്ടിക്ക് ആത്മവിശ്വാസത്തോടെ പറഞ്ഞുകൊടുക്കാൻ സഹായിക്കുന്ന സമഗ്രമായ വിശദീകരണങ്ങളും നിയമങ്ങളും ഉദാഹരണങ്ങളും.",
    keyTermsHeading: "പ്രധാന പദങ്ങളും അർത്ഥങ്ങളും (Key Terms)",
    coreRulesHeading: "പ്രധാന നിയമങ്ങളും സൂത്രവാക്യങ്ങളും (Core Rules)",
    realWorldHeading: "യഥാർത്ഥ ജീവിത ഉദാഹരണങ്ങൾ",
    cheatSheetHeading: "ദ്രുത റഫറൻസ് ചീറ്റ് ഷീറ്റ് (Cheat Sheet)",
    teachingScriptHeading: "കുട്ടിയോട് ഇങ്ങനെ പറഞ്ഞു നോക്കൂ",
    teachingScriptSubtext:
      "നിങ്ങളുടെ സ്വന്തം സംസാരശൈലിക്ക് അനുയോജ്യമായ രീതിയിൽ ഈ വാക്കുകൾ മാറ്റിപ്പറയാവുന്നതാണ്.",
    commonMistakesHeading: "ശ്രദ്ധിക്കേണ്ട സാധാരണ തെറ്റുകൾ",
    practiceHeading: "5 പരിശീലന ചോദ്യങ്ങൾ",
    practiceSubtext: "ധാരണ വ്യക്തമാക്കാൻ 5 ഘട്ടം ഘട്ടമായുള്ള ചോദ്യങ്ങൾ.",
    showHint: "💡 സൂചന (Hint) കാണിക്കുക",
    hideHint: "💡 സൂചന മറയ്ക്കുക",
    revealAnswer: "✓ ഉത്തരം കാണുക",
    hideAnswer: "✓ ഉത്തരവും വഴിയും മറയ്ക്കുക",
    answerLabel: "ഉത്തരം:",
    solutionStepsLabel: "ഘട്ടം ഘട്ടമായുള്ള പരിഹാരം:",
    printWorksheet: "വർക്ക്ഷീറ്റ് പ്രിന്റ് ചെയ്യുക",
    backToSearch: "തിരികെ പോവുക",
    languageSelectLabel: "വിശദീകരണ ഭാഷ:",
    problemOf: "ചോദ്യം",
  },
  kn: {
    parentBriefing: "ಪೋಷಕರ ಮಾರ್ಗದರ್ಶಿ (Parent Briefing)",
    quickSummary: "ತ್ವರಿತ ಸಾರಾಂಶ (30 ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಓದಿ)",
    intuition: "ಇದರ ಹಿಂದಿನ ಕಲ್ಪನೆ (Intuition)",
    stepsHeading: "ಹಂತ-ಹಂತವಾಗಿ ವಿವರಿಸುವುದು ಹೇಗೆ",
    notesHeading: "ಪೋಷಕರಿಗೆ ಸಂಪೂರ್ಣ ಬೋಧನಾ ಟಿಪ್ಪಣಿಗಳು (Complete Notes)",
    notesSubtext:
      "ಮಗುವಿಗೆ ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಕಲಿಸಲು ಸಮಗ್ರ ಕಲ್ಪನೆ, ಮುಖ್ಯ ವ್ಯಾಖ್ಯಾನಗಳು, ನಿಯಮಗಳು ಮತ್ತು ಉದಾಹರಣೆಗಳು.",
    keyTermsHeading: "ಪ್ರಮುಖ ಪದಗಳು ಮತ್ತು ವ್ಯಾಖ್ಯಾನಗಳು (Key Terms)",
    coreRulesHeading: "ಮೂಲ ನಿಯಮಗಳು ಮತ್ತು ಸೂತ್ರಗಳು (Core Rules)",
    realWorldHeading: "ನಿಜ ಜೀವನದ ಉದಾಹರಣೆಗಳು",
    cheatSheetHeading: "ಪೋಷಕರ ತ್ವರಿತ ಚೀಟ್ ಶೀಟ್ (Cheat Sheet)",
    teachingScriptHeading: "ನಿಮ್ಮ ಮಗುವಿಗೆ ಹೀಗೆ ಹೇಳಿ ನೋಡಿ",
    teachingScriptSubtext:
      "ನಿಮ್ಮ ಮಗುವಿನೊಂದಿಗೆ ಸಂಭಾಷಣೆಗೆ ತಕ್ಕಂತೆ ಈ ಪದಗಳನ್ನು ಸುಲಭವಾಗಿ ಹೊಂದಿಸಿಕೊಳ್ಳಿ.",
    commonMistakesHeading: "ಗಮನಿಸಬೇಕಾದ ಸಾಮಾನ್ಯ ತಪ್ಪುಗಳು",
    practiceHeading: "5 ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು",
    practiceSubtext: "ಹಂತ-ಹಂತವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು 5 ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು.",
    showHint: "💡 ಸುಳಿವು (Hint) ನೋಡಿ",
    hideHint: "💡 ಸುಳಿವು ಮರೆಮಾಡಿ",
    revealAnswer: "✓ ಉತ್ತರ ನೋಡಿ",
    hideAnswer: "✓ ಉತ್ತರ ಮತ್ತು ಹಂತಗಳನ್ನು ಮರೆಮಾಡಿ",
    answerLabel: "ಉತ್ತರ:",
    solutionStepsLabel: "ಹಂತ-ಹಂತದ ಪರಿಹಾರ:",
    printWorksheet: "ವರ್ಕ್‌ಶೀಟ್ ಮುದ್ರಿಸಿ",
    backToSearch: "ಹಿಂದಕ್ಕೆ ಹೋಗಿ",
    languageSelectLabel: "ವಿವರಣೆಯ ಭಾಷೆ:",
    problemOf: "ಪ್ರಶ್ನೆ",
  },
};
