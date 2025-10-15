import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function NoticiaDetalhe() {
  const params = useLocalSearchParams();
  const router = useRouter();

  // Desestrutura os parâmetros
  const {
    title,
    summary,
    category,
    publishedAt,
    source,
    author,
    url,
    imageUrl,
  } = params as {
    title: string;
    summary: string;
    category: string;
    publishedAt: string;
    source?: string;
    author?: string;
    url?: string;
    imageUrl?: string;
  };

  const handleOpenOriginal = () => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header com botão voltar */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* Imagem da notícia */}
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      {/* Conteúdo */}
      <View style={styles.content}>
        {/* Categoria e data */}
        <View style={styles.metadata}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.publishedAt}>{publishedAt}</Text>
        </View>

        {/* Título */}
        <Text style={styles.title}>{title}</Text>

        {/* Fonte e autor */}
        <View style={styles.sourceContainer}>
          {source && <Text style={styles.source}>📰 {source}</Text>}
          {author && <Text style={styles.author}>✍️ {author}</Text>}
        </View>

        {/* Resumo/Descrição */}
        <Text style={styles.summary}>{summary}</Text>

        {/* Botão para ler matéria completa */}
        {url && (
          <TouchableOpacity
            style={styles.readMoreButton}
            onPress={handleOpenOriginal}
          >
            <Text style={styles.readMoreText}>Ler matéria completa</Text>
            <Text style={styles.readMoreIcon}>→</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    paddingTop: 60,
    backgroundColor: "white",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    color: "#2563eb",
    fontWeight: "600",
  },
  image: {
    width: "100%",
    height: 250,
    backgroundColor: "#e5e7eb",
  },
  content: {
    padding: 20,
    backgroundColor: "white",
  },
  metadata: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  category: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2563eb",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  publishedAt: {
    fontSize: 12,
    color: "#9ca3af",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 32,
    marginBottom: 16,
  },
  sourceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  source: {
    fontSize: 14,
    color: "#4b5563",
    fontWeight: "600",
  },
  author: {
    fontSize: 14,
    color: "#6b7280",
  },
  summary: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 26,
    marginBottom: 24,
  },
  readMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 8,
  },
  readMoreText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    marginRight: 8,
  },
  readMoreIcon: {
    fontSize: 18,
    color: "white",
    fontWeight: "700",
  },
});
