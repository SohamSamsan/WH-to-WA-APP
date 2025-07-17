import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';

const questions = [
  {
    question: "Which scene excites you more?",
    options: [
      "A train heist in the Wild West",
      "A tearful reunion on Christmas morning",
      "A courtroom drama with a surprising twist",
      "A magical creature leading a lost child home"
    ]
  },
  {
    question: "Pick a mood for your ideal movie night:",
    options: [
      "Action-packed and adrenaline-filled",
      "Wholesome and nostalgic",
      "Laugh-out-loud funny",
      "Deep and thought-provoking"
    ]
  },
  {
    question: "How much romance do you want in your story?",
    options: [
      "None at all",
      "A subtle background thread",
      "A central plot",
      "All-out tragic love story"
    ]
  },
  {
    question: "Which setting draws you in most?",
    options: [
      "A small-town bar hiding big secrets",
      "A fantasy kingdom under siege",
      "A 1900s frontier town",
      "A science lab hiding a dark experiment"
    ]
  },
  {
    question: "If a movie ends sadly, how do you feel?",
    options: [
      "Inspired",
      "Devastated",
      "Indifferent",
      "Annoyed—I prefer happy endings"
    ]
  },
  {
    question: "Pick your favorite movie trope:",
    options: [
      "Hero’s last-minute rescue",
      "Forbidden lovers",
      "Slapstick mistaken identity",
      "Identity hidden until the final twist"
    ]
  },
  {
    question: "You want the villain to be:",
    options: [
      "A misunderstood genius",
      "Pure evil with no remorse",
      "A comedic nuisance",
      "A ghost from the past"
    ]
  },
  {
    question: "Which of these would make you not want to watch a film?",
    options: [
      "Too much gore",
      "Predictable plot",
      "No emotional connection",
      "Overly serious tone"
    ]
  },
  {
    question: "How important is visual fantasy or surrealism to you?",
    options: [
      "Not at all—I prefer realism",
      "A touch of it is fine",
      "Very—it enhances storytelling",
      "The weirder, the better"
    ]
  },
  {
    question: "Pick a theme that resonates most with you:",
    options: [
      "Redemption",
      "Sibling rivalry",
      "Standing up against injustice",
      "Escaping reality"
    ]
  },
  {
    question: "Which character would you rather follow?",
    options: [
      "A vengeful outlaw",
      "A girl lost in a whimsical world",
      "A misunderstood inventor",
      "A lonely soul chasing lost love"
    ]
  },
  {
    question: "What level of historical flavor do you enjoy?",
    options: [
      "Love period dramas",
      "Only if it's dramatized",
      "Don’t care about history",
      "Prefer modern or futuristic"
    ]
  },
  {
    question: "When watching comedy, you prefer:",
    options: [
      "Satire and social humor",
      "Slapstick and physical gags",
      "Romantic mischief",
      "Not a fan of comedy"
    ]
  },
  {
    question: "How much violence is acceptable in a movie?",
    options: [
      "The more, the better",
      "Only when justified",
      "Minimal or off-screen",
      "I avoid it entirely"
    ]
  },
  {
    question: "Which “weird” story concept would you most enjoy?",
    options: [
      "Moon falling in love with a human",
      "A person transformed by food",
      "Cross-dressing spy in love",
      "Haunted scarecrow running a kingdom"
    ]
  },
  {
    question: "Choose your favorite backdrop:",
    options: [
      "Deserted wildlands",
      "Magical forests",
      "Gritty city alleys",
      "Cozy countryside villages"
    ]
  },
  {
    question: "Do you enjoy movies based on moral dilemmas?",
    options: [
      "Yes, they make me think",
      "Only when subtle",
      "No, I prefer light stories",
      "Maybe—depends on the mood"
    ]
  },
  {
    question: "Which kind of love story appeals to you most?",
    options: [
      "Star-crossed and doomed",
      "Awkward and comedic",
      "Healing from past trauma",
      "Quick flings with twists"
    ]
  },
  {
    question: "Pick the genre you’re most drawn to today:",
    options: [
      "Western",
      "Drama",
      "Fantasy",
      "Comedy"
    ]
  },
  {
    question: "If a movie was 2+ hours, would you still watch it?",
    options: [
      "Definitely—I love long films",
      "Only if it’s highly rated",
      "Maybe with breaks",
      "Nope, I like it short and sweet"
    ]
  },
];

export default function QuestionnaireScreen({ navigation }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleAnswer = (option) => {
    setSelected(option);
    setAnswers(prev => [...prev, option]);
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        navigation.replace('Home');
      }
    }, 700);
  };

  const q = questions[current];
  const total = questions.length;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Question {current + 1} / {total}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((current + 1) / total) * 100}%` }]} />
      </View>

      <View style={styles.card}>
        <Text style={styles.subText}>Select an answer</Text>
        <Text style={styles.question}>{q.question}</Text>

        {q.options.map((option, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.optionBtn,
              selected === option && styles.selectedBtn
            ]}
            onPress={() => handleAnswer(option)}
            disabled={selected !== null}
          >
            <Text style={[
              styles.optionText,
              selected === option && styles.selectedText
            ]}>
              {selected === option ? '✓ ' : ''}{option}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={() => {
            if (selected !== null) handleAnswer(selected);
          }}
          disabled={selected === null}
          style={[
            styles.nextBtn,
            { opacity: selected === null ? 0.5 : 1 }
          ]}
        >
          <Text style={styles.nextText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#001855',
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#704EA1',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFA500',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 20,
    elevation: 5,
  },
  subText: {
    color: '#888',
    marginBottom: 6,
    fontSize: 14,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 16,
  },
  optionBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
  },
  selectedBtn: {
    backgroundColor: '#FFE7C0',
    borderColor: '#FFA500',
  },
  optionText: {
    fontSize: 16,
    color: '#444',
  },
  selectedText: {
    color: '#D35400',
    fontWeight: 'bold',
  },
  nextBtn: {
    marginTop: 20,
    backgroundColor: '#FFA500',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
