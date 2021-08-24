/* @flow strict-local */

import React, {useState, useRef, useEffect} from 'react';
import type {Node} from 'react';
import {
  View,
  StatusBar,
  FlatList,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

import {getSomeNewsInRange} from '../services/api';
import {
  NewsItems,
  ListEmpty,
  BriefNewsBriefPopUP,
  DomainChoice,
  Loading,
  FilterNewsWithDate,
  NewsType,
  OfflineNotice,
} from '../components';

import {DOMAINS as ConstantDomains} from '../Constants';
import {UI_DARK_STATUS_BAR} from '../UIConstants';

import {
  appOnline,
  addTopHeadlines,
  addEveryThingNews,
  addLoading,
} from '../actions';
import {getAppOnline, getEveryNews, getTopHeadlines} from '../selectors';
import type {News} from '../types';

export default function SomeNews(props: {}): Node {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const newsTypeAnim = useRef(new Animated.Value(0)).current;
  const dateRange = useRef<{start: string, end: string}>({
    start: new Date().toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10),
  });
  /*
   * Storing @var totalResults in useRef instead of state because
   * we don't have to set it in state and it also prevent useless
   * re-rendering as dispatch is enough for rendering fetched news.
   *
   */
  const totalResults = useRef({
    topHeadlinesPage: 1,
    everythingPage: 1,
  });
  const [getRefreshing, setRefreshing] = useState<{|
    refresh: boolean,
    showDateFilter: boolean,
    isTopHeadLines: boolean,
    getDomains: Array<string>,
  |}>({
    refresh: true,
    showDateFilter: false,
    isTopHeadLines: true,
    getDomains: [ConstantDomains[0].domain],
  });
  const [showModalNewsBrief, setShowModalNewsBrief] = useState<{
    show: boolean,
    index: number,
  }>({show: false, index: 0});

  const isAppOnline: boolean = useSelector(getAppOnline);
  const topHeadLinesNews: Array<News> = useSelector(getTopHeadlines);
  const everythingNews: Array<News> = useSelector(getEveryNews);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableWithoutFeedback
          onPress={() => {
            setRefreshing({
              ...getRefreshing,
              refresh: false,
              showDateFilter: true,
            });
          }}>
          <MaterialCommunityIcons
            name="calendar-refresh"
            size={24}
            color="gray"
          />
        </TouchableWithoutFeedback>
      ),
    });
    const unsubscribe = NetInfo.addEventListener(netInfoState => {
      const {type: connectionType} = netInfoState;
      let isConnected =
        connectionType !== 'none' && connectionType !== 'unknown';
      if (!isConnected) {
        setRefreshing({
          ...getRefreshing,
          refresh: false,
        });
      }
      dispatch(appOnline(isConnected));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  /** To messy need some refactor with @fun getSomeNewsInRange
   */
  const fetchNewsFromServer = () => {
    const isRefreshing: boolean = getRefreshing.refresh;
    const getDomains: Array<string> = getRefreshing.getDomains;
    if (isAppOnline) {
      const {start, end} = dateRange.current;
      const {topHeadlinesPage, everythingPage} = totalResults.current;

      const typeToFetch = getRefreshing.isTopHeadLines
        ? 'top-headlines'
        : 'everything';
      const page = isRefreshing
        ? 1
        : getRefreshing.isTopHeadLines
        ? topHeadlinesPage
        : everythingPage;

      if (!isRefreshing) dispatch(addLoading(true));
      getSomeNewsInRange(typeToFetch, start, end, page, 8, getDomains)
        .then(response => {
          if (getRefreshing.isTopHeadLines) {
            if (response.articles.length > 0) {
              totalResults.current = {
                ...totalResults.current,
                topHeadlinesPage: page + 1,
              };
            }
            dispatch(addTopHeadlines(response.articles, isRefreshing));
          } else {
            if (response.articles.length > 0) {
              totalResults.current = {
                ...totalResults.current,
                everythingPage: page + 1,
              };
            }
            dispatch(addEveryThingNews(response.articles, isRefreshing));
          }
          setRefreshing({...getRefreshing, refresh: false});
        })
        .catch(e => {
          alert(e);
          setRefreshing({...getRefreshing, refresh: false});
          dispatch(addLoading(false));
        });
    }
  };

  useEffect(() => {
    if (getRefreshing.refresh) fetchNewsFromServer();
  }, [isAppOnline, getRefreshing.isTopHeadLines, getRefreshing.refresh]);

  const onDateRangeSubmit = (
    success: boolean,
    startDate?: string,
    endDate?: string,
  ) => {
    if (success && startDate !== undefined && endDate !== undefined) {
      //do my work
      dateRange.current = {start: startDate, end: endDate};
      setRefreshing({...getRefreshing, refresh: true, showDateFilter: false});
    } else {
      setRefreshing({...getRefreshing, showDateFilter: false});
    }
  };

  const refreshNewsFromServer = () => {
    if (isAppOnline) {
      //Reseting the stored total-pages, page etc.
      //to start from page 0
      setRefreshing({
        ...getRefreshing,
        refresh: true,
      });
    }
  };

  const setDomainsForEveryThingNews = (list: Array<string>) => {
    setRefreshing({
      ...getRefreshing,
      refresh: true,
      getDomains: list,
    });
  };

  const changeNewsType = (value: boolean) => {
    if (isAppOnline) {
      setRefreshing({
        ...getRefreshing,
        isTopHeadLines: value,
        refresh: true,
      });
    } else {
      setRefreshing({
        ...getRefreshing,
        isTopHeadLines: value,
        refresh: false,
      });
    }
  };

  /**
  @TODO add shimmer effect 
 */
  const newsList = getRefreshing.isTopHeadLines
    ? topHeadLinesNews
    : everythingNews;
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={UI_DARK_STATUS_BAR} />
      <OfflineNotice />
      <Animated.View
        style={{
          zIndex: -1,
          marginTop: newsTypeAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ([0, -38]: Array<number>),
            extrapolate: 'clamp',
          }),
        }}>
        <NewsType
          isTopHeadLines={getRefreshing.isTopHeadLines}
          setIsTopHeadLines={changeNewsType}
          isRefreshing={getRefreshing.refresh}
        />
        {!getRefreshing.isTopHeadLines && (
          <DomainChoice
            domains={ConstantDomains}
            setDomains={setDomainsForEveryThingNews}
            getDomains={getRefreshing.getDomains}
          />
        )}
      </Animated.View>
      <FlatList
        data={newsList}
        contentContainerStyle={{flexGrow: 1}}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: newsTypeAnim,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        renderItem={({item, index}) => (
          <NewsItems
            news={item}
            onPress={() => {
              navigation.navigate('Detail', {url: item.url});
            }}
            onLongPress={() => {
              setShowModalNewsBrief({show: true, index: index});
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.dashes} />}
        ListEmptyComponent={ListEmpty}
        keyExtractor={(item, index) => `${item.source.id}${index}`}
        ListFooterComponent={<Loading />}
        onRefresh={() => {
          refreshNewsFromServer();
        }}
        refreshing={getRefreshing.refresh}
        extraData={getRefreshing.isTopHeadLines}
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd < 0) return;
          fetchNewsFromServer();
        }}
        onEndReachedThreshold={0.1}
      />
      <BriefNewsBriefPopUP
        modalVisible={showModalNewsBrief.show}
        news={newsList[showModalNewsBrief.index]}
        setModalInVisible={() => {
          setShowModalNewsBrief({show: false, index: 0});
        }}
        navigateToDetail={url => {
          //its not right to navigate somewhere from modal ..../
          setShowModalNewsBrief({show: false, index: 0});
          navigation.navigate('Detail', {url: url});
        }}
      />
      <FilterNewsWithDate
        onSubmit={(succes, startDate, endDate) => {
          onDateRangeSubmit(succes, startDate, endDate);
        }}
        showDatePicker={getRefreshing.showDateFilter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dashes: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#8a8a8a',
    borderRadius: 1,
    marginVertical: 3,
  },
});
