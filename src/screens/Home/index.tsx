import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { Profile } from '../../components/Profile';
import { Load } from '../../components/Load';
import { ListHeader } from '../../components/ListHeader';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ButtonAdd } from '../../components/ButtonAdd';
import { ListDivider } from '../../components/ListDivider';
import { CategorySelect } from '../../components/CategorySelect';
import { styles } from './styles';
import { Background } from '../../components/Background';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

export function Home() {
    const [category, setCategory] = useState('');
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId)
    }

    function handleAppointmentDetails(guildSelected: AppointmentProps ) {
        navigation.navigate('AppointmentDetails', { guildSelected })

    }
    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate')

    }

    async function loadingAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];
        if (category) {
            setAppointments(storage.filter(item => item.category === category));
        }
        else {
            setAppointments(storage);
        }
        setLoading(false);

    }
    useFocusEffect(useCallback(() => {
        loadingAppointments();

    },[category]));
    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>

            <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect} />

            {
                loading ? <Load /> :
                <>
                    <ListHeader
                        title="Partidas agendadas"
                        subtitle={`Total ${appointments.length}`} />
                    <FlatList
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Appointment
                                data={item}
                                onPress={()=> handleAppointmentDetails(item)} />

                        )}
                        ItemSeparatorComponent={() => <ListDivider />}
                        contentContainerStyle={{ paddingBottom: 69 }}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            }

        </Background>
    )
}