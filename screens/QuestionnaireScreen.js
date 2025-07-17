import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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
  }
];

export default function QuestionnaireScreen({ navigation }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (option) => {
    setAnswers(prev => [...prev, option]);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      navigation.replace('Home');
    }
  };

  const q = questions[current];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Q{current + 1}:</Text>
      <Text style={styles.question}>{q.question}</Text>

      <View style={styles.optionsBox}>
        {q.options.map((option, i) => (
          <TouchableOpacity
            key={i}
            style={styles.optionBtn}
            onPress={() => handleAnswer(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071952',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#FFA500',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  question: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  optionsBox: {
    gap: 12,
  },
  optionBtn: {
    backgroundColor: '#0F2C54',
    padding: 14,
    borderRadius: 12,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  }
});
