// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Image,
//   SafeAreaView,
//   Dimensions,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width } = Dimensions.get('window');
// const API_BASE = 'https://apijustdecide.navaacharan.com';

// const fallbackQuestions = [
//   { question: 'How much do you enjoy action in movies?', options: ['Not at all', 'Somewhat', 'A lot', 'I love it'] },
//   { question: 'Do you like romantic storylines?', options: ['Not really', 'Sometimes', 'Often', 'Always'] },
//   { question: 'How important is comedy to you in a movie?', options: ['Not important', 'Nice to have', 'Important', 'Very important'] },
//   { question: 'Do you prefer fast-paced or slow-burn plots?', options: ['Slow-burn', 'Balanced', 'Fast-paced', 'Extremely fast'] },
//   { question: 'How much do you care about the movie setting?', options: ['Not at all', 'A little', 'Quite a bit', 'Very much'] },
//   { question: 'How important is visual cinematography to you?', options: ['Not important', 'Somewhat', 'Important', 'Very important'] },
//   { question: 'Do you enjoy fantasy or supernatural elements?', options: ['No', 'Occasionally', 'Often', 'Always'] },
//   { question: 'How much do you enjoy sci-fi themes?', options: ['Not at all', 'A little', 'A lot', 'I love it'] },
//   { question: 'Do you like gore or intense violence in movies?', options: ['No', 'A little', 'Yes', 'The more, the better'] },
//   { question: 'Do you enjoy stories with twists and mystery?', options: ['Not at all', 'A bit', 'Yes', 'Love plot twists'] },
//   { question: 'Do you prefer movies with a strong moral message?', options: ['No', 'Maybe', 'Usually', 'Definitely'] },
//   { question: 'How much do you care about the music/soundtrack?', options: ['Not at all', 'Sometimes', 'Often', 'Always'] },
//   { question: 'Would you prefer movies with children or teens?', options: ['No', 'Occasionally', 'Sure', 'Love them'] },
//   { question: 'Do you enjoy biopics or based-on-true-story films?', options: ['No', 'Rarely', 'Often', 'Love them'] },
//   { question: 'Do you like ensemble casts (many main characters)?', options: ['No', 'Maybe', 'Yes', 'Absolutely'] },
//   { question: 'How long should a movie be for you?', options: ['< 90 mins', '90–120 mins', '2–2.5 hrs', '> 2.5 hrs'] },
//   { question: 'Do you prefer old classics or recent movies?', options: ['Old', 'Balanced', 'New', 'Latest only'] },
//   { question: 'How important are high IMDb ratings to you?', options: ['Not at all', 'Somewhat', 'Important', 'Very important'] },
//   { question: 'Do you like critically acclaimed films?', options: ['Not really', 'Sometimes', 'Often', 'Yes'] },
//   { question: 'Do you enjoy watching foreign-language films?', options: ['No', 'Maybe', 'Yes', 'Love them'] },
// ];

// export default function QuestionnaireScreen({ navigation }) {
//   const [questions, setQuestions] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch(`${API_BASE}/preferences/questions`);
//         if (!res.ok) throw new Error('Server error');
//         const data = await res.json();
//         setQuestions(data.questions);
//       } catch (err) {
//         console.warn('Using fallback questions →', err.message);
//         setQuestions(fallbackQuestions);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const submitAnswers = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) throw new Error('No token found');

//       const res = await fetch(`${API_BASE}/preferences/submit`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ answers }),
//       });

//       if (!res.ok) {
//         const e = await res.json();
//         throw new Error(e.detail || 'Submission failed');
//       }

//       navigation.replace('Home');
//     } catch (err) {
//       Alert.alert('Error', err.message);
//       navigation.replace('Home');
//     }
//   };

//   const handleAnswer = (option) => {
//     setSelected(option);

//     if (current < questions.length - 1) {
//       setAnswers((prev) => [...prev, option]);
//       setTimeout(() => {
//         setCurrent((c) => c + 1);
//         setSelected(null);
//       }, 500);
//     } else {
//       // For last question, update the answer but wait for manual submit
//       const newAnswers = [...answers];
//       newAnswers[current] = option;
//       setAnswers(newAnswers);
//     }
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.safe}>
//         <View style={styles.loaderBox}>
//           <ActivityIndicator color="#FFA500" size="large" />
//           <Text style={{ color: '#FFA500', marginTop: 12 }}>Loading quiz…</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   const q = questions[current];
//   const total = questions.length;

//   return (
//     <SafeAreaView style={styles.safe}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Image
//           source={require('../assets/robots.png')}
//           style={styles.robotImage}
//           resizeMode="contain"
//         />

//         <Text style={styles.header}>Question {current + 1} / {total}</Text>
//         <View style={styles.progressBar}>
//           <View style={[styles.progressFill, { width: `${((current + 1) / total) * 100}%` }]} />
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.subText}>Select an answer</Text>
//           <Text style={styles.question}>{q.question}</Text>

//           {q.options.map((option, i) => (
//             <TouchableOpacity
//               key={i}
//               style={[styles.optionBtn, selected === option && styles.selectedBtn]}
//               onPress={() => handleAnswer(option)}
//               disabled={selected !== null && current !== total - 1}
//             >
//               <Text style={[styles.optionText, selected === option && styles.selectedText]}>
//                 {selected === option ? '✓ ' : ''}{option}
//               </Text>
//             </TouchableOpacity>
//           ))}

//           <TouchableOpacity
//             onPress={() => {
//               if (current === total - 1 && selected) {
//                 submitAnswers();
//               } else if (selected) {
//                 handleAnswer(selected);
//               }
//             }}
//             disabled={!selected}
//             style={[styles.nextBtn, { opacity: selected ? 1 : 0.5 }]}
//           >
//             <Text style={styles.nextText}>
//               {current === total - 1 ? 'Submit' : 'Next →'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: '#001855' },
//   container: { paddingTop: 40, paddingHorizontal: 20, paddingBottom: 40 },
//   loaderBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   robotImage: { width: width * 0.9, height: width * 0.5, alignSelf: 'center', marginBottom: 20 },
//   header: { color: 'white', fontSize: 18, fontWeight: '600', marginBottom: 10 },
//   progressBar: { height: 8, backgroundColor: '#704EA1', borderRadius: 10, overflow: 'hidden', marginBottom: 20 },
//   progressFill: { height: '100%', backgroundColor: '#FFA500' },
//   card: { backgroundColor: 'white', borderRadius: 18, padding: 20, elevation: 5 },
//   subText: { color: '#888', marginBottom: 6, fontSize: 14 },
//   question: { fontSize: 18, fontWeight: '600', color: '#222', marginBottom: 16 },
//   optionBtn: { borderWidth: 1, borderColor: '#ccc', padding: 14, borderRadius: 10, marginVertical: 6 },
//   selectedBtn: { backgroundColor: '#FFE7C0', borderColor: '#FFA500' },
//   optionText: { fontSize: 16, color: '#444' },
//   selectedText: { color: '#D35400', fontWeight: 'bold' },
//   nextBtn: { marginTop: 20, backgroundColor: '#FFA500', padding: 14, borderRadius: 10, alignItems: 'center' },
//   nextText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
// });


// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Image,
//   SafeAreaView,
//   Dimensions,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width } = Dimensions.get('window');
// const API_BASE = 'https://apijustdecide.navaacharan.com';

// const fallbackQuestions = [
//   { question: 'How much do you enjoy action in movies?', options: ['Not at all', 'Somewhat', 'A lot', 'I love it'] },
//   { question: 'Do you like romantic storylines?', options: ['Not really', 'Sometimes', 'Often', 'Always'] },
//   { question: 'How important is comedy to you in a movie?', options: ['Not important', 'Nice to have', 'Important', 'Very important'] },
//   { question: 'Do you prefer fast-paced or slow-burn plots?', options: ['Slow-burn', 'Balanced', 'Fast-paced', 'Extremely fast'] },
//   { question: 'How much do you care about the movie setting?', options: ['Not at all', 'A little', 'Quite a bit', 'Very much'] },
//   { question: 'How important is visual cinematography to you?', options: ['Not important', 'Somewhat', 'Important', 'Very important'] },
//   { question: 'Do you enjoy fantasy or supernatural elements?', options: ['No', 'Occasionally', 'Often', 'Always'] },
//   { question: 'How much do you enjoy sci-fi themes?', options: ['Not at all', 'A little', 'A lot', 'I love it'] },
//   { question: 'Do you like gore or intense violence in movies?', options: ['No', 'A little', 'Yes', 'The more, the better'] },
//   { question: 'Do you enjoy stories with twists and mystery?', options: ['Not at all', 'A bit', 'Yes', 'Love plot twists'] },
//   { question: 'Do you prefer movies with a strong moral message?', options: ['No', 'Maybe', 'Usually', 'Definitely'] },
//   { question: 'How much do you care about the music/soundtrack?', options: ['Not at all', 'Sometimes', 'Often', 'Always'] },
//   { question: 'Would you prefer movies with children or teens?', options: ['No', 'Occasionally', 'Sure', 'Love them'] },
//   { question: 'Do you enjoy biopics or based-on-true-story films?', options: ['No', 'Rarely', 'Often', 'Love them'] },
//   { question: 'Do you like ensemble casts (many main characters)?', options: ['No', 'Maybe', 'Yes', 'Absolutely'] },
//   { question: 'How long should a movie be for you?', options: ['< 90 mins', '90–120 mins', '2–2.5 hrs', '> 2.5 hrs'] },
//   { question: 'Do you prefer old classics or recent movies?', options: ['Old', 'Balanced', 'New', 'Latest only'] },
//   { question: 'How important are high IMDb ratings to you?', options: ['Not at all', 'Somewhat', 'Important', 'Very important'] },
//   { question: 'Do you like critically acclaimed films?', options: ['Not really', 'Sometimes', 'Often', 'Yes'] },
//   { question: 'Do you enjoy watching foreign-language films?', options: ['No', 'Maybe', 'Yes', 'Love them'] },
// ];

// export default function QuestionnaireScreen({ navigation, route }) {
//   const [questions, setQuestions] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Get user info from route
//   const { name, email, mobile } = route.params || {
//     name: 'User',
//     email: 'user@example.com',
//     mobile: '0000000000',
//   };

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch(`${API_BASE}/preferences/questions`);
//         if (!res.ok) throw new Error('Server error');
//         const data = await res.json();
//         setQuestions(data.questions);
//       } catch (err) {
//         console.warn('Using fallback questions →', err.message);
//         setQuestions(fallbackQuestions);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const submitAnswers = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) throw new Error('No token found');

//       const res = await fetch(`${API_BASE}/preferences/submit`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ answers }),
//       });

//       if (!res.ok) {
//         const e = await res.json();
//         throw new Error(e.detail || 'Submission failed');
//       }

//       // ✅ Navigate to Home and pass user profile info
//       navigation.replace('Home', {
//         name,
//         email,
//         mobile,
//       });
//     } catch (err) {
//       Alert.alert('Error', err.message);
//       navigation.replace('Home', {
//         name,
//         email,
//         mobile,
//       });
//     }
//   };

//   const handleAnswer = (option) => {
//     setSelected(option);

//     if (current < questions.length - 1) {
//       setAnswers((prev) => [...prev, option]);
//       setTimeout(() => {
//         setCurrent((c) => c + 1);
//         setSelected(null);
//       }, 500);
//     } else {
//       const newAnswers = [...answers];
//       newAnswers[current] = option;
//       setAnswers(newAnswers);
//     }
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.safe}>
//         <View style={styles.loaderBox}>
//           <ActivityIndicator color="#FFA500" size="large" />
//           <Text style={{ color: '#FFA500', marginTop: 12 }}>Loading quiz…</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   const q = questions[current];
//   const total = questions.length;

//   return (
//     <SafeAreaView style={styles.safe}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Image
//           source={require('../assets/robots.png')}
//           style={styles.robotImage}
//           resizeMode="contain"
//         />

//         <Text style={styles.header}>Question {current + 1} / {total}</Text>
//         <View style={styles.progressBar}>
//           <View style={[styles.progressFill, { width: `${((current + 1) / total) * 100}%` }]} />
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.subText}>Select an answer</Text>
//           <Text style={styles.question}>{q.question}</Text>

//           {q.options.map((option, i) => (
//             <TouchableOpacity
//               key={i}
//               style={[styles.optionBtn, selected === option && styles.selectedBtn]}
//               onPress={() => handleAnswer(option)}
//               disabled={selected !== null && current !== total - 1}
//             >
//               <Text style={[styles.optionText, selected === option && styles.selectedText]}>
//                 {selected === option ? '✓ ' : ''}{option}
//               </Text>
//             </TouchableOpacity>
//           ))}

//           <TouchableOpacity
//             onPress={() => {
//               if (current === total - 1 && selected) {
//                 submitAnswers();
//               } else if (selected) {
//                 handleAnswer(selected);
//               }
//             }}
//             disabled={!selected}
//             style={[styles.nextBtn, { opacity: selected ? 1 : 0.5 }]}
//           >
//             <Text style={styles.nextText}>
//               {current === total - 1 ? 'Submit' : 'Next →'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: '#001855' },
//   container: { paddingTop: 40, paddingHorizontal: 20, paddingBottom: 40 },
//   loaderBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   robotImage: { width: width * 0.9, height: width * 0.5, alignSelf: 'center', marginBottom: 20 },
//   header: { color: 'white', fontSize: 18, fontWeight: '600', marginBottom: 10 },
//   progressBar: { height: 8, backgroundColor: '#704EA1', borderRadius: 10, overflow: 'hidden', marginBottom: 20 },
//   progressFill: { height: '100%', backgroundColor: '#FFA500' },
//   card: { backgroundColor: 'white', borderRadius: 18, padding: 20, elevation: 5 },
//   subText: { color: '#888', marginBottom: 6, fontSize: 14 },
//   question: { fontSize: 18, fontWeight: '600', color: '#222', marginBottom: 16 },
//   optionBtn: { borderWidth: 1, borderColor: '#ccc', padding: 14, borderRadius: 10, marginVertical: 6 },
//   selectedBtn: { backgroundColor: '#FFE7C0', borderColor: '#FFA500' },
//   optionText: { fontSize: 16, color: '#444' },
//   selectedText: { color: '#D35400', fontWeight: 'bold' },
//   nextBtn: { marginTop: 20, backgroundColor: '#FFA500', padding: 14, borderRadius: 10, alignItems: 'center' },
//   nextText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
// });


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { preferencesAPI } from '../api';

const { width } = Dimensions.get('window');

const fallbackQuestions = [
  { question: 'What kind of movies do you like?', options: ['Comedy', 'Action', 'Drama', 'Sci-Fi'] },
  { question: 'How much do you enjoy action in movies?', options: ['Not at all', 'Somewhat', 'A lot', 'I love it'] },
  { question: 'Do you like romantic storylines?', options: ['Not really', 'Sometimes', 'Often', 'Always'] },
  { question: 'Do you prefer fast-paced or slow-burn plots?', options: ['Slow-burn', 'Balanced', 'Fast-paced', 'Extremely fast'] },
  { question: 'Do you enjoy stories with twists and mystery?', options: ['Not at all', 'A bit', 'Yes', 'Love plot twists'] },
];

export default function QuestionnaireScreen({ navigation, route }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const { name, email, mobile } = route.params || {
    name: 'User',
    email: 'user@example.com',
    mobile: '0000000000',
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await preferencesAPI.getQuestions();
        if (result.ok) {
          setQuestions(result.data.questions);
        } else {
          setQuestions(fallbackQuestions);
        }
      } catch {
        setQuestions(fallbackQuestions);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const submitAnswers = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const result = await preferencesAPI.submitPreferences(answers, token);

      if (!result.ok) throw new Error('Submission failed');
      navigation.replace('Home', { name, email, mobile });
    } catch (err) {
      Alert.alert('Error', err.message);
      navigation.replace('Home', { name, email, mobile });
    }
  };

  const handleAnswer = (option) => {
    setSelected(option);
    if (current < questions.length - 1) {
      setAnswers((prev) => [...prev, option]);
      setTimeout(() => {
        setCurrent(current + 1);
        setSelected(null);
      }, 300);
    } else {
      submitAnswers();
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color="#47b4ea" />
        <Text style={{ color: '#333', marginTop: 10 }}>Loading questions...</Text>
      </SafeAreaView>
    );
  }

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111518" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Just Decide</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.progressRow}>
          <Text style={styles.stepText}>{current + 1}/{questions.length}</Text>
        </View>

        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.question}>{q.question}</Text>
        <Text style={styles.subText}>Select one option</Text>

        <View style={styles.options}>
          {q.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selected === option && styles.optionSelected
              ]}
              onPress={() => setSelected(option)}
            >
              <Text style={[
                styles.optionText,
                selected === option && styles.optionTextSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={[styles.nextBtn, { opacity: selected ? 1 : 0.5 }]}
          onPress={() => selected && handleAnswer(selected)}
          disabled={!selected}
        >
          <Text style={styles.nextText}>
            {current === questions.length - 1 ? 'Submit' : 'Next'}
          </Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111518',
  },
  content: {
    padding: 16,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stepText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111518',
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#dce2e5',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 24,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#111518',
  },
  question: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111518',
    textAlign: 'center',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 16,
  },
  options: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  option: {
    borderColor: '#dce2e5',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    margin: 6,
  },
  optionSelected: {
    borderWidth: 2,
    borderColor: '#47b4ea',
  },
  optionText: {
    fontSize: 14,
    color: '#111518',
  },
  optionTextSelected: {
    fontWeight: '700',
    color: '#111518',
  },
  bottom: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  nextBtn: {
    backgroundColor: '#47b4ea',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
