// Language Translation Helper
export const languages = ['English', 'Kannada', 'Hindi', 'Tamil', 'Telugu', 'Malayalam'];

export const languageCodes = {
  English: 'en',
  Kannada: 'kn',
  Hindi: 'hi',
  Tamil: 'ta',
  Telugu: 'te',
  Malayalam: 'ml',
};

export const lessons = {
  photosynthesis: {
    title: 'Photosynthesis',
    sections: [
      {
        id: 1,
        contentEn: 'Photosynthesis is the process by which plants convert sunlight into chemical energy. It occurs in the chloroplasts of plant cells.',
        contentKn: 'ದ್ರುವವರ್ಣಿ ಸಂಶ್ಲೇಷಣೆಯು ಸಸ್ಯಗಳು ಸೂರ್ಯನ ಬೆಳಕನ್ನು ರಾಸಾಯನಿಕ ಶಕ್ತಿಗೆ ಪರಿವರ್ತಿಸುವ ಪ್ರಕ್ರಿಯೆ.',
        contentHi: 'प्रकाश संश्लेषण वह प्रक्रिया है जिसके द्वारा पौधे सूर्य के प्रकाश को रासायनिक ऊर्जा में परिवर्तित करते हैं।',
        contentTa: 'ஒளி சংश்ලேषணம் என்பது தாவரங்கள் சூரியனின் ஒளியை வேதியியல் ஆற்றலாக மாற்றும் செயல்முறை.',
        contentTe: 'కాంతి సంశ్లేషణ అనేది మొక్కలు సూర్యుని కాంతిని రసాయన శక్తిగా మార్చుకునే ప్రక్రియ.',
        quiz: [
          { id: 1, question: 'Where does photosynthesis occur in plant cells?', options: ['Mitochondria', 'Chloroplasts', 'Nucleus', 'Cell Membrane'], correct: 1 },
          { id: 2, question: 'What is the main source of energy for photosynthesis?', options: ['Water', 'Soil', 'Sunlight', 'Oxygen'], correct: 2 },
          { id: 3, question: 'Which gas is produced during photosynthesis?', options: ['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], correct: 1 },
        ],
      },
      {
        id: 2,
        contentEn: 'The light-dependent reactions occur in the thylakoid membranes. Chlorophyll absorbs light energy and converts it into ATP and NADPH.',
        contentKn: 'ಬೆಳಕ-ಅವಲಂಬಿ ಪ್ರತಿಕ್ರಿಯೆಗಳು ಥೈಲಕೋಯಿಡ್ ಪೊರೆಯಲ್ಲಿ ಸಂಭವಿಸುತ್ತವೆ.',
        contentHi: 'प्रकाश-निर्भर प्रतिक्रियाएं थायलाकॉइड झिल्ली में होती हैं।',
        contentTa: 'ஒளி-சார்புடைய எதிர்வினைகள் தைலாகோய்ட் சவ్வில் ஏற்படுகின்றன.',
        contentTe: 'కాంతి-ఆధారిత ప్రతిక్రియలు థైలకోయిడ్ పొరలో సంభవిస్తాయి.',
        quiz: [
          { id: 1, question: 'Which molecule absorbs light in photosynthesis?', options: ['Chlorophyll', 'Glucose', 'Water', 'Carbon Dioxide'], correct: 0 },
          { id: 2, question: 'What does the light reaction produce?', options: ['Glucose', 'ATP and NADPH', 'Starch', 'Cellulose'], correct: 1 },
          { id: 3, question: 'Where do light reactions occur?', options: ['Stroma', 'Thylakoid', 'Nucleus', 'Cytoplasm'], correct: 1 },
        ],
      },
      {
        id: 3,
        contentEn: 'The dark reactions (Calvin Cycle) occur in the stroma. They use ATP and NADPH from light reactions to fix carbon dioxide into glucose.',
        contentKn: 'ಡಾರ್ಕ್ ರಿಯಾಕ್ಷನ್ಗಳು ಸ್ಟ್ರೋಮಾದಲ್ಲಿ ಸಂಭವಿಸುತ್ತವೆ.',
        contentHi: 'अंधकार प्रतिक्रियाएं स्ट्रोमा में होती हैं।',
        contentTa: 'இருண்ட எதிர்வினைகள் ஸ்ட்ரோமாவில் ஏற்படுகின்றன.',
        contentTe: 'చీకటి ప్రతిక్రియలు స్ట్రోమాలో సంభవిస్తాయి.',
        contentMl: 'இருண்ட எதிர்வினைகள் ஸ்ட்ரோமாவில் ஏற்படுகின்றன.', // simplified mock
        quiz: [
          { id: 1, question: 'Which process is known as the Calvin Cycle?', options: ['Light Reaction', 'Dark Reaction', 'Photolysis', 'Transpiration'], correct: 1 },
          { id: 2, question: 'Where does the Calvin Cycle occur?', options: ['Thylakoid', 'Stroma', 'Cell Wall', 'Vacuole'], correct: 1 },
          { id: 3, question: 'What is the final product of photosynthesis?', options: ['ATP', 'NADPH', 'Glucose', 'Oxygen'], correct: 2 },
        ],
      },
    ],
  },
  calculus: {
    title: 'Calculus',
    sections: [
      {
        id: 1,
        contentEn: 'Calculus is the mathematical study of continuous change. It has two major branches: differential calculus and integral calculus.',
        contentKn: 'ಕ್ಯಾಲ್ಕುಲಸ್ ಎಂದರೆ ನಿರಂತರ ಬದಲಾವಣೆಯ ಗಣಿತದ ಅಧ್ಯಯನ.',
        contentHi: 'कैलकुलस निरंतर परिवर्तन का गणितीय अध्ययन है।',
        contentTa: 'கால்குலஸ் என்பது தொடர்ச்சியான மாற்றத்தின் கணித ஆய்வு.',
        contentTe: 'కాల్కులస్ అనేది నిరంతర మార్పు యొక్క గణిత అధ్యయనం.',
        contentMl: 'கால்குலஸ் என்பது தொடர்ச்சியான மாற்றத்தின் கணித ஆய்வு.',
        quiz: [
          { id: 1, question: 'What are the two main branches of calculus?', options: ['Algebra and Geometry', 'Differential and Integral', 'Trigonometry and Arithmetic', 'Probability and Statistics'], correct: 1 },
        ],
      }
    ],
  },
  literature: {
    title: 'Literature',
    sections: [
      {
        id: 1,
        contentEn: 'English literature explores classic poetry, prose, and plays. Shakespeare is one of the most famous playwrights.',
        contentKn: 'ಇಂಗ್ಲಿಷ್ ಸಾಹಿತ್ಯವು ಶಾಸ್ತ್ರೀಯ ಕವನ, ಗದ್ಯ ಮತ್ತು ನಾಟಕಗಳನ್ನು ಪರಿಶೋಧಿಸುತ್ತದೆ.',
        contentHi: 'अंग्रेजी साहित्य क्लासिक कविता, गद्य और नाटकों की पड़ताल करता है।',
        contentTa: 'ஆங்கில இலக்கியம் கிளாசிக் கவிதை, உரைநடை மற்றும் நாடகங்களை ஆராய்கிறது.',
        contentTe: 'ఆంగ్ల సాహిత్యం క్లాసిక్ కవిత్వం, గద్య మరియు నాటకాలను అన్వేషిస్తుంది.',
        contentMl: 'ஆங்கில இலக்கியம் கிளாசிக் கவிதை, உரைநடை மற்றும் நாடகங்களை ஆராய்கிறது.',
        quiz: [
          { id: 1, question: 'Who is a famous English playwright?', options: ['Newton', 'Einstein', 'Shakespeare', 'Galileo'], correct: 2 },
        ],
      }
    ],
  },
  mechanics: {
    title: 'Mechanics',
    sections: [
      {
        id: 1,
        contentEn: 'Mechanics is the area of physics concerned with the motions of macroscopic objects.',
        contentKn: 'ಯಂತ್ರಶಾಸ್ತ್ರವು ಸ್ಥೂಲದರ್ಶಕ ವಸ್ತುಗಳ ಚಲನೆಗೆ ಸಂಬಂಧಿಸಿದ ಭೌತಶಾಸ್ತ್ರದ ಕ್ಷೇತ್ರವಾಗಿದೆ.',
        contentHi: 'यांत्रिकी भौतिकी का वह क्षेत्र है जो मैक्रोस्कोपिक वस्तुओं की गति से संबंधित है।',
        contentTa: 'மெக்கானிக்ஸ் என்பது மேக்ரோஸ்கோபிக் பொருட்களின் இயக்கங்களைப் பற்றிய இயற்பியல் பகுதியாகும்.',
        contentTe: 'మెకానిక్స్ అనేది స్థూల వస్తువుల కదలికలకు సంబంధించిన భౌతిక శాస్త్రం.',
        contentMl: 'மெக்கானிக்ஸ் என்பது மேக்ரோஸ்கோபிக் பொருட்களின் இயக்கங்களைப் பற்றிய இயற்பியல் பகுதியாகும்.',
        quiz: [
          { id: 1, question: 'Mechanics deals with the motion of what kind of objects?', options: ['Microscopic', 'Macroscopic', 'Subatomic', 'Invisible'], correct: 1 },
        ],
      }
    ],
  },
  ancient_india: {
    title: 'Ancient India',
    sections: [
      {
        id: 1,
        contentEn: 'Ancient Indian history involves the Indus Valley Civilization, Vedic period, and the Maurya Empire.',
        contentKn: 'ಪ್ರಾಚೀನ ಭಾರತೀಯ ಇತಿಹಾಸವು ಸಿಂಧೂ ಕಣಿವೆ ನಾಗರಿಕತೆಯನ್ನು ಒಳಗೊಂಡಿದೆ.',
        contentHi: 'प्राचीन भारतीय इतिहास में सिंधु घाटी सभ्यता, वैदिक काल और मौर्य साम्राज्य शामिल हैं।',
        contentTa: 'பண்டைய இந்திய வரலாற்றில் சிந்து சமவெளி நாகரிகம் அடங்கும்.',
        contentTe: 'ప్రాచీన భారతీయ చరిత్రలో సింధు లోయ నాగరికత ఉంది.',
        contentMl: 'பண்டைய இந்திய வரலாற்றில் சிந்து சமவெளி நாகரிகம் அடங்கும்.',
        quiz: [
          { id: 1, question: 'Which civilization is a major part of Ancient Indian history?', options: ['Roman', 'Greek', 'Indus Valley', 'Inca'], correct: 2 },
        ],
      }
    ],
  },
};

export const getContent = (lessonKey, sectionId, language) => {
  const lesson = lessons[lessonKey];
  if (!lesson) return '';
  
  const section = lesson.sections.find(s => s.id === sectionId);
  if (!section) return '';

  const contentKey = `content${language}`;
  return section[contentKey] || section.contentEn;
};

export const getQuiz = (lessonKey, sectionId) => {
  const lesson = lessons[lessonKey];
  if (!lesson) return [];
  
  const section = lesson.sections.find(s => s.id === sectionId);
  return section?.quiz || [];
};

export const studentSubjects = [
  { id: 1, name: 'Biology', progress: 45, chapters: 8, currentChapter: 3, current_lesson: 'photosynthesis' },
  { id: 2, name: 'Mathematics', progress: 72, chapters: 12, currentChapter: 8, current_lesson: 'calculus' },
  { id: 3, name: 'English', progress: 60, chapters: 10, currentChapter: 6, current_lesson: 'literature' },
  { id: 4, name: 'Physics', progress: 38, chapters: 9, currentChapter: 3, current_lesson: 'mechanics' },
  { id: 5, name: 'History', progress: 55, chapters: 7, currentChapter: 4, current_lesson: 'ancient_india' },
];

export const studentData = {
  name: 'Rohan Kumar',
  class: '10th Grade',
  school: 'Delhi Public School',
  preferredLanguage: 'English',
};

export const teacherStudentData = [
  { id: 1, name: 'Asha Patel', lastActive: '2 hours ago', currentTopic: 'Photosynthesis', quizScore: 42, status: 'struggling' },
  { id: 2, name: 'Rohan Singh', lastActive: '1 hour ago', currentTopic: 'Calculus', quizScore: 78, status: 'average' },
  { id: 3, name: 'Meena Devi', lastActive: '30 mins ago', currentTopic: 'English Literature', quizScore: 88, status: 'ontrack' },
  { id: 4, name: 'Arjun Verma', lastActive: '45 mins ago', currentTopic: 'Physics Mechanics', quizScore: 65, status: 'average' },
  { id: 5, name: 'Priya Sharma', lastActive: '5 mins ago', currentTopic: 'Ancient History', quizScore: 92, status: 'ontrack' },
];

export const classPerformanceData = [
  { subject: 'Biology', performance: 55 },
  { subject: 'Mathematics', performance: 68 },
  { subject: 'English', performance: 72 },
  { subject: 'Physics', performance: 48 },
  { subject: 'History', performance: 63 },
];
