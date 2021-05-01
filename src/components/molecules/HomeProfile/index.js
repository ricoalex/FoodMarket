import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ProfileDummy} from '../../../assets';
import {getData} from '../../../utils';

const HomeProfile = () => {
  const [photo, setPhoto] = useState(ProfileDummy);
  useEffect(() => {
    getData('userProfile').then(res => {
      setPhoto({uri: res.profile_photo_url});
    });
  }, []);
  return (
    <View style={styles.profileContainer}>
      <View>
        <Text style={styles.appName}>Food Market</Text>
        <Text style={styles.subTitle}>Let’s get some foods</Text>
      </View>
      <Image source={photo} style={styles.profile} />
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: 'white',
  },
  appName: {
    fontFamily: 'Poppins-Medium',
    color: '#020202',
    fontSize: 22,
  },
  subTitle: {
    fontFamily: 'Poppins-Medium',
    color: '#8D92A3',
    fontSize: 12,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});
