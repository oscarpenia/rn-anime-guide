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
  Button,
} from "react-native";
import { ISeriesItem, IStreamLinks } from "../model/SeriesItem";
import TextDetail from "../components/TextDetail";
import colors from "../constants/Colors";

interface IDetailViewProps {
  navigation: any; //Pending to implement typed navigation
  //Adding interface for any other parameter that needs to be typed
}

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);
  return (
    <View style={styles.streamContainer}>
      <TouchableOpacity onPress={handlePress}>
        <Text
          numberOfLines={2}
          adjustsFontSizeToFit={true}
          style={styles.streamLinkText}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const DetailView = (props: IDetailViewProps) => {
  const itemId: number = props.navigation.getParam("itemId");
  const item: ISeriesItem = useSelector(
    (state) => state.seriesContent.items[itemId - 1]
  );

  const getYearFormat = (startDate?: string, endDate?: string) => {
    let dates: string = "";
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

  const Url = ({ url }) => {
    return <OpenURLButton url={url}>{url}</OpenURLButton>;
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
          </View>
        </View>
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

            <View style={styles.streamSection}>
              <TextDetail title="Stream links" />

              {!item.streamLinks ? (
                <Text style={styles.streamLinkText}>
                  No stream links available
                </Text>
              ) : (
                item.streamLinks?.map((stream: IStreamLinks) => {
                  return <Url url={stream.url} />;
                })
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
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
  streamContainer: {
    padding: 5,
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
