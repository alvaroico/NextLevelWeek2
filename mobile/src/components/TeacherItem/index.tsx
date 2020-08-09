import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";
import { RectButton } from "react-native-gesture-handler";
import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unFavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";

function TeacherItem() {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://github.com/alvaroico.png" }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{"Álvaro Ribeiro Pereira"}</Text>
          <Text style={styles.subject}>{"Química"}</Text>
        </View>
      </View>
      <Text style={styles.bio}>
        {
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \n \n Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It "
        }
      </Text>
      <View style={styles.footer}>
        <Text style={styles.price}>
          {"Preço/Hora  "}
          <Text style={styles.priceValue}>{"R$ 20,00"}</Text>
        </Text>
        <View style={styles.ButtonsContainer}>
          <RectButton style={styles.favoriteButton}>
            <Image source={heartOutlineIcon} />
          </RectButton>

          <RectButton style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>{"Entrar em contato"}</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;
