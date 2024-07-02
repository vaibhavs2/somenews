import React, { useRef } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import type { DomainObject } from "../types/types";
import Chips from "./chips";

type Domain = Array<string>;
type Props = {
  domains: Array<DomainObject>;
  setDomains: (list: Domain) => void;
  getDomains: Domain;
};

export default function DomainChoice(props: Props) {
  const domainRefernce = useRef<{
    domains: Domain;
    timeOut: NodeJS.Timeout | null;
  }>({
    domains: [props.domains[0].domain],
    timeOut: null,
  });
  const { getDomains, setDomains } = props;
  const activeChips = (domain: string) =>
    !!getDomains.find((value) => value == domain);

  /**
   * @fun TimeOut used as user might choose more than one chips
   * and go on , so we can't send network request after each selection.
   * It is assumed that if not chips has been getting clicked for 2 seconds
   * User no most probably no longer wants to click more chips.
   * Even if he/she selects then we definitely have reduced the frequent
   * network request.
   */
  const addDomains = (domain: string) => {
    console.log(`adding ${domain}`);
    let timeout: NodeJS.Timeout | null = domainRefernce.current.timeOut;
    let domains: Domain = domainRefernce.current.domains;

    let existingIndex = domains.findIndex((each) => each == domain);
    if (existingIndex !== -1) {
      domains = [
        ...domains.slice(0, existingIndex),
        ...domains.slice(existingIndex + 1),
      ];
    } else {
      domains.push(domain);
    }

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      setDomains(domains);
    }, 2000);

    domainRefernce.current = { domains: domains, timeOut: timeout };
  };

  return (
    <FlatList
      style={{ maxHeight: 50 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.separate} />}
      data={props.domains}
      renderItem={({ item, index }) => (
        <Chips
          {...item}
          onPress={addDomains}
          active={activeChips(item.domain)}
        />
      )}
      keyExtractor={(item, index) => `${item.domain}${index}`}
    />
  );
}

const styles = StyleSheet.create({
  separate: {
    marginHorizontal: 4,
  },
});
