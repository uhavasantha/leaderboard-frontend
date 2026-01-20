import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

const API_URL = "https://leaderboard-backend-poqk.onrender.com";


export default function HomeScreen() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/leaderboard`)
      .then(res => res.json())
      .then(data => setLeaderboard(data));
  }, []);

  const searchUser = (text: string) => {
    setQuery(text);
    if (text.length === 0) {
      setResults([]);
      return;
    }
    fetch(`${API_URL}/search?query=${text}`)
      .then(res => res.json())
      .then(data => setResults(data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>

      <FlatList
        data={leaderboard}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.rank}. {item.username} — {item.rating}</Text>
        )}
      />

      <Text style={styles.title}>Search User</Text>

      <TextInput
        style={styles.input}
        placeholder="Search username"
        value={query}
        onChangeText={searchUser}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.rank}. {item.username} — {item.rating}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
  input: { borderWidth: 1, padding: 8, marginVertical: 10 }
});
