
import React, { useState } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Text, View, FlatList } from 'react-native';
import { Guild } from '../../components/Guild'; 
import { GuildProps } from '../../components/Guild'; 
import { ListDivider } from '../../components/ListDivider';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type Props ={
    handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelect }: Props) {
    const guilds = [
        {
            id: '1',
            name: 'Lendários',
            icon: 'image.png',
            owner: true,
        },
        {
            id: '2',
            name: 'Os brabo',
            icon: 'image.png',
            owner: true,
        }
    ]
  return (
      <View style={styles.container}>
          <FlatList 
            data={guilds}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <Guild 
                    data={item}
                    onPress={() => handleGuildSelect(item)} />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.guilds} />

      </View>

  );
}

