import React, { useState} from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import styles from "./styles";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import { useFocusEffect } from "@react-navigation/native";

function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          }
        );

        setFavorites(favoritedTeachersIds);
      }
    });
  }
  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  )


  function handleToggleFiltersVisibile() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    loadFavorites();
    const response = await api.get("/classes", {
      params: {
        subject,
        week_day: weekDay,
        time,
      },
    });
    setTeachers(response.data);
    handleToggleFiltersVisibile();
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisibile}>
            <Feather name="filter" size={20} color="#FFF"></Feather>
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>{"Matérias"}</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholder="Qual a Matéria?"
              placeholderTextColor="#c1bccc"
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>{"Dia da semana"}</Text>
                <TextInput
                  style={styles.input}
                  value={weekDay}
                  onChangeText={(text) => setWeekDay(text)}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>{"Horário"}</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>
            <RectButton
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
