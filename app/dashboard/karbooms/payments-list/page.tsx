"use client";

import { useState } from "react";
import RejectDrawerComponent from "../_components/reject-drawer-component";
import PaymentDrawerComponent from "../_components/payment-drawer-component";
import PaymentDetailsDrawerLayout from "./_layouts/payment-details-drawer-layout";
import PaymentsListLayout from "./_layouts/payments-list-layout";
import useRejectPaymentEndpoint from "./_hooks/use-reject-payment-endpoint";
import { usePaymentListStore } from "./_providers/payments-list-store-provider";
import { RejectFormType } from "../_schemas/reject-form-schema";

export default function PaymentsListPage() {
  const [isPaymentFormDrawerOpen, setPaymentFormDrawerOpen] = useState(false);
  const [isPaymentDetailsDrawerOpen, setPaymentDetailsDrawerOpen] =
    useState(false);
  const [isRejectDrawerOpen, setRejectDrawerOpen] = useState(false);

  const selectedPaymentId = usePaymentListStore((state) => state.id);

  const { mutate: rejectPayment, isPending: rejectingPayment } = useRejectPaymentEndpoint();

  const handleOpenPaymentFormDrawer = () => {
    setPaymentFormDrawerOpen(true);
  };

  const handleClosePaymentFormDrawer = () => {
    setPaymentFormDrawerOpen(false);
  };

  const handleOpenPaymentDtailsDrawer = () => {
    setPaymentDetailsDrawerOpen(true);
  };

  const handleClosePaymentDtailsDrawer = () => {
    setPaymentDetailsDrawerOpen(false);
  };

  const handleOpenRejectDrawer = () => {
    setRejectDrawerOpen(true);
  };

  const handleCloseRejectDrawer = () => {
    setRejectDrawerOpen(false);
  };

  const handleSubmitReject = (data: RejectFormType) => {
    rejectPayment({ paymentId: selectedPaymentId, ...data });
  };

  return (
    <>
      <PaymentsListLayout
        onOpenForm={handleOpenPaymentFormDrawer}
        onOpenDetails={handleOpenPaymentDtailsDrawer}
        onOpenReject={handleOpenRejectDrawer}
      />
      <PaymentDetailsDrawerLayout
        isOpen={isPaymentDetailsDrawerOpen}
        onOpen={handleOpenPaymentDtailsDrawer}
        onClose={handleClosePaymentDtailsDrawer}
        onReject={handleOpenRejectDrawer}
      />
      <RejectDrawerComponent
        isOpen={isRejectDrawerOpen}
        isLoading={rejectingPayment}
        title="دریافتی"
        onOpen={handleOpenRejectDrawer}
        onClose={handleCloseRejectDrawer}
        onSubmit={handleSubmitReject}
      />
      <PaymentDrawerComponent
        isOpen={isPaymentFormDrawerOpen}
        onOpen={handleOpenPaymentFormDrawer}
        onClose={handleClosePaymentFormDrawer}
      />
    </>
  );
}
