import React, { useCallback } from "react";
import {
  Linking,
  Alert,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

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
      <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  streamContainer: {
    padding: 5,
  },
});

export default OpenURLButton;
