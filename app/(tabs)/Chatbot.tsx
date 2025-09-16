// Chatbot.tsx
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/**
 * IMPORTANT:
 * Replace GROQ_API_KEY with your key from https://console.groq.com/
 * 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
 */
const GROQ_API_KEY = "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"; // <--- paste here
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile"; // fast & strong

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  time?: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi 👋 I’m your AI assistant (Groq-powered)!",
      sender: "ai",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList<Message> | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = messages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));
      apiMessages.push({ role: "user", content: userMsg.text });

      const resp = await axios.post(
        GROQ_API_URL,
        {
          model: MODEL,
          messages: apiMessages,
          max_tokens: 800,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          timeout: 60_000,
        }
      );

      const assistantText =
        resp?.data?.choices?.[0]?.message?.content ||
        "Sorry, I couldn't generate a response right now.";

      const aiMsg: Message = {
        id: Date.now().toString() + "_ai",
        text: assistantText.trim(),
        sender: "ai",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setTimeout(() => listRef.current?.scrollToEnd?.({ animated: true }), 100);
    } catch (err) {
      console.error("Groq API Error:", err);
      const errMsg: Message = {
        id: Date.now().toString() + "_err",
        text: "⚠️ Something went wrong with Groq API. Try again later.",
        sender: "ai",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.sender === "user";
    return (
      <View style={[styles.messageRow, isUser ? styles.messageRowUser : styles.messageRowAi]}>
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
          <Text style={[styles.msgText, isUser ? styles.userText : styles.aiText]}>{item.text}</Text>
          <Text style={styles.msgTime}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <View style={styles.header}>
          <Ionicons name="chatbubbles" size={22} color="#2E8BFF" />
          <Text style={styles.headerText}>Assistant (Groq)</Text>
        </View>

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.chatContainer}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => listRef.current?.scrollToEnd({ animated: false })}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            multiline
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={[styles.sendBtn, loading ? styles.sendBtnDisabled : null]}
            onPress={sendMessage}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Ionicons name="send" size={18} color="#fff" />}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* Same styles from your code */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8f8f9", paddingTop: 20 },
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  headerText: { fontSize: 18, fontWeight: "700", marginLeft: 8, color: "#2E8BFF" },
  chatContainer: { padding: 12, paddingBottom: 24, flexGrow: 1 },
  messageRow: { marginVertical: 6, flexDirection: "row" },
  messageRowUser: { justifyContent: "flex-end" },
  messageRowAi: { justifyContent: "flex-start" },
  bubble: { maxWidth: "82%", padding: 12, borderRadius: 14 },
  userBubble: { backgroundColor: "#2E8BFF", borderBottomRightRadius: 4 },
  aiBubble: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#e6e6e6" },
  msgText: { fontSize: 15, lineHeight: 20 },
  userText: { color: "#fff" },
  aiText: { color: "#111" },
  msgTime: { fontSize: 11, color: "#999", marginTop: 8, textAlign: "right" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: "#f2f3f5",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 10 : 6,
    marginHorizontal: 8,
    maxHeight: 120,
  },
  sendBtn: { backgroundColor: "#2E8BFF", padding: 12, borderRadius: 20 },
  sendBtnDisabled: { opacity: 0.7 },
});
