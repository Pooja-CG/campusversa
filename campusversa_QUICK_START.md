# 🎓 EduSense AI - Quick Start Guide

## 🚀 How to Test the New Features

### 1. **Student Dashboard & Lessons**
```
URL: http://localhost:5173/dashboard
```

#### What to Try:
1. **Language Selection** (Top Right)
   - Click the language dropdown
   - Select: English, Hindi, Kannada, Tamil, or Telugu
   - Content updates automatically

2. **Subjects Section** (New!)
   - Scroll to see "Ongoing Subjects" grid
   - Shows 5 subjects: Biology, Math, English, Physics, History
   - Each has progress bar (0-100%)
   - Click "Continue Learning" button

3. **Adaptive Lesson Player** (Opens as Modal)
   - Reads the lesson section in your selected language
   - Shows "Take Quiz" button
   - Answer 3 MCQs
   - Adaptive logic triggers:
     - Score < 50%: Shows simplified explanation, retry
     - Score > 80%: Advance to next section
     - Score 50-80%: Show success, continue

4. **Voice Interaction** (Blue Button)
   - Click "Ask Question" button
   - Click microphone to record
   - Ask: "What is photosynthesis?" or "How does light help plants?"
   - See AI response + hear audio in your language

5. **AI Tutor Chat** (Green Button)
   - Click "AI Tutor" button
   - Opens floating chat widget
   - Type or click mic to ask questions
   - Chat responds with contextual answers

6. **Offline Mode**
   - Open DevTools → Network → set to "Offline"
   - Yellow banner appears: "Offline Mode Active"
   - Video player disappears
   - Text lessons remain

---

### 2. **Teacher Dashboard**
```
URL: http://localhost:5173/teacher/dashboard
```

#### What to Try:
1. **Class Overview Tab**
   - See roster of 5 students
   - Status indicators: 🔴 🟡 🟢
   - Click "View" to see student details

2. **Student Details**
   - Modal opens with student info
   - Shows: name, ID, current topic, quiz score, last active
   - Color-coded status box
   - Activity log at bottom (today's activities)
   - If struggling (red): See AI suggestions

3. **Performance Analytics Tab**
   - Bar chart showing class performance by subject
   - Color-coded: Green (80+%), Yellow (50-79%), Red (<50%)
   - Shows class average and trends

4. **Class Summary (Right Panel)**
   - Quick stats: # on track / average / struggling
   - Class average score with trend
   - Updates reflect student data

---

## 📋 Test Data Included

### Subjects (Student View):
| Subject | Progress | Chapters | Current |
|---------|----------|----------|---------|
| Biology | 45% | 8 | Photosynthesis |
| Mathematics | 72% | 12 | Calculus |
| English | 60% | 10 | Literature |
| Physics | 38% | 9 | Mechanics |
| History | 55% | 7 | Ancient India |

### Students (Teacher View):
| Name | Status | Topic | Score |
|------|--------|-------|-------|
| Asha Patel | 🔴 Struggling | Photosynthesis | 42% |
| Rohan Singh | 🟡 Average | Calculus | 78% |
| Meena Devi | 🟢 On Track | English Lit | 88% |
| Arjun Verma | 🟡 Average | Physics | 65% |
| Priya Sharma | 🟢 On Track | History | 92% |

---

## 🎨 UI Components Showcase

### Lesson Player Features:
- ✅ Responsive modal design
- ✅ Progress bar at top
- ✅ Language tag display
- ✅ Offline banner
- ✅ Adaptive quiz with radio buttons
- ✅ Color-coded results (green/yellow/red)
- ✅ Multiple action buttons

### Chat Widget:
- ✅ Floating button (bottom right)
- ✅ Minimize/close controls
- ✅ Message history
- ✅ Voice input with visual feedback
- ✅ Responsive to language changes

### Voice Interaction:
- ✅ Animated mic button (red when listening)
- ✅ Visual feedback with animated dots
- ✅ Transcript display
- ✅ AI response with TTS
- ✅ Repeat button
- ✅ Reset option

---

## 🔧 Configuration

### Language Detection:
- Set via dropdown in header
- Stored in component state
- Affects all content instantly

### Offline Detection:
- Uses navigator.onLine
- Listens to 'online'/'offline' events
- Updates UI in real-time

### Mock AI Responses:
- Keyword-based matching
- Expandable with real Claude API
- Currently returns contextual answers

---

## 💾 Data Persistence

Currently using mock data (in-memory). To add persistence:

### Option 1: Local Storage
```javascript
// Save language preference
localStorage.setItem('preferredLanguage', language);

// Load on startup
const saved = localStorage.getItem('preferredLanguage');
```

### Option 2: Backend Integration
```javascript
// Replace mock data in translationHelper.js with API calls
// Examples: Firebase, Supabase, MongoDB
```

---

## 🐛 Known Limitations (Demo Features)

1. **AI Responses**: Currently uses keyword matching
   - **Fix**: Integrate Claude API for real LLM responses
   
2. **Language Support**: Uses mock translations
   - **Fix**: Integrate Google Translate API or similar
   
3. **TTS Quality**: Uses browser Speech Synthesis
   - **Fix**: Use AWS Polly or similar for better quality
   
4. **Data Persistence**: All in-memory
   - **Fix**: Add database backend

---

## ✅ Verification Checklist

- [ ] Student dashboard loads on /dashboard
- [ ] Language selector works
- [ ] Subjects grid displays all 5 subjects
- [ ] "Continue Learning" opens lesson player
- [ ] Lesson player shows content in selected language
- [ ] Quiz works and adaptive logic triggers
- [ ] Voice button works (microphone access needed)
- [ ] AI Chat widget responds
- [ ] Offline mode indicator works
- [ ] Teacher dashboard loads on /teacher/dashboard
- [ ] Student roster displays with status indicators
- [ ] Clicking "View" shows student details
- [ ] Performance chart displays data
- [ ] All buttons and links respond

---

## 📞 Support

If features don't work:
1. Check browser console (F12) for errors
2. Ensure microphone permission is granted for voice features
3. Test in a modern browser (Chrome, Edge, Firefox, Safari)
4. Check that Recharts is installed: `npm install recharts`

---

**Happy Testing! 🎉**
