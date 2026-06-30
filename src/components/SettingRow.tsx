import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


interface SettingRowProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  value: string;
  object: React.ReactNode;
}


export default function SettingRow({ icon, value, object }: SettingRowProps) {
  return (
    <View style={styles.row}>
        
      <View style={styles.left}>
        <MaterialIcons
          name={icon}
          size={30}
          color="#fff"
        />
        <Text style={styles.text}>{value}</Text>
      </View>

      <View style={styles.right}>
        {object}
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,        
  },
  right: {
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});