import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import StaticGrid from "./StaticGrid";
import DynamicGrid from "./DynamicGrid";

export default function Combine() {
  return (
      <ScrollView>
        <StaticGrid />
        <DynamicGrid />
      </ScrollView>
  );
}