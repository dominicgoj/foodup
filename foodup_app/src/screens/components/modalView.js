import React from 'react';
import { View, Modal, Text, Image, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import GestureRecognizer from 'react-native-swipe-gestures';
import { commonStyles } from '../../styles/commonstyles';

const ModalView = ({onClose, visible, modalContent}) =>{
    
    return(
        <GestureRecognizer>
    <Modal
      animationType='slide'
      presentationStyle="formSheet"
      visible={visible}
      onRequestClose={onClose}
    ><View style={commonStyles.modalView}>
            <Icon name='chevron-down' style={commonStyles.chevronIconModal}/>
            <View>
            {modalContent}
            </View>
            
        
        </View>
            </Modal>
    </GestureRecognizer>
    )
}
const styles = StyleSheet.create({

})
export default ModalView;