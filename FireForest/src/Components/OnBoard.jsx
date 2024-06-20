import React from 'react'
import { OnboardFlow } from 'react-native-onboard';

const OnBoard = ({ setShowed }) => {
    return (
        <OnboardFlow onDone={() => setShowed(false)}
            pages={[
                {
                    title: 'Bienvenido a WildeFire',
                    subtitle: 'Wildeye es una aplicación móvil con la finalidad de prevenir incendios forestales.',
                    imageUri: 'https://i.ibb.co/Hxsw1Bt/Whats-App-Image-2024-06-19-at-19-49-41-2.png',
                    primaryButtonTitle: 'Continuar'
                },
                {
                    title: '¿Para qué puedo usar WildeFire?',
                    subtitle: 'Puedes utilizar wildeye para enviar notificaciones a las autoridades locacales a través de fotografías.',
                    imageUri: 'https://i.ibb.co/XsdDw3G/Persona-Foto.png',
                    primaryButtonTitle: 'Continuar'
                },
                {
                    title: '¿Cómo funciona WildeFire?',
                    subtitle: 'Wildeye funciona con inteligencia artificial principalmente para verificar las fotografías enviadas por los usuarios y evitar las noticias falsas.',
                    imageUri: 'https://i.ibb.co/bzZqF8y/RoboLike.png',
                    primaryButtonTitle: 'Continuar'
                },
                {
                    title: '¿Qué gano usando WildeFire?',
                    subtitle: 'Gracias a nuestros convenios con diferentes empresas podemos ofrecerte diversas recompensas a través de sus servicios o productos.',
                    imageUri: 'https://i.ibb.co/ck03cvY/Ganar-Dinero.png',
                    primaryButtonTitle: 'Empezar',
                }
            ]}
            type={'fullscreen'}
        />
    )
}

export default OnBoard