//on long press show content attribute form object
import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Modal from "react-native-modal";
import type { News } from "../types/types";
import { UI_COLOR_DARK } from "../constants/UIConstants.js";

const REGEX_FOR_TRUNCATED = /\[\+.*?\]/;

type Props = Readonly<{
  modalVisible: boolean;
  setModalInVisible: () => void;
  navigateToDetail: (url: string) => void;
  news: News;
}>;

const Attribute = ({ text }: { text: string }) => (
  <Text style={styles.attribute}>{text}:</Text>
);

export default function BriefNewsBriefPopUP(props: Props) {
  const { news, modalVisible, setModalInVisible, navigateToDetail } = props;
  if (!news) {
    return null;
  }
  /**
   *Sometime API gives @attribute content=null
   */
  const truncate = news.content?.match(REGEX_FOR_TRUNCATED);
  const newsContent = news.content?.replace(REGEX_FOR_TRUNCATED, "");

  return (
    <SafeAreaView>
      <Modal
        animationIn="slideInLeft"
        animationOut="slideOutDown"
        backdropOpacity={0.88}
        style={{ justifyContent: undefined, alignItems: undefined, margin: 0 }}
        isVisible={modalVisible}
        onDismiss={setModalInVisible}
        onBackdropPress={setModalInVisible}
      >
        <View style={styles.cross}>
          <Pressable
            pressRetentionOffset={{ bottom: 30, left: 30, right: 30, top: 30 }}
            onPress={setModalInVisible}
          >
            <Entypo name="cross" size={28} color="white" />
          </Pressable>
        </View>
        <Image
          source={{ uri: news.urlToImage }}
          style={styles.image}
          resizeMode={"center"}
        />

        <View style={styles.textContent}>
          <Text style={styles.title}>{news.title}</Text>
          <Text>
            <Attribute text="Author" /> {news.author || "Unknown"}
          </Text>
          <Text>
            <Attribute text="by" /> {news.source.name}
          </Text>
          <Text>
            <Attribute text="published at" /> {news.publishedAt}
          </Text>
          <Text>
            <Attribute text="description" /> {news.description}
          </Text>
          <Text style={styles.content}>
            {newsContent}
            <Text
              style={styles.truncate}
              onPress={() => {
                navigateToDetail(news.url);
              }}
            >
              {truncate}
            </Text>
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cross: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  image: {
    width: "100%",
    flex: 1,
    borderRadius: 10,
  },
  title: { color: "yellow", fontWeight: "bold", fontSize: 18, marginTop: 12 },
  attribute: { fontWeight: "bold" },
  content: { fontSize: 15, marginTop: 8 },
  textContent: { paddingHorizontal: 12, flex: 2 },
  truncate: { color: "yellow", fontWeight: "bold", fontSize: 14 },
});
