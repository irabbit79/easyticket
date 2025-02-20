/**
 * Order confirmation component, displays a modal with the order details
 * 
 */
import { Modal, View, Text, Button } from "react-native";
import { eventsStyles } from "../styles/eventsStyles";
import { OrderResponse } from '../types/order';
interface OrderConfirmationProps {
  order: OrderResponse;
  tickets: number;
  visible: boolean;
  onClose: () => void;
}
export function OrderConfirmation({ order, tickets, visible, onClose }: OrderConfirmationProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={eventsStyles.modalOverlay}>
        <View style={eventsStyles.modalContent}>
          <Text style={eventsStyles.modalTitle}>Order Confirmed!</Text>
          <Text style={eventsStyles.modalDesc}>
            {`Reference Number: ${order.referenceNumber}\n` +
             `Status: ${order.status}\n` +
             `Date: ${new Date(order.createdAt).toLocaleString()}\n` +
             `Number of Tickets: ${tickets}`}
          </Text>
          <View style={eventsStyles.modalButtons}>
            <Button 
              title="Close" 
              onPress={onClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

