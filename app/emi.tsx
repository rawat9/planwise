// import { useRouter } from "expo-router";

import { Input } from "@tamagui/input";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { cn } from "@/lib/utils";
import "./global.css";

export default function EMI() {
	// const router = useRouter();

	return (
		<SafeAreaView className="flex-1 bg-gray-50">
			<ScrollView className="p-4">
				<View className="pt-6 pb-4 gap-4">
					<Text className="text-2xl font-semibold text-gray-900"></Text>
					<Text className="text-gray-600 mt-1">
						Explore the features and tools available to you.
					</Text>
					<TextInput
						className={cn(
							"w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-base text-neutral-900 h-9",
							"focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200",
							"dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:ring-neutral-800",
						)}
						placeholderTextColor="#9CA3AF"
					></TextInput>

					<Input size="$4" borderWidth={2} />
				</View>
				<View className="grid grid-cols-2 gap-4"></View>
			</ScrollView>
		</SafeAreaView>
	);
}
