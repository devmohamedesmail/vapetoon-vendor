
import { Div, ScrollDiv, Text,Header,Button,Icon } from 'react-native-magnus'
import Custom_home_item from '../../custom/Custom_home_item'
import { colors } from '../../config/colors'
import { useNavigation } from '@react-navigation/native'

export default function Home() {


    const navigation = useNavigation();
    return (
        <Div>
            <ScrollDiv>

                <Header
                    bg={colors.secondary}
                    color="white"
                    h={100}
                    p="lg"
                    alignment="left"
                    prefix={
                        <Button bg="transparent">
                            <Icon name="arrow-left" fontFamily="Feather" fontSize="2xl" />
                        </Button>
                    }
                    suffix={
                        <Button bg="transparent">
                            <Icon name="more-vertical" fontFamily="Feather" />
                        </Button>
                    }
                >
                    Home
                </Header>



                <Div flexDir='row' flexWrap='wrap' justifyContent='space-between' mt={20} alignItems='center' px={10}>
                    <Custom_home_item
                        icon={require('../../../assets/images/products.png')}
                        title={'products'}
                        onPress={()=>navigation.navigate('AddProduct')}
                        
                        />
                    <Custom_home_item
                        icon={require('../../../assets/images/orders.png')}
                        title={'Orders'} />
                    <Custom_home_item
                        icon={require('../../../assets/images/store.png')}
                        title={'Store'} />

                </Div>

            </ScrollDiv>
        </Div>
    )
}