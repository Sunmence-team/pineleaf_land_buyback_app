import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput, View } from 'react-native';

interface Props {
  placeholder?: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  return (
    <View className='flex-row items-center bg-transparent border border-gray-300 rounded-lg px-4 py-3'>
     <Ionicons name='search-outline' size={22} color="#666" />

      <TextInput
        placeholder={placeholder}
        className='flex-1 ml-3 text-black'
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"

      />
    </View>
  )
}

export default SearchBar