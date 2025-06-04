import { Div,Header,Button,Icon } from "react-native-magnus"
import { useNavigation } from "@react-navigation/native";
import { colors } from "../config/colors";

const Custom_header = ({title}) => {
    const navigation = useNavigation();
    return (

        <Header
            p="lg"
            bg={colors.secondary}
            alignment="left"
            color="white"
            pt={40}
            prefix={
                <Button bg="transparent" onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" fontFamily="Feather" color="white" fontSize="2xl" />
                </Button>
            }
            suffix={
                <Button bg="transparent">
                    <Icon name="more-vertical" fontFamily="Feather" color="white" />
                </Button>
            }
        >
            {title}
        </Header>
    )
}

export default Custom_header