import { Div, Header, Button, Icon ,Drawer,Text} from "react-native-magnus"
import { useNavigation } from "@react-navigation/native";
import { colors } from "../config/colors";
import React,{useContext, useRef} from "react";
import Custom_button from "./Custom_button";
import { AuthContext } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";

const Custom_header = ({ title }) => {
    const navigation = useNavigation();
    const drawerRef = React.createRef();
    const {auth,handle_logout}=useContext(AuthContext)
    const { t } = useTranslation();
    return (
        <>

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
                    <Button bg="transparent" onPress={() => {
                        if (drawerRef.current) {
                            drawerRef.current.open();
                        }
                    }}>
                        <Icon name="more-vertical" fontFamily="Feather" color="white" />
                    </Button>
                }
            >
                {title}
            </Header>



            <Drawer ref={drawerRef} >




                <Div pt={100} px={10} flex={1} position="relative">
                    <Text textAlign="center">{auth?.user?.username}</Text>
                    <Text textAlign="center">{auth?.user?.email}</Text>
                    <Div position="absolute" bottom={70} right={0} left={0} mx={10}>
                      <Custom_button title={t('logout')} onPress={()=>handle_logout()} />
                    </Div>
                   
                </Div>
            </Drawer>
        </>
    )
}

export default Custom_header