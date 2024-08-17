import { ScrollView, View, Text } from 'react-native'
import ChatSystem from '../../../components/ChatSystem';

export default function Index() {
    return (
      <ScrollView>
        <View>
          <Text>Chat</Text>
          <ChatSystem />
        </View>
      </ScrollView>
    )
  }
