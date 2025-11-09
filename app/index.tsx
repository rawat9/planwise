import { useRouter } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
	const router = useRouter();

	return (
		<SafeAreaView className="flex-1">
			<ScrollView className="h-full">
				<View className="p-4">
					<Text variant="headlineLarge">EMI</Text>
				</View>
				<TouchableOpacity
					onPress={() => router.push("/emi")}
					activeOpacity={0.7}
				>
					<Surface
						style={{ padding: 16, margin: 16, borderRadius: 16 }}
						elevation={2}
					>
						<Text>EMI Calculator</Text>
					</Surface>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}
