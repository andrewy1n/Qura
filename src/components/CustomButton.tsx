import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useCallback } from 'react';
import _ from 'lodash';

interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
    style?: object;
    text: string;
    customStyle?: object;
    customTextStyle?: object;
}

const CustomButton: React.FC<ButtonProps> = ({
    style,
    text,
    customStyle,
    customTextStyle,
    onPress,
    ...touchableOpProps
}) => {
    const debouncedOnPress = useCallback(
        _.debounce(
            (event) => {
                if (onPress) {
                    onPress(event);
                }
            },
            500,
            {
                leading: true,
                trailing: false,
            }
        ),
        [onPress, 500]
    );

    return (
        <View style={style}>
            <TouchableOpacity style={customStyle} onPress={debouncedOnPress} {...touchableOpProps}>
                <Text style={customTextStyle}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default styled(CustomButton);
