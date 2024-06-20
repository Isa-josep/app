import { View, Text, StyleSheet, TouchableOpacity, Platform, Switch, Linking } from 'react-native';
import { useContext, useState } from 'react';
import FeatherIcon from '@expo/vector-icons/Feather';

import { CredentialsContext } from '../../Components/CredentialsContext';

export default function Settings({ navigation }) {
    const [selected, setSelected] = useState(false);

  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const clearLogin = async () => {
    setStoredCredentials("");
  }

  const secciones = [
    {
      header: '',
      items: [
        { id: 'profile', icon: "user", label: 'Configurar Perfil', type: "select" },
        { id: 'darkMode', icon: "moon", label: 'Modo Oscuro', type: "toogle" },
        { id: 'report', icon: "flag", label: 'Reportar un fallo', type: "select" },
        { id: 'contact', icon: "mail", label: 'Contáctanos', type: "select" },
      ]
    },
  ]

  return (
    <View style={{ flex: 1 }}>
      <View>
        {secciones.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>

            <View style={{ marginBottom: -5 }}>
              {items.map(({ label, id, type, icon }, index) => (
                <View style={[styles.rowWrapper, index === 0 && { borderTopWidth: 0 }]} key={id}>
                  <TouchableOpacity onPress={() => {
                    switch (id) {
                      case 'profile':
                        navigation.navigate('Profile');
                        break;
                      case 'bug':
                        navigation.navigate('ReportBug');
                        break;
                      case 'contact':
                        Linking.openURL('mailto:chefsito880@gmail.com');
                        break;
                      case 'membership':
                        Linking.openURL(`https://www.chefsitoai.com/account/${storedCredentials._id}/membership`);
                        break;
                      case 'version':
                        setModalVisible(true);
                        break;
                      case 'info':
                        navigation.navigate('About');
                        break;
                      case 'policy':
                        Linking.openURL(`https://www.chefsitoai.com/policy-privacity`);
                        break;
                      case 'toc':
                        Linking.openURL(`https://www.chefsitoai.com/terms-conditions`);
                        break;
                      default:
                        break;
                    }
                  }} >
                    <View style={styles.row}>
                      <FeatherIcon name={icon} color={'#616161'} size={22} style={{ marginRight: 12 }} />

                      <Text style={styles.rowLabel}>{label}</Text>

                      <View style={styles.rowSpacer} />

                      {type === 'toogle' && (
                        <Switch value={selected} onValueChange={value => {
                            setSelected(value);
                        }} />
                      )}

                      {['select', 'link'].includes(type) && (
                        <FeatherIcon name='chevron-right' color={'#ababab'} size={22} />
                      )}

                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={clearLogin} style={styles.button}><Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Cerrar Sesión</Text></TouchableOpacity>
        <View style={{ height: 180}}></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
 
  header: {
    paddingHorizontal: 24,
    marginTop: 30
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292'
  },
  section: {
    paddingTop: 12
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    letterSpacing: 1.2
  },
  rowWrapper: {
    paddingLeft: 24,
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
    backgroundColor: '#fff'
  },
  row: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 24
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000'
  },
  rowSpacer: {
    flex: 1
  },
  rowValue: {
    fontSize: 17,
    color: '#616161',
    marginRight: 4
  },
  button: {
    backgroundColor: 'purple',
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: Platform.OS == "ios" ? 50 : 8
  }
});