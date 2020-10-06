import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  Platform,
} from "react-native";
import { ISeriesItem, IStreamLinks } from "../model/seriesItem";
import TextDetail from "../components/TextDetail";
import colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import OpenURLButton from "../components/UrlButton";

interface IDetailViewProps {
  navigation: any; //Pending to implement typed navigation
  //Adding interface for any other parameter that needs to be typed
}

const DetailView = (props: IDetailViewProps) => {
  const item: ISeriesItem = props.navigation.getParam("item");

  const getYearFormat = (startDate?: string, endDate?: string): string => {
    let dates = "";
    if (startDate && endDate) {
      dates = startDate + "/" + endDate;
    }
    if (startDate && !endDate) {
      dates = startDate;
    }
    if (!startDate && endDate) {
      dates = endDate;
    }
    return dates;
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.headercontainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: item.posterImage_tiny }}
            />
          </View>
          <View style={styles.headerText}>
            <TextDetail title="Title" content={item.canonicalTitle} />
            <TextDetail title="Type" content={item.subtype} />
            <TextDetail
              title="Years"
              content={getYearFormat(item.startDate, item.endDate)}
            />
            <TextDetail
              title="Episodes"
              content={item.episodeCount?.toString()}
            />
            <TextDetail title="Trailer">
              {!item.youtubeLink ? (
                <Text>No trailer available</Text>
              ) : (
                <OpenURLButton
                  key={`https://www.youtube.com/watch?v=${item.youtubeLink}`}
                  url={`https://www.youtube.com/watch?v=${item.youtubeLink}`}
                >
                  <Ionicons
                    name={
                      Platform.OS === "android"
                        ? "logo-youtube"
                        : "logo-youtube"
                    }
                    size={40}
                    color="red"
                  />
                </OpenURLButton>
              )}
            </TextDetail>
          </View>
        </View>
        <View></View>
        <View>
          <View>
            <View style={styles.detailsSectionContainer}>
              <TextDetail title="Genres" arrayContent={item.genres} />
              <View style={styles.detailsContainer}>
                <TextDetail
                  title="Average Rating"
                  content={item.averageRating?.toString()}
                />
                <TextDetail title="Age Rating" content={item.ageRating} />
              </View>
              <View style={styles.detailsContainer}>
                <TextDetail
                  title="Episode Duration"
                  content={item.episodeLength?.toString()}
                />
                <TextDetail title="Airing Duration" content={item.status} />
              </View>
            </View>
            <View style={styles.synopsis}>
              <TextDetail title="Synopsis" content={item.synopsis} />
            </View>
            <View></View>
            <View style={styles.streamSection}>
              <TextDetail title="Stream links" />

              {!item.streamLinks ? (
                <Text style={styles.streamLinkText}>
                  No stream links available
                </Text>
              ) : (
                item.streamLinks?.map((stream: IStreamLinks) => {
                  return (
                    <OpenURLButton key={stream.url} url={stream.url}>
                      <Text
                        numberOfLines={2}
                        adjustsFontSizeToFit={true}
                        style={styles.streamLinkText}
                      >
                        {stream.url}
                      </Text>
                    </OpenURLButton>
                  );
                })
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

DetailView.navigationOptions = (navigationData: any) => {
  return {
    headerTitle: "Details",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  imageContainer: {
    width: 200,
    height: 275,
    alignSelf: "flex-start",
    padding: 10,
  },
  headercontainer: {
    flexDirection: "row",
  },
  headerText: {
    padding: 5,
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 10,
    borderColor: colors.primary,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: -9, height: -13 },
    shadowRadius: 15,
    backgroundColor: "white",
    width: 200,
  },
  text: {
    fontSize: 18,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "flex-start",
    marginTop: 10,
  },
  synopsis: {
    marginTop: 30,
    borderWidth: 2,
    alignSelf: "center",
    borderRadius: 10,
    borderColor: colors.primary,
    width: "95%",
  },
  streamLinkText: {
    fontSize: 16,
    color: colors.secondary,
    paddingTop: 5,
    paddingBottom: 5,
  },
  streamSection: {
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 2,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
    borderColor: colors.primary,
  },
  detailsSectionContainer: {
    marginTop: 20,
    borderWidth: 2,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
    borderColor: colors.primary,
  },
});

export default DetailView;
