import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
	const router = useRouter();

	return (
		<SafeAreaView className="flex-1 bg-gray-50">
			<ScrollView className="p-4">
				<View className="pt-6 pb-4">
					<Text className="text-2xl font-semibold text-gray-900">
						Welcome back, User!
					</Text>
					<Text className="text-gray-600 mt-1">
						Explore the features and tools available to you.
					</Text>
				</View>
				<View className="grid grid-cols-2 gap-4">
					<TouchableOpacity
						onPress={() => router.push("/emi")}
						className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
						activeOpacity={0.7}
					>
						<View className="items-center">
							<View className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center mb-2">
								<IconSymbol
									size={24}
									color="#808080"
									name="chevron.left.forwardslash.chevron.right"
								/>
							</View>
							<Text className="text-gray-800 font-medium text-center will-change-auto">
								EMI
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => router.push("/emi")}
						className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
						activeOpacity={0.7}
					>
						<View className="items-center">
							<View className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center mb-2">
								{/* <IconSymbol
									size={310}
									color="#808080"
									name="chevron.left.forwardslash.chevron.right"
								/> */}
							</View>
							<Text className="text-gray-800 font-medium text-center will-change-auto">
								EMI
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
