import React, { useRef, useState } from 'react';
import { Box, Flex, Text, StatusBar, useTheme } from 'native-base';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  interpolateColor,
} from 'react-native-reanimated';
import { FlatList, ViewToken } from 'react-native';
import { useFirebase } from '../context/FirebaseContext';
import { convertDateToString } from '../utils/date';
import Navigation from '../components/Navigation';
import { ScreenIndex } from '../models/types';
import HomeTab from '../components/HomeTab';

type ViewableTypes = {
  viewableItems: ViewToken[];
  changed: ViewToken[];
};

const AnimatedBox = Animated.createAnimatedComponent(Box);

const Home = () => {
  const { colors } = useTheme();
  const { goal, logs, todaysProgress } = useFirebase();
  const [screenIndex, setScreenIndex] = useState<ScreenIndex>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const modalAnimation = useSharedValue(0);
  const welcomeAnimation = useSharedValue(0);

  const flatListRef = useRef<FlatList>(null);

  const borderStyle = useAnimatedStyle(() => {
    return {
      borderTopLeftRadius: interpolate(modalAnimation.value, [0, 1], [24, 0]),
      borderTopRightRadius: interpolate(modalAnimation.value, [0, 1], [24, 0]),
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        welcomeAnimation.value,
        [0, 1],
        [colors.dark['100'], colors.warning['100']],
        'RGB',
      ),
    };
  });

  const modalStyle = useAnimatedStyle(() => {
    return {
      top: interpolate(modalAnimation.value, [0, 1], [0, -40]),
      opacity: interpolate(
        modalAnimation.value,
        [0.5, 1],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  const viewUpdateRef = useRef((data: ViewableTypes) => {
    const { viewableItems } = data;
    if (viewableItems && viewableItems.length === 1) {
      setScreenIndex(viewableItems[0].index as ScreenIndex);
    }
  });

  const toggleModalOpen = (): void => {
    if (modalOpen) modalAnimation.value = withSpring(0);
    else modalAnimation.value = withSpring(1);

    setModalOpen(prev => !prev);
  };

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <AnimatedBox flex={1} style={containerStyle}>
        <Box flex={1}>
          <Flex
            safeAreaTop
            mx='10%'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Text fontSize={36}>T</Text>
            <Text fontSize={18} color='text.500'>
              {convertDateToString(new Date())}
            </Text>
          </Flex>
        </Box>
        <FlatList
          ref={flatListRef}
          data={[{ key: '0' }, { key: '1' }]}
          keyExtractor={item => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onViewableItemsChanged={viewUpdateRef.current}
          renderItem={({ item }) => {
            return item.key === '0' ? (
              <HomeTab
                welcomeAnimation={welcomeAnimation}
                todaysProgress={todaysProgress}
                goal={goal}
              />
            ) : (
              <></>
            );
          }}
        />
        <Navigation
          toggleLogModal={toggleModalOpen}
          screenIndex={screenIndex}
          modalStyle={modalStyle}
          welcomeAnimation={welcomeAnimation}
          flatListRef={flatListRef}
          borderStyle={borderStyle}
        />
      </AnimatedBox>
    </>
  );
};

export default Home;
