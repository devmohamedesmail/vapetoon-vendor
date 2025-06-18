import React, { useRef, useState, useEffect } from 'react'
import { Div, Button, Icon, Text, Dropdown, Image } from 'react-native-magnus'
import { colors } from '../config/colors'

interface Option {
  id: string | number;
  title: string;
  description?: string;
  image?: {
    formats?: {
      thumbnail?: {
        url: string;
      };
    };
  } | string;
}

interface CustomSelectProps {
  options: Option[];
  selectedValue?: string | number;
  onSelect: (value: string | number, option: Option) => void;
  placeholder: string;
  icon?: string;
  disabled?: boolean;
  error?: string;
}

function Custom_Select({
  options,
  selectedValue,
  onSelect,
  placeholder,
  icon = "grid",
  disabled = false,
  error
}: CustomSelectProps) {
  const dropdownRef = useRef<any>(null);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  useEffect(() => {
    const option = options.find(option => option.id === selectedValue);
    setSelectedOption(option || null);
  }, [selectedValue, options]);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onSelect(option.id, option);
    dropdownRef.current?.close();
  };

  const getImageSource = (image: any) => {
    if (typeof image === 'string') {
      return { uri: image };
    }
    if (image?.formats?.thumbnail?.url) {
      return { uri: image.formats.thumbnail.url };
    }
    return null;
  };

  return (
    <Div mb={16}>
      <Button
        block
        bg="white"
        borderWidth={1}
        borderColor={error ? "#EF4444" : selectedOption ? colors.secondary : "#E5E7EB"}
        p="lg"
        rounded="xl"
        h={56}
        justifyContent="space-between"
        flexDir="row"
        alignItems="center"
        disabled={disabled}
        opacity={disabled ? 0.6 : 1}
        onPress={() => !disabled && dropdownRef.current?.open()}
      >
        <Div flexDir="row" alignItems="center">
          <Div
            bg={selectedOption ? colors.secondary : "#F3F4F6"}
            rounded="circle"
            w={36}
            h={36}
            justifyContent="center"
            alignItems="center"
            mr={12}
          >
            <Icon 
              name={icon} 
              fontFamily="Feather" 
              fontSize={18} 
              color={selectedOption ? "white" : "#9CA3AF"} 
            />
          </Div>
          <Text 
            color={selectedOption ? colors.primary : "#9CA3AF"} 
            fontSize={16}
            fontWeight="500"
          >
            {selectedOption?.title || placeholder}
          </Text>
        </Div>
        <Icon 
          name="chevron-down" 
          fontFamily="Feather" 
          fontSize={20} 
          color="#9CA3AF" 
        />
      </Button>

      {error && (
        <Text color="#EF4444" fontSize={12} mt={4} ml={4}>
          {error}
        </Text>
      )}

      <Dropdown
        ref={dropdownRef}
        mt="md"
        pb="2xl"
        showSwipeIndicator={true}
        roundedTop="2xl"
        bg="white"
      >
        {options.map((option) => (
          <Dropdown.Option
            key={option.id}
            value={option.id}
            py="lg" 
            px="xl" 
            block
            bg="white"
            borderBottomWidth={1}
            borderBottomColor="#F3F4F6"
            onPress={() => handleSelect(option)}
          >
            <Div flexDir="row" alignItems="center">
              <Div
                bg={colors.secondary}
                rounded="xl"
                w={48}
                h={48}
                justifyContent="center"
                alignItems="center"
                mr={16}
              >
                {option.image && getImageSource(option.image) ? (
                  <Image
                    source={getImageSource(option.image)}
                    w={32}
                    h={32}
                    rounded="lg"
                  />
                ) : (                    <Icon 
                      name="package" 
                      fontFamily="Feather" 
                      fontSize={20} 
                      color="white" 
                    />
                )}
              </Div>
              <Div flex={1}>
                <Text 
                  fontSize={16} 
                  fontWeight="600" 
                  color={colors.primary}
                  mb={2}
                >
                  {option.title}
                </Text>
                {option.description && (
                  <Text 
                    fontSize={12} 
                    color="#9CA3AF" 
                    numberOfLines={1}
                  >
                    {option.description}
                  </Text>
                )}
              </Div>                <Icon 
                  name="chevron-right" 
                  fontFamily="Feather" 
                  fontSize={18} 
                  color="#D1D5DB" 
                />
            </Div>
          </Dropdown.Option>
        ))}
      </Dropdown>
    </Div>
  )
}

export default Custom_Select